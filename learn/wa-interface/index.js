'use strict';
const request = require('request');

const crypto = require('crypto');
function md5(data) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(data, 'utf8');
    return md5sum.digest('hex');
};

// 国际链接
const URL = 'http://walog.ucdns.uc.cn:30004/gjwa/api/queryStatKeyCode';
// 国内链接
// const URL = 'http://uaewa.uc.cn:30004/wa/api/queryStatKeyCode';
const app = '1242';
const secretKey = '982f5ec4d3944c88';
const statKey = '27001';
const tm = new Date/1;
const from = '2016-04-01 12:00';
const to = '2016-05-20 12:00';
const keyCode = '';

const options = {
  method: "GET",
  url: URL,
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: require('querystring').stringify({
    app: app,
    statKey: statKey,
    from: from,
    to: to,
    tm: tm,
    keyCode: keyCode,
    sign: md5(app + statKey + from + to + tm + secretKey + keyCode)
  })
};

request(options, function(error, res, body) {
  console.log(body);
});
