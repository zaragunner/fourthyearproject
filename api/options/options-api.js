export const getOptions = async(site_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/options?site=${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};
export const getOption = async(option_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/options/${option_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addOption = async({site_id, name, option_id}) => {
    return fetch('https://fyp-express-api.herokuapp.com/api/options?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ site_id : site_id, name : name, option_id : option_id})
    }).then(res => res.json())
};


export const deleteOption = async(option_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/options/${option_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    }).then(res => res.json())
};

export const updateOption = async({option_id, name}) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/options/${option_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({option_id : option_id, name : name})
    }).then(res => res)
};