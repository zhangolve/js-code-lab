// source：　https://github.com/jsmini/is/blob/master/src/index.js
// 20181106

import { type } from '@jsmini/type';

export function isInRange(x, min, max) {
    // 这里为什么要写个＋号呢，实际上我们知道javascript是弱类型的，这里通过这个+号，将原来的字符串可以转化为数字，当然前提是这个字符串
    //　是可以转义成数字的，比如"1","2","3"这样的。当然在这里，我们可能也可以使用parseInt parseFloat，而显然＋更加简单
    //　这里转化的原理是 +  Because placing + before string converts the string variable into number.
    //https://stackoverflow.com/questions/16522648/javascript-adding-a-string-to-a-number
    // > 3 + 4 + "5"
    // "75"
    // > 3 + 4 + +"5"
    // 12
    // 
    x = +x;
    min = +min;
    max = +max;

    // x 不是数字，则返回false
    if (isNaN(x)) return false;

    // min 或 max 不传，则认为不设置下限或上限
    // 左闭右闭区间
    return (!isNaN(min) ? x >= min : true) && (!isNaN(max) ? x <= max : true);
}

export function isNumber(x, min, max) {
    return type(x) === 'number' && isInRange(x, min, max);
}

export function isInteger(x, min, max) {
    return parseInt(x, 10) === x  && isInRange(x, min, max);
}

export function isInt(x) {
    // -2^31 ~ 2^31-1
    return isInteger(x, -2147483648, 2147483647);
}

export function isBoolean(x) {
    return type(x) === 'boolean';
}

export function isString(x) {
    return type(x) === 'string';
}

export function isEmptyString(x) {
    if (!isString(x)) return false;

    return /^\s*$/.test(x);
}

export function isNull(x) {
    return type(x) === 'null';
}

export function isUndefined(x) {
    return type(x) === 'undefined';
}

export function isObject(x) {
    return type(x) === 'object';
}

export function isFunction(x) {
    return type(x) === 'function';
}

export const isArray = isFunction(Array.isArray) ? Array.isArray : function isArray(x) {
    return type(x) === 'array';
};