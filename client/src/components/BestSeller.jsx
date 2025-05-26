import React, { useState, useEffect } from 'react';
import { apiGetProduct } from '../apis/productapi';
import Slider from "react-slick";
import Product from './Product';
const tabs = [
    {
        id: 1, name: "Best Selling(SamSung)"
    },
    {
        id: 2, name: "New Arrival"
    },
    {
        id: 3, name: "Tablet"
    },
]

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

};
const BestSeller = () => {
    const [isActive, setIsActive] = useState(1);
    const [bestSelling, setBestSelling] = useState([]);
    const [newArrival, setNewArrival] = useState([]);
    const [tablet, setTablet] = useState([]);

    const fetchApi = async () => {
        const response = await Promise.all([apiGetProduct({ title: "samsung" }), apiGetProduct({ sort: "-createdAt" }), apiGetProduct({ title: "tablet" })])
        if (response[0].success) {
            setBestSelling(response[0].productData)
        }

        if (response[1].success) {
            setNewArrival(response[1].productData)
        }
        if (response[2].success) {
            setTablet(response[2].productData)
        }

    }
    useEffect(() => { fetchApi() }, [])

    return (
        <>
            <div className='flex gap-8 mt-[20px] text-[16px] border-b-2 border-b-red-400 p-2'>
                {tabs.map(el => {
                    return <div
                        key={el.id} onClick={() => setIsActive(el.id)}
                        className={`font-semibold text-gray-400 cursor-pointer ${isActive === el.id ? "text-gray-900" : ""} border-r-2 pr-5`}>
                        {el.name.toUpperCase()}
                    </div>
                })}


            </div>
            <div className='mt-4 p-4'>
                <Slider {...settings}>

                    {isActive === 1 ? bestSelling.map(item => {
                        return (
                            
                            <Product productData={item} key={item.id} hasHover={true} isBorder={true} />


                        )
                    }) : isActive === 2 ? newArrival.map(item => {
                        return <Product productData={item} key={item.id} hasHover={true} isBorder={true} />
                    }) : tablet.map(item => {
                        return <Product productData={item} key={item.id} hasHover={true} isBorder={true} />
                    })}


                </Slider>

                <div className='mt-6 flex gap-5 cursor-pointer'>
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="banner" />
                    <img src="//digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="banner" />

                </div>
            </div>
        </>
    );
};

export default BestSeller;