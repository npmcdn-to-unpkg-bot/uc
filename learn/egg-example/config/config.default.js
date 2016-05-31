// 挂载中间件
exports.middleware = [
    "robot"
];

exports.robot = {
    ua: [
        /Baiduspider/i,
    ]
}
