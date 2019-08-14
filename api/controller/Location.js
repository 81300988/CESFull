'use strict';

// include dependencies
const _ = require('lodash');
const debug = require('debug')('eit:controller:location');
const Validation = require('@scuba-squad/validation');
const {
  authorize,
  merge,
} = require('../middleware');
const db = require('../utils/neo4j');

const retrieve = (req, res, next) => {
  debug('call:retreive(req, res, next)');
  const session = db.session();
  const query = 'MATCH (l:Location) RETURN l.city AS city ORDER BY city';

  return session
    .run(query)
    .then((result) => {
      const locations = result.records.map((location) => {
        location = location.toObject();

        return location.city;
      });

      return res
        .status(200)
        .send(locations)
    })
    .catch(next)
    .finally(() => {
      return session.close();
    });
}; // end retreive

const upsert = (req, res, next) => {
  debug('call:upsert(req, res, next)');
  const session = db.session();
  const {city} = req.merged;
  const query = 'MERGE (l:Location {city: $city}) RETURN l';

  return session
    .run(query, {
      city: city.trim().toUpperCase(),
    })
    .then((result) => {
      return res.sendStatus(201);
    })
    .catch(next)
    .finally(() => {
      return session.close();
    });
}; // end upsert

const remove = (req, res, next) => {
  debug('call:remove(req, res, next)');
  const session = db.session();
  const {city} = req.merged;
  const query = `MATCH (:Location {city: $city})-[r:EASTINDIA_CONNECTS]-()
  DELETE r`;

  return session
    .run(query, {
      city: city.trim().toUpperCase(),
    })
    .then((result) => {
      return res.sendStatus(204);
    })
    .catch(next)
    .finally(() => {
      return session.close();
    })
}; // end remove

const validate = (req, res, next) => {
  debug('call:validate(req, res, next)');
  const {city} = req.merged;

  if (!Validation.isString(city) || !city.trim()) {
    return next({
      code: 400,
      message: (city && 'city name is not valid') || 'city is required',
    });
  }

  return next();
}; // end validate

// export as commonjs module
module.exports.retrieve = [
  retrieve,
];
module.exports.upsert = [
  merge(),
  authorize(),
  validate,
  upsert,
];
module.exports.delete = [
  merge(),
  authorize(),
  validate,
  remove,
];