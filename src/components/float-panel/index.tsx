import { useAtom } from "jotai";
import { favoritesAtom } from "../../atoms/favorites";

export const FloatPanel = () => {
  const [favorites] = useAtom(favoritesAtom);

  return <div className="absolute w-80 h-20 top-10 right-10 border border-blue-100 bg-blue-50 rounded flex items-center justify-center text-blue-800">Favorites count: {favorites.length}</div>
}
