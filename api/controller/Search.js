'use strict';

// include dependencies
const _ = require('lodash');
const debug = require('debug')('eit:controller:search');
const Validation = require('@scuba-squad/validation');
const {
  authorize,
  merge,
} = require('../middleware');
const db = require('../utils/neo4j');
const priceCalc = require('../utils/price');

const retrieve = (req, res, next) => {
  debug('call:retreive(req, res, next)');
  const {
    departure,
    arrival,
    shipDate,
    weight,
    contents,
  } = req.merged;
  const session = db.session();
  const query = `MATCH path = (a:Location)-[route:EASTINDIA_CONNECTS*]-(b:Location)
  WHERE (a.city = $departure OR a.code = $departure)
  AND (b.city = $arrival OR b.code = $arrival)
  WITH path, REDUCE (sum = 0, r IN route | sum + r.duration) AS time
  ORDER BY time
  LIMIT 1
  RETURN path`;

  return session
    .run(query, {
      departure: departure.trim().toUpperCase(),
      arrival: arrival.trim().toUpperCase(),
    })
    .then((result) => {
      if (result.records.length !== 1) {
        const err = new Error('not found');
        err.code = 404;

        throw err;
      }
      const {path} = result.records[0].toObject();
      const segments = +_.get(path, 'segments.0.relationship.properties.segments');
      const route = {
        departure: _.get(path, 'start.properties.city'),
        arrival: _.get(path, 'end.properties.city'),
        company: 'East India Trading Co.',
        price: priceCalc(segments, shipDate, weight, contents),
        duration: +_.get(path, 'segments.0.relationship.properties.duration'),
      };

      return res
        .status(200)
        .send({
          cheapest: [route],
          fastest: [route],
        });
    })
    .catch(next)
    .finally(() => {
      return session.close();
    });
}; // end retreive

const validate = (req, res, next) => {
  debug('call:validate(req, res, next)');
  const {
    departure,
    arrival,
    weight,
  } = req.merged;

  if (!Validation.isString(departure) || !departure.trim()) {
    return next({
      code: 400,
      message: (departure && 'departure is not valid') || 'departure is required',
    });
  }

  if (!Validation.isString(arrival) || !arrival.trim()) {
    return next({
      code: 400,
      message: (arrival && 'arrival is not valid') || 'arrival is required',
    });
  }

  if (!Validation.isFloat(weight, {min: 0})) {
    return next({
      code: 400,
      message: (weight && 'weight is not valid') || 'weight is required',
    });
  }

  return next();
}; // end validate

// export as commonjs module
module.exports.retrieve = [
  merge(),
  authorize(),
  validate,
  retrieve,
];