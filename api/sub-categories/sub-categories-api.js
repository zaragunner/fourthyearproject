export const getSubCategories = async() => {
    return fetch('/api/subcategories', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};
