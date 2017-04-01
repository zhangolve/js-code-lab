const curry = require('lodash/fp/curry');
const map = require('lodash/fp/map');
const join=require('lodash/fp/join');
const split=require('lodash/fp/split');
const flow=require('lodash/fp/flow');

const toLowerCase = str => str.toLowerCase();
const trace = curry((label, x) => {
  console.log(`== ${ label }:  ${ x }`);
  return x;
});
const toSlug = flow(
  trace('input'),
  split(' '),
  map(toLowerCase),
  trace('ater map'),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader')); 
// '== input:  JS Cheerleader'
// '== after map:  js,cheerleader'
// 'js-cheerleader'
//有点像是debugger加console.log的意思，可以直接拿来进行console