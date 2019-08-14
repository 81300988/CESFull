'use strict';

// include dependencies
const debug = require('debug')('eit:middleware:error');
const {STATUS_CODES} = require('http');

const error = (err, req, res, next) => {
  debug('call:error(%o, req, res, next)', err);
  const {
    code = 500,
    message = 'Unexpected error has occured',
  } = err;

  res
    .status((STATUS_CODES[code] && code) || 500)
    .send({message});
}; // end error

// export as commonjs module
module.exports = error;