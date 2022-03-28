<!-- component -->
<!-- Tailwind CSS Playground : https://play.tailwindcss.com/ATVteKFRxw -->
<template>
<Toast/>
<!-- component -->
<div class="bg-white w-1/2 my-4 shadow p-8 rounded-lg">
    <div class="flex items-center mb-4">
        <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">1</div>
        <h2 class="text-lg">Your Payment Information</h2>
    </div>

    <div class="w-full">
        <label for="payment" class="block text-sm mb-2">Credit Card</label>
        <div class="flex">
            <input type="text" v-model="cardnumber" id="payment" class="w-4/6 flex-1 text-sm bg-gray-100 text-grey-darkest rounded-l p-3 focus:outline-none" placeholder="Card Number">
            <input type="text" v-model="expiry_month" id="payment" class="w-1/6 inline-block text-sm bg-gray-100 text-grey-darkest p-3 focus:outline-none" placeholder="MM">
            <input type="text" v-model="expiry_year" id="payment" class="w-1/6 inline-block text-sm bg-gray-100 text-grey-darkest p-3 focus:outline-none" placeholder="/YY">
            <input type="text" v-model="cvv" id="payment" class="w-1/6 inline-block text-sm bg-gray-100 text-grey-darkest rounded-r p-3 focus:outline-none" placeholder="CVC">
        </div>
        <button class="bg-green-400 p-2 rounded-md font-semibold m-1 " @click="submit" > Pay now </button>

        {{this.cardnumber}}
        {{this.expiry_month}}
        {{this.expiry_year}}
        {{this.cvc}}
    </div>
</div>
</template>

<script>
import Toast from 'primevue/toast';

import {createPaymentMethod, createPaymentIntent, confirmPayment, getPaymentInt} from '../../../../api/stripe/stripe-api.js'


export default{
  components:{
Toast
  },
  data(){
    return{
      cardnumber: '',
      cardHolder: '',
      cvv: '',
      expiry_month:'',
      expiry_year: '',
      payment_method: null,
      payment_intent: null,
      clientSecret: null,
   
    }

  },
  methods:{
    async submit(){
      if(this.cardnumber == "" || this.cvv == "" || this.expiry_month == "" || this.expiry_year == ""){
         this.$toast.add({severity:'error', summary: 'Please enter details', life: 1500});
      } else {
      //create payment intent and confirm payment on client
           await createPaymentMethod({
              number: this.cardnumber,
               exp_month: this.expiry_month,
                exp_year: this.expiry_year,
                cvc: this.cvv}).then(result => {
                  console.log("RESULT" , result)
              this.payment_method = result.json
               this.paymentInt()
                })
        
      }
    },
       
async paymentInt(){
   await createPaymentIntent({payment_method: this.payment_method, amount: this.$store.state.cart.total*100}).then(result => {
            this.clientSecret= result.clientSecret;
            this.payment_intent = result.id
    })
    this.confirmPay();
},

async confirmPay(){
   console.log("confirming payment method" , this.payment_method)
   console.log("confirming payment method , intent id" , this.payment_intent)
    await confirmPayment({payment_method:this.payment_method, payment_intent: this.payment_intent }).then(result => {
         
            console.log(result)

    })

},


}
}

</script>