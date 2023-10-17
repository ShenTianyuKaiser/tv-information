import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios"

const API_PREFIX = 'https://reqres.in/api/'

export const useListUsers = (page: number = 1, pageSize: number = 10) => {
  return useQuery(
    ['listUser', page, pageSize],
    async () => {
      try {
        const result = await axios.get(
          `${API_PREFIX}users?page=${page}&per_page=${pageSize}`
        )
        return result.data;
      } catch (err: any) {
        console.error('error code', err.code)
        console.error('error message', err.message)
        throw new Error('Error calling the GRPC API')
      }
    },
    { cacheTime: Infinity }
  )
}

export const useCreateUser = () => {
  return useMutation(
    async ({ name, job }: { name: string, job: string }) => {
      try {
        await axios.post(`${API_PREFIX}users`, {
          name,
          job,
        })
      } catch (error: any) {
        console.log('error code: ', error.code);
        console.log('error message: ', error.message);
        throw new Error('Error calling the GRPC API');
      }
    }
  );
}

export const useRegister = () => {
  return useMutation(
    async ({ email, password }: { email: string, password: string }) => {
      try {
        await axios.post(`${API_PREFIX}register`, {
          email,
          password,
        })
      } catch (error: any) {
        console.log('error code: ', error.code);
        console.log('error message: ', error.message);
        throw new Error('Error calling the GRPC API');
      }
    }
  );
}

export const useDeleteUser = () => {
  return useMutation(
    async ({ id }: { id:number }) => {
      try {
        await axios.delete(`${API_PREFIX}users/${id}`)
      } catch (error: any) {
        console.log('error code: ', error.code);
        console.log('error message: ', error.message);
        throw new Error('Error calling the GRPC API');
      }
    }
  );
}
