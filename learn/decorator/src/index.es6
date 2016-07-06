'use strict';
import {
  extendDescriptor,
  time,
  mixin,
  lazyInitialize,
  decorate,
  enumerable,
  nonenumerable,
  throttle,
  debounce,
  autobind,
  readonly,
  override,
  deprecate,
} from './lib/core-decorators/core-decorators';


// extendDescriptor 可以把两个类的某个函数的描述符，合并为1个
class BaseDescriptor {
  get foo() {
    return `Hello ${this._foo}`;
  }
}
class ExtendDescriptor extends BaseDescriptor {
  // set foo() 和 get foo() 合并
  // 否则光有 set foo()，没有 get foo() 将获取不到任何内容
  @extendDescriptor
  set foo(value) {
    this._foo = value;
  }
}
const eDescriptor = new ExtendDescriptor();
eDescriptor.foo = 'xxx';
console.log(eDescriptor.foo);


// time 修饰器，根据console.time和console.timeEnd输出当前函数运行的耗时
class Time {
  @time('do')
  doSomething() {

  }
}
const tt = new Time();
tt.doSomething();
tt.doSomething();


// mixin 可以将几个对象，合并到类的属性中
const SingerMixin = {
  sing(sound) {
    console.log(sound);
  }
};

const FlyMixin = {
  // 这个后面声明的，将会被忽略掉哦..
  sing(sound) {
    console.log('fly sound:' + sound);
  },
  get speed() {
    return 200;
  },
  fly() {},
  land() {},
};

@mixin(SingerMixin, FlyMixin)
class Bird {
  singMatingCall() {
    this.sing('tweet tweet');
  }
}

const bird = new Bird();
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
class Lazy {
  @lazyInitialize
  buffer = createLazyBuffer();
}
// 这里将不会输出
const lazy = new Lazy();
// 将会输出
lazy.buffer;



// decorate 修饰器，能把某个函数，作为修饰器使用
// 它的作用，在于获取到指定的方法，然后通过decorate(fn)的fn，对该方法进行重写，或加工
// 原本的方法，将会替换为 fn 返回的内容
function decorateCounter(fn) {
  fn.counter = (fn.counter || 0) + 1;
  return fn;
}
class Decorate {
  @decorate(decorateCounter)
  doSomething(key) {
    console.log(this);
  }
}
const ddecorate = new Decorate();
ddecorate.doSomething(1);
console.log(ddecorate.doSomething.counter);


// enumerable 类的方法，默认是不可枚举的
// 使用修饰器，让类的方法可枚举
class Enumerable {
  pay() {}
  @enumerable
  eat() {}
}
// ['eat']
for (var key in new Enumerable()) {
  console.log('仅仅只有:', key);
}


// 如果类的一些属性，不想枚举出，可以使用 nonenumerable 修饰
class Nonenumerable {
  entree = 'steak';
  @nonenumerable
  cost = 20.99;
}
console.log('看不到cost:', Object.keys(new Nonenumerable));



// throttle 阀门，限制了函数，多少秒，可执行一次
// 默认阀值是 300ms
// 参数: leading: 默认true，第1次是否立刻执行; trailing: 默认true，是否启动内置的计时器，保证最后1次的执行?
class Throttle {
  @throttle(1000, { leading: true, trailing: false })
  hi() {
    console.log('throttle hi');
  }
}
const throttleInst = new Throttle();
let throttleTimes = 0;
// leading: true, trailing: false, 会输出2次
// leading: true, trailing: true, 会输出3次
setInterval(() => {
  throttleTimes++;
  if (throttleTimes < 10) {
    throttleInst.hi();
  }
}, 200);


// debounce 会延迟执行某个函数，默认是300ms
// 如果在延迟期间，该函数被再次调用，上一次的调用，将被丢弃，使用最新的调用
class DeBounce {
  content = '';
  @debounce(500)
  update(text) {
    this.content = text;
    console.log(this.content);
  }
  @debounce(500, true)
  update2(text) {
    console.log(text);
  }
}
const deBounce = new DeBounce();
// 如果没有第2个参数，则最后一次为准，前面的几次调用，将会被忽略
deBounce.update('first');
deBounce.update('debouce, 最终，只会输出这里');
// 如果设置了第2个参数，则以第一次为准，在时间段内，其余的执行，会被忽略
deBounce.update2('debouce, 只会输出第1次');
deBounce.update2('second');


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
