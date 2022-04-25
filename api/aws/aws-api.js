export const getUserPool = async(site_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/aws/${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};