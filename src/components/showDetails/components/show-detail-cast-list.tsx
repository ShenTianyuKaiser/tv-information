import React from "react";
import { ShowDetailCastItem } from "./show-detail-cast-item";
import {ShowCast} from "../../../types";

interface ShowDetailCastListProps {
  showCastList: ShowCast[];
}

export const ShowDetailCastList = (props: ShowDetailCastListProps) => {
  const { showCastList } = props;

  return (
    <div className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 text-blue-900'>
      <div className='text-xl font-semibold text-blue-900'>Cast</div>
      <div className='flex flex-col w-full gap-4'>
        {showCastList?.map((item: ShowCast, index: number) => {
            return (
              <ShowDetailCastItem showCast={item} key={index} />
            );
          }
        )}
      </div>
    </div>
  );
}
