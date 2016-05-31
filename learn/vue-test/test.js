'use strict';

const vm = new Vue({
  el: '#parent',
  data: {
    name: 'test1',
    componentMap: { },
    shares: { x: 1 },
    components: {
      test1: {
        show: true,
        component: Vue.extend({
          template: '<div>测试1 <a href="javascript:;" @click="parent.switchTo(\'test2\')">{{text}}</a>{{ test() }}</div>',
          data: function(){
            return {
              parent: 123,
              text: '切换过去'
            };
          },
          methods: {
            test: function(){
              return 123;
            }
          }
        })
      },
      test2: {
        show: false,
        component: Vue.extend({
          template: '<div>测试2<a href="javascript:;" @click="parent.switchTo(\'test1\')">切换1</a>{{ text }}</div>',
          data: function(){
            return {
              text: '哈哈'
            };
          },
          ready: function(){
            this.shares.y = 1;
          }
        })
      }
    }
  },
  methods: {
    getRoot: function(){
      var root = this;
      while(root.parent) {
        root = root.parent;
      }
      return root;
    },
    switchTo: function(name, data){
      var components = this.components;

      Object.keys(components).forEach(function(key, index){
        var item = components[key];
        if (key === name) {
          if (!item.$vm) {
            item.$vm = new item.component({
              el: '#' + item.id,
              data: {
                componentName: key,
                shares: this.getRoot().shares,
                root: this.getRoot(),
                parent: this,
              },
              methods: {
                // 获得根目录
                getRoot: this.getRoot.bind(this),
                // 进入视线
                onEnter: function(){
                  console.log(this.componentName + '进入视窗');
                },
                // 查找组件
                queryComponent: function(name){
                  var map = this.getRoot().componentMap;
                  var target = map[name];
                  return target && target.$vm
                },
                // 查找兄弟
                siblings: function(){
                  // TODO @bug 父亲不一定拥有 components 属性
                  var componentName = this.componentName;
                  var parent = this.parent;
                  var sibs = [ ];
                  Object.keys(parent.components).forEach(function(key){
                    if (key !== componentName) {
                      var vm = this.queryComponent(key);
                      vm && sibs.push(vm);
                    }
                  }.bind(this));
                  return sibs;
                },
                // 删除本组件
                destroy: function(){
                  // 从 map 中删除
                  var item = this.getRoot().componentMap[this.componentName];
                  delete item.$vm;
                  this.$destroy();
                }
              }
            });
          };
          this.componentMap[key] = item;
          item.$vm.onEnter();
          item.show = true;
        } else {
          item.show = false;
        }
      }.bind(this));
    }
  },
  ready: function(){
    var id = 10000;
    var components = this.components;
    var shouldShowComponentName = '';

    // 初始化所有组件 {} -> {$el, $vm, id,}
    Array.from(this.$el.querySelectorAll('.component')).forEach(function(el, index){
      var elId = 'test-' + id++;
      el.setAttribute('id', elId);

      var name = el.dataset.name;
      var item = components[name];
      item.$el = el;
      item.id = elId;
      if (item.show) {
        shouldShowComponentName = name;
      }
    }.bind(this));

    this.switchTo(shouldShowComponentName);
  }
});
