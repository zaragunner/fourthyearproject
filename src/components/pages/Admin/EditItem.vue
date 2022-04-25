<template>
<Toast/>
<div class="m-4 flex space-x-4">
    <div class="flex rounded-lg overflow-hidden">
       <img v-if="this.product" :src="`https://fyp-express-api.herokuapp.com/${this.product.thumbnail.fileName}`"   class="h-64 w-64 object-center object-cover group-hover:opacity-75" />
     
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
      <div class="inline-block align-top mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Description </span>
      </div>
      <div class="inline-block align-top mt-2">
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
         :showClear="categories.length > 5 ? true : false"
        />
          <i @click="openNewCategory" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i>
     
      </div>
       <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Sub Category </span>
        <Dropdown 
         v-model="catID" 
        :options="subCategories"  
        placeholder="Select a sub-category" 
        optionLabel="name" 
        optionValue="sub_category_id"
         :filter="subCategories.length > 5 ? true : false"
         
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
        <span class="inline-block mr-4 w-32"> Product Size Options: </span> 
  	    <button class="bg-white outline-gray text-gray-500 p-2 rounded-lg text-md  " 
         @click="this.viewOptions = !this.viewOptions"> 
         {{this.viewOptions ? 'Close Options' : 'Select Size Options' }} 
           <i v-if="this.viewOptions == false" class="pi pi-chevron-down"/>  
           <i v-if="this.viewOptions == true" class="pi pi-chevron-up"/>
           </button> <i @click="openNewOption" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i>
          <Listbox 
          class="ml-24"
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
        
        <div class="relative w-1/3 bg-gray-500 inline-block">
      <button class="bg-gray-900 absolute right-0 p-3 rounded-lg  text-white outline-none" @click="submit($event)"> Submit </button>


      </div>
      </div>
    </div>
  </div>
    
</template>



<script>

import Chips from 'primevue/chips'

import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';

import { getProduct, updateProduct } from "../../../../api/products/products-api.js";
import {getCategories} from '../../../../api/categories/categories-api'
import {getSubCategories} from '../../../../api/sub-categories/sub-categories-api'
import {getVatRates} from '../../../../api/vat/vat-api'

import {getOptions} from "../../../../api/options/options-api.js";
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea'
import Toast from 'primevue/toast'
export default {
  components : {
    //   SelectButton,
      InputText,
      TextArea,
      Dropdown,
      Listbox,
      Toast
    },
   data () {
       return{
         catID: null,
        product: null,
        value : null,
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

       }
   },
   async beforeCreate(){
     try {
      getProduct(this.$route.params.id).then(result => {
      
      this.product = result;
      this.name = this.product.name;
      this.description = this.product.description;
      this.category_id = this.product.category_id;
      this.netprice = this.product.netprice;
      this.vat_id = this.product.vat_id;
      this.options = this.product.options;
      this.catID = this.product.sub_category_id;
      
    })  
    
   }
    catch (error){
     console.log(error)
   }
   },
    async created() {
   this.getCategories();
   this.getSubCategories();
   this.getVatRates();
   this.getOptions();
  },
  methods: {
async getCategories(){
 await getCategories(process.env.VUE_APP_SITEID).then(result => {
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
    e.preventDefault()
  const result = await updateProduct({
        product_id : this.product.product_id,
        name: this.name,
        description: this.description,
        category_id: this.category_id,
        sub_category_id: this.catID,
        price: {
          netprice: this.netprice,
          vat_id: this.vat_id
        },
        options: this.options
      }).then(res => {
          if(res.status == 200){
       this.$toast.add({severity:'success', summary: 'Item Updated', life: 1500});
          }
           else{
           this.$toast.add({severity:'error', summary: 'Update failed', life: 1500});
         }
      });
}
  }
}
</script>