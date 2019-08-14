'use strict';

// include dependencies
const debug = require('debug')('eit:middleware:authorize');
const moment = require('moment');
const db = require('../utils/neo4j');

const API_KEYS = [
  'OCEANIC_KEY',
  'TELSTAR_KEY',
];

const authorize = (apiKey = false) => {
  debug('call:authorize(%o)', apiKey);

  return (req, res, next) => {
    const token = req.get('authorization');

    if (!token) {
      return next({
        code: 401,
        message: 'login to access these documents',
      });
    }

    if (apiKey && API_KEYS.includes(token)) {
      return next();
    }

    const session = db.session();
    const query = `MATCH (s:Session {token: $token})-[r:OPENS]-(:Account)
    WHERE r.expires > $expires
    RETURN s`;

    return session
      .run(query, {
        token,
        expires: moment().unix(),
      })
      .then((result) => {
        if (result.records.length !== 1) {
          const err = new Error('invalid token');
          err.code = 400;

          throw err;
        }

        return next();
      })
      .catch(next)
      .finally(() => {
        session.close();
      });
  };
}; // end authorize

// export as commonjs module
module.exports = authorize;