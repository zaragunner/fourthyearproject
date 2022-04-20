<template>
   <Dialog :modal="true" header="Add New Size Option" v-model:visible="newOptionVisible" :style="{width: '50vw'}">
     <div class="m-2"> 
           <p class="inline-block"> Option name : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="text"
          placeholder="Name"
          v-model="name"
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


import { addOption } from "../../../../../api/options/options-api.js";
import { v4 as uuidv4 } from 'uuid';

export default {
    components:{
        Dialog,
        Button,
        InputText,
    },
    props:{
        newOptionVisible: Boolean,
    },
    data(){
        return{
            name: null
        }
    },
    methods :{
        cancel(){
            this.$emit('cancelOptionsModal')
        },
        async submit(){
             const result = await addOption({
         site_id: process.env.VUE_APP_SITEID ,
         name :this.name, 
         option_id: uuidv4()
      }).then(res => {
          if(res){
              console.log('response is true')
              this.$emit('closeOptionsModal')
          }
      });
      
        }
        
    }
}
</script>

