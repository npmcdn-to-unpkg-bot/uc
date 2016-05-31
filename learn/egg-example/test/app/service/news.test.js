"use strict";

const expect = require("expect.js");
const mm = require("@ali/mm");

describe("test/service/news.test.js", function(){
    before(function(done){
        // 自动获取当前应用代码目录，创建 app
        this.app = mm.app();
        this.ctx = this.app.mockContext();

        this.app.ready(done);
    });
    // 确保每个测试用例运行完之后，自动还原到 mock 之前状态
    afterEach(mm.restore);

    it("should list news", function*(){
        const list = yield this.ctx.service.news.list(1);
        expect(list.length).to.be(this.app.config.news.pageSize);
        expect(list[0]).to.have.keys(["id", "title", "url"]);
    });
});
