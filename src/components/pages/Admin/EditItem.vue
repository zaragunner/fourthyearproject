<template>
    <div class="m-4 flex space-x-4">
  <div class="flex rounded-lg overflow-hidden">
            <img :src="product.images.imageSrc" :alt="product.imageAlt" class="h-64 w-64 object-center object-cover group-hover:opacity-75" />
          </div>

          <div class="flex-1  ">
            <div class=" mt-2 ">
              <span class="inline-block mr-4 mt-2 w-32  "> Name </span>
             <InputText  class="inline-block p-inputtext-sm" type="text" v-model="product.name" />
              </div>
             <div class=" inline-block bg-red-500 mt-2 ">
              <span class="inline-block mr-4 mt-2 w-32  "> Description </span>
             </div>
             <div class="inline-block bg-blue-600">
              <TextArea v-model="product.description" :autoResize="true" rows="5" cols="30" />
              </div>
                <div class=" mt-2 ">
              <span class="inline-block mr-4 mt-2 w-32  "> Category </span>
             <InputText  class="inline-block p-inputtext-sm" type="text" v-model="product.category_id" />
              </div>
              <div class=" mt-2 ">
             <span class="inline-block mr-4 w-32 "> Price </span>
             <InputText  class="p-inputtext-sm" type="text" v-model="product.netprice" />
              </div>
         
            <div class=" mt-4 ">
             <span class="inline-block mr-4 w-32 "> Options </span>
                    <Chips v-model="product.options"/>
                    
              </div>

          <button class="bg-gray-800 rounded text-white pr-2 pl-2 pt-1 pb-1" @click="addToCart">
            Save Changes
          </button>
          </div>
    </div>
    
</template>



<script>

import Chips from 'primevue/chips'

import { getProduct } from "../../../../api/products/products-api.js";
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
        product: null,
        value : null,
        name : String,
        description : String,
        category : String,
        price : String,
        options: [ ]

       }
   },
   async beforeCreate(){
     try {
      getProduct(this.$route.params.id).then(result => {
      this.product = result;
      console.log("THIS>PROF~uct" ,this.product)
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