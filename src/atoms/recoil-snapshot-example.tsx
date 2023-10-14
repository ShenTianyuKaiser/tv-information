import { useRecoilState, snapshot_UNSTABLE  } from 'recoil';
import { favoritesAtomRecoil } from "./favorites-recoil";

export function CountRestorer() {
  const [countAtomValue, setCountAtomValue] = useRecoilState(favoritesAtomRecoil);

  const handleClick = async () => {
    const snapshot = snapshot_UNSTABLE();
    const loadable = snapshot.getLoadable(favoritesAtomRecoil);
    console.log(loadable);
    if (loadable.state === 'hasValue') {
      setCountAtomValue(loadable.contents);
    };
  };

  return (
    <div>
      <p>{countAtomValue}</p>
      <button onClick={handleClick}>Update Value From Snapshot</button>
    </div>
  );
}
