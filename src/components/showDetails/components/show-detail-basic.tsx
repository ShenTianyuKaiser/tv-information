import React from "react";
import { ShowInfo } from "../../../types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { PhotoIcon, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useAtom } from "jotai/index";
import { useAtomCallback } from "jotai/utils";
import { favoritesAtom } from "../../../atoms/favorites-jotai";
import { favoritesAtomRecoil } from "../../../atoms/favorites-recoil";
import { useRecoilState } from "recoil";
import { useFavoritesStore } from "../../../store/favorites-store";
import { message } from "antd";


interface ShowDetailBasicProps {
  show: ShowInfo;
}

export const ShowDetailBasic = (props: ShowDetailBasicProps) => {
  const { show } = props;
  const image = show?.image?.medium || '';
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [favoritesRecoil, setFavoritesRecoil] = useRecoilState(favoritesAtomRecoil);
  const favoritesByZustand = useFavoritesStore((state: any) => state.favorites);
  const addFavorite = useFavoritesStore((state: any) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state: any) => state.removeFavorite);
  const isFavorite = favorites.includes(show.id);

  const alartCallback = useAtomCallback((get, set) => {
    const count = get(favoritesAtom);
    message.info(`[Jotai]Favorites updated! Old value is ${JSON.stringify(count)}`);
  });

  return (
    <div className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 cursor-pointer'>
      <div className='flex items-center gap-5'>
        <div className='text-xl font-semibold text-blue-900'>{show.name}</div>
        <div className='flex items-center gap-2 text-sm font-semibold text-blue-600'
             onClick={(e) => {
               e.stopPropagation();

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

               alartCallback();
             }}>
          {isFavorite ? <HeartIconSolid className='h-4 w-4' /> : <HeartIcon className='h-4 w-4' />}
          {show?.rating?.average || 'N/A'}
        </div>
      </div>
      <div className='flex w-full gap-6'>
        {image ? <img className='w-[300px]' src={image} alt='' /> : <PhotoIcon className='w-[300px] text-blue-900' />}
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
      <Link to={show.url}>{show.url}</Link>
    </div>
  );
}
