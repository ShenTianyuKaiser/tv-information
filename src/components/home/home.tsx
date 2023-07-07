import { useState } from "react";
import { useListShows } from "../../hooks/useShow";
import { Pagination, Spin } from "antd";
import {Link} from "react-router-dom";
import { HeartIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

export const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const {data, isInitialLoading} = useListShows();
  const showList = (data?.data || []).filter((item: any) => (item?.name).toLowerCase().includes(query.toLowerCase()));

  return (
    <Spin spinning={isInitialLoading}>
      <div className='flex h-full w-full flex-col p-6'>
        {/*title*/}
        <div className='text-3xl text-blue-600 font-semibold '>TV Information List</div>
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
            .map((item: any, index: number) => {
            return (
              <Link to={`showDetails/${item.id}`} >
                <div key={index} className='flex flex-col w-full bg-white shadow-md rounded-md p-4 mt-4 gap-4 cursor-pointer'>
                  <div className='flex items-center gap-5'>
                    <div className='text-xl font-semibold text-blue-900'>{item?.name}</div>
                    <div className='flex items-center gap-2 text-sm font-semibold text-blue-600'>
                      <HeartIcon className='h-4 w-4' />
                      {item?.rating.average || 'N/A'}
                    </div>
                  </div>
                  <div className='flex w-full gap-6'>
                      <img className='w-[100px]' src={item.image.medium || ''} alt='' />
                      <div
                        className='text-sm text-blue-300'
                        dangerouslySetInnerHTML={{ __html: item.summary }}
                      />
                  </div>
                  <div className='flex w-full gap-10 text-blue-600'>
                      <div className='text-sm font-semibold'>{item.language}</div>
                      <div className='text-sm font-semibold'>{item.premiered}</div>
                      <div className='text-sm font-semibold'>{item.genres.join(', ')}</div>
                  </div>
                </div>
              </Link>
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
      </div>
    </Spin>
  );
}
