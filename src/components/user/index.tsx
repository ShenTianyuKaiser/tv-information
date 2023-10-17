import React, { useEffect, useState } from "react";
import { useDeleteUser, useListUsers, useRegister} from "../../hooks/useUser";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Button, message } from "antd";
import { useQueryClient } from '@tanstack/react-query'
import {BackButton} from "../back-button/back-button";


export const Users = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [filter, setFilter] = useState('')
  const { data, isFetching } = useListUsers( page, pageSize);
  const { total, data: userList } = data || {};
  const {
    mutateAsync: createUser,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    error: createError
  } = useRegister();
  const {
    mutateAsync: deleteUser,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    error: deleteError
  } = useDeleteUser();

  useEffect(() => {
    if (isCreateSuccess) {
      message.success('创建成功');
      queryClient.invalidateQueries(['listUser']);
    }
    if (isCreateError) {
      message.error(`创建失败: ${(createError as any).message}`);
    }
  }, [isCreateSuccess, isCreateError, createError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      message.success('删除成功');
      queryClient.invalidateQueries(['listUser']);
    }
    if (isDeleteError) {
      message.error(`删除失败: ${(deleteError as any).message}`);
    }
  }, [isDeleteSuccess, isDeleteError, deleteError]);

  if (isFetching) {
    return <div>loading...</div>
  }

  const randomName = (): string => {
    let count = 16;
    let hex3 = 0x3;
    let hex8 = 0x8;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * count) | 0;
      const v = c == 'x' ? r : (r & hex3) | hex8;
      return v.toString(count);
    });
  }

  return (
    <div>
      <div className='p-6 flex flex-col flex-wrap gap-2'>
        <BackButton />
        <Button className='w-40' onClick={()=>{
          createUser({
            email: 'eve.holt@reqres.in',
            password: 'pistol'
          })
        }}>创建随机用户</Button>
        {userList?.filter((user: any) => {
          return user.id !== filter
        }).map((user: any) => (
          <div className='p-4 w-4/5 border border-blue-300 rounded' key={user.id}>
            <div className='flex justify-between items-center'>
              <p className='flex gap-4'>
                <span className='text-blue-500'>{user.id}</span>
                <strong>{user.first_name}</strong>
              </p>
              <div onClick={() => {
                deleteUser({id: user.id}, {
                  onSuccess: () => {
                    setFilter(user.id)
                  }
                });
              }}>
                <XCircleIcon className='h-6 w-6 text-red-500 cursor-pointer' />
              </div>
            </div>
            <p>{user.email}</p>
            <img className='inline-block max-w-full' key={user.avatar} src={user.avatar} />
          </div>
        ))}
      </div>
      <div className='px-6 flex gap-10'>
        <button style={{color: page === 1 ? '#989898': '#000'}} onClick={() => setPage(page - 1)} disabled={page === 1}>上一页</button>
        <button style={{color: page === Math.ceil(total / pageSize) ? '#989898': '#000'}} onClick={() => setPage(page + 1)} disabled={page === Math.ceil(total / pageSize)}>下一页</button>
      </div>
    </div>
  )
}
