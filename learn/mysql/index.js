'use strict';
const Pool = require('./poolCreator');
const pool = new Pool({
  database: 'off_messages'
});

// pool.query('select * from messages').then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });

// pool.query('delete from messages where msg_id=?', [1463994757317]).then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });

// pool.query(
//     'insert into messages(msg_id,remind_time,name) values(?,?,?)',
//     [new Date/1, '2016-05-11 13:40', '雷x熊外传']
//   )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//       console.log(err);
//   });

// pool.query(
//     'Update messages Set name="雷x熊外传2" Where msg_id=1463996166672'
//   )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//       console.log(err);
//   });

// const mysql = require('mysql');
// const DataBase = 'off_messages';
// const Table = 'messages';
//
// // 创建链接
// const connection = mysql.createConnection({
//   host: '70.39.184.79',
//   port: '8013',
//   user: 'root',
//   password: '9628ffaecf05013841852cb572d50d45',
//   database: DataBase
// });
//
// connection.connect();
// const addSql = `Insert into messages(msg_id,remind_time,name) values (?,?,?)`;
// const addParams = [new Date/1, '2016-05-24 12:00', 'test1'];
//
// connection.query(
//   addSql,
//   addParams,
//   function cb(err, results, flieds) {
//     if (err) {
//       throw err;
//     }
//     console.log('Insert Id:', results);
//   }
// );
// connection.end();

// client.query(
//   `Select * from ${Table}`,
//   function selectCb(err, results, fields) {
//     if (err) {
//       throw err;
//     }
//     if (results) {
//       console.log(results);
//     }
//     client.end();
//   }
// );
