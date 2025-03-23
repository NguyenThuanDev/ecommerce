import React from 'react';
import * as helper from '../ultils/helper';
import Rating from './Rating';
import icons from '../ultils/icons';

const { FaHeart,
  RxDragHandleHorizontal,
  FaRegEye } = icons
const Product = ({ productData, hasHover, isBorder }) => {
  return (

    <div className={`flex flex-col mr-4 relative group overflow-hidden ${isBorder ? "border" : ""}  h-[420px] cursor-pointer`} key={productData._id}>
      <img src={productData.images[0] || "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/m/amazfit_1_2.png"}
        alt="" className='w-[279px] h-[300px] object-contain p-4' />
      <h3 className='pl-4 mt-2 hover:text-main text-[16px]'>{productData.title}</h3>
      <h3 className='pl-4 mt-2 hover:text-main text-[16px] '>{helper.money(productData.price)}</h3>

      <div className='flex pl-4 mt-2'>
        <Rating rating={productData.totalRatings}></Rating>
      </div>
      {hasHover && <div className='absolute flex gap-3 w-full justify-center bottom-[70px] opacity-0 translate-y-3 transition-all duration-300 ease-in-out group-hover:opacity-80 group-hover:translate-y-0'>

        <div className='p-2 rounded-full border-2 border-black hover:bg-black transition-colors duration-200 cursor-pointer'>
          <FaHeart className='w-[14px] h-[14px] text-black hover:text-white'></FaHeart>
        </div>
        <div className='p-2 rounded-full border-2 border-black hover:bg-black transition-colors duration-200 cursor-pointer'>
          <RxDragHandleHorizontal className='w-[14px] h-[14px] text-black hover:text-white'></RxDragHandleHorizontal>

        </div>
        <div className='p-2 rounded-full border-2 border-black hover:bg-black transition-colors duration-200 cursor-pointer'>
          <FaRegEye className='w-[14px] h-[14px] text-black hover:text-white'></FaRegEye>

        </div>
      </div>}


    </div>

  );
};

export default Product;