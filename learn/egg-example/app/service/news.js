"use strict";

module.exports = app => {
    class NewsService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        * list(page) {
            // 读取配置文件
            const serverUrl = this.app.config.news.serverUrl;
            const pageSize = this.app.config.news.pageSize;

            // 读取 hacker-news api 数据
            const idList = yield this.app.urllib.request(`${serverUrl/topstories.json}`, {
                data: {
                    orderBy: '"$key"',
                    startAt: `"${pageSize * (page - 1)}"`,
                    endAt: `"${pageSize * page - 1}"`
                },
                dataType: "json"
            }).then(res => res.data);

            // 获取详细信息
            const newsList = yield Object.keys(idList).map(key => {
                const url = `${serverUrl}/item/${idList[key]}.json`;
                return this.app.urllib.request(url, {dataType: "json"}).then(res => res.data);
            });

            return newsList;
        }
    };

    return NewsService;
};
