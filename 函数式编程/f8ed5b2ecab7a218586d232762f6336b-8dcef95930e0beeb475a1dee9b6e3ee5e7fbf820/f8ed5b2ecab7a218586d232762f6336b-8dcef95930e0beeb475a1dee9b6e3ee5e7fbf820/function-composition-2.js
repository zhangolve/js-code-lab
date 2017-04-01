const curry = require('lodash/fp/curry');
const map = require('lodash/fp/map');
const join=require('lodash/fp/join');
const split=require('lodash/fp/split');
const toLowerCase = str => str.toLowerCase();
const toSlug = input => encodeURIComponent(
  join('-')(
    map(toLowerCase)(
      split(' ')(
        input
      )
    )
  )
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'