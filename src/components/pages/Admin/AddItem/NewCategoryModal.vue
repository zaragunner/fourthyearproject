<template>
   <Dialog :modal="true" header="Add new Category" v-model:visible="newCategoryVisible" :style="{width: '50vw'}">
     <div class="m-2"> 
              <p class="inline-block"> Category ID  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="number"
          placeholder="Category ID"
          v-model="category_id"
        />
</div>
     
     
     
      <div class="m-2"> 
           <p class="inline-block"> Category Name  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="text"
          placeholder="Category Name"
          v-model="categoryName"
        />
     </div>
         <div class="m-2"> 
        <p class="inline-block"> Category Description  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="text"
          placeholder="Category Description"
          v-model="categoryDescription"
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

import { addCategory } from "../../../../../api/categories/categories-api.js";


export default {
    components:{
        Dialog,
        Button,
        InputText
    },
    props:{
        newCategoryVisible: Boolean,
    },
    data(){
        return{
            categoryName: null,
            categoryDescription: null,
            category_id: null
        }
    },
    methods :{
        cancel(){
            this.$emit('cancelCategoryModal')
        },
        async submit(){
             const result = await addCategory({
         site_id: process.env.VUE_APP_SITEID ,
         name :this.categoryName, 
         description : this.categoryDescription,
         category_id : this.category_id
      }).then(res => {
          if(res){
              console.log('response is true')
              this.$emit('closeCategoryModal')
          }
      });
      
        }
        
    }
}
</script>

