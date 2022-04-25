export const getCategories = async({site_id}) => {
   
    return fetch('https://fyp-express-api.herokuapp.com/api/categories', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        body:JSON.stringify({
            site_id : site_id
        })
    }).then(res => res.json())
};

export const addCategory = async({site_id, name, description, category_id}) => {
    return fetch('https://fyp-express-api.herokuapp.com/api/categories?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ site_id : site_id, name : name, description : description , category_id : category_id})
    }).then(res => res.json())
};

export const deleteCategory = async({category_id, site_id}) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/categories/${category_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify({
            site_id : site_id
        })
    }).then(res => res.json())
};

export const updateCategory = async({category_id, name, description}) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/categories/${category_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({category_id : category_id, name : name, description : description})
    }).then(res => res)
};

