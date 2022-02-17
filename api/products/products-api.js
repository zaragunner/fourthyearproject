export const getProducts = async() => {
    return fetch('/api/products', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};