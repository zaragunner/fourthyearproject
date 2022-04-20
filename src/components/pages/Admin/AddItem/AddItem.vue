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
         <i @click="openNewVatRate" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i>
      
      </div>

      <div class="mt-2">
        <span class="inline-block mr-4 w-32"> Product Size Options: </span> <button @click="this.viewOptions = true"> View Options </button>
          <Listbox 
          v-if="viewOptions"
         :multiple="true" :filter="true"  listStyle="max-height:250px" style="width:15rem" filterPlaceholder="Search"
         v-model="options" 
        :options="allOptions"  
        placeholder="Select size options" 
        optionLabel="name" 
        optionValue="option_id"
        />
         <!-- <i @click="openNewVatRate" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i> -->
      
      </div>

      <div class="mt-4">
        <span class="inline-block mr-4 w-32"> Thumbnail </span>
        <div class="inline-block">
          <form id="newItemForm" enctype='multipart/form-data' >
       
    <label for="thumbnail">Select a file:</label>
  <input type="file" id="thumbnail" name="thumbnail" >
 <button @click="submit($event)"> Submit </button>
</form>
      </div>
      </div>
    </div>
  </div>
      <!-- <form id="newItemForm" enctype='multipart/form-data' >
  <label class="m-2" for="name">Product Name :</label><br>
  <input class="m-2"  type="text" id="name" name="name" v-model="name"><br>

  <label class="m-2" for="description">Product Description:</label><br>
  <input class="m-2" type="text" id="description" name="description" v-model="description"><br>

   <label class="m-2" for="category">Product Category:</label>
  <select class="m-2" id="category" name="category" v-model="category_id">
    <option class="m-2" v-for="category in this.categories" :key="category.category_id" :value="category.category_id">{{category.name}}</option>
  </select><br>

   <label class="m-2" for="sub_category">Product Sub-Category:</label>
  <select class="m-2" id="sub_category" name="sub_category" v-model="sub_category_id">
    <option class="m-2" v-for="subcategory in this.subCategories" :key="subcategory.sub_category_id" :value="subcategory.sub_category_id">{{subcategory.name}}</option>
  </select><br>

  <label class="m-2" for="netprice">Product Net Price:</label>
  <input class="m-2" type="number" id="price[0][netprice]" name="price[0][netprice]" v-model="netprice"><br>

  <label class="m-2" for="vatrate">Product Vat Rate:</label>
  <select class="m-2" id="price[0][vat_id]" name="price[0][vat_id]" v-model="vat_id">
    <option class="m-2" v-for="rate in this.vatRates" :key="rate.vat_id" :value="rate.vat_id">{{rate.name}}</option>
  </select><br>

 <label class="m-2" for="options">Product Size Options:</label>
  <select class="m-2" id="options" name="options" v-model="options" multiple>
    <option class="m-2" v-for="option in this.allOptions" :key="option.option_id" :value="option.option_id">{{option.name}}</option>
  </select><br> -->


     

      <!-- <AddItemModal 
      :name="name"
      :site_id ="site_id"
     :product_id="product_id"
     :description="description"
     :category_id="category_id"
     :sub_category_id="sub_category_id"
     :netprice="netprice"
     :vat_id="vat_id"
     :thumbnail=""
     :options="options"
     :visible="visible"
     @closeModal="closeModal"
     /> -->

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
      <NewVatRateModal 
     :visible="newVatRateVisible"
       @closeVatModal="closeVatRateModal"
     @cancelVatModal="cancelVatRateModal"
    
     />
   
</template>



<script>
import Chips from "primevue/chips";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
// import FileUpload from "primevue/fileupload";
import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';

// import AddItemModal from "./AddItemModal.vue"
import NewCategoryModal from "./NewCategoryModal.vue"
import NewSubCategoryModal from "./NewSubCategoryModal.vue"
import NewVatRateModal from "./NewVatRateModal.vue"
import Toast from 'primevue/toast';
import {getCategories} from '../../../../../api/categories/categories-api'
import {getSubCategories} from '../../../../../api/sub-categories/sub-categories-api'
import {getVatRates} from '../../../../../api/vat/vat-api'
import { addProduct } from "../../../../../api/products/products-api.js";
import { v4 as uuidv4 } from 'uuid';
import {getOptions} from "../../../../../api/options/options-api.js";

export default {
  components: {
    //   SelectButton,
    InputText,
    TextArea,
    Chips,
    // FileUpload,
    // AddItemModal,
    Toast,
    Dropdown,
    NewCategoryModal,
    NewSubCategoryModal,
    NewVatRateModal,
    Listbox
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
      allOptions : null,
      options: [],
      visible: false,
      newCategoryVisible: false,
      newSubCategoryVisible: false,
      newVatRateVisible: false,
      viewOptions: false
    };
  },
  async created() {
   this.getCategories();
   this.getSubCategories();
   this.getVatRates();
   this.getOptions();
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

async getOptions(){
  await getOptions().then(res =>{
    console.log("OPTIONS RES" , res)
    this.allOptions = res
  })
},

     async submit(e){
     console.log(this.options)
       e.preventDefault()
       var input = document.querySelector('input[type="file"]')
                const result = await addProduct({
        product_id: uuidv4(),
        site_id: parseInt(this.site_id),
        name: this.name,
        description: this.description,
        category_id: this.category_id,
        sub_category_id: this.sub_category_id,
        price: {
          netprice: this.netprice,
          vat_id: this.vat_id
        },
      thumbnail: input.files[0],
        options: this.options
      }).then(res => {
          if(res){
               this.clearInputs()
       this.$toast.add({severity:'success', summary: 'Item added', life: 1500});
          }
      });
      
        

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
     openNewVatRate(){
      this.newVatRateVisible = true
    },
    closeVatRateModal(){
      this.newVatRateVisible = false;
       this.$toast.add({severity:'success', summary: 'VAT rate added', life: 1500});
       this.getVatRates();

    },
    cancelVatRateModal(){
      this.newVatRateVisible= false;
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