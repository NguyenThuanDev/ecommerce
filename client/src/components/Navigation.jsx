import React from 'react';
import { navigations } from '../ultils/constants';
import { NavLink } from 'react-router-dom'
const Navigation = () => {
    return <div className='w-main h-[48.3px] py-[8px] border-t border-b flex gap-5 text-sm items-center'>
        {navigations.map(item => {
            return (<NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => {
                    return isActive ? 'hover:text-main text-main' : "hover:text-main"
                }}
            >
                {item.value}
            </NavLink>)
        })}

    </div>;
};

export default Navigation;