export const getSubCategories = async() => {
    return fetch('https://fyp-express-api.herokuapp.com/api/subcategories', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addSubCategory = async({site_id, name, description, sub_category_id}) => {
    return fetch('https://fyp-express-api.herokuapp.com/api/subcategories?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ site_id : site_id, name : name, description : description , sub_category_id : sub_category_id})
    }).then(res => res.json())
};

export const deleteSubCategory = async(sub_category_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/subcategories/${sub_category_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    }).then(res => res.json())
};


export const updateSubCategory = async({sub_category_id, name, description}) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/subcategories/${sub_category_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({sub_category_id : sub_category_id, name : name, description : description })
    }).then(res => res)
};