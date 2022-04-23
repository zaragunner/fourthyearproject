<template>
    <div v-if="this.order != null">
      <div class="grid grid-cols-2 gap-3">
        <div>
         <h2>Order Details </h2>
          Order number : {{this.order[0].order_id}} 
            <div class="card bg-gray-50 rounded-sm shadow-sm m-2 " v-for="item in this.order[0].order">
              <p><span class="font-semibold"> Product Name:  </span>{{item.item.name}} </p>
                <p><span class="font-semibold">Product Number :  </span>{{item.item.product_id}} </p>
                <p><span class="font-semibold"> Product Cost : </span> {{item.cost}} </p>
       </div>
     
       </div>

      
       
       <div class="">
         <h2> Delivery Details </h2>
         {{this.order[0].customer}}
         <div class="mt-12">
          {{this.order[0].customer.name}}
       </div>
        <div>
          {{this.order[0].customer.address}}
       </div>
       <div>
          {{this.order[0].customer.email}}
          </div>
           <div>
          {{this.order[0].customer.phone}}
       </div>
          </div>
    </div>
    </div>

</template>

<script>

import Chips from 'primevue/chips'

import { getOrder } from "../../../../api/orders/orders-api.js"
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea'
export default {
  components : {
    //   SelectButton,
      InputText,
      TextArea,
      Chips
    },
   data () {
       return{
        order: null

       }
   },
   async beforeCreate(){
     try {
      await getOrder(this.$route.params.id).then(result => {
      this.order = result;
      console.log("THIS order" ,this.order)
    })  
     
   }
    catch (error){
     console.log(error)
   }

   },

 methods : {

 }
}
</script>
