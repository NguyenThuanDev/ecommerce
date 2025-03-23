import React from 'react';
import Logo from '../assets/logo.png'
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path'
const { RiPhoneFill, MdEmail, CiHeart, FaShoppingBag } = icons;
const Header = () => {
    return <div className='w-main h-[110px] py-[35px] flex justify-between gap'>
        <Link to={`/${path.HOME}`}>
            <img src={Logo} alt="logo" className='w-[234px] object-contain' /></Link>





        <div className='flex text-[13px] gap-3'>
            <div className='flex flex-col px-6 border-r items-center'>
                <span className='flex gap-2 items-center'>
                    <RiPhoneFill className='text-red-500' />
                    <span className='font-semibold'> (+1800) 000 8808</span>

                </span>
                <span>
                    Mon-Sat 9:00AM - 8:00PM

                </span>
            </div>
            <div className='flex flex-col items-center px-6 border-r'>
                <span className='flex gap-2 items-center content-center'>
                    <MdEmail className='text-red-500' />
                    <span className='font-semibold'>  support@tadathemes.com</span>

                </span>
                <span>
                    Online Support 24/7


                </span>
            </div>
            <div className='items-center justify-center px-6 border-r'>
                <CiHeart color='red' size='25' />
            </div>
            <div className='item-center justify-center flex gap-1'>
                <FaShoppingBag color='red' size='23' />
                0 items

            </div>
        </div>


    </div >;
};

export default Header;