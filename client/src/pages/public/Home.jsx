import React from 'react';
import { Sidebar, Banner, BestSeller, Deals } from '../../components/index';
import FeatureProduct from '../../components/FeatureProduct'
const Home = () => {
    return (
        <div>
            <div className='w-main flex mt-5 gap-4'>
                <div className='w-[25%]'>
                    <Sidebar />

                    <Deals></Deals>
                </div>
                <div className='w-[75%]'>
                    <Banner />
                    <BestSeller></BestSeller>

                </div>

            </div>
            <div className='w-main border-b-2 border-b-red-400 h-[53px]'>
                <h3 className='font-semibold text-[20px] py-[15px]'>{`Featured Products`.toUpperCase()}</h3>
                <div>
                    <FeatureProduct />
                </div>

            </div>

        </div>);
};

export default Home;