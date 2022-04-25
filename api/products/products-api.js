import { v4 as uuidv4 } from 'uuid';

export const getProducts = async() => {
    return fetch('https://fyp-express-api.herokuapp.com/api/products', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const getProduct = async(product_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/products/${product_id}`, {
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
    console.log("OPTIONS" ,options)
  

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
     for (var i = 0; i < options.length; i++) {
        formData.append('options[]', options[i]);
      }
    
    return fetch('https://fyp-express-api.herokuapp.com/api/products',{
       
        method: 'post',
        body: formData
     
                                  
    }).then(res =>
         res)
};

export const deleteProduct = async(product_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/products/${product_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    }).then(res => res.json())
};

export const updateProduct  = async({product_id, name, description, category_id, sub_category_id, price, images, options})=>{
    const vat_id = price.vat_id;
    const netprice = price.netprice;
   

     const formData = new FormData()
     formData.append('product_id' , product_id)
     formData.append('name' , name)
     formData.append('description' ,description)
     formData.append('category_id', category_id)
     formData.append('sub_category_id' , sub_category_id)
     formData.append('vat_id', vat_id)
     formData.append('netprice' ,netprice)

     formData.append('images' , images)
     for (var i = 0; i < options.length; i++) {
        formData.append('options[]', options[i]);
      }
      return fetch(`https://fyp-express-api.herokuapp.com/api/products/${product_id}?action=update`,{
       
        method: 'put',
        body: formData
     
                                  
    }).then(res =>
         res)
}




