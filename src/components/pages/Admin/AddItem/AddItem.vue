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
         :showClear="subCategories.length > 5 ? true : false"
        />
          <i @click="openNewCategory" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i>
     
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
         :showClear="subCategories.length > 5 ? true : false"
        />
        <i @click="openNewSubCategory" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i>
     
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
          <!-- <FileUpload
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
        </div> -->
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

     <NewCategoryModal 
     :visible="newCategoryVisible"
     @closeCategoryModal="closeCategoryModal"
     @cancelCategoryModal="cancelCategoryModal"
     />
       <NewSubCategoryModal 
     :visible="newSubCategoryVisible"
     @closeSubCategoryModal="closeSubCategoryModal"
     @cancelSubCategoryModal="cancelSubCategoryModal"
     />
    </div>
    </div>
  </div>
</template>



<script>
import Chips from "primevue/chips";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
// import FileUpload from "primevue/fileupload";
import Dropdown from 'primevue/dropdown';

import AddItemModal from "./AddItemModal.vue"
import NewCategoryModal from "./NewCategoryModal.vue"
import NewSubCategoryModal from "./NewSubCategoryModal.vue"
import Toast from 'primevue/toast';
import {getCategories} from '../../../../../api/categories/categories-api'
import {getSubCategories} from '../../../../../api/sub-categories/sub-categories-api'
import {getVatRates} from '../../../../../api/vat/vat-api'

export default {
  components: {
    //   SelectButton,
    InputText,
    TextArea,
    Chips,
    // FileUpload,
    AddItemModal,
    Toast,
    Dropdown,
    NewCategoryModal,
    NewSubCategoryModal
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
      visible: false,
      newCategoryVisible: false,
      newSubCategoryVisible: false
    };
  },
  async created() {
   this.getCategories();
   this.getSubCategories();
   this.getVatRates();
  },
  methods: {
async getCategories(){
 await getCategories().then(result => {
     this.categories = result;  
    })
},
async getSubCategories(){
    await getSubCategories().then(res => {
      this.subCategories = res;
    })
},
async getVatRates(){
    await getVatRates().then(res => {
      this.vatRates = res
    })
},



    submit(){
      this.visible = true

    },
    closeModal(){
      this.visible = false;
      this.clearInputs()
       this.$toast.add({severity:'success', summary: 'Item added', life: 1500});

    },
        openNewCategory(){
      this.newCategoryVisible = true
    },
    closeCategoryModal(){
      this.newCategoryVisible = false;
       this.$toast.add({severity:'success', summary: 'Cateogry added', life: 1500});
       this.getCategories();

    },
    cancelCategoryModal(){
      this.newCategoryVisible = false;
    },

      closeSubCategoryModal(){
      this.newSubCategoryVisible = false;
       this.$toast.add({severity:'success', summary: 'Sub Cateogry added', life: 1500});
       this.getSubCategories();

    },
       openNewSubCategory(){
      this.newSubCategoryVisible = true
    },
    cancelSubCategoryModal(){
      this.newSubCategoryVisible = false;
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