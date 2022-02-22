<template>
  <div class="">
      <div class="p-2 m-2 bg gray-300 text-center">
          <h3> Todays special offers! </h3>
          <p> 10% off X range </p>
      </div>
  <div class="card  w-2/3 mx-auto rounded bg-gray-50 p-4 m-2 ">
            <Carousel :value="products" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" :autoplayInterval="3000">
                <template #item="slotProps">
                 
                    <div class=" product-item">
                        <div class=" h-96 border-solid bg-white border-2 border-gray-200 rounded m-2 text-center p-4">
                            <router-link :to="'/'  + slotProps.data.product_id" >
                            <div class="mb-3">
                                <!-- <img :src="slotProps.data.images.thumbnail" :alt="slotProps.data.name" class="product-image" /> -->
                            </div>
                           
                         </router-link>
                         <div>
                                <h4 class="mb-1">{{slotProps.data.description }}</h4>
                              
                                <h6 class="mt-0 mb-3">€{{slotProps.data.price.netprice}}</h6>
                                <!-- <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span> -->
                                <div class=" mt-5">
                                    <Button icon="pi pi-shopping-cart"  @click="addToCart(slotProps.data)" class="p-button h-8 w-8 p-button-rounded mr-2" />
                        
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
// import Button from 'primevue/button'
 import { getProducts } from "../../../../api/products/products-api.js";

export default {
 
    components :{
            Carousel,
            // Button
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
			]
        }
    },
     methods : {
   addToCart(product){
     this.$store.dispatch('cart/addToCart',product)
     console.log("this . prpoduct == " + JSON.stringify(product))
   }
 },
 mounted(){
       getProducts().then(result => {
      this.products = result;
      console.log(this.products)
    })
 }
}
</script>
