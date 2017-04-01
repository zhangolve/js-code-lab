const curry = require('lodash/fp/curry');
const map = require('lodash/fp/map');
const join=require('lodash/fp/join');
const split=require('lodash/fp/split');
const flow=require('lodash/fp/flow');
const toLowerCase = str => str.toLowerCase();
const toSlug = flow(
  split(' '),
  map(toLowerCase),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'