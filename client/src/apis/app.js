import axios from '../axios';
export const apiGetCategories = () => {
    return axios({
        url: '/product-category',
        method: 'get'
    })
}