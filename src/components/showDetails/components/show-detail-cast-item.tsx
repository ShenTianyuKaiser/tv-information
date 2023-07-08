import React from "react";
import { ShowCast } from "../../../types";
import { UserIcon } from "@heroicons/react/24/solid";

interface ShowDetailCastItemProps {
  showCast: ShowCast;
}

export const ShowDetailCastItem = (props: ShowDetailCastItemProps) => {
  const { showCast } = props;
  const image = showCast?.person?.image?.medium || '';

  return (
    <div className='flex w-full gap-6'>
      {image ? <img className='w-[100px]' src={image} alt='' /> : <UserIcon className='w-[100px]' />}
      <div className='flex flex-col w-full gap-2'>
        <div className='text-sm font-semibold'>{showCast?.person?.name}</div>
        <div className='text-sm font-semibold'>{showCast?.character?.name}</div>
      </div>
    </div>
  );
}
