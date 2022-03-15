<template>
    <div v-if="this.$store.state.site.site" class="w-full bg-gray-200 ">
        <h3> Contact Us! </h3>
        <div><p class="inline-block font-semibold"> Email:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.email}}</p></div>
     <div><p class="inline-block font-semibold"> Phone:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.phone}} </p>  </div>
    <div><p class="inline-block font-semibold"> Postcode:  </p> <p class="inline-block">{{this.$store.state.site.site.contact_us.postcode}} </p> </div>
   
    </div>
</template>

<script>
export default {
    mounted(){
console.log("LOOGING FROM FOOTER" ,this.$store.state.site.site)
    }
}
</script>