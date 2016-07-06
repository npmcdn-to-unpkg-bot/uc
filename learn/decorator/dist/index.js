define(['./lib/core-decorators/core-decorators'], function (_coreDecorators) {
  'use strict';

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _desc, _value, _class, _dec, _desc2, _value2, _class2, _dec2, _class3, _desc3, _value3, _class4, _descriptor, _dec3, _desc4, _value4, _class6, _desc5, _value5, _class7, _desc6, _value6, _class8, _descriptor2, _dec4, _desc7, _value7, _class10, _dec5, _dec6, _desc8, _value8, _class11, _desc9, _value9, _class13, _desc10, _value10, _class15, _descriptor3, _dec7, _dec8, _desc12, _value12, _class18;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var BaseDescriptor = function () {
    function BaseDescriptor() {
      _classCallCheck(this, BaseDescriptor);
    }

    _createClass(BaseDescriptor, [{
      key: 'foo',
      get: function get() {
        return 'Hello ' + this._foo;
      }
    }]);

    return BaseDescriptor;
  }();

  var ExtendDescriptor = (_class = function (_BaseDescriptor) {
    _inherits(ExtendDescriptor, _BaseDescriptor);

    function ExtendDescriptor() {
      _classCallCheck(this, ExtendDescriptor);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ExtendDescriptor).apply(this, arguments));
    }

    _createClass(ExtendDescriptor, [{
      key: 'foo',
      set: function set(value) {
        this._foo = value;
      }
    }]);

    return ExtendDescriptor;
  }(BaseDescriptor), (_applyDecoratedDescriptor(_class.prototype, 'foo', [_coreDecorators.extendDescriptor], Object.getOwnPropertyDescriptor(_class.prototype, 'foo'), _class.prototype)), _class);

  var eDescriptor = new ExtendDescriptor();
  eDescriptor.foo = 'xxx';
  console.log(eDescriptor.foo);

  // time 修饰器，根据console.time和console.timeEnd输出当前函数运行的耗时
  var Time = (_dec = (0, _coreDecorators.time)('do'), (_class2 = function () {
    function Time() {
      _classCallCheck(this, Time);
    }

    _createClass(Time, [{
      key: 'doSomething',
      value: function doSomething() {}
    }]);

    return Time;
  }(), (_applyDecoratedDescriptor(_class2.prototype, 'doSomething', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'doSomething'), _class2.prototype)), _class2));

  var tt = new Time();
  tt.doSomething();
  tt.doSomething();

  // mixin 可以将几个对象，合并到类的属性中
  var SingerMixin = {
    sing: function sing(sound) {
      console.log(sound);
    }
  };

  var FlyMixin = {
    sing: function sing(sound) {
      console.log('fly sound:' + sound);
    },

    get speed() {
      return 200;
    },
    fly: function fly() {},
    land: function land() {}
  };

  var Bird = (_dec2 = (0, _coreDecorators.mixin)(SingerMixin, FlyMixin), _dec2(_class3 = function () {
    function Bird() {
      _classCallCheck(this, Bird);
    }

    _createClass(Bird, [{
      key: 'singMatingCall',
      value: function singMatingCall() {
        this.sing('tweet tweet');
      }
    }]);

    return Bird;
  }()) || _class3);


  var bird = new Bird();
  bird.singMatingCall();
  console.log('bird fly speed:' + bird.speed);

  // lazyInitialize 修饰器，暂时阻止类的属性初始化
  // 只有当属性被调用时，才会让其初始化
  function createLazyBuffer() {
    console.log('这部分内容，没有被执行');
    return '被延迟执行了';
  }
  function testX(target, key, descriptor) {
    console.log(descriptor);
  }
  var Lazy = (_class4 = function Lazy() {
    _classCallCheck(this, Lazy);

    _initDefineProp(this, 'buffer', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class4.prototype, 'buffer', [_coreDecorators.lazyInitialize], {
    enumerable: true,
    initializer: function initializer() {
      return createLazyBuffer();
    }
  })), _class4);

  // 这里将不会输出
  var lazy = new Lazy();
  // 将会输出
  lazy.buffer;

  // decorate 修饰器，能把某个函数，作为修饰器使用
  // 它的作用，在于获取到指定的方法，然后通过decorate(fn)的fn，对该方法进行重写，或加工
  // 原本的方法，将会替换为 fn 返回的内容
  function decorateCounter(fn) {
    fn.counter = (fn.counter || 0) + 1;
    return fn;
  }
  var Decorate = (_dec3 = (0, _coreDecorators.decorate)(decorateCounter), (_class6 = function () {
    function Decorate() {
      _classCallCheck(this, Decorate);
    }

    _createClass(Decorate, [{
      key: 'doSomething',
      value: function doSomething(key) {
        console.log(this);
      }
    }]);

    return Decorate;
  }(), (_applyDecoratedDescriptor(_class6.prototype, 'doSomething', [_dec3], Object.getOwnPropertyDescriptor(_class6.prototype, 'doSomething'), _class6.prototype)), _class6));

  var ddecorate = new Decorate();
  ddecorate.doSomething(1);
  console.log(ddecorate.doSomething.counter);

  // enumerable 类的方法，默认是不可枚举的
  // 使用修饰器，让类的方法可枚举
  var Enumerable = (_class7 = function () {
    function Enumerable() {
      _classCallCheck(this, Enumerable);
    }

    _createClass(Enumerable, [{
      key: 'pay',
      value: function pay() {}
    }, {
      key: 'eat',
      value: function eat() {}
    }]);

    return Enumerable;
  }(), (_applyDecoratedDescriptor(_class7.prototype, 'eat', [_coreDecorators.enumerable], Object.getOwnPropertyDescriptor(_class7.prototype, 'eat'), _class7.prototype)), _class7);

  // ['eat']
  for (var key in new Enumerable()) {
    console.log('仅仅只有:', key);
  }

  // 如果类的一些属性，不想枚举出，可以使用 nonenumerable 修饰
  var Nonenumerable = (_class8 = function Nonenumerable() {
    _classCallCheck(this, Nonenumerable);

    this.entree = 'steak';

    _initDefineProp(this, 'cost', _descriptor2, this);
  }, (_descriptor2 = _applyDecoratedDescriptor(_class8.prototype, 'cost', [_coreDecorators.nonenumerable], {
    enumerable: true,
    initializer: function initializer() {
      return 20.99;
    }
  })), _class8);

  console.log('看不到cost:', Object.keys(new Nonenumerable()));

  // throttle 阀门，限制了函数，多少秒，可执行一次
  // 默认阀值是 300ms
  // 参数: leading: 默认true，第1次是否立刻执行; trailing: 默认true，是否启动内置的计时器，保证最后1次的执行?
  var Throttle = (_dec4 = (0, _coreDecorators.throttle)(1000, { leading: true, trailing: false }), (_class10 = function () {
    function Throttle() {
      _classCallCheck(this, Throttle);
    }

    _createClass(Throttle, [{
      key: 'hi',
      value: function hi() {
        console.log('throttle hi');
      }
    }]);

    return Throttle;
  }(), (_applyDecoratedDescriptor(_class10.prototype, 'hi', [_dec4], Object.getOwnPropertyDescriptor(_class10.prototype, 'hi'), _class10.prototype)), _class10));

  var throttleInst = new Throttle();
  var throttleTimes = 0;
  // leading: true, trailing: false, 会输出2次
  // leading: true, trailing: true, 会输出3次
  setInterval(function () {
    throttleTimes++;
    if (throttleTimes < 10) {
      throttleInst.hi();
    }
  }, 200);

  // debounce 会延迟执行某个函数，默认是300ms
  // 如果在延迟期间，该函数被再次调用，上一次的调用，将被丢弃，使用最新的调用
  var DeBounce = (_dec5 = (0, _coreDecorators.debounce)(500), _dec6 = (0, _coreDecorators.debounce)(500, true), (_class11 = function () {
    function DeBounce() {
      _classCallCheck(this, DeBounce);

      this.content = '';
    }

    _createClass(DeBounce, [{
      key: 'update',
      value: function update(text) {
        this.content = text;
        console.log(this.content);
      }
    }, {
      key: 'update2',
      value: function update2(text) {
        console.log(text);
      }
    }]);

    return DeBounce;
  }(), (_applyDecoratedDescriptor(_class11.prototype, 'update', [_dec5], Object.getOwnPropertyDescriptor(_class11.prototype, 'update'), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, 'update2', [_dec6], Object.getOwnPropertyDescriptor(_class11.prototype, 'update2'), _class11.prototype)), _class11));

  var deBounce = new DeBounce();
  // 如果没有第2个参数，则最后一次为准，前面的几次调用，将会被忽略
  deBounce.update('first');
  deBounce.update('debouce, 最终，只会输出这里');
  // 如果设置了第2个参数，则以第一次为准，在时间段内，其余的执行，会被忽略
  deBounce.update2('debouce, 只会输出第1次');
  deBounce.update2('second');

  // @autobind 如果放在class顶部，内置的所有方法，都将绑定this到此对象
  var AutoBind = (_class13 = function () {
    function AutoBind() {
      _classCallCheck(this, AutoBind);

      this.name = 'auto';
    }

    _createClass(AutoBind, [{
      key: 'getAuto',
      value: function getAuto() {
        return this.name;
      }
    }]);

    return AutoBind;
  }(), (_applyDecoratedDescriptor(_class13.prototype, 'getAuto', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class13.prototype, 'getAuto'), _class13.prototype)), _class13);

  var autoBind = new AutoBind();
  var getAuto = autoBind.getAuto;

  // 'auto'
  // this 对象，绑定在自己的class上，而不是隐式绑在global/window上
  console.log(getAuto());

  var Meal = (_class15 = function Meal() {
    _classCallCheck(this, Meal);

    _initDefineProp(this, 'entree', _descriptor3, this);
  }, (_descriptor3 = _applyDecoratedDescriptor(_class15.prototype, 'entree', [_coreDecorators.readonly], {
    enumerable: true,
    initializer: function initializer() {
      return 'steak';
    }
  })), _class15);


  var dinner = new Meal();
  try {
    dinner.entree = 'salmon';
  } catch (e) {
    console.log('readonly:', e);
  }

  var Parent = function () {
    function Parent() {
      _classCallCheck(this, Parent);
    }

    _createClass(Parent, [{
      key: 'speak',
      value: function speak(first, second) {}
    }]);

    return Parent;
  }();

  try {
    var _desc11, _value11, _class17;

    var Child = (_class17 = function (_Parent) {
      _inherits(Child, _Parent);

      function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Child).apply(this, arguments));
      }

      _createClass(Child, [{
        key: 'speak',
        value: function speak() {}
      }]);

      return Child;
    }(Parent), (_applyDecoratedDescriptor(_class17.prototype, 'speak', [_coreDecorators.override], Object.getOwnPropertyDescriptor(_class17.prototype, 'speak'), _class17.prototype)), _class17);
  } catch (e) {
    console.log('override', e);
  }

  var Person = (_dec7 = (0, _coreDecorators.deprecate)('We stopped facepalmimg'), _dec8 = (0, _coreDecorators.deprecate)('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' }), (_class18 = function () {
    function Person() {
      _classCallCheck(this, Person);
    }

    _createClass(Person, [{
      key: 'facepalm',
      value: function facepalm() {}
    }, {
      key: 'facepalmHard',
      value: function facepalmHard() {}
    }, {
      key: 'facepalmHarder',
      value: function facepalmHarder() {}
    }]);

    return Person;
  }(), (_applyDecoratedDescriptor(_class18.prototype, 'facepalm', [_coreDecorators.deprecate], Object.getOwnPropertyDescriptor(_class18.prototype, 'facepalm'), _class18.prototype), _applyDecoratedDescriptor(_class18.prototype, 'facepalmHard', [_dec7], Object.getOwnPropertyDescriptor(_class18.prototype, 'facepalmHard'), _class18.prototype), _applyDecoratedDescriptor(_class18.prototype, 'facepalmHarder', [_dec8], Object.getOwnPropertyDescriptor(_class18.prototype, 'facepalmHarder'), _class18.prototype)), _class18));


  var person = new Person();
  person.facepalm();
  person.facepalmHard();
  person.facepalmHarder();
});