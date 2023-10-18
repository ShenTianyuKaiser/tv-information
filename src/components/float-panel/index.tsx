import { useAtom } from "jotai";
import { favoritesAtom } from "../../atoms/favorites-jotai";
import { favoritesAtomRecoil } from "../../atoms/favorites-recoil";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useFavoritesStore } from "../../store/favorites-store";

export const FloatPanel = () => {
  const [favorites] = useAtom(favoritesAtom);
  const favoritesRecoil = useRecoilValue(favoritesAtomRecoil);
  const favoritesByZustand = useFavoritesStore((state: any) => state.favorites);

  return <div className="absolute w-80 h-20 top-10 right-10 border border-blue-100 bg-blue-50 rounded flex flex-col items-center justify-center text-blue-800">
    <div>Favorites:</div>
    <div>Favorites from jotai: {favorites.join(', ')}</div>
    <div>Favorites from recoil: {favoritesRecoil.join(', ')}</div>
    <div>Favorites from zustand: {favoritesByZustand.join(', ')}</div>
  </div>
}
