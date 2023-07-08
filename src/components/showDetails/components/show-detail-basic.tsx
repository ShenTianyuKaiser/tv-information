import { ShowInfo } from "../../../types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import React from "react";

interface ShowDetailBasicProps {
  show: ShowInfo;
}

export const ShowDetailBasic = (props: ShowDetailBasicProps) => {
  const { show } = props;

  return (
    <div className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 cursor-pointer'>
      <div className='flex items-center gap-5'>
        <div className='text-xl font-semibold text-blue-900'>{show.name}</div>
        <div className='flex items-center gap-2 text-sm font-semibold text-blue-600'>
          <HeartIcon className='h-4 w-4' />
          {show.rating.average || 'N/A'}
        </div>
      </div>
      <div className='flex w-full gap-6'>
        <img className='w-[300px]' src={show.image.medium || ''} alt='' />
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
