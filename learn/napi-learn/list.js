"use strict";
var NAPI = require("napi");
var napi = NAPI("c14054a702a3433385f185ef7f1e566e");

const news = napi.list("news");

// done 中，不编写第二个参数，则会抛出异常
// news.params({ _fetch: 1 })
//     .get('test-identify-id', 'sub-lfp')
//     .done(function(data){
//         // 获取: news/sub-lfp/test-identify-id
//         console.log("对象:", data);
//     }, function(){
//         console.log("查找不到对象");
//     });
//
//
// // 添加某个对象，如果该对象存在，则忽略
news.body({
        score: 1
    })
    .post("test-identify-id", "sub-lfp")
    .done(function(){
        // 对象实际上，早已经存在，所以这里虽然不报错，但是也没更新数据
        console.log("新增成功?");
    }, function(error){
      console.log(error);
    });
