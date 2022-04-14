export const getOrders = async() => {
    return fetch('/api/orders', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const getOrder = async(_id)=> {
    return fetch(`/api/orders/${_id}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};
