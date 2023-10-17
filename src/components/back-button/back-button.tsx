import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

export const BackButton = () => {
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
