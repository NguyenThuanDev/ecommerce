import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCatories } from "../app/categoryThunk";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { isloading, categories } = useSelector(state => state.category)

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCatories())
    }

  }, [dispatch]);



  return (
    <div className="flex flex-col w-full border text-sm">
      <h2 className="w-full px-[20px] pt-[15px] pb-[14px] h-[45px] text-white bg-main font-semibold"> {`All Collections`.toUpperCase()}</h2>
      {categories?.productCategory?.length > 0 ? (
        categories.productCategory.map((item) => (
          <NavLink key={item._id} className={({ isActive }) => {
            return isActive ? "w-full px-[20px] pt-[15px] pb-[14px] h-[45px] block hover:text-main text-red" : "w-full px-[20px] pt-[15px] pb-[14px] h-[45px] block hover:text-main"
          }} to={`/collections/${item.name.toLowerCase()}`}>
            {item.name}
          </NavLink>

        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Sidebar;
