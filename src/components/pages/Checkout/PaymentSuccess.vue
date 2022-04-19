<template>
   <div class="w-7/8 mx-auto ">
   
    
    <div class="grid grid-cols-2 gap-3">
    <div class="bg-gray-50 w-7/8 m-2  p-4 shadow-md" v-if="this.order != null">
        <h2 class="font-semibold text-lg  "> Order Summary </h2>
        <div v-for="item in this.order.order" :key="item.id">
            <div class=" bg-white m-2 rounded-lg shadow-md">
                <div class="inline-block">
                <p><img class="h-34 w-28 mr-4" :src="`http://localhost:4001/${item.item.thumbnail.fileName}`"/></p>
                </div>
                <div class="inline-block">
                <p><span class="font-semibold"> Item  : </span> <span>{{item.item.name}} </span> </p>
                <p><span class="font-semibold"> Description  : </span> <span>{{item.item.description}} </span> </p>
                <p><span class="font-semibold"> Size  : </span> <span>{{item.item.size}} </span> </p>
                </div>
              
            </div>
        </div>
    <div>
           <p><span  class="font-semibold"> Total excl. VAL : </span> €{{getNetTotal()}}</p>
            <p><span  class="font-semibold"> VAT: </span> €{{getTotal()-getNetTotal()}}</p>
            <p><span  class="font-semibold">Total incl. VAT: </span>€ {{getTotal()}}</p>
        </div>

    </div>
    <div class="bg-gray-50 w-7/8 m-2 p-4  shadow-md" v-if="this.order!= null">
        <h2 class="font-semibold text-lg  "> Delivery Details </h2>
      <p>  <span class="font-semibold"> Name :  </span>  {{this.order.customer.name}}</p>
       <p><span class="font-semibold"> Address : </span> {{this.order.customer.address}}</p>
       <p> <span class="font-semibold"> Email : </span>{{this.order.customer.email}}</p>
       <p><span class="font-semibold"> Phone Number : </span>{{this.order.customer.phone}}</p>

    </div>
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
        this.$store.dispatch('cart/clearCart')
    },
    methods :{
        getNetTotal(){
            let total = 0;
            this.order.order.forEach(item => {
                console.log("ITEM" , item)
                total = (total + item.item.netprice)
                console.log("TOTAL" , total)              
            })
            return total
        },
        getTotal(){
            let total = 0;
            this.order.order.forEach(item =>{
                total = (total + item.cost)
            })
            return total
        }
    }
         
  

}
</script>
