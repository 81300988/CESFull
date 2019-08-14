'use strict';

// include dependencies
const _ = require('lodash');
const debug = require('debug')('eit:middleware:merge');
const defaultCustomizer = (a, b) => {
  if (Array.isArray(a) || Array.isArray(b)) {
    a === undefined && (a = []);
    b === undefined && (b = []);

    return _.flatten([a, b]);
  }

  // return undefined to let lodash handle merging
  return undefined;
}; // end defaultCustomizer

const merger = (opt = {}) => {
  debug('call:merger(%o)', opt);
  const {
    order = ['query', 'body', 'params'],
    namespace = 'merged',
    with: customizer = defaultCustomizer,
  } = opt || {};

  const merge = (req, res, next) => {
    debug('call:merge(req, res, next)');
    const merged = order.reduce((memo, key) => {
      return _.mergeWith(memo, _.get(req, key, {}), customizer);
    }, {});

    _.set(req, namespace, merged);
    debug('req.%s = %o', namespace, merged);

    return next();
  }; // end merge

  return merge;
}; // end merger

// export as commonjs module
module.exports = merger;