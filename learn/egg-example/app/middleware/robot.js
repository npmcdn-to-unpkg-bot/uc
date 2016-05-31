"use strict";

module.exports = (options, app) => {
    return function* robotMiddleware(next) {
        const source = this.get("user-agent") || "";
        // options ===> app.config.robot
        const match = options.ua.some(ua => ua.test(source));
        if (match) {
            this.status = 403;
            this.message = "禁止爬虫访问";
        } else {
            yield next;
        }
    };
};
