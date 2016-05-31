'use strict';
const request = require('request');

/**
 * request之后promise的handler
 * @param resolve {Function}
 * @param reject {Function}
 * @returns {Function}
 */
function requestHandler(resolve, reject) {
  return function(error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(body);
        error = data.error;
        if (error && error.code) {
          error.type = 'api';
          error.statusCode = response.statusCode;
          reject(error);
        } else {
          resolve(data);
        }
      } catch (err) {
        err.type = 'parser';
        err.statusCode = response.statusCode;
        reject(err);
      }
    } else {
      if (body) {
        try {
          // 使用数据段的错误回报
          error = JSON.parse(body).error;
          error.type = 'api';
          error.code = error.code || response.statusCode;
        } catch (e) {
          error = null
        }
        if (!error) {
          // 使用 HTTP 的错误回报
          error = {
            message: 'HTTP [' + response.statusCode + '] error'
          }
          error.type = 'http';
          error.code = response.statusCode;
        }
        error.statusCode = response.statusCode;
        reject(error);
      }
    }
  }
};

class base {
  constructor(appId){
    this.reset().appId(appId);
  }

  reset(){
    this._url = '';
    this._method = 'GET';
    this._body = {  };
    this._qs = { };
    this._header = { };
    return this;
  }

  appId(id){
    this._app_id = id;
    return this;
  }

  host(host){
    this._host = host;
    this._pathname = `${this._host}/3/classes`;
    return this;
  }

  header(header){
    Object.assign(this._header, header || { });
    return this;
  }

  body(body){
    Object.assign(this._body, body || { });
    return this;
  }

  qs(qs){
    Object.assign(this._qs, qs || { });
    return this;
  }

  // 选择那些列？以逗号隔开
  select(select){
    this._qs['_select'] = select;
    return this;
  }

  // 不选择那些列?以逗号隔开
  deselect(deselect){
    this._qs['_deselect'] = deselect;
    return this;
  }

  // 返回计数器
  fetchIncrs(){
    this._qs['_fetch_incrs'] = 1;
    return this;
  }

  // 返回版本
  fetchVersion(){
    this._qs['_fetch_version'] = 1;
    return this;
  }

  debug(){
      this.isDebug = true;
      return this;
  }

  send(){
    let url = this._url;
    if (!url) {
      throw 'please set url before ' + this._method;
    }

    // 请求必带 _app_id
    this._qs['_app_id'] = this._app_id;

    let options = {
      method: this._method,
      url: this._url,
      qs: this._qs,
      headers: this._header,
      body: JSON.stringify(this._body)
    };

    this.isDebug && console.log('send options:', options);

    this.reset();
    return new Promise((resolve, reject) => {
      const MAX_RESEND_TIMES = 3;
      function resend(times) {
        request(options,
            requestHandler(
              data => resolve(data),
              function(err){
                if (err.statusCode == 503 && times < MAX_RESEND_TIMES) {
                  // NAPI 服务器繁忙，作重试
                  return resend(++times);
                }
                reject.apply(null, arguments);
              }
            )
        );
      }
      resend(1);
    });
  }
};


module.exports = base;
