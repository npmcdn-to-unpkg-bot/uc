'use strict';
const base = require('./base');

class API extends base {
  constructor(appId, host, clazz){
    super(appId);
    this._class = clazz;
    this.host(host).reset();
  }

  reset(){
    super.reset();
    this.header({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    this._url = `${this._pathname}/${this._class}`;
    return this;
  }

  // 把对象插入到列表的某个位置
  // 插入列表后，不会更改原本数据的位置
  score(index){
    // { score: 位置 }
    this._body.score = index;
    return this;
  }

  // 返回相关字段
  fetch(){
    this._qs._fetch = 1;
    return this;
  }

  // 每页多少条数据
  size(size){
    this._qs._size = size || 10;
    return this;
  }

  // 当前第几页
  page(index){
    this._qs._page = index || 1;
    return this;
  }

  // 返回分页总数
  fetchTotal(){
    this._qs._fetch_total = 1;
    return this;
  }

  // 根据 _pos 的排序，取值 desc/asc
  order(st){
    this._qs._order = st || 'desc';
    return this;
  }

  send(method, itemId, listId, categoryId){
    this._method = method;
    categoryId && (this._url += `/categories/${categoryId}`);
    listId && (this._url += `/lists/${listId}`);
    itemId && (this._url += `/elements/${itemId}`);
    return super.send();
  }

  // 将 itemId 插入到列表or板块的列表
  // 如果元素已经存在，则不会更新 score 值
  post(itemId, listId, categoryId){
    // POST /3/classes/:clazz/lists/:list/elements/:element 添加对象到列表
    // POST /3/classes/:clazz/categories/:categoryId/lists/:listId/elements/:elementId 添加元素到某个分类的列表中
    return this.send('POST', itemId, listId, categoryId);
  }

  // 会强制把对象状态，更新为 activate，如果元素不存在，则强制插入一条
  // 如果元素已经存在，则不会更新score值
  put(itemId, listId, categoryId){
    // PUT /3/classes/:clazz/lists/:list/elements/:element 添加对象到列表
    return this.send('POST', itemId, listId, categoryId);
  }

  // 与 put 一致，只是不会更改对象状态，如果元素不存在，则会抛出 500 错误
  // 如果元素已经存在，也会更新score值
  patch(itemId, listId, categoryId){
    // POST /3/classes/:clazz/lists/:list/elements/:element 添加对象到列表
    return this.send('PATCH', itemId, listId, categoryId);
  }

  get(itemId, listId, categoryId) {
    return this.send('GET', itemId, listId, categoryId);
  }

  delete(itemId, listId, categoryId) {
    return this.send('DELETE', itemId, listId, categoryId);
  }
};

module.exports = API;
