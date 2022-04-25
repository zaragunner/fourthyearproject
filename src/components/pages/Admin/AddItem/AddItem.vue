<template>
<Toast/>
  <div class="m-4 ml-12 flex space-x-4">
   
    <div class="flex-1 w-1/3"> 
     <h1 class="bg-gray-200 w-1/3 p-2 shadow-sm text-xl font-semibold"> Add New Item </h1>
      <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Name </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="text"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="inline-block mt-2">
        <span class="inline-block align-top mr-4 mt-2 w-32"> Description </span>
      </div>
      <div class="inline-block align-top  mt-2">
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
        <span class="inline-block mr-4 w-32"> Product Size Options: </span>
         <button class="bg-white outline-gray text-gray-500 p-2 rounded-lg text-md  " 
         @click="this.viewOptions = !this.viewOptions"> 
         {{this.viewOptions ? 'Close Options' : 'Select Size Options' }} 
           <i v-if="this.viewOptions == false" class="pi pi-chevron-down"/>  
           <i v-if="this.viewOptions == true" class="pi pi-chevron-up"/>
           </button> <i @click="openNewOption" class="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer inline-block pi pi-plus-circle"></i>
          <Listbox 
          class="ml-36"
          v-if="viewOptions"
         :multiple="true" :filter="true"  listStyle="max-height:250px" style="width:15rem" filterPlaceholder="Search"
         v-model="options" 
        :options="allOptions"  
        placeholder="Select size options" 
        optionLabel="name" 
        optionValue="option_id"
        />
        
      
      </div>

      <div class="mt-4">
        <span class="inline-block mr-4 w-32"> Thumbnail </span>
        <div class="inline-block">
          <form id="newItemForm" enctype='multipart/form-data' >
       
    <label for="thumbnail">Select a file:</label>
  <input type="file" id="thumbnail" name="thumbnail" >
 <button class="bg-gray-900 p-3 rounded-lg  text-white outline-none" @click="submit($event)"> Submit </button>
</form>
      </div>
      </div>
    </div>
  </div>

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
     <NewOptionModal 
     :visible="newOptionVisible"
       @closeOptionsModal="closeOptionsModal"
     @cancelOptionsModal="cancelOptionsModal"
    
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
import NewOptionModal from "./NewOptionModal.vue"
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
    Listbox,
    NewOptionModal,
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
      viewOptions: false,
      newOptionVisible: false
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
 await getCategories(process.env.VUE_APP_SITEID).then(result => {
     this.categories = result;  
    })
},
async getSubCategories(){
  const site = process.env.VUE_APP_SITEID
    await getSubCategories(site).then(res => {
      this.subCategories = res;
    })
},
async getVatRates(){
const site = process.env.VUE_APP_SITEID
    await getVatRates(site).then(res => {
      this.vatRates = res
    })
},

async getOptions(){
 const site = process.env.VUE_APP_SITEID;
    await getOptions(site).then(res =>{
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
  openNewOption(){
      this.newOptionVisible = true
    },
   closeOptionsModal(){
      this.newOptionVisible = false;
       this.$toast.add({severity:'success', summary: 'Cateogry added', life: 1500});
       this.getOptions();

    },
    cancelOptionsModal(){
      this.newOptionVisible = false;
    },
  },
};
</script>