import { ShowInfo } from "../../../types";
import { HeartIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { useRecoilState } from "recoil";
import { favoritesAtom } from "../../../atoms/favorites-jotai";
import { favoritesAtomRecoil } from "../../../atoms/favorites-recoil";
import { useAtomCallback } from "jotai/utils";
import {FavoritesStore, useFavoritesStore} from "../../../store/favorites-store";

interface ShowCardProps {
  show: ShowInfo;
}

export const ShowCard = (props: ShowCardProps) => {
  const { show } = props;
  const image = show?.image?.medium || '';
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [favoritesRecoil, setFavoritesRecoil] = useRecoilState(favoritesAtomRecoil);
  const favoritesByZustand = useFavoritesStore((state: any) => state.favorites);
  const addFavorite = useFavoritesStore((state: any) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state: any) => state.removeFavorite);
  const isFavorite = favorites.includes(show.id);

  // const alartCallback = useAtomCallback((get, set) => {
  //   const count = get(favoritesAtom);
  //   alert(`[Jotai]Favorites updated! Old value is ${JSON.stringify(count)}, new value is ${JSON.stringify([...count, show.id])}`);
  // });

  return (
    <Link to={`showDetails/${show.id}`} >
      <div className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 cursor-pointer'>
        <div className='flex items-center gap-5'>
          <div className='text-xl font-semibold text-blue-900'>{show.name}</div>
          <div className='flex items-center gap-2 text-sm font-semibold text-blue-600'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // alartCallback();

              //Jotai
              setFavorites((favorites)=>{
                return isFavorite ? favorites.filter((id) => id !== show.id) : [...favorites, show.id];
              })

              //Recoil
              setFavoritesRecoil((favorites)=>{
                return isFavorite ? favorites.filter((id) => id !== show.id) : [...favorites, show.id];
              })

              //Zustand
              if (favoritesByZustand.includes(show.id)) {
                removeFavorite(show.id);
              } else {
                addFavorite(show.id);
              }

              console.log("change favorites counts");
            }}>
            {isFavorite ? <HeartIconSolid className='h-4 w-4' /> : <HeartIcon className='h-4 w-4' />}
            {show?.rating?.average || 'N/A'}
          </div>
        </div>
        <div className='flex w-full gap-6'>
          {image ? <img className='w-[100px]' src={image} alt='' /> : <PhotoIcon className='w-[100px] text-blue-900' />}
          <div
            className='text-sm text-blue-300'
            dangerouslySetInnerHTML={{ __html: show.summary }}
          />
        </div>
        <div className='flex w-full gap-10 text-blue-600'>
          <div className='text-sm font-semibold'>{show.language}</div>
          <div className='text-sm font-semibold'>{show.premiered}</div>
          <div className='text-sm font-semibold'>{show.genres.join(', ')}</div>
        </div>
      </div>
    </Link>
  );
}
