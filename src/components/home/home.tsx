import {useEffect, useState} from "react";
import { useListShows } from "../../hooks/useShow";
import { Pagination, Spin } from "antd";
import { useScroll } from "ahooks";
import { ShowCard } from "./components/show-card";
import { ShowInfo } from "../../types";
import { BackToTopButton } from "../backToTop/back-to-top-button";
import {useRecoilValue} from "recoil";
import {favoritesSelector} from "../../atoms/favorites-recoil";

const PAGE_SIZE = 10;

export const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const {data, isInitialLoading, isError} = useListShows();
  const showList = (data?.data || []).filter((item: any) => (item?.name).toLowerCase().includes(query.toLowerCase()));
  const scroll = useScroll(document);
  const top = scroll?.top || 0;
  const favoritesInfo = useRecoilValue(favoritesSelector);

  useEffect(() => {
    setPage(1);
  }, [query]);

  if (isError) {
    return (
      <div className='flex h-full w-full flex-col p-6'>
        <div className='text-3xl text-blue-600 font-semibold '>TV Information List</div>
        <div className='text-xl text-red-600 font-semibold '>Error occurred while loading data</div>
      </div>
    );
  }

  return (
    <Spin spinning={isInitialLoading}>
      <div className='flex h-full w-full flex-col p-6'>
        {/*title*/}
        <div className='flex items-center gap-4'>
          <div className='text-3xl text-blue-600 font-semibold '>TV Information List</div>
          <div className='text-sm text-blue-400 font-normal'>{favoritesInfo}</div>
        </div>

        {/*search*/}
        <div className='flex w-full justify-between items-center mt-4'>
          <input
            className='flex h-[40px] flex-row items-center justify-center gap-[10px] rounded border border-gray-300 px-[15px] py-[6px]'
            placeholder='Search TV show'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/*list*/}
          {showList
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            .map((item: ShowInfo, index: number) => {
            return (
              <ShowCard key={index} show={item} />
            );
          }
        )}

        {/*pagination*/}
        <div className='pt-6'>
          <Pagination
            defaultCurrent={1}
            total={showList.length}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
            onChange={(page)=>{
            setPage(page);
          }} />
        </div>

        {/*scroll to top*/}
        {top > 100 && <BackToTopButton />}
      </div>
    </Spin>
  );
}
