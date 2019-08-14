'use strict';

// include dependencies
const _ = require('lodash');
const debug = require('debug')('eit:middleware:sanitize');

const sanitize = (value) => {
  if (value == null || _.isNumber(value) || _.isBoolean(value)
    || _.isRegExp(value) || _.isDate(value)) {
    return value;
  }

  if (_.isString(value)) {
    // convert empty strings to null
    return value.trim() || null;
  }

  if (_.isArray(value)) {
    return _.map(value, sanitize);
  }

  return _.mapValues(value, sanitize);
}; // end sanitize

const middleware = (req, res, next) => {
  debug('call:sanitize(req, res, next)');

  debug('before:sanitize:req.query = %o', req.query);
  req.query = sanitize(req.query);
  debug('sanitize:req.query = %o', req.query);

  debug('before:sanitize:req.body = %o', req.body);
  req.body = sanitize(req.body);
  debug('sanitize:req.body = %o', req.body);

  return next();
}; // end middleware

// export as commonjs module
module.exports = middleware;