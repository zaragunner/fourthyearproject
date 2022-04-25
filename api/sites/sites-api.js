
export const addSite = async({ site_id,name,contact_no,email,status,registration_date,expiry,contact_us,managers}) => {
    return fetch('https://fyp-express-api.herokuapp.com/api/sites?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ 
                            site_id : site_id, 
                            name: name ,
                            contact_no: contact_no,
                            email : email,
                            status, status,
                            registration_date : registration_date,
                            expiry : expiry,
                            contact_us : contact_us,
                            managers: managers })
    }).then(res => res.json())
};

export const getSite = async(site_id) => {
    return fetch(`https://fyp-express-api.herokuapp.com/api/sites/${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};






