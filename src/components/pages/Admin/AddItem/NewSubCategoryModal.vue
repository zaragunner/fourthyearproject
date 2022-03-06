<template>
   <Dialog :modal="true" header="Add new Sub-Category" v-model:visible="newSubCategoryVisible" :style="{width: '50vw'}">
     <div class="m-2"> 
              <p class="inline-block"> Sub-Category ID  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="number"
          placeholder="Category ID"
          v-model="sub_category_id"
        />
</div>
     
     
     
      <div class="m-2"> 
           <p class="inline-block">Sub-Category Name  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="text"
          placeholder="Sub-Category Name"
          v-model="subcategoryName"
        />
     </div>
         <div class="m-2"> 
        <p class="inline-block"> Sub-Category Description  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="text"
          placeholder="Sub-Category Description"
          v-model="subcategoryDescription"
        />
</div>



            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="cancel" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="submit" autofocus />
            </template>
        </Dialog>
    
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import InputText from "primevue/inputtext";

import { addSubCategory } from "../../../../../api/sub-categories/sub-categories-api"


export default {
    components:{
        Dialog,
        Button,
        InputText
    },
    props:{
        newSubCategoryVisible: Boolean,
    },
    data(){
        return{
            subcategoryName: null,
            subcategoryDescription: null,
            sub_category_id: null
        }
    },
    methods :{
        cancel(){
            this.$emit('cancelSubCategoryModal')
        },
        async submit(){
             const result = await addSubCategory({
         site_id: process.env.VUE_APP_SITEID ,
         name :this.subcategoryName, 
         description : this.subcategoryDescription,
         sub_category_id : this.sub_category_id
      }).then(res => {
          if(res){
              console.log('response is true')
              this.$emit('closeSubCategoryModal')
          }
      });
      
        }
        
    }
}
</script>

