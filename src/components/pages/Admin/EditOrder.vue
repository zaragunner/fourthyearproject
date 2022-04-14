<template>
    <div v-if="this.order != null">
        {{this.order}}
    </div>

</template>

<script>

import Chips from 'primevue/chips'

import { getOrder } from "../../../../api/orders/orders-api.js"
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea'
export default {
  components : {
    //   SelectButton,
      InputText,
      TextArea,
      Chips
    },
   data () {
       return{
        order: null

       }
   },
   async beforeCreate(){
     try {
      await getOrder(this.$route.params.id).then(result => {
      this.order = result;
      console.log("THIS order" ,this.order)
    })  
     
   }
    catch (error){
     console.log(error)
   }

   },

 methods : {

 }
}
</script>
