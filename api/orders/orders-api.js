export const getOrders = async() => {
    return fetch('/api/orders', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const getOrder = async(id)=> {
    return fetch(`/api/orders/${id}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const getMyOrders = async(UserID)=> {
    return fetch(`/api/orders/user/${UserID}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};




