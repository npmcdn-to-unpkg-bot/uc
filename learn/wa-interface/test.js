'use strict';

const json = JSON.stringify({ name: '宗熊', age: 22 });
const base64 = new Buffer(json).toString('base64');

console.log(base64);
console.log(new Buffer(base64, 'base64').toString());
