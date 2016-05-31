"use strict";

module.exports = app => {
    // 能应用 post/put/delete 之类的吗?
    app.get("/", app.controller.home);

    // 其实  app.get("xxx", fn) 第二个参数，必须是个 function*
    app.get("/news", app.controller.news.list);


};
