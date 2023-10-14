import { useAtom } from "jotai";
import { favoritesAtom } from "../../atoms/favorites-jotai";
import { favoritesAtomRecoil } from "../../atoms/favorites-recoil";
import { useRecoilValue } from "recoil";
// import { CountRestorer } from "../../atoms/recoil-snapshot-example";

export const FloatPanel = () => {
  const [favorites] = useAtom(favoritesAtom);
  const favoritesRecoil = useRecoilValue(favoritesAtomRecoil);

  return <div className="absolute w-80 h-20 top-10 right-10 border border-blue-100 bg-blue-50 rounded flex flex-col items-center justify-center text-blue-800">
    <div>Favorites:</div>
    <div>Favorites count from jotai: {favorites.length}</div>
    <div>Favorites count from recoil: {favoritesRecoil.length}</div>
    {/*<CountRestorer />*/}
  </div>
}
