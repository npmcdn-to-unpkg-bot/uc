'use strict';
const util = require('util');
const base = require('./base');

class API extends base {
  constructor(appId, host, clazz){
    super(appId);
    this._class = clazz;
    this.host(host).reset();
  }

  reset(){
    super.reset();
    this._url = `${this._pathname}/${this._class}/objects`;
    // _lists 字段，决定新增的数据，放在哪个 list or category/list
    // _lists: [{ list_id:, category_id:, score: }]
    this._list = { };
    return this;
  }

  list(listId){
    this._list.list_id = listId;
    return this;
  }

  category(categoryId){
    // 如果没有 listId，使用 default 作为默认
    this._list.category_id = categoryId;
    if (!this._list.list_id) {
      this._list.list_id = 'default';
    }
    return this;
  }

  score(index){
    this._list.score = index;
    return this;
  }

  send(method, itemId){
    // _lists 字段，决定新增的数据，放在哪个 list or category/list
    let _list = this._list;
    if (_list.list_id) {
      // _list 如果没有 score 字段，会报错诶，超可怕
      typeof _list.score != 'number' && (_list.score = new Date/1);
      this._body._lists = [_list];
    }
    method && (this._method = method);
    itemId && (this._url += `/${itemId}`);
    return super.send();
  }

  get(itemId){
    return this.send('GET', itemId);
  }

  post(itemId){
    return this.send('POST', itemId);
  }

  put(itemId){
    return this.send('PUT', itemId);
  }

  patch(itemId){
    return this.send('PATCH', itemId);
  }

  delete(itemId){
    return this.send('DELETE', itemId);
  }

  activate(itemId){
    this._url += `/${itemId}/actions/activate`;
    return this.send('PUT');
  }

  inactivate(itemId){
    this._url += `/${itemId}/actions/inactivate`;
    return this.send('PUT');
  }

  /**
    * 计数器自增
    * @param {String} itemId 数据id
    * @param {String} key 计数器key
    * @param {Number?} value 计数器自增多少，可负数
    * @param {Boolean?} isReset 是否重置计数器？
  */
  incrs(itemId, key, value, isReset) {
    // /3/classes/:clazz/objects/:id/incrs/:key?/:value?
    // 没有 fieldId 和 value，就是查询计数器
    this._method = 'GET';
    this._url += `/${itemId}/incrs`;

    if (key) {
      if (isReset) {
        // 重置计数器，值为 value
        this._method = 'PUT';
      } else {
        // 自增value值，value默认是1
        this._method = 'POST';
      }
      this._url += `/${key}`;
      if (typeof value == 'number') {
        this._url += `/${value}`;
      };
    }

    return this.send();
  }
};

module.exports = API;
