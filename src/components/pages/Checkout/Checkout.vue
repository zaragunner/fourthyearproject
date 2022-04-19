<template>
<Toast/>
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
         
  <div  v-for="product in this.$store.state.cart.cart" :key="product.item.product_id">
<div class=" mx-auto w-5/6 m-2  bg-gray-100 text-lg text-gray-600 ">
<div class="inline-block">
<img :src="`http://localhost:4001/${product.item.thumbnail.fileName}`"  class="inline w-28 h-32 mr-2  group-hover:opacity-75" />
</div>
<div class="inline-block font-semibold">
    <p> {{product.item.name}} </p>
<p>€{{product.cost}} </p>
<p> {{product.item.size ? product.item.size : 'One-Size'}} </p>

</div>
  </div>

    </div>
<div class="" v-if="this.$store.state.cart.cart.length>0">
               <div class="inline-block"> Total Price  </div>
               <div class="inline-block ml-6"> €{{this.$store.state.cart.total}} </div>
                
       
        <button class="rounded-lg font-semibold text-white bg-red-400 p-2 ml-36" @click="setUser">Checkout</button>
   
    </div>
    </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast';
export default {
    components : {
        InputText,
        Toast
    },
    data(){
        return{
            Fname : null,
            Lname : null,
            phone: null,
            email: null,
            line1: null,
            line2: null,
            line3: null,
            line4: '',
            postcode: null,
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
    },
    methods: {
        setUser(){
            if(this.Fname == null || this.Lname ==null || this.phone == null || this.email == null || this.line1 ==null || this.line2 == null || this.line3 == null || this.postcode == null){
                this.$toast.add({severity:'error', summary: 'Please ensure all required fields are filled in.', life: 1500});
            }
            else {
            const name = this.Fname + " " + this.Lname
            const address = this.line1 + " " + this.line2 + " " + this.line3 + " " + this.line4 + "" + this.postcode
            console.log("PHONE NUMBER" , this.phone)
            this.$store.dispatch('cart/setUser', {name : name , phone : this.phone , email : this.email , address: address} )
            this.$router.push('/payment')
            }
        }
    }
}
</script>