'use strict';
const crypto = require('crypto');
function md5(data) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(data, 'utf8');
    return md5sum.digest('hex');
}

const ProtoBuf = require('protobufjs');

const builder = ProtoBuf.loadProtoFile('./item.proto'); // create builder
const UsItem = builder.build().UsItem;

let strMsg = JSON.stringify({ name: '宗熊', age: 222 });
// console.log(new Buffer(strMsg));

let item = new UsItem({
  res_code: 'offline',
  sum_info: md5(strMsg),
  recycle: 1,
  save_flag: 1,
  zip_flag: 1,
  enc_flag: 1,
  msg_type: 'offline',
  res_data: new Buffer(strMsg)
});

let base64 = item.encode64();
console.log(item.encode64());
console.log(UsItem.decode64(base64));
// let hello = new Helloworld({
//   id: 1,
//   str: "hello world",
//   opt: 0
// });
//
// console.log(hello.encodeJSON());
//
// const buffer = hello.encode();
// // 转码后，base64合在一起
// const message = hello.encode64();
