'use strict';
const base = require('./base');
const objectAPI = require('./object');
const listAPI = require('./list');

class napi extends base {
  constructor(appId){
    super(appId);
  }

  object(clazz){
    return new objectAPI(this._app_id, this._host, clazz);
  }

  list(clazz){
    return new listAPI(this._app_id, this._host, clazz);
  }
};

module.exports = function(appId){
  return new napi(appId);
};
