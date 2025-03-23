import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../app/categorySlice';
const Demo = () => {
    const category = useSelector(state => state.category);
    const [cate, setCate] = useState('');
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        setCate(e.target.value);
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        dispatch(add(cate))
    }
    return (
        <>
            <input value={cate} onChange={handleInputChange}></input>
            <input type="submit" onClick={handleSubmitClick} />
            <h2>Danh Sách Cate</h2>
            {category.map(item => {
                return <h4 key={item}>{item}</h4>
            })}
        </>
    );
};

export default Demo;