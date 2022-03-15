export const getTheme = async(site_id) => {
    return fetch(`/api/themes/${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};