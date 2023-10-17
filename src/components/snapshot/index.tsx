import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  snapshot_UNSTABLE,
  useRecoilSnapshot,
  useRecoilCallback, useGotoRecoilSnapshot
} from 'recoil';
import {useEffect, useState} from "react";
import {BackButton} from "../back-button/back-button";

const countAtom = atom({
  key: 'count',
  default: 0,
})

const Observer = () => {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(node.key, snapshot.getLoadable(node).contents);
    }
  }, [snapshot]);

  return null;
}

const Counter = () => {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div className='flex flex-col items-center'>
      <p className='flex items-center gap-4'>Count: {count}<Dumper /></p>
      <button className='border border-blue-300 rounded px-4 py-2'
              onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

const Dumper = () => {
  const onClick = useRecoilCallback(({snapshot}) => async () => {
    console.log('Atom values:');
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node);
      console.log(node.key, value);
    }
  }, []);

  return <button className='border border-blue-300 rounded px-4 py-2' onClick={onClick}>Dump State</button>
}

const TimeTravel = () => {
  const [snapshots, setSnapshots] = useState<any[]>([]);

  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    if (snapshots.every(s => s.getID() !== snapshot.getID())) {
      setSnapshots([...snapshots, snapshot]);
    }
  }, [snapshot]);

  const gotoSnapshot = useGotoRecoilSnapshot();

  return (
    <ol>
      {snapshots.map((snapshot, i) => (
        <li className='flex items-center gap-10 p-2' key={i}>
          <p className='w-full h-full flex my-auto'>Snapshot Value {i}</p>
          <button className='border border-blue-300 rounded px-4 py-2'
                  onClick={() => gotoSnapshot(snapshot)}>
            Restore
          </button>
        </li>
      ))}
    </ol>
  );
}

export const Snapshot = () => {
  return (
    <div className='p-6 flex flex-col items-center gap-10'>
      <BackButton />
      <Observer />
      <Counter />
      <TimeTravel />
    </div>
  );
}
