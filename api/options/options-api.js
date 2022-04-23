export const getOptions = async() => {
    return fetch('/api/options', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};
export const getOption = async(option_id) => {
    return fetch(`/api/options/${option_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addOption = async({site_id, name, option_id}) => {
    return fetch('/api/options?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ site_id : site_id, name : name, option_id : option_id})
    }).then(res => res.json())
};


export const deleteOption = async(option_id) => {
    return fetch(`/api/options/${option_id}?action=delete`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    }).then(res => res.json())
};

export const updateOption = async({option_id, name}) => {
    return fetch(`/api/options/${option_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({option_id : option_id, name : name})
    }).then(res => res)
};