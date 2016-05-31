'use strict';

const Crypto = require('crypto');
const Url = require('url');
const Http = require('http');

function md5(data) {
    var md5sum = Crypto.createHash('md5');
    md5sum.update(data, 'utf8');
    return md5sum.digest('hex');
}

const search = function(napiConfig, searchTable, options) {
  let qs = options.data || {  };
  let method = options.method || 'GET';
  let requestCallback = options.callback || function(){};
  let seed = [];
  let config = napiConfig;
  // {
  //   debug: true,
  //   appId: '27fc3489bcd04897ae0f08a74ea12013',
  //   appKey: '4056fb2abee448b89b6c1696529cd4c0',
  //   host: 'http://w.napi.api.uc.cn/'
  // };
  // let url = `${config.host}3/classes/${searchTable}/search`;
  let url = `${config.host}3/classes/${searchTable}/objects`;

  // 参数
  qs = Object.assign({
    _fetch: 1,			                              // 返回所有数据
    _fetch_total: 1,	                           	// 返回总页数
    _page: 1,				                              // 第1页
    _size: 50,			                              // 每页50条数据
    _app_id: 'b4c926d5150a492ba7f610f8d5b34d97',	// 应用id
    _time_stamp: new Date/1 					           	// 当前时间戳
  }, qs);

  // sign
  seed.push(config.appKey);
  seed.push(method);

  seed.push(encodeURIComponent(Url.parse(url).pathname));
  seed.push((function(qs) {
      var ret = [];
      for (var key in qs) {
          if (qs.hasOwnProperty(key)) {
              ret.push(key + '=' + qs[key]);
          }
      }
      return encodeURIComponent(ret.join('&'));
  })(options.data));

  qs._sign = md5(seed.join('&'));

  console.log(qs);
  // 发送请求
  // http://w.napi.api.uc.cn/3/classes/roles/search
  return request(url, method, qs, function(error, data){
    requestCallback(error, data);
  });
};


const request = function(url, method, data, callback) {
  data = require('querystring').stringify(data);
  let isPOST = method == 'POST';
  let urlParam = Url.parse(url);
  let options = {
    method: method,
    host: urlParam.host,
    port: urlParam.port || 80,
    path: urlParam.pathname + (isPOST ? '' : '?' + data),
  };

  if (isPOST) {
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }

  console.log(url, method, data, options);
  let requestPromise = new Promise(function(resolve, reject){

    let req = Http.request(options, function(serverFeedback){
      // console.log('STATUS: ' + serverFeedback.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(serverFeedback.headers));
      serverFeedback.setEncoding('utf8');
      if (serverFeedback.statusCode == 200) {
          let body = "";
          serverFeedback.on('data', function(data){
            body += data;
          }).on('end', function(){
            callback(false, body);
            resolve(body);
          });
      } else {
          callback(true);
          reject();
      }
    });

    if (isPOST) {
      req.write(data + "\n");
    }
    req.end();

  });

  return requestPromise;
};

search({
    debug: true,
    appId: '27fc3489bcd04897ae0f08a74ea12013',
    appKey: '4056fb2abee448b89b6c1696529cd4c0',
    host: 'http://w.napi.api.uc.cn/'
  },
  'roles',
  {
    method: "GET",
    data: {
      _objects: 'name:"1002"'
    },
    callback: function(error, data){
      console.log('response>>>>>>>>>>>>>>>>>>>>>>', data);
    }
  },
  function(error, data){

  }
).then(function(){
  console.log('end...');
});
