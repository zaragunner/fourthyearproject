export const getCategories = async() => {
    return fetch('/api/categories', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addCategory = async({site_id, name, description, category_id}) => {
    return fetch('/api/categories?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ site_id : site_id, name : name, description : description , category_id : category_id})
    }).then(res => res.json())
};
