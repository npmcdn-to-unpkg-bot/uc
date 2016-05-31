"use strict";

// 引用模块
var NAPI = require("napi");

// 创建一个 api 对象，参数为 appID
var napi = NAPI("c14054a702a3433385f185ef7f1e566e");

napi.object('lfps').body({ name: 'tesexx123', _lists: [
  {list_id: 'all', score: 0 },
  {list_id: 'all', category_id: 'normal', score: 0 },
  {list_id: 'all1', score: 0 }
] }).params({
  _max_age: 1 // 缓存。。
}).fetch().fetchTotal().list('all')//.create('test-m33')//.list('all')//.create('test-m22')
.done(function(data){
    console.log("done", data);
}, function(err){
    console.log("error", err)
});

// var tnapi = NAPI('b4c926d5150a492ba7f610f8d5b34d97', 'http://w.napi.api.uc.cn');
// tnapi.object('roles').list('all')
// .done(function(data){
//     console.log("done", data);
// }, function(err){
//     console.log("error", err)
// });
// .body({
//   name: 'test',
//   _lists: [{ list_id: 'all', score: 0 }]
// }).patch('test')
// .done(function(data){
//     console.log("done", data);
// }, function(err){
//     console.log("error", err)
// });;
      // .fetch()
      // .fetchTotal()
      // .list('all')
      // .done(function(data){
      //     console.log("done", data);
      // }, function(err){
      //     console.log("error", err)
      // });
// napi.object('lfps')
//     .body({
//       name: 'tesxxt001',
//       content: 'xxxx',
//       _lists: [{ list_id: 'all', score: new Date/1 }]
//     })
//     .patch('test32')
//     .done(function(data){
//         console.log("done", data);
//     }, function(err){
//         console.log("error", err)
//     });
// napi.object('lfps').params({ _fetch: 1 }).list('all').done(function(data){
//   console.log(data);
// });

// 返回的内容，并不是 Promise 对象，只有一个 done 方法，其他都没有....
// napi.object("news") // 创建一个news类实例
//     .get("995d6e996b6044e7bc15b4f08eb42999")    // 获取对象，对象的_id如果是中文的话，需要 encodeURIComponent("首页精选列表")
//     .done(function(data){
//         console.log("done", data);
//     }, function(err){
//         console.log("error", err)
//     });


// all 方法，为何都查不到数据呢?
// napi.all(
//     napi.object("user").get("2db850abf46a4c75b4a37f47fc8cc419"),
//     napi.object("news").get("995d6e996b6044e7bc15b4f08eb42999")
// ).done(function(list){
//     // list 是一个数组
//     console.log(list);
// });

// list 选择
// napi.object("news")
//     .params({ _fetch: 1 })  // 不添加此参数，只返回 _id 和 _pos ，添加之后返回所有信息
//     .list("sub-lfp")    // 获取二级列表的数据，为空，则获取所有数据
//     .done(function(data){
//         console.log("done:", data);
//     });

// 创建内容，并提交
// napi.object("news")
//     .body({
//         "name": "lfp-test",
//         "content": "test content - " + new Date/1
//     })
//     .post("sub-lfp")    // 提交到自定义的二级菜单中..，不填，则是1级菜单
//     .done(function(data){
//         // data 将返回成功的 _id, _updated_at, _created_at
//         console.log("提交成功", data);
//     });


// 全量更新某个内容 news/sub-lfp/b24abf39ec424a8582b98f420a6c3faf
// 即整体内容被替换，调用此操作，将会把二级分类，也干掉，不推荐使用
// napi.object("news")
//     .body({
//         name: "my name is linfenpan",
//     })
// //     .params({category_id: "sub-lfp"})
//     .put('a46fcd67a6ed49e08a1cdb1e879ec3fe')
//     .done(function(data){
//         console.log("整体内容被替换", data);
//     });


// 局部更新，此更新并不会把二级列表干掉，也不会全部替换所有值
// napi.object("news")
//     .body({
//         name: "hello world"
//     })
//     .patch('f5ce52aaf7b54f8da8f7d5ed9bc6b089')
//     .done(function(data){
//         napi.object("news")
//             .params({_fetch: 1})
//             .list("sub-lfp")
//             .done(function(data){
//                 console.log("当前列表:", data);
//             });
//     });


// 删除内容
// napi.object("news")
//     .delete('e35fe659defd41eaa19d5490060a5bfb')
//     .done(function(data){
//         // data 返回了一个空对象 data = { data: {} }
//         console.log("删除成功", data);
//     });


// 创建指定id的对象
// napi.object("news")
//     .body({
//         name: "test - 1",
//         content: "测试内容: 自定义id"
//     })
//     .create("test-identify-id", "sub-lfp")  // id, catetoryId?, listId?
//     .done(function(){
//         console.log("创建成功");
//         napi.object("news")
//             .params({ _fetch: 1 })
//             .list("sub-lfp")
//             .done(function(list){
//                 console.log(list);
//             });
//     });


// 某个属性自增
// napi.object("counter")
//     .body({
//         pv: 0,
//         uv: 0
//     })
//     .create("message")
//     .done(function(){
//         console.log("创建成功");
//
//         // 对 _id=message对象的pv自增1,uv增加2
//         // @notice 计数器，并不记录在常规的数据中，所以，普通查询，无法查到计数器
//         napi.all(
//             napi.object("counter").incrs("message", "yes"),
//             napi.object("counter").incrs("message", "no", 2)
//         ).done(function(){
//             // 获取全部计数器
//             napi.object('counter')
//                 .getIncrs('message')
//                 .done(function(data){
//                     console.log("全部计数器", data);
//                 });
//         });
//     });


// napi.object("news").fetch(1)
//                   .fetchTotal(1)
//                   .page(1)
//                   .size(5)
//                   .params({
//                     _objects: `name:"lfp-test"`
//                   })
//                   .list('sub-lfp')
//                   .done(function(data){
//                     console.log(data);
//                   });
