<template>
    <div class="flex space-x-4">
  <div class="flex-1 w-2/3 aspect-w-1 aspect-h-1  bg-red-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img :src="product.images.imageSrc" :alt="product.imageAlt" class="w-full h-full object-center object-cover group-hover:opacity-75" />
          </div>
          <div class="flex-1 w-1/4">
          <h3 class="mt-4 mx-auto text-sm text-gray-700">
            {{ product.name }}
          </h3>
          <p class="mt-2 text-sm text-gray-600">
              {{ product.description }}
              </p>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }}
          </p>
          <button class="bg-gray-800 rounded text-white pr-2 pl-2 pt-1 pb-1">
            Add to cart
          </button>
          </div>
    </div>
    
</template>
<script>

 import mockdata from '@/mock-data/Products.json'
export default {
   data () {
       return{
        product: null
       }
   },
 async created(){
   try {
     const json = mockdata
  
     for (const product of json){  
       if(product.id === this.$route.params.id)
      {
        this.product = product;
        console.log(product)
        break;
      
      }
     }
   }
   catch (error){
     console.log(error)
   }
 }
}
</script>