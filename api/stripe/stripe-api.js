import store from '../../src/store/store.js'

export const createPaymentIntent = async ({payment_method, amount}) => {
    return fetch('https://fyp-express-api.herokuapp.com/api/stripe/create-payment-intent', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            payment_method: payment_method,
            amount: amount
        })
    }).then(res => res.json())
};

export const confirmPayment = async ({site_id, payment_intent , payment_method, order , customer, order_id})=> {
    return fetch(`https://fyp-express-api.herokuapp.com/api/stripe/confirm-payment?site=${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            payment_intent: payment_intent,
            payment_method: payment_method,
            order : order,
            customer : customer,
            order_id: order_id
        })
    }).then(res => res.json())
};

export const getPaymentInt = async ({clientSecret})=> {
    return fetch('https://fyp-express-api.herokuapp.com/api/stripe/get-payment-intent', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            clientSecret: clientSecret
        })
    }).then(res => res.json())
  }



export const createPaymentMethod = async ({number, exp_month, exp_year, cvc}) => {
    console.log(number, exp_month)
    return fetch('https://fyp-express-api.herokuapp.com/api/stripe/create-payment-method', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            card :{
            number: number,
            exp_month, exp_month,
            exp_year: exp_year,
            cvc: cvc
            }
        })
    }).then(res => res.json())
};

export const confirmCardPayment = async ({ clientSecret, cardElement,site_id }) => {
   
    return fetch(`https://fyp-express-api.herokuapp.com/api/stripe/confirm-card-payment?site=${site_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            clientSecret: clientSecret,
            cardElement: cardElement
        })

    }).then(res => res.json())
};