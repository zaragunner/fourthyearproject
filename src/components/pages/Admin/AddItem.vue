<template>
<Toast/>
  <div class="m-4 flex space-x-4">
    <div class="flex rounded-lg overflow-hidden">
      <img
        class="h-64 w-64 object-center object-cover group-hover:opacity-75"
      />
    </div>

    <div class="flex-1">
       <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32">Product ID </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="number"
          placeholder="Product ID"
          v-model="product_id"
        />
      </div>
       
      <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Name </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="text"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="inline-block bg-red-500 mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Description </span>
      </div>
      <div class="inline-block bg-blue-600 mt-2">
        <TextArea
          v-model="description"
          :autoResize="true"
          placeholder="Description"
          rows="5"
          cols="30"
        />
      </div>
      <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Category </span>
        <Dropdown v-model="category_id" 
        :options="categories"  
        placeholder="Select a Category" 
        optionLabel="name" 
        optionValue="category_id"
         :filter="categories.length > 5 ? true : false"
         :showClear="true"
        />
      </div>
       <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Sub Category </span>
         <Dropdown 
         v-model="sub_category_id" 
        :options="subCategories"  
        placeholder="Select a sub-category" 
        optionLabel="name" 
        optionValue="sub_category_id"
         :filter="subCategories.length > 5 ? true : false"
         :showClear="true"
        />
      </div>
      <div class="mt-2">
        <span class="inline-block mr-4 w-32"> Price </span>
        <InputText
          class="p-inputtext-sm"
          type="number"
          placeholder="Price"
          v-model="netprice"
        />
      </div>
        <div class="mt-2">
        <span class="inline-block mr-4 w-32"> VAT Category </span>
          <Dropdown 
         v-model="vat_id" 
        :options="vatRates"  
        placeholder="Select a vat rate" 
        optionLabel="name" 
        optionValue="vat_id"
        />
      </div>

      <div class="mt-4">
        <span class="inline-block mr-4 w-32"> Options </span>
        <Chips v-model="options" />
      </div>

      <div class="mt-4">
        <span class="inline-block mr-4 w-32"> Thumbnail </span>
        <div class="inline-block">
           <InputText
          class="p-inputtext-sm"
          type="text"
          placeholder="Thumbnail"
          v-model="thumbnail"
        />
          <FileUpload
            class="inline-block"
            name="demo[]"
            url="./upload.php"
         
            :multiple="false"
            accept="image/*"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>
      </div>

      <button
        class="bg-gray-800 rounded text-white pr-2 pl-2 pt-1 pb-1"
        @click="submit"
      >
        Add Item
      </button>

      <AddItemModal 
      :name="name"
      :site_id ="site_id"
     :product_id="product_id"
     :description="description"
     :category_id="category_id"
     :sub_category_id="sub_category_id"
     :netprice="netprice"
     :vat_id="vat_id"
     :thumbnail="thumbnail"
     :options="options"
     :visible="visible"
     @closeModal="closeModal"
     />
    </div>
  </div>
</template>



<script>
import Chips from "primevue/chips";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Dropdown from 'primevue/dropdown';

import AddItemModal from "./AddItemModal.vue"
import Toast from 'primevue/toast';
import {getCategories} from '../../../../api/categories/categories-api'
import {getSubCategories} from '../../../../api/sub-categories/sub-categories-api'
import {getVatRates} from '../../../../api/vat/vat-api'

export default {
  components: {
    //   SelectButton,
    InputText,
    TextArea,
    Chips,
    FileUpload,
    AddItemModal,
    Toast,
    Dropdown
  },
  data() {
    return {
      categories: [],
      subCategories: [],
      vatRates:[],
      site_id: process.env.VUE_APP_SITEID,
      product_id: null,
      name: null,
      description: null,
      category_id: null,
      sub_category_id: null,
      netprice: null,
      vat_id: null,
      thumbnail: null,
      options: null,
      visible: false
    };
  },
  async created() {
    await getCategories().then(result => {
     this.categories = result;  
    })
    await getSubCategories().then(res => {
      this.subCategories = res;
    })
    await getVatRates().then(res => {
      this.vatRates = res
    })
  },
  methods: {
    submit(){
      this.visible = true

    },
    closeModal(){
      this.visible = false;
      this.clearInputs()
       this.$toast.add({severity:'success', summary: 'Item added', life: 1500});

    },
    clearInputs(){
      this.product_id=null
      this.name='',
      this.description= '',
      this.category_id= null,
      this.sub_category_id= null,
      this.netprice= null,
      this.vat_id=null,
      this.thumbnail='',
      this.options=[]

    },
    // onUpload(file) {
    //   this.$toast.add({
    //     severity: "info",
    //     summary: "Success",
    //     detail: "File Uploaded",
    //     life: 3000,
    //   });
       
    //   // Handle files like:
    //   this.thumbnail = file
    
    // },
    async addItem() {
 
     

      console.log(result.code);
    },
  },
};
</script>