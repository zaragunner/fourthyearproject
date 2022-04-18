import { v4 as uuidv4 } from 'uuid';

export const getProducts = async() => {
    return fetch('/api/products', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const getProduct = async(product_id) => {
    return fetch(`/api/products/${product_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addProduct = async({name, description, category_id, sub_category_id, price,thumbnail, images, options}) => {
    return fetch('/api/products?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({  product_id: uuidv4(),
                             site_id : process.env.VUE_APP.SITEID ,
                             name: name ,
                             description : description,
                              category_id: category_id,
                               sub_category_id : sub_category_id,
                                price : price,
                                 images : images,
                                 thumbnail: thumbnail,
                                  options: options })
    }).then(res => res.json())
};

export const deleteProduct = async(product_id) => {
    return fetch(`/api/products/${product_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    }).then(res => res.json())
};




