'use strict';

const mysql = require('mysql');

class Pool {
  constructor(options) {
    this.pool = mysql.createPool({
      host: '70.39.184.79',
      port: '8013',
      user: 'root',
      password: '9628ffaecf05013841852cb572d50d45',
      database: 'off_messages'
    });
  }
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          return reject(err);
        }

        const cb = function sqlCb(err, results, fields){
          conn.release();
          if (err) {
            reject(err);
          } else {
            resolve(results, fields);
          }
        };

        if (params) {
          conn.query(sql, params, cb);
        } else {
          conn.query(sql, cb);
        }
      });
    });
  }
};

module.exports = Pool;
