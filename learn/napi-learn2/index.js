'use strict';
// 查看文档：http://doc.ucweb.local/pages/viewpage.action?pageId=52503141&src=spaceshortcut

let request = require('request');
let host = 'http://napi.uc.cn';
let appId = 'c14054a702a3433385f185ef7f1e566e';
let clazz = 'lfps';


// 新建对象: POST /3/classes/:clazz/objeects?_app_id
// request({
//   url: `${host}/3/classes/${clazz}/objects`,
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   },
//   qs: {
//     _app_id: appId
//   },
//   body: JSON.stringify({
//     name: 'xxyyyy'
//   })
// }).on('response', (response) => {
//   console.log('新建对象状态:' + response.statusCode);
//   console.log('内容类型:' + response.headers['content-type']);
//   let body = '';
//   response.on('data', (data) => body += data)
//     .on('end', () => console.log(body));
// });


// 查询所有对象 GET: /3/classes/:clazz/objects
// request({
//   method: 'GET',
//   url: `${host}/3/classes/${clazz}/objects`,
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   },
//   qs: {
//     _app_id: appId,
//     _select: 'name',  // 要选择的属性，一定会附带 _id,_create_at,_update_at属性
//     _deselect: '_id', // 不需要选择的属性，_id,_create_at,_update_at就算设置了，也不会生效
//     _fetch_incrs: 1,  // 是否要返回计数器，每个对象，将添加一个名为 _incrs 的对象，默认不开启
//     _fetch_version: 1,  // 是否返回当前使用的版本，存于_version字段，默认不开启
//   },
//   body: JSON.stringify({})
// }).on('response', (response) => {
//   console.log('查询对象状态:' + response.statusCode);
//   console.log('内容类型:' + response.headers['content-type']);
//   let body = '';
//   response.on('data', (data) => body += data)
//     .on('end', () => console.log(body));
// });


const NAPI = require('./lib/napi');
const napi = NAPI(appId).host(host);
let log = data => {
  console.log(JSON.stringify(data, null, 2));
};

let objectAPI = napi.object(clazz);
objectAPI.debug();


// 清空角色表
// var tnapi = NAPI('b4c926d5150a492ba7f610f8d5b34d97').host('http://w.napi.api.uc.cn');
// function clear(list){
//   let itemId = list.pop();
//   if (itemId) {
//     tnapi.object('roles').debug().delete(encodeURIComponent(itemId)).then(() => clear(list));
//   }
// }
// clear(["85731da3649c41ce96771a2c8da6574a", "4aee5332819945319eab0fc01fdc177d", "3c868b1b9628485aba387577f64ba93d", "3e9e61406ed24f538a3e825899f0bca6", "659b6bd4b91141e2b890f564c9d8d25e", "ede95097885a4721a4dac271f6422e61", "5ad7dac36335417c9b8eef348194d555", "1001", "1009", "test name 001", "东南亚", "test2", "test3"]);


// 新建数据
// objectAPI
//     .body({
//       name: 'test00' + Math.random(),
//       content: 'this is '+ Math.random() +' test'
//     })
//     .post()
//     .then(data => console.log(data))
//     .then(() => {
//       return objectAPI.get();
//     })
//     .then(log);

// 新建数据，如果id已经存在，则忽略该请求
// napi.object(clazz)
//     .body({
//       name: 'test001',
//       content: 'this is first test'
//     })
//     .post('test1')
//     .then(data => console.log(data));

// 获取全部对象
// napi.object(clazz)
//     .fetchVersion()
//     .fetchIncrs()
//     .select('name')
//     .get()
//     .then(data => console.log(JSON.stringify((data), null, 2)));

// 获取单个对象
// napi.object(clazz)
//     .qs({ _fetch: 0 })    // _fetch 参数，在 objects 接口下，时失效的
//     .get('test1')
//     .then(data => console.log(JSON.stringify((data), null, 2)));

// 覆盖式修改对象，如果对象不存在，则创建
// napi.object(clazz)
//     .body({
//       name: 'put object'
//     })
//     .put('put-test-1')
//     .then(data => console.log(JSON.stringify(data, null, 2)));


// 增量修改对象，如果对象不存在，则创建
// napi.object(clazz)
//     .body({
//       name: 'patch object',
//       content: 'test content'
//     })
//     .patch('patch-test-1')
//     .then(log)
//     .then(() => {
//       napi.object(clazz).get('patch-test-1').then(log);
//     });

// 删除对象
// napi.object(clazz)
//     .body({
//       name: 'object will remove'
//     })
//     .post('delete-test-1')
//     .then(() => {
//       return napi.object(clazz).get('delete-test-1');
//     })
//     .then(log)
//     .then(() => {
//       return napi.object(clazz).delete('delete-test-1');
//     })
//     .then(log, log);

// 某对象，更新状态为 activate，不知有什么用
// napi.object(clazz)
//     .activate('test1')
//     .then(log);

// 查询计数器，这玩意，完全是有BUG的!!!!
// napi.object(clazz)
//     .incrs('test1', 'uv')
//     .then(log)
//     .then(() => napi.object(clazz).incrs('test1', 'uv', 2))
//     .then(log)
//     .then(() => napi.object(clazz).incrs('test1', 'uv', 1, true))
//     .then(log);




// 列表测试
let listAPI = napi.list(clazz).debug();
let categoryName = "big-data";
let listName = 'all';
let listName2 = 'all2';

// 插入几条测试数据
// for (var i = 1; i < 10; i++) {
//   napi.object(clazz).body({ name: 'message - ' + i }).post('test' + i).then(log);
// }


// 插入到列表
// listAPI.body({score: 20}).put('test2', listName)
//       .then(log, log);


// 如果对象不存在，虽然提醒成功，但实际查不出来
// listAPI.score(1).post('001', listName, categoryName)
//         .then(log, log);

// 查找列表中的某个对象
// listAPI.fetch().get('test1', listName).then(log, log)

// 获取对象列表
// listAPI.put('test6', listName)
//       .then(log, log)
//       .then(() => {
//         return listAPI.fetch().size(5).page(1).fetchTotal().get(null, listName);
//       })
//       .then(log);


// 获取列表下，所有对象
// napi.object(clazz).get().then(log, log);

// 对象新增到某个 list 下
// objectAPI.body({
//     name: 'test12'
//   })
//   .list(listName2)
//   .put('test12')
//   .then(log, log)
//   .then(() => listAPI.get(null, listName2))
//   .then(log);

// 对象新增到某个分组的列表下
// objectAPI.body({
//     name: 'test12'
//   })
//   .list(listName)
//   .category(categoryName)
//   .put('test12')
//   .then(log, log)
//   .then(() => listAPI.fetch().get(null, listName, categoryName))
//   .then(log);

// 尝试 分组列表
// listAPI.post('test1', listName, categoryName).then(log)
//         .then(() => listAPI.fetch().get(null, listName, categoryName)).then(log);
