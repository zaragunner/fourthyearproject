<template>
<Toast/>
    <div class="flex space-x-4">
  <div class="flex-1 w-2/3 aspect-w-1 aspect-h-1  bg-red-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img v-if="this.product" :src="`https://fyp-express-api.herokuapp.com/${product.thumbnail.fileName}`" :alt="product.description" class="w-full h-full object-center object-cover group-hover:opacity-75" />
          </div>
          <div class="flex-1 mt-8 w-1/4">
          <div>
          <h3 v-if="this.product" class="text-2xl font-extrabold text-gray-900 sm:pr-12">
            {{ product.name }}
          </h3>
          </div>
          <div class="bg-gray-50 p-4 mt-4 text-gray-600">
          <div v-if="this.product" class="mt-2  text-gray-600">
              <p><span class="font-semibold text-md"> Product Details: </span></p>{{ product.description }}
             </div> 
          <p v-if="this.product" class="text-2xl text-gray-900">
          € {{ 
                                    getPrice(product.netprice , product.vat_id)
                                }}  
          </p>


  
          <Dropdown  v-if="this.product" v-model="value" :options="options"  optionLabel="name" 
        optionValue="option_id"     placeholder="Select a Size" />
       
          </div>
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
import { getOption} from '../../../../api/options/options-api.js';

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
        vatRates: null,
        options: []
  
       }
   },
  async  beforeCreate(){
   try {
      getProduct(this.$route.params.id).then(result => {
      this.product = result;
      this.product.options.forEach(option => {
        console.log("OPTION IN LOOP " , option)
      getOption(option).then(res =>{
      this.options.push(res)
      }
     )
      console.log("OPTIONS" , this.options)
   })
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

   addToCart(){
      const cost = this.getPrice(this.product.netprice, this.product.vat_id)
                const prod = {
                    item: this.product,
                    cost: cost 
                }
     prod.item.size = this.value;
     this.$store.dispatch('cart/addToCart', prod)
     this.$toast.add({severity:'success', summary: 'Item added to cart', life: 1500});
   },
     getPrice(price, vatID){
             const vrate = this.vatRates.filter(rate =>{
                    return rate.vat_id == vatID
             })
             console.log(price , vrate[0].rate)
               const p =  price * (1 + vrate[0].rate)
             const cost  = Math.round(p * 100) / 100
            return cost
         },
         
 }
}
</script>
<style>
@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: #0057e7;
    }
    40% {
        stroke: #0057e7;
    }
    66% {
        stroke: #0057e7;
    }
    80%,
    90% {
        stroke: #0057e7;
    }
}

</style>