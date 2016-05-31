"use strict";

// 开启 app/public 静态访问
exports.static = true;

// tnpm ii @ali/egg-view-nunjucks
// 开启使用 view 插件
exports.view = {
    enable: true,
    package: "@ali/egg-view-nunjucks"
};
