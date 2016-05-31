'use strict';
const name = 'global';
this.ax = 123123;
console.log(this);

function A(){
  this.name = 'local';
}
A.prototype = {
  name: 'prototype',
  hi: () => {
	console.log(this);
    console.log('for A:' + this.name);
  }
};

let a = new A();
a.hi();


function B(){
  this.name = 'local';
}
B.prototype = {
  name: 'prototype',
  hi(){
    console.log('for B:' + this.name);
  }
};

let b = new B();
b.hi();
