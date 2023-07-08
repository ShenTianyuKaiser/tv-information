import {ChevronDoubleUpIcon} from "@heroicons/react/24/outline";

export const BackToTopButton = () => {
  return (
    <div className='fixed bottom-4 right-4'>
      <button
        className='bg-blue-900 text-white rounded-full w-12 h-12 flex justify-center items-center'
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <ChevronDoubleUpIcon className='w-5 h-5' />
      </button>
    </div>
  );
}
