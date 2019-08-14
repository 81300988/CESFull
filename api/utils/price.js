'use strict';

const _ = require('lodash');
const debug = require('debug')('eit:utils:price');
const moment = require('moment');
const Validation = require('@scuba-squad/validation');
const priceList = require('../data/price-list');
const packageType = require('../data/package-contents');

const convertDateToSeason = (date = Date.now()) => {
  debug('call:convertDateToSeason(%o)', date);
  if (!Validation.isDate(date)) {
    throw new Error('invalid date');
  }

  return ([4,5,6,7,8,9].includes(moment(date).month()) && 'SUMMER') || 'WINTER';
};

const pricePerSegment = (shipDate, weight) => {
  debug('call:pricePerSegment(%o, %o)', shipDate, weight);
  shipDate = convertDateToSeason(shipDate);
  const prices = priceList[shipDate].find((weights) => {
    const {min, max} = weights;

    return Validation.isFloat(weight, {min, max});
  });

  if (!prices || !prices.price) {
    throw new Error('unacceptable weight');
  }

  return prices.price;
}; // end pricePerSegment

const contentMultiplier = (content) => {
  debug('call:contentMultiplier(%o)', content);

  return _.get(packageType, [content, 'multiplier'], 1);
}; // end contentMultiplier

const calculate = (segments, shipDate, weight, content) => {
  debug('call:calculate(%o, %o, %o, %o)', segments, shipDate, weight, content);
  if (!Validation.isInteger(segments, {min: 0})) {
    throw new Error('invalid segments');
  }

  const basePrice = pricePerSegment(shipDate, weight);
  const fee = contentMultiplier(content);

  return (segments * basePrice) * fee;
}; // end calculate

// export as commonsj module
module.exports = calculate;