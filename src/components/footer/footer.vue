<template>
    <!-- <div v-if="this.$store.state.site.site" class="bg-gray-600 w-full relative ">
    <div>
        Hello
    </div>
        <div class="absolute w-1/6 bg-red-500  right-0">
        <h3> Contact Us! </h3>
        <div></div>
     <div><p class="inline-block font-semibold"> Phone:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.phone}} </p>  </div>
    <div> </div>
        </div>
   
</div> -->
<footer v-if="this.$store.state.site.site" class="pt-4 pb-4 pl-36 pr-12 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">{{this.$store.state.site.site.name}}
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
           <li class="mr-4">
            <p class="inline-block font-semibold"> Email:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.email}}</p>
        </li>
           <li class="mr-4">
            <p class="inline-block font-semibold"> Phone:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.phone}} </p>
        </li>
        <li class="mr-4">
          <p class="inline-block font-semibold"> Postcode:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.postcode}} </p>
        </li>
       
    </ul>
</footer>
</template>



<script>
export default {
    mounted(){
console.log("LOOGING FROM FOOTER" ,this.$store.state.site.site)
    }
}
</script>