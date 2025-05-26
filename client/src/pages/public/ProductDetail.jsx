import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { pid, slug } = useParams();
    const location = useLocation();
    const productId = location.state?.productId
    return <div>Đây là trang product detail của product {productId} {slug}</div>;
};

export default ProductDetail;