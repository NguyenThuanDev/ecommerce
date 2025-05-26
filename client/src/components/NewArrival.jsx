import React, { useEffect, useState } from 'react';
import { apiGetProduct } from '../apis/productapi';
import Slider from "react-slick";
import Product from './Product';
import * as helper from '../ultils/helper';
var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

};
const NewArrival = () => {
    const [product, setProduct] = useState([])
    const fetchApi = async () => {
        const response = await apiGetProduct(apiGetProduct({ title: "samsung" }));
        if (response.success) {
            setProduct((pre) => {
                return response.productData
            })
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])
    return <div>
        <Slider {...settings}>

            {product.map(item => {
                return (
                    <div className='group'>
                        <div className='relative'>
                            <Product productData={item} key={item.id} hasHover={false} isBorder={true} />
                        </div>
                        <div className='absolute  hidden top-0 group-hover:block text-[13px] font-light bg-white border w-[378px] h-[420px]' >
                            <div className='flex justify-between w-[378px] px-4 py-4 h-[40px] border'>

                                <span>{item.title}</span>
                                <span>{`${helper.money(item.price)} VNĐ`}</span>
                            </div>
                            <div className='mt-[20px] whitespace-pre-line px-4 py-3 h-[280px] truncate '>
                                {item.description}
                            </div>

                        </div>
                    </div>

                )
            })}


        </Slider>

    </div>;
};

export default NewArrival;