import { atomFamily, useRecoilState } from 'recoil';

// 定义一个原子族
const counterAtomFamily = atomFamily({
  key: 'counterAtomFamily',
  default: 0,
});

export function Counter({ index }: {index: number}) {
  const [count, setCount] = useRecoilState(counterAtomFamily(index));

  return (
    <div>
      <p>Count {index}: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter index={1} />
      <Counter index={2} />
      <Counter index={3} />
    </div>
  );
}
