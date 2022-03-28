<template>
    <div class="w-2/3 mx-auto mt-3">
        <div>
      <p class="text-xl font-bold "> Checkout </p>
        </div>
        <div class="grid gap-4 grid-cols-2">
        <div class="w-full p-inputtext-sm  bg-gray-100  items-center ">
        <p class="text-gray-600 font-semibold"> Details </p>
        <InputText class=" m-2" placeholder="First name" v-model="Fname" />
        <InputText class=" m-2" placeholder="Surname" v-model="Lname" />
        <InputText class="m-2" placeholder="Contact Number" v-model="phone" />
        <InputText class="m-2" placeholder="Email Address" v-model="email" />
        <p> Delivey Address </p>
        <InputText class="m-2" placeholder="Line 1" v-model="line1" />
        <InputText class="m-2"  placeholder="Line 2" v-model="line2" />
        <InputText class="m-2" placeholder="Line 3" v-model="line3" />
        <InputText class="m-2" placeholder="Line 4" v-model="line4" />
        <InputText class="m-2" placeholder="Postcode"  v-model="postcode"/>
        </div>
    <div class=" bg-gray-300 " >
 <p class="text-gray-600 font-semibold"> Order Summary </p>
         
  <div  v-for="product in this.$store.state.cart.cart" :key="product.product_id">
<div class=" mx-auto w-5/6 m-2  bg-gray-100 text-lg text-gray-600 ">
<div class="inline-block">
<img :src="product.images.thumbnail"  class="inline w-20 h-20 mr-2  object-center object-cover group-hover:opacity-75" />
</div>
<div class="inline-block font-semibold">
    <p> {{product.name}} </p>
<p>€{{product.price.netprice}} </p>
<p> {{product.size}} </p>
</div>
  </div>

    </div>
<div class="" v-if="this.$store.state.cart.cart.length>0">
               <div class="inline-block"> Total Price  </div>
               <div class="inline-block ml-6"> €{{this.$store.state.cart.total}} </div>
               
        <button @click="getSession()" type="submit" id="checkout-button">Checkout</button>

    </div>
    </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext'
export default {
    components : {
        InputText
    },
    data(){
        return{
            Fname : '',
            Lname : '',
            phone: null,
            line1: '',
            line2: '',
            line3: '',
            line4: '',
            postcode: '',
            response: null
            
        }
    },
 
    mounted(){
          if (this.$store.state.account.user){
          this.Fname = this.$store.state.account.user.attributes.given_name
          this.Lname = this.$store.state.account.user.attributes.family_name
          this.phone = this.$store.state.account.user.attributes.phone_number
          this.email = this.$store.state.account.user.attributes.email
        }
        else {
          this.username= '';
  
        }
    }
}
</script>