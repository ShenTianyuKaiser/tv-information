const target = {
  name: 'John',
  age: 30,
};

const handler = {
  get: function(target: any, prop: any, receiver: any) {
    console.log(`Getting ${prop} property`);
    return target[prop];
  },
};

const proxy = new Proxy(target, handler);

console.log(proxy.name);
// 输出：Getting name property
//      John

console.log(proxy.age);
// 输出：Getting age property
//      30
