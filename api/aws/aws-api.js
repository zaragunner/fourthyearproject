export const getUserPool = async(site_id) => {
    return fetch(`localhost:4001/api/aws/${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};