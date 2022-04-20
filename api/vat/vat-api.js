export const getVatRates = async() => {
    return fetch('/api/vat', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addVatRate = async({site_id, name, rate, vat_id}) => {
    return fetch('/api/vat?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ site_id : site_id, name : name, rate: rate , vat_id : vat_id})
    }).then(res => res.json())
};

export const updateVatRate = async({vat_id, name, rate}) => {
    return fetch(`/api/vat/${vat_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({vat_id : vat_id, name : name, rate: rate})
    }).then(res => res)
};