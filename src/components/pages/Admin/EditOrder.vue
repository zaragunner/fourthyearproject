<template>
<Toast/>
    <div v-if="this.order != null">
      <div class="grid grid-cols-2 gap-3">
        <div class="card bg-gray-100 m-2 p-2 rounded-md ">
         <h2 class="font-semibold text-lg">Order Details </h2>
          Order number : {{this.order[0].order_id}} 
          
            <div class="card bg-gray-50 rounded-sm shadow-sm m-2 " v-for="item in this.order[0].order">
              <div class="grid grid-cols-2 ">
                <div class="items-center">
           <img :src="`https://fyp-express-api.herokuapp.com/${item.item.thumbnail.fileName}`"  class="inline object-center mx-auto group-hover:opacity-75" />
        </div>
        <div class="w-full ml-2 mt-4 ">
              <p><span class="font-semibold"> Product Name:  </span>{{item.item.name}} </p>
                <p><span class="font-semibold">Product Number :  </span>{{item.item.product_id}} </p>
                <p><span class="font-semibold"> Product Cost : </span> €{{item.cost}} </p>
       </div>
       </div>      
            </div>
              <p class="mt-4 mb-4  "><span class="font-semibold">Order Status:  </span> 
        <Dropdown v-model="status" :options="statusOptions" placeholder="Change Order Status" /></p>
        <p class="mt-4 mb-4 "><span class="font-semibold">Total paid: </span>€{{getTotal()}} </p>

        </div>
       
       <div class="">
         <h2 class="font-semibold text-lg"> Delivery Details </h2>
         <div>
         <span class="font-semibold w-68 ">   Customer ID : </span> <span> {{this.order[0].customer.user_id}}</span>
         </div>
         <div class="mt-2">
        <span class="font-semibold "> Name:  </span><InputText v-model="name"/>
       </div>
       
        <div class=" mb-4 mt-2" >
        <span class="font-semibold align-top "> Address:  </span><TextArea class="w-auto align-top h-28 " v-model="address"/>
       </div>
       <div>
      <span class="font-semibold ">   Email:  </span><InputText v-model="email"/>
          </div>
           <div class=" mt-2">
       <span class="font-semibold "> Phone :   </span><InputText v-model="phone"/>
       </div>
          <div class=" mt-2">
       <span class="font-semibold align-top "> Admin Notes :   </span><TextArea class="align-top" v-model="notes"/>
       </div>
        <button @click="submitUpdateOrder()" class="bg-gray-500 mt-12 hover:bg-gray-700 absolute bottom-12 lg:right-64 p-3 rounded-lg  text-white outline-none">Save Changes </button>
          </div>
          
    </div>
      </div>
    

    


</template>

<script>
import Toast from 'primevue/toast'
import Chips from 'primevue/chips'
import Dropdown from 'primevue/dropdown'
import { getOrder,updateOrder } from "../../../../api/orders/orders-api.js"
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea'

export default {
  components : {
    //   SelectButton,
      InputText,
      TextArea,
      Chips,
      Dropdown,
      Toast
    },
   data () {
       return{
        order: null,
        name : null,
        address : null,
        phone: null,
        email : null,
        status :null,
        notes: null,
        statusOptions:  ['Processing', 'Packed', 'Dispatched']

       }
   },
   async beforeCreate(){
     try {
      await getOrder(this.$route.params.id).then(result => {
      this.order = result;
      console.log("STATUS" , this.order[0].status)
      this.address = this.order[0].customer.address;
      this.name = this.order[0].customer.name;
      this.phone = this.order[0].customer.phone;
      this.email = this.order[0].customer.email
      this.status = this.order[0].status
      this.notes= this.order[0].notes
    })  
     
   }
    catch (error){
     console.log(error)
   }

   },

 methods : {
   getTotal(){
     let total = 0;
     this.order[0].order.forEach(item => {
      total+= item.cost
     })
     return total
   },
 async   submitUpdateOrder(){
      updateOrder({
       order_id : this.order[0].order_id,
        name: this.name,
        address: this.address,
        phone: this.phone,
        email: this.email,
        notes: this.notes,
        status: this.status
      }).then(res => {
         if(res.status == 200){
               this.$toast.add({severity:'success', summary: 'Order Updated', life: 1500});
         }
         else{
           this.$toast.add({severity:'error', summary: 'Update failed', life: 1500});
         }
      });
   }

 }
}
</script>
