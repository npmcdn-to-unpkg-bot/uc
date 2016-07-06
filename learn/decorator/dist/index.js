define(['./lib/core-decorators/core-decorators'], function (_coreDecorators) {
  'use strict';

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

  var _desc, _value, _class, _desc2, _value2, _class3, _descriptor, _dec, _dec2, _desc4, _value4, _class6;

  var AutoBind = (_class = function () {
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
  }(), (_applyDecoratedDescriptor(_class.prototype, 'getAuto', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getAuto'), _class.prototype)), _class);

  var autoBind = new AutoBind();
  var getAuto = autoBind.getAuto;

  // 'auto'
  // this 对象，绑定在自己的class上，而不是隐式绑在global/window上
  console.log(getAuto());

  var Meal = (_class3 = function Meal() {
    _classCallCheck(this, Meal);

    _initDefineProp(this, 'entree', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class3.prototype, 'entree', [_coreDecorators.readonly], {
    enumerable: true,
    initializer: function initializer() {
      return 'steak';
    }
  })), _class3);


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
    var _desc3, _value3, _class5;

    var Child = (_class5 = function (_Parent) {
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
    }(Parent), (_applyDecoratedDescriptor(_class5.prototype, 'speak', [_coreDecorators.override], Object.getOwnPropertyDescriptor(_class5.prototype, 'speak'), _class5.prototype)), _class5);
  } catch (e) {
    console.log('override', e);
  }

  var Person = (_dec = (0, _coreDecorators.deprecate)('We stopped facepalmimg'), _dec2 = (0, _coreDecorators.deprecate)('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' }), (_class6 = function () {
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
  }(), (_applyDecoratedDescriptor(_class6.prototype, 'facepalm', [_coreDecorators.deprecate], Object.getOwnPropertyDescriptor(_class6.prototype, 'facepalm'), _class6.prototype), _applyDecoratedDescriptor(_class6.prototype, 'facepalmHard', [_dec], Object.getOwnPropertyDescriptor(_class6.prototype, 'facepalmHard'), _class6.prototype), _applyDecoratedDescriptor(_class6.prototype, 'facepalmHarder', [_dec2], Object.getOwnPropertyDescriptor(_class6.prototype, 'facepalmHarder'), _class6.prototype)), _class6));


  var person = new Person();
  person.facepalm();
  person.facepalmHard();
  person.facepalmHarder();
});