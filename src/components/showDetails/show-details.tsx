import { useGetShow, useGetShowCast } from "../../hooks/useShow";
import { Spin } from "antd";
import {Link, useParams} from "react-router-dom";
import { HeartIcon } from '@heroicons/react/24/outline';
import React from "react";

export const ShowDetails = () => {
  const { detailId } = useParams();
  const { data: showData, isInitialLoading: isShowLoading} = useGetShow({detailId});
  const { data: showCastData, isInitialLoading: isCastLoading } = useGetShowCast({detailId});
  const show = showData?.data;
  const showCast = showCastData?.data;

  return (
    <Spin spinning={isShowLoading || isCastLoading}>
      <div className='flex h-full w-full flex-col p-6 gap-5'>
        {/*back button*/}
        <div className='flex w-full justify-between items-center mt-4'>
          <button
            className='flex h-[40px] flex-row items-center justify-center gap-[10px] rounded border border-gray-300 px-[15px] py-[6px]'
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>

        {/*show details*/}
        <div className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 cursor-pointer'>
          <div className='flex items-center gap-5'>
            <div className='text-xl font-semibold text-blue-900'>{show?.name}</div>
            <div className='flex items-center gap-2 text-sm font-semibold text-blue-600'>
              <HeartIcon className='h-4 w-4' />
              {show?.rating.average || 'N/A'}
            </div>
          </div>
          <div className='flex w-full gap-6'>
            <img className='w-[300px]' src={show?.image.medium || ''} alt='' />
            <div
              className='text-sm text-blue-300'
              dangerouslySetInnerHTML={{ __html: show?.summary }}
            />
          </div>
          <div className='flex w-full gap-10 text-blue-600'>
            <div className='text-sm font-semibold'>{show?.language}</div>
            <div className='text-sm font-semibold'>{show?.premiered}</div>
            <div className='text-sm font-semibold'>{show?.genres.join(', ')}</div>
          </div>
          <Link to={show?.url}>{show?.url}</Link>
        </div>

        {/*show cast*/}
        <div className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 text-blue-900'>
          <div className='text-xl font-semibold text-blue-900'>Cast</div>
          <div className='flex flex-col w-full gap-4'>
            {showCast?.map((item: any, index: number) => {
              return (
                <div className='flex w-full gap-6' key={index}>
                  <img className='w-[100px]' src={item.person.image.medium} alt='' />
                  <div className='flex flex-col w-full gap-2'>
                    <div className='text-sm font-semibold'>{item.person.name}</div>
                    <div className='text-sm font-semibold'>{item.character.name}</div>
                  </div>
                </div>
              );
            }
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
}
