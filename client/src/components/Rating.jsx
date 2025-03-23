import React from 'react';
import icons from '../ultils/icons'
const { IoIosStar, IoIosStarOutline } = icons
const Rating = ({ rating }) => {
    const array = [];
    for (var i = 0; i < rating; i++) {
        array.push(<IoIosStar color='orange'></IoIosStar>);
    }
    for (var i = rating; i < 5; i++) {
        array.push(<IoIosStarOutline color='orange' />)
    }

    return (
        <>
            {array.map((item, index) => <span key={index} color='orange'>{item}</span>)}
        </>
    );

};

export default Rating;