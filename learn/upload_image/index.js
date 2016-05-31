'use strict';

const request = require("request");
const urllib = require("urllib");
const koa = require("koa");
const app = koa();
const bodyParser = require("koa-bodyparser");
// const multer = require("koa-multer");

app.use(bodyParser({
    formLimit: {
        urlencoded: '3m'
    }
}));

app.use(function* image(){
    this.set("Access-Control-Allow-Origin", "*");
    const params = this.request.body;
    // http://write.img.ucweb.com:8020/e/uaeext/NnY2R3YWJqdGFtc2h6eWdqMjF3ZHu?op=put&name=' + fileName + '&dir=' + targetDir
    // params.img 字段，不能有 base64 相关的前缀
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          img: params.img
        }
    };

    const url = "http://write.img.ucweb.com:8020/e/uaeext/NnY2R3YWJqdGFtc2h6eWdqMjF3ZHu?op=put&dir=test&name=" + params.name;
    let data;
    try {
        data = yield new Promise(function(resolve, reject){
            request.debug = true;
            urllib.request(url, options, function(error, body, response){
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    } catch(e) {
        data = e;
    }


    this.body = data;
});


// app.use(function* image(){
//     this.set("Access-Control-Allow-Origin", "*");
//     const params = this.request.body;
//     // http://write.img.ucweb.com:8020/e/uaeext/NnY2R3YWJqdGFtc2h6eWdqMjF3ZHu?op=put&name=' + fileName + '&dir=' + targetDir
//     // params.img 字段，不能有 base64 相关的前缀
//     const options = {
//         method: "POST",
//         url: "http://write.img.ucweb.com:8020/e/uaeext/NnY2R3YWJqdGFtc2h6eWdqMjF3ZHu?op=put&dir=test&name=" + params.name,
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: require('querystring').stringify({img: params.img})// `img=${params.img}`
//     };
//
//     let data;
//     try {
//         data = yield new Promise(function(resolve, reject){
//             request.debug = true;
//             request(options, function(error, response, body){
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(body);
//                 }
//             });
//         });
//     } catch(e) {
//         data = e;
//     }
//
//
//     this.body = data;
// });

app.listen(5001);
