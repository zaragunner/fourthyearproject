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

export const addProduct = async({product_id, site_id, name, description, category_id, sub_category_id, price,thumbnail, images, options}) => {
    const vat_id = price.vat_id;
    const netprice = price.netprice;
    const tnail = thumbnail.name

     const formData = new FormData()
     formData.append('product_id' , product_id)
     formData.append('site_id', site_id)
     formData.append('name' , name)
     formData.append('description' ,description)
     formData.append('category_id', category_id)
     formData.append('sub_category_id' , sub_category_id)
     formData.append('vat_id', vat_id)
     formData.append('netprice' ,netprice)
     formData.append('thumbnail' , thumbnail)
     formData.append('thumbnailName' , tnail)
     formData.append('images' , images)
     formData.append('options' , options)
     console.log(formData)
    return fetch('/api/products?action=create',{
       
        method: 'post',
        body: formData
        // JSON.stringify({  ,
        //     site_id : site_id ,
        //     name: name ,
        //     description : description,
        //      category_id: category_id,
        //       sub_category_id : sub_category_id,
        //        price : price,
        //        thumbnail: thumbnail,
        //         images : images,
        //          options: options })
        
                                  
    }).then(res =>
         res.json())
};

export const deleteProduct = async(product_id) => {
    return fetch(`/api/products/${product_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    }).then(res => res.json())
};




