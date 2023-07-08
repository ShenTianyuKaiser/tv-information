import React from "react";
import { ShowCast } from "../../../types";

interface ShowDetailCastItemProps {
  showCast: ShowCast;
}

export const ShowDetailCastItem = (props: ShowDetailCastItemProps) => {
  const { showCast } = props;

  return (
    <div className='flex w-full gap-6'>
      <img className='w-[100px]' src={showCast.person.image.medium} alt='' />
      <div className='flex flex-col w-full gap-2'>
        <div className='text-sm font-semibold'>{showCast.person.name}</div>
        <div className='text-sm font-semibold'>{showCast.character.name}</div>
      </div>
    </div>
  );
}
