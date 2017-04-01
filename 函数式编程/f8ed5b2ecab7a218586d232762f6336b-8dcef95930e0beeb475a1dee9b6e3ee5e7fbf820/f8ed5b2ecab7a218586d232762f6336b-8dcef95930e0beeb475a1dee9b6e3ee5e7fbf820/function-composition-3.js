const curry = require('lodash/fp/curry');
const map = require('lodash/fp/map');
const join=require('lodash/fp/join');
const split=require('lodash/fp/split');
const compose=require('lodash/fp/compose') //equal const flowRight=require('lodash/fp/flowRight');
const toLowerCase = str => str.toLowerCase();
const toSlug = compose(
  encodeURIComponent,
  join('-'),
  map(toLowerCase),
  split(' ')
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'