import { produce } from 'immer';

const originalData = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    state: 'NY',
  },
};

// 使用Immer创建新的不可变数据
const newData = produce(originalData, (draft) => {
  draft.age = 31;
  draft.address.city = 'San Francisco';
});

console.log(originalData);
// 输出：{ name: 'John', age: 30, address: { city: 'New York', state: 'NY' } }

console.log(newData);
// 输出：{ name: 'John', age: 31, address: { city: 'San Francisco', state: 'NY' } }
