import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useListShows = () =>{
  return useQuery(
    ['listShows'],
    async () => {
      try {
        const result = await axios.get(`https://api.tvmaze.com/shows`);
        return result;
      } catch (err: any) {
        console.error('error code', err.code);
        console.error('error message', err.message);
        throw new Error('Error calling the GRPC API');
      }
    },
    { staleTime: 0 },
  );
}

export const useGetShow = ({ detailId }:{ detailId: string | undefined }) =>{
  return useQuery(
    ['getShow',detailId],
    async () => {
      try {
        const result = await axios.get(`https://api.tvmaze.com/shows/${detailId}`);
        return result;
      } catch (err: any) {
        console.error('error code', err.code);
        console.error('error message', err.message);
        throw new Error('Error calling the GRPC API');
      }
    },
    { staleTime: 0, enabled: !!detailId },
  );
}

export const useGetShowCast = ({ detailId }:{ detailId: string | undefined }) =>{
  return useQuery(
    ['getShowCast',detailId],
    async () => {
      try {
        const result = await axios.get(`https://api.tvmaze.com/shows/${detailId}/cast`);
        return result;
      } catch (err: any) {
        console.error('error code', err.code);
        console.error('error message', err.message);
        throw new Error('Error calling the GRPC API');
      }
    },
    { staleTime: 0, enabled: !!detailId },
  );
}
