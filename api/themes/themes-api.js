export const getTheme = async(site_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/themes/${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};