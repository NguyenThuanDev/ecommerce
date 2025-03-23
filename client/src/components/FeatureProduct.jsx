import React, { useEffect, useState } from 'react';
import { apiGetProduct } from '../apis/productapi';
import * as helper from '../ultils/helper';

const FeatureProduct = () => {
    const [products, setProducts] = useState([]);
    const fetchApi = async () => {
        const response = await apiGetProduct({ limit: 9 });
        setProducts((pre) => {
            return response.productData
        })

    }

    useEffect(() => {
        fetchApi();

    }, []);


    return (
        <div className='mt-3 w-full flex flex-wrap gap-5 cursor-pointer'>
            {products.map((item) => {
                return (
                    <div className='flex gap-3 w-[380px] h-[140px] p-[15px] border-gray border-[1px]' key={item._id}>
                        <img src={item.images[0]} alt="demo" className='w-[100px] h-[100px]' />
                        <div>
                            <h3 className='hover:text-main'>{item.title}</h3>
                            <div className='group '>
                                <h3>{`${helper.money(item.price)} VNĐ`}</h3>
                                <span className='opacity-0 bg-gray-500 p-[2px] group-hover:opacity-100' >{`${helper.money(item.priceInUSD)} USD`}</span>
                            </div>

                        </div>

                    </div>
                );
            })}

        </div>)
};

export default FeatureProduct;