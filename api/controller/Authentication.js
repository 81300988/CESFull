'use strict';

// include dependencies
const _ = require('lodash');
const crypto = require('crypto');
const debug = require('debug')('eit:controller:authentication');
const moment = require('moment');
const Validation = require('@scuba-squad/validation');
const {
  authorize,
  merge,
} = require('../middleware');
const db = require('../utils/neo4j');

const login = (req, res, next) => {
  debug('call:login(req, res, next)');
  const session = db.session();
  const {
    username,
    password,
  } = req.merged;
  const token = crypto
    .createHash('md5')
    .update(`${username}:${password}:${Date.now()}`)
    .digest('hex');
  const query = `MATCH (a:Account {username: $username, password: $password})
  MERGE (a)-[r:OPENS {expires: $expires}]->(s:Session {token: $token})
  RETURN s.token AS token, r.expires AS expires`;

  return session
    .run(query, {
      username,
      password,
      token,
      expires: moment().add({h: 12}).unix(),
    })
    .then((result) => {
      if (result.records.length !== 1) {
        const err = new Error('not found');
        err.code = 404;

        throw err;
      }

      const token = result.records[0].toObject();

      return res
        .status(200)
        .send({...token})
    })
    .catch(next)
    .finally(() => {
      return session.close();
    });
}; // end login

const logout = (req, res, next) => {
  debug('call:logout(req, res, next)');
  const session = db.session();
  const token = req.get('authorization');
  const query = 'MATCH (s:Session {token: $token}) DETACH DELETE s';

  return session
    .run(query, {token})
    .then((result) => {
      return res.sendStatus(204);
    })
    .catch(next)
    .finally(() => {
      return session.close();
    })
}; // end logout

const validate = (req, res, next) => {
  debug('call:validate(req, res, next)');
  const {
    username,
    password,
  } = req.merged;

  if (!Validation.isString(username) || !Validation.isString(username)) {
    return next({
      code: 400,
      message: 'username or password are invalid',
    })
  }

  if (!password.trim() || !username.trim()) {
    return next({
      code: 400,
      message: 'username and password are required',
    });
  }

  return next();
}; // end validate

// export as commonjs module
module.exports.login = [
  merge(),
  validate,
  login,
];
module.exports.logout = [
  authorize(),
  logout,
];