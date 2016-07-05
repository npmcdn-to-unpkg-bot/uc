define(['exports', './private/utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = readonly;


  function handleDescriptor(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
  }

  function readonly() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _utils.decorate)(handleDescriptor, args);
  }
});