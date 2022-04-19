<template>
  <div class="">
      <div class="p-2 m-2 bg gray-300 text-center">
          <h3> Todays special offers! </h3>
          <p> 10% off X range </p>
      </div>
  <div class="card  w-2/3 mx-auto rounded bg-gray-50 p-4 m-2 ">
            <Carousel v-if="this.vatRates" :value="products" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" :autoplayInterval="3000">
                <template #item="slotProps">
                 
                    <div class=" product-item">
                        <div class=" h-96 border-solid bg-white border-2 border-gray-200 rounded m-2 text-center p-4">
                            <router-link :to="'/'  + slotProps.data.product_id" >
                            <div class="mb-3">
                                <img :src="`http://localhost:4001/${slotProps.data.thumbnail.fileName}`" :alt="slotProps.data.name" class="w-1/4 h-1/4 mx-auto object-fit " />
                            </div>
                           
                         </router-link>
                         <div>
                                <h4 class="mb-1">{{slotProps.data.description }}</h4>
                              
                                <h6 v-if="this.vatRates" class="mt-0 mb-3"> €{{ 
                                    getPrice(slotProps.data.netprice , slotProps.data.vat_id)
                                }}</h6>
                                <!-- <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span> -->
                                <div class=" mt-5">
                                    <Button icon="pi pi-shopping-cart"  @click="addToCart(slotProps.data)" class="p-button h-6 w-4 p-button-rounded mr-2" />
                        
                                </div>
                            </div>
                        </div>
                        </div>
                   
                </template>
            </Carousel>
        </div>
  
  </div>



  


</template>

<script> 
import Carousel from 'primevue/carousel';
import Button from 'primevue/button'
 import { getProducts } from "../../../../api/products/products-api.js";
import { getVatRates } from '../../../../api/vat/vat-api.js'
import Buffer from 'buffer/';
export default {
 
    components :{
            Carousel,
            Button
    },
    data (){
        return {
            products: null,
            responsiveOptions: [
			
				{
					breakpoint: '1020px',
					numVisible: 3,
					numScroll: 1
				},
                {
					breakpoint: '1280px',
					numVisible: 3,
					numScroll: 1
				},

				{
					breakpoint: '480px',
					numVisible: 1,
					numScroll: 1
				}
			],
            vatRates: null
        }
    },
     methods : {
         arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
},

getImage(data){
    const type = "data:" + data.contentType.toString() + ";base64,"
    const buffer = Buffer.Buffer.from(data.data).toString('base64')
    return type + buffer
}
  ,
   addToCart(item){
             const cost = this.getPrice(item.netprice, item.vat_id)
                const prod = {
                    item,
                    cost: cost 
                }
              this.$store.dispatch('cart/addToCart',prod)
     console.log("item == " + JSON.stringify(item))
     this.$toast.add({severity:'success', summary: 'Item added to cart', life: 1500});
     
         },
    getPrice(price, vatID){
      
             const vrate = this.vatRates.filter(rate =>{
                    return rate.vat_id == vatID
             })
                const p =  price * (1 + vrate[0].rate)
             const cost  = Math.round(p * 100) / 100
            return cost
         }
 },
async created(){
       await getProducts().then(result => {
      this.products = result;
      console.log("products" , this.products)
    })
    await  getVatRates().then(result => {
        this.vatRates = result;
        console.log("vat rates" , this.vatRates)
    })
 }
}
</script>
