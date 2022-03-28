<template>
<Toast/>
    <div class="flex space-x-4">
  <div class="flex-1 w-2/3 aspect-w-1 aspect-h-1  bg-red-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <!-- <img :src="product.images.thumbnail" :alt="product.description" class="w-full h-full object-center object-cover group-hover:opacity-75" /> -->
          </div>
          <div class="flex-1 w-1/4">
          <h3 v-if="this.product" class="mt-4 mx-auto text-sm text-gray-700">
            {{ product.name }}
          </h3>
          <p  v-if="this.product" class="mt-2 text-sm text-gray-600">
              {{ product.description }}
              </p>
          <p v-if="this.product" class="mt-1 text-lg font-medium text-gray-900">
            €{{ product.price.netprice }}
          </p>


  
          <Dropdown  v-if="this.product" v-model="value" :options="product.options? product.options : ['One Size']"     placeholder="Select a Size" />
           <!-- <SelectButton v-model="value" class="mb-2 mt-2" :options="product.options ? product.options : []" optionLabel="name" single /> -->
          <button class="bg-gray-800 rounded text-white pr-2 pl-2 pt-1 pb-1" @click="addToCart">
            Add to cart
          </button>
          </div>
    </div>
    
</template>



<script>
import Toast from 'primevue/toast';
// import SelectButton from 'primevue/selectbutton'
import Dropdown from 'primevue/dropdown'

 import { getProduct } from "../../../../api/products/products-api.js";
import { onMounted } from '@vue/runtime-core';
export default {
  components : {
      // SelectButton,
      Toast,
      Dropdown
    },
   data () {
       return{
        product: null,
        value : null,
  
       }
   },
   beforeCreate(){
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
   addToCart(){
     let product = this.product;
     product.size = this.value;
     this.$store.dispatch('cart/addToCart', product)
     console.log("this . prpoduct == " + JSON.stringify(product))
     this.$toast.add({severity:'success', summary: 'Item added to cart', life: 1500});
     
   }
 }
}
</script>