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

export const updateOrder = async({order_id, name, address, phone, email, status, notes}) => {
    return fetch(`/api/orders/${order_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({order_id : order_id, name : name, address: address, phone : phone, email : email, status: status, notes: notes})
    }).then(res => res)
};




