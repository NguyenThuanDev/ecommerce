import React from 'react';
import * as helper from '../ultils/helper';
import Rating from './Rating';
import icons from '../ultils/icons';
import HoverIcon from './HoverIcon'
import { Link } from 'react-router-dom';

const { FaHeart,
  RxDragHandleHorizontal,
  FaRegEye } = icons
const Product = ({ productData, hasHover, isBorder }) => {
  return (
    <Link to={`/product/${productData._id}/${productData.slug}`} state={{ productId: productData._id }}>
      <div className={`flex flex-col mr-4 relative group overflow-hidden ${isBorder ? "border" : ""}  h-[420px] cursor-pointer`} key={productData._id}>
        <img src={productData.images[0] || "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/m/amazfit_1_2.png"}
          alt="" className='w-[279px] h-[300px] object-contain p-4' />
        <h3 className='pl-4 mt-2 hover:text-main text-[16px]'>{productData.title}</h3>
        <h3 className='pl-4 mt-2 hover:text-main text-[16px] '>{helper.money(productData.price)}</h3>

        <div className='flex pl-4 mt-2'>
          <Rating rating={productData.totalRatings}></Rating>
        </div>
        {hasHover && <HoverIcon />}


      </div>
    </Link>
  );
};

export default Product;