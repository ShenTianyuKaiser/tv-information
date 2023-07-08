import React from "react";
import { useGetShow, useGetShowCast } from "../../hooks/useShow";
import { Spin } from "antd";
import { useScroll } from "ahooks";
import { useParams } from "react-router-dom";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import { ShowDetailBasic } from "./components/show-detail-basic";
import { ShowDetailCastList } from "./components/show-detail-cast-list";
import { BackToTopButton } from "../backToTop/back-to-top-button";

export const ShowDetails = () => {
  const { detailId } = useParams();
  const { data: showData, isInitialLoading: isShowLoading, isError: isShowError } = useGetShow({detailId});
  const { data: showCastData, isInitialLoading: isCastLoading, isError: isCastError } = useGetShowCast({detailId});
  const show = showData?.data;
  const showCast = showCastData?.data;
  const scroll = useScroll(document);
  const top = scroll?.top || 0;

  if (isShowError || isCastError) {
    return (
      <div className='flex h-full w-full flex-col p-6 gap-6'>
        <BackButton />
        <div className='text-3xl text-blue-600 font-semibold '>TV Show Detail</div>
        <div className='text-xl text-red-600 font-semibold '>Error occurred while loading data</div>
      </div>
    );
  }

  return (
    <Spin spinning={isShowLoading || isCastLoading}>
      {show ? <div className='flex h-full w-full flex-col p-6 gap-5'>
          {/*back button*/}
          <BackButton />

          {/*show details*/}
          <ShowDetailBasic show={show} />

          {/*show cast*/}
          <ShowDetailCastList showCastList={showCast} />

          {/*scroll to top*/}
          {top > 100 && <BackToTopButton />}
        </div>
        :
        <div className='h-full w-full'></div>
      }
    </Spin>
  );
}

const BackButton = () => {
  return (
    <button
      className='flex h-[40px] w-[100px] flex-row items-center justify-center gap-[10px] rounded border border-gray-300 px-[15px] py-[6px] text-blue-600'
      onClick={() => window.history.back()}
    >
      <ChevronDoubleLeftIcon className='h-4 w-4' />
      Back
    </button>
  );
}
