"use strict";

exports.list = function * newsListController(){
    // const dataList = {
    //     list: [
    //         {id: 1, title: "this is news 1", url: "/news/1"},
    //         {id: 2, title: "this is news 2", url: "/news/2"}
    //     ]
    // };
    // yield this.render("news/list.tpl", dataList);

    const page = this.query.page || 1;
    const newsList = yield this.service.news.list(page);
    yield this.render("news/list.tpl", {list: newsList});
};
