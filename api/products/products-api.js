export const getProducts = async() => {
    return fetch('/api/products', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addProduct = async(product_id, site_id,description, category_id, sub_category_id, price, images, options) => {
    return fetch('/api/products?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ product_id: product_id, site_id : site_id,description : description, category_id: category_id, sub_category_id : sub_category_id, price : price, images : images, options: options })
    }).then(res => res.json())
};
