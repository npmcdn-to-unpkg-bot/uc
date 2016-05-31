"use strict";

var koa = require("koa");
var util = require("util");
var app = koa();

// X-Response-Time
app.use(function*(next){
    var start = new Date;
    // 等待下一个use执行完成
    // 难道 next 是一个 promise 对象？
    // @notice 查资料得知，纯粹的一个语法糖，调用下一个use，没什么含义
    try {
        yield next;
    } catch(e) {
        console.log(e);
    }
    var ms = new Date - start;
    this.set("X-Response-Time", ms + "ms");
    // typeof next === object 完全想不到诶..，而且它没有其他方法么?
    // 但是 next 又不是一个 promise 对象，它到底是什么鬼呢?
    this.body += typeof next.then + "<br/>";
    this.body += typeof next.fail + "<br/>";
});

// logger
app.use(function*(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log("%s %s - %s", this.method, this.url, ms);
});

app.use(function*(){
    xxxyy = 123123;
    this.body = "Hello World<br/>";
});

app.listen(3000);
