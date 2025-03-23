import React, { useState, useEffect } from 'react';
import icons from '../ultils/icons';
import Product from './Product';
import { apiGetProduct } from '../apis/productapi';
import Countdown from './Countdown'
const { FaStar, RxDragHandleHorizontal } = icons;
const Deals = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0        );
    const [isExpired, setIsExpired] = useState(false);
    const [deals, setDeals] = useState({});
    const fetchApi = async () => {
        const response = await apiGetProduct({ title: "deal" })
        if (response.success) {
            setDeals({ ...response.productData[0] })
            setHours(0);
            setMinutes(1);
            setSeconds(59)

        }
    }

    useEffect(() => { fetchApi() }, [isExpired]);
    useEffect(() => {
        const timerId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(pre => pre - 1)
            }
            else {
                if (minutes > 0) {
                    setMinutes(pre => pre - 1);
                    setSeconds(59);
                }
                else {
                    if (hours > 0) {
                        setHours(pre => pre - 1);
                        setMinutes(59);
                        setSeconds(59)
                    }
                    else {
                        setIsExpired(true)
                        clearInterval(timerId)

                    }
                }

            }



        }, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [hours, minutes, seconds])

    return (<div className='mt-10 border w-full h-[650px] pt-3 px-3 text-[16px]'>
        <div className='flex'>
            <FaStar size={20} color='red'></FaStar>
            <h3 className='ml-2 font-semibold'>{'Daily Deals'.toUpperCase()}</h3>
        </div>

        <div>
            {Object.keys(deals).length > 0 && <Product productData={deals} hasHover={false}></Product>}

        </div>
        <div className='flex gap-2 justify-center mt-4'>
            <Countdown number={hours} unit={'Hours'} />
            <Countdown number={minutes} unit={'Minutes'} />
            <Countdown number={seconds} unit={'Seconds'} />
        </div>

        <button
            type='button'
            className='flex gap-2 w-full h-[40px] justify-center items-center bg-main text-white hover:bg-black mt-[50px]'

        >
            <RxDragHandleHorizontal size={20} />
            <span>OPTION</span>
        </button>

    </div>);
};

export default Deals;