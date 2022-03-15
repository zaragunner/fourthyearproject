<template>
     <router-link :to="`/${id}`" :product="product">
          <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img :src="imageSrc" :alt="imageAlt" class="w-full h-full object-center object-cover group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ name }}
          </h3>
          <p class="mt-2 text-sm text-gray-600">
              {{ description }}
              </p>
          <p class="mt-1 text-lg font-medium text-gray-900">
            €{{ price }}
          </p>

          
        </router-link>
       
</template>

<script>
export default {

    props: {
      id: String,
       imageSrc : String,
       imageAlt:  String,
       name:  String,
       price:  String,
       description : String,
       product: Object
    },
    
}
 </script>