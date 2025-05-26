import React from 'react';
import icons from '../ultils/icons';
const { FaHeart,
  RxDragHandleHorizontal,
  FaRegEye } = icons


const HoverIcon = () => {
  return (
    <div className='absolute flex gap-3 w-full justify-center bottom-[70px] opacity-0 translate-y-3 transition-all duration-300 ease-in-out group-hover:opacity-80 group-hover:translate-y-0'>
      <div className='p-2 rounded-full border-2 border-black hover:bg-black transition-colors duration-200 cursor-pointer'>
        <FaHeart className='w-[14px] h-[14px] text-black hover:text-white'></FaHeart>
      </div>
      <div className='p-2 rounded-full border-2 border-black hover:bg-black transition-colors duration-200 cursor-pointer'>
        <RxDragHandleHorizontal className='w-[14px] h-[14px] text-black hover:text-white'></RxDragHandleHorizontal>

      </div>
      <div className='p-2 rounded-full border-2 border-black hover:bg-black transition-colors duration-200 cursor-pointer'>
        <FaRegEye className='w-[14px] h-[14px] text-black hover:text-white'></FaRegEye>

      </div>
    </div>
  );
};

export default HoverIcon;