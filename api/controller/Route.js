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
    shipDate,
    weight,
    contents,
  } = req.merged;
  const session = db.session();
  const query = `MATCH (departure:Location)-[path:EASTINDIA_CONNECTS]->(arrival:Location)
  RETURN departure, arrival, path`;

  return session
    .run(query)
    .then((result) => {
      const routes = result.records.map((route) => {
        route = route.toObject();
        const segments = +_.get(route, 'path.properties.segments');

        return {
          departureLocation: {
            name: _.get(route, 'departure.properties.city'),
            code: _.get(route, 'departure.properties.code'),
          },
          destinationLocation: {
            name: _.get(route, 'arrival.properties.city'),
            code: _.get(route, 'arrival.properties.code'),
          },
          cost: priceCalc(segments, shipDate, weight, contents),
          time: +_.get(route, 'path.properties.duration'),
        };
      });

      return res
        .status(200)
        .send(routes);
    })
    .catch(next)
    .finally(() => {
      return session.close();
    });
}; // end retreive

const validate = (req, res, next) => {
  debug('call:validate(req, res, next)');
  const {
    weight,
  } = req.merged;

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
  authorize(true),
  validate,
  retrieve,
];