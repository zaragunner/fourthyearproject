<template>
   <Dialog :modal="true" header="Add new Category" v-model:visible="newVatRateVisible" :style="{width: '50vw'}">
     <div class="m-2"> 
           <p class="inline-block"> VAT Rate Title  : </p> 
             <InputText
          class="p-inputtext-sm ml-2 inline-block"
          type="text"
          placeholder="Vat Rate title"
          v-model="vatTitle"
        />
     </div>
         <div class="m-2"> 
        <p class="inline-block"> VAT Rate as decimal  : </p> 
             <InputNumber
             mode="decimal" :minFractionDigits="2" :maxFractionDigits="2" 
          class="p-inputtext-sm ml-2 inline-block"
          type="decimal"
          placeholder="VAT Rate"
          v-model="vatRate"
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
import InputNumber from "primevue/inputnumber"

import { addVatRate } from "../../../../../api/vat/vat-api.js";
import { v4 as uuidv4 } from 'uuid';

export default {
    components:{
        Dialog,
        Button,
        InputText,
        InputNumber
    },
    props:{
        newVatRateVisible: Boolean,
    },
    data(){
        return{
            vatTitle: null,
            vatRate: null,
            vat_id: null
        }
    },
    methods :{
        cancel(){
            this.$emit('cancelVatModal')
        },
        async submit(){
             const result = await addVatRate({
         site_id: process.env.VUE_APP_SITEID ,
         name :this.vatTitle, 
        rate: this.vatRate,
         vat_id: uuidv4()
      }).then(res => {
          if(res){
              console.log('response is true')
              this.$emit('closeVatModal')
          }
      });
      
        }
        
    }
}
</script>

