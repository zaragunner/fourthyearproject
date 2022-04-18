<template>
<Toast/>
    <div class="flex space-x-4">
  <div class="flex-1 w-2/3 aspect-w-1 aspect-h-1  bg-red-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img :src="`http://localhost:4001/${product.thumbnail.fileName}`" :alt="product.description" class="w-full h-full object-center object-cover group-hover:opacity-75" />
          </div>
          <div class="flex-1 w-1/4">
          <h3 v-if="this.product" class="mt-4 mx-auto text-sm text-gray-700">
            {{ product.name }}
          </h3>
          <p  v-if="this.product" class="mt-2 text-sm text-gray-600">
              {{ product.description }}
              </p>
          <p v-if="this.product" class="mt-1 text-lg font-medium text-gray-900">
          € {{ 
                                    getPrice(product.price.netprice , product.price.vat_id)
                                }}  
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
import { getVatRates }  from '../../../../api/vat/vat-api.js';

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
        vatRates: null
  
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
   
    getVatRates().then(res => {
    this.vatRates = res
   console.log(this.vatRates)
    })    
 },
 methods : {
   addToCart(item){
             const cost = this.getPrice(item.price.netprice, item.price.vat_id)
                const prod = {
                    item,
                    cost: cost 
                }
              this.$store.dispatch('cart/addToCart',prod)
  
     this.$toast.add({severity:'success', summary: 'Item added to cart', life: 1500});
     
         },
   addToCart(){
      const cost = this.getPrice(this.product.price.netprice, this.product.price.vat_id)
                const prod = {
                    item: this.product,
                    cost: cost 
                }
     prod.item.size = this.value;
     this.$store.dispatch('cart/addToCart', prod)
     console.log("this . prpoduct == " + JSON.stringify(product))
     this.$toast.add({severity:'success', summary: 'Item added to cart', life: 1500});
     
   },
     getPrice(price, vatID){
             const vrate = this.vatRates.filter(rate =>{
                    return rate.vat_id == vatID
             })
             console.log(price , vrate[0].rate)
            return price * (1 + vrate[0].rate)
         },
         
 }
}
</script>