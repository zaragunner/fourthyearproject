<!-- component -->
<!-- Tailwind CSS Playground : https://play.tailwindcss.com/ATVteKFRxw -->
<template>
  <Toast />
  <div class="grid gap-4 grid-cols-2">
    <div class="bg-white w-5/6 mx-auto my-4 shadow rounded-lg">
      <div class="flex items-center mb-4">
        <div class="px-3 py-2 rounded-full font-bold text-indigo-500 mr-2">
          1
        </div>
        <h2 class="text-lg">Order Summary</h2>
      </div>

      <div class=" w-full">
        <div class="w-full relative">
          <div
            v-for="product in this.$store.state.cart.cart"
            :key="product.item.product_id"
          >
            <div class=" w-full m-2 text-lg text-gray-600">
              <div class="inline-block">
                <img
                  :src="`http://localhost:4001/${product.item.thumbnail.fileName}`"
                  class="
                    inline
                    w-28
                    h-32
                    mr-2
                    object-center object-cover
                    group-hover:opacity-75
                  "
                />
              </div>
              <div class="inline-block font-semibold">
                <p>{{ product.item.name }}</p>
                <p>€{{ product.cost}}</p>
                <p>{{ product.item.size }}</p>
              </div>
            </div>
          </div>
          <div
            class="right-0 bottom-0 absolute"
            v-if="this.$store.state.cart.cart.length > 0"
          >
            <div class="inline-block">Total Price</div>
            <div class="inline-block ml-6">
              €{{ this.$store.state.cart.total }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white w-5/6 my-4 shadow p-8 rounded-lg">
      <div class="flex items-center mb-4">
        <div class="px-3 py-2 rounded-full font-bold text-indigo-500 mr-2">
          2
        </div>
        <h2 class="text-lg">Your Payment Information</h2>
      </div>

      <div class="w-full">
        <label for="payment" class="block text-sm mb-2">Credit Card</label>
        <div class="flex">
          <input
            type="text"
            v-model="cardnumber"
            id="payment"
            class="
              w-4/6
              flex-1
              text-sm
              bg-gray-100
              text-grey-darkest
              rounded-l
              p-3
              focus:outline-none
            "
            placeholder="Card Number"
          />
          <input
            type="text"
            v-model="expiry_month"
            id="payment"
            class="
              w-1/6
              inline-block
              text-sm
              bg-gray-100
              text-grey-darkest
              p-3
              focus:outline-none
            "
            placeholder="MM"
          />
          <input
            type="text"
            v-model="expiry_year"
            id="payment"
            class="
              w-1/6
              inline-block
              text-sm
              bg-gray-100
              text-grey-darkest
              p-3
              focus:outline-none
            "
            placeholder="/YY"
          />
          <input
            type="text"
            v-model="cvv"
            id="payment"
            class="
              w-1/6
              inline-block
              text-sm
              bg-gray-100
              text-grey-darkest
              rounded-r
              p-3
              focus:outline-none
            "
            placeholder="CVC"
          />
        </div>
        <button
        :disabled="disabled"
          class="bg-green-400 p-2 rounded-md font-semibold m-1"
          @click="submit"
        >
          Pay now
        </button>
        <span> 4242424242424242</span>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "primevue/toast";

import {
  createPaymentMethod,
  createPaymentIntent,
  confirmPayment,
  getPaymentInt,
} from "../../../../api/stripe/stripe-api.js";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      cardnumber: "",
      cardHolder: "",
      cvv: "",
      expiry_month: "",
      expiry_year: "",
      payment_method: null,
      payment_intent: null,
      clientSecret: null,
      disabled: false
    };
  },
  methods: {
    async submit() {
      if (
        this.cardnumber == "" ||
        this.cvv == "" ||
        this.expiry_month == "" ||
        this.expiry_year == ""
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Please enter details",
          life: 1500,
        });
      } else {
        //create payment method and then pass to payment intent
        await createPaymentMethod({
          number: this.cardnumber,
          exp_month: this.expiry_month,
          exp_year: this.expiry_year,
          cvc: this.cvv,
        }).then(result => {
          console.log("RESULT from create payment method",result);
          if(result.status != 200){
            this.$toast.add({
          severity: "error",
          summary: result.error,
          life: 1500,
        });
          }
          else{
            console.log("Success")
          this.payment_method = result;
          this.paymentInt();
          }
         
        });
      }
    },

    async paymentInt() {
      await createPaymentIntent({
        payment_method: this.payment_method,
        amount: this.$store.state.cart.total * 100,
      }).then((result) => {
         if(result.status != 200){
            this.$toast.add({
          severity: "error",
          summary: "Payment Failed",
          life: 1500,
        });
          }
          else{
             this.$toast.add({
          severity: "success",
          summary: "Payment Complete",
          life: 1500,
        });
        this.clientSecret = result.clientSecret;
        this.payment_intent = result.id;
         this.confirmPay();
          }
      });
     
    },

    async confirmPay() {
      console.log("confirming payment method", this.payment_method);
      console.log("confirming payment method , intent id", this.payment_intent);
      await confirmPayment({
        payment_method: this.payment_method,
        payment_intent: this.payment_intent,
        order: this.$store.state.cart.cart,
        customer : this.$store.state.cart.customer
      }).then((result) => {
         if(result.status != 200){
         
            this.$toast.add({
          severity: "error",
          summary: "Payment failed",
          life: 1500,
        });
          }
          else{
              console.log("RESULT FROM CONFIRMATION" , result)
          this.$toast.add({
          severity: "success",
          summary: "payment complete",
          life: 1500,
        });
        this.$router.push('/paymentsuccess')
          }
      });
    },
  },
};
</script>