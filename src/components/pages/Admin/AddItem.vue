<template>
    <div class="m-4 flex space-x-4">
  <div class="flex rounded-lg overflow-hidden">
            <img  class="h-64 w-64 object-center object-cover group-hover:opacity-75" />
          </div>

          <div class="flex-1  ">
            <div class=" mt-2 ">
              <span class="inline-block mr-4 mt-2 w-32  "> Name </span>
             <InputText  class="inline-block p-inputtext-sm" type="text" placeholder="Name" v-model="name" />
              </div>
             <div class=" inline-block bg-red-500 mt-2 ">
              <span class="inline-block mr-4 mt-2 w-32  "> Description </span>
             </div>
             <div class="inline-block bg-blue-600 mt-2">
              <TextArea v-model="description" :autoResize="true" placeholder="Description" rows="5" cols="30" />
              </div>
                <div class=" mt-2 ">
              <span class="inline-block mr-4 mt-2 w-32  "> Category </span>
             <InputText  class="inline-block p-inputtext-sm" type="text" placeholder="Category" v-model="category" />
              </div>
              <div class=" mt-2 ">
             <span class="inline-block mr-4 w-32 "> Price </span>
             <InputText  class="p-inputtext-sm" type="text" placeholder="Price" v-model="price" />
              </div>
         
            <div class=" mt-4 ">
             <span class="inline-block mr-4 w-32 "> Options </span>
                    <Chips v-model="options"/>
              </div>

                <div class=" mt-4 ">
             <span class="inline-block mr-4 w-32 "> Images </span>
             <div class="inline-block">
                    <FileUpload class="inline-block " name="demo[]" url="./upload.php" @upload="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
             </div>
              </div>

          <button class="bg-gray-800  rounded text-white pr-2 pl-2 pt-1 pb-1" @click="addItem">
            Add Item
          </button>
          </div>
    </div>
    
</template>



<script>

import Chips from 'primevue/chips'
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload';

export default {
  components : {
    //   SelectButton,
      InputText,
      TextArea,
      Chips,
      FileUpload
    },
   data () {
       return{
        value : null,
        name : null,
        description : null,
        category : null,
        price : null,
        options: [ ]

       }
   },
 async created(){
     
 
    
 },
  methods: {
        onUpload() {
            this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
        },
        addItem(){
          {
  		"product_id": this.product_id,
		"site_id": this.site_id,
        "description": this.description,
        "category_id": this.category_id,
        "sub_category_id": this.sub_category_id,
        "price" : {
      "netprice" : this.netprice,
      "vat_id" : vat_id,
      "discount_price" : this.discount
        },
        "images"  :{
      "thumbnail" :this.thumbnail
  },
        "options" : this.options
        
}
            
        }
    }
}
</script>