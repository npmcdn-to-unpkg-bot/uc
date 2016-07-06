'use strict';
import {
  autobind,
  readonly,
  override,
  deprecate,
  decorate
} from './lib/core-decorators/core-decorators';

// @autobind 如果放在class顶部，内置的所有方法，都将绑定this到此对象
class AutoBind {
  name = 'auto';
  @autobind
  getAuto() {
    return this.name;
  }
}
const autoBind = new AutoBind();
const { getAuto } = autoBind;
// 'auto'
// this 对象，绑定在自己的class上，而不是隐式绑在global/window上
console.log(getAuto());


class Meal {
  @readonly
  entree = 'steak';
}

const dinner = new Meal();
try {
  dinner.entree = 'salmon';
} catch(e) {
  console.log('readonly:', e);
}


class Parent {
  speak(first, second) {}
}

try {
  class Child extends Parent {
    // 与 Parent 的参数数量不一致，报错
    // 或者 override 的方法，在 Parent 中不存在，也会报错
    @override
    speak() {}
  }
} catch (e) {
  console.log('override', e);
}


class Person {
  // 标志准备废弃，调用会有警告
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalmimg')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

const person = new Person();
person.facepalm();
person.facepalmHard();
person.facepalmHarder();
