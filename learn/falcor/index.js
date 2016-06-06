'use strict';

const falcorExpress = require('falcor-express');
const Router = require('falcor-router');
const express = require('express');
const app = express();

// app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
//   return new Router([
//     {
//       // 路由名字
//       route: 'greeting',
//       get() {
//         return {
//           path: ['greeting'],
//           value: 'Hello World'
//         };
//       }
//     }
//   ]);
// }));

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      // match a request for the key "greeting"
      route: "greeting",
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return {path:["greeting"], value: "Hello World"};
      }
    },
    {
      route: 'user["name","address"]',
      get: function(pathSet) {
        console.log(pathSet); // pathSet -> [ 'user', ['name', 'address'] ]
        const user = { id: 'admin', name: '宗熊', address: '哈哈' };
        // 如果添加了多余的数据，虽然也会返回，但会被前端的框架，给拦截掉
        return pathSet[1].map(key => {
          return {
            path: ['user', key],
            value: user[key]
          }
        }).concat([{
          path: ['user', 'id'],
          value: 10001
        }]);
      }
    },
    {
      route: 'todos[{integers:indexs}]["name"]',
      get: function(pathSet) {
        console.log(pathSet);
        console.log(pathSet.indexs);

        const todos = [
          { name: 'todo1' },
          { name: 'todo2' },
          { name: 'todo3' }
        ];

        return pathSet.indexs.map(index => {
          return {
            path: ['todos', index, 'name'],
            value: todos[index].name
          };
        });
      }
    }
  ]);
}));

app.use(express.static(__dirname + '/'));

const server = app.listen(3000);
