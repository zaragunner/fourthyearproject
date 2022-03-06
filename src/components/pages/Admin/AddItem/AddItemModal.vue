<template>
   <Dialog :modal="true" header="Confirm product Details" v-model:visible="visible" :style="{width: '50vw'}">
       <p>Product Name :  {{name}} </p>
       <p>Product Description :  {{description}} </p>
       <p>Category : {{category_id}} </p>
       <p>Sub-Category : {{sub_category_id}} </p>
       <p>Price : {{netprice}} </p>
       <p>Options : {{options}} </p>


            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="cancel" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="submit" autofocus />
            </template>
        </Dialog>
    
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import { addProduct } from "../../../../../api/products/products-api.js";


export default {
    components:{
        Dialog,
        Button
    },
    props:{
        visible: Boolean,
         site_id: Number,
      product_id: Number,
      name: String,
      description: String,
      category_id: Number,
      sub_category_id: Number,
      netprice: Number,
      vat_id: Number,
      thumbnail: String,
      options: Array,
    },
    methods :{
        async submit(){
             const result = await addProduct({
        product_id: this.product_id,
        site_id: parseInt(this.site_id),
        name: this.name,
        description: this.description,
        category_id: this.category_id,
        sub_category_id: this.sub_category_id,
        price: {
          netprice: this.netprice,
          vat_id: this.vat_id
        },
        images: {
          thumbnail: this.thumbnail,
        },
        options: this.options
      }).then(res => {
          if(res){
              console.log('response is true')
              this.$emit('closeModal')
          }
      });
      
        }
        
    }
}
</script>

