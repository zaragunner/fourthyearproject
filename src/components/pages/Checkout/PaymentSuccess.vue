<template>
   
    <h2 class="font-semibold text-lg  "> Order Summary </h2>
    <div class="grid grid-cols-2 gap-3">
    <div class="bg-gray-50 p-2 " v-if="this.order != null">
        <div v-for="item in this.order.order" :key="item.id">
            <div class=" bg-white m-2 rounded-lg shadow-md">
                <p><span class="font-semibold"> Item  : </span> <span>{{item.name}} </span> </p>
                <p><span class="font-semibold"> Description  : </span> <span>{{item.description}} </span> </p>
                <p><span class="font-semibold"> Size  : </span> <span>{{item.size}} </span> </p>
            </div>
        </div>
    </div>
    <div class="" v-if="this.order!= null">
        <p> Delivery Details </p>
      <p>  <span class="font-semibold"> Name :  </span>  {{this.order.customer.name}}</p>
       <p><span class="font-semibold"> Address : </span> {{this.order.customer.address}}</p>
       <p> <span class="font-semibold"> Email : </span>{{this.order.customer.email}}</p>
       <p><span class="font-semibold"> Phone Number : </span>{{this.order.customer.phone}}</p>

    </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
        order: null
        }
    },
    beforeCreate(){
        this.$store.dispatch('cart/createOrder').then(
          console.log(this.$store.state.cart.order)
        )
        },

    mounted(){
        this.order = this.$store.state.cart.order
    }
         
  

}
</script>
