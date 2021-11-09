<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div> 
  
  </div>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id">
          <Item :product="product" :id="product.id" :name="product.name" :href="product.href" :price="product.price" :imageSrc="product.images.imageSrc" :description="product.imageAlt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

 import mockdata from '@/mock-data/Products.json'
 import Item from './ItemCard.vue'

export default {
    components: {
        Item,
      
       
       
    },
    data (){
    return{
        products: mockdata
    }
    },
    created(){
        
    }

}
</script>
