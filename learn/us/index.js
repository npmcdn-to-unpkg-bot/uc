'use strict';
// const request = require('request');

// us 测试地址 POST 方式，qs参数: bu_type=业务名&res_code=资源编码&key=校验码
// 其中 key = Md5(bu_type + res_code + "easy_serv")
// bu_type 是 us 方提供 -> nation_msg
// res_code 是 app 方提供
const usUrl = 'http://musa.ucweb.com:8000/bu_i/postdata.php';

// 测试32位的md5
const crypto = require('crypto');
function md5(data) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(data, 'utf8');
    // return md5sum.digest('base64');
    return md5sum.digest('hex');
}
console.log(md5('nation_msgofflinenation_msg'));

// post 参数如下：





// pb.js
const ProtoBuf = require('protobufjs'),
  ByteBuffer = ProtoBuf.ByteBuffer,
  Long = ProtoBuf.Long;

const builder = ProtoBuf.loadProtoFile('./test.proto'); // create builder
const lm = builder.build('lm'),
      Helloworld = lm.Helloworld;

let hello = new Helloworld({
  id: 1,
  str: "hello world",
  opt: 0
});

console.log(hello.encodeJSON());

const buffer = hello.encode();
// 转码后，base64合在一起
const message = hello.encode64();

console.log(buffer);
console.log(message);


// 字符串转 byte
console.log('字符->byte:', new Buffer('123abc'));
