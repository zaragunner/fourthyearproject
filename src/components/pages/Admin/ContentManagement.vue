<template>
<div class="w-full mx-auto">
<div class=" w-full p-2 ">
    <div class="">
        <p class="font-semibold text-lg "> Edit Configurations </p>
    </div>

  <router-link to="/categories"> <button class="p-2 m-2 bg-gray-700 text-white rounded"  > Categories </button> </router-link>
    <router-link to="/subcategories"> <button class="p-2 m-2 bg-gray-700 text-white rounded"  > SubCategories </button>    </router-link>  
    <router-link to="/vatrates"><button class="p-2 m-2 bg-gray-700 text-white rounded"  > Vat Rates </button></router-link>
    <router-link to="/options"><button class="p-2 m-2 bg-gray-700 text-white rounded"  > Size Options </button></router-link>
</div>
<Toast/>
    <div class="bg-gray-200 w-11/12 mx-auto p-2 m-1 ">
      <DataTable 
      class="p-datatable-sm"
      :value="products" 
      :paginator="true" 
      :rows="10"
      dataKey="product_id" 
      :rowHover="true" 
      v-model:selection="selectedProduct" 
      v-model:filters="filters" 
      filterDisplay="menu" 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :rowsPerPageOptions="[10,25,50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      :globalFilterFields="['name']" 
      responsiveLayout="scroll"
      :sortOrder="sortOrder"
     :sortField="sortField"
     @rowSelect="onRowSelect"
      >

 <template #header>
                   <h5 class="m-1">Catalogue Management </h5>
                    <Toolbar>
    <template #start>
         
        <span class="m-2 block p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value"  placeholder="Keyword Search" />
                    </span>

                     <div class="m-2 block col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Category" @change="onSortChange($event)"/>
                    </div>
    </template>

    <template #end>
          
               
            <button class="p-2 m-2 bg-gray-700 text-white rounded" @click="deleteItems()" > Delete Items </button>
            <button class="p-2 m-2 bg-gray-700 text-white rounded" > Apply Discount </button>
              <router-link  :to="`/addItem`" ><button class="p-2 m-2 bg-gray-700 text-white rounded" > Add New Items </button></router-link>
    </template>
</Toolbar>
               
                    
                    
                
            </template>
     

        <Column selectionMode="single" headerStyle="width: 3rem"></Column>
           <Column field="image" header="" style="min-width: 8rem">
                <template #body="{data}">
                   <img class="w-24 h-24" :src="`https://fyp-express-api.herokuapp.com/${data.thumbnail.fileName}`"/>
                </template>
             </Column>
        <Column field="name" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.name}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>


            <Column  header="Category" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <div v-if="this.categories">
                  {{getCategory(data.category_id)}}
                    </div>

                </template>
                
            </Column>

            
            <Column field="description" header="Description"  style="min-width: 14rem">
                <template #body="{data}">
                  {{data.description}}
                </template>
            </Column>

             <Column  style="min-width:8rem" field="price" header="Price" sortable >
                <template #body="{data}">
                    <div v-if="this.vatRates">
                  €{{getPrice(data.netprice, data.vat_id)}}
                    </div>
                </template>
            </Column>

      

  <Column style="min-width:5rem">
                <template #body="{data}">
                  <router-link  :to="`/edititem/${data.product_id}`" ><i class="pi pi-pencil text-white rounded p-2 hover:bg-gray-500 bg-gray-300" style="font-size: 1rem"></i> </router-link>
                </template>
             </Column>
  
             
      </DataTable>
	</div>
</div>
</template>

<script>
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Toast from 'primevue/toast';
 import mockdata from '@/mock-data/Products.json'
 import {getVatRates} from "../../../../api/vat/vat-api"
 import {getCategories} from "../../../../api/categories/categories-api.js"
 import { getProducts,  deleteProduct } from "../../../../api/products/products-api.js";
 import Dropdown from 'primevue/dropdown'
 import {FilterMatchMode} from 'primevue/api';
import Toolbar from 'primevue/toolbar';

export default {
    components: {
        DataTable,
        Column,
        Dropdown,
        InputText,
        Toolbar,
        Toast
    },
    data() {
        return {
            products: null,
            selectedProduct: null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [{"label" : "All" , "value" : 0}],
              filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
              },

            vatRates: null,
            categories: null
        }
    },
    async created(){
         const site = process.env.VUE_APP_SITEID;
   await getCategories(site).then(res => {
       console.log(res)
    this.categories = res;
   
    this.categories.forEach(cat => {
        this.sortOptions.push({"label" : cat.name , "value" : cat.category_id })
    })
 
    })
    
     await getProducts(site).then(result => {
      this.products = result;
      
    })

    await getVatRates(site).then(res => {
    this.vatRates = res
 
    })
  
    },
    methods: {
         getPrice(price, vatID){
             const vrate = this.vatRates.filter(rate =>{
                    return rate.vat_id == vatID
             })

             const p =  price * (1 + vrate[0].rate)
             const cost  = Math.round(p * 100) / 100
            return cost
         },
         getCategory(ID){
             
             const cat = this.categories.filter(c =>{
                    return c.category_id == ID
             })

             
            return cat[0].name
         },
      
         

         async onSortChange(event){
              const site = process.env.VUE_APP_SITEID;
             if(event.value.label == 'All'){
                
                 await getProducts(site).then(result =>{
                     this.products = result
                 })
             }
             else{
           await getProducts(site).then(result =>{
            const value = event.value.value;
            const sortValue = event.value;
            console.log("VALUE " , value)
            console.log("SORT VALUE " , sortValue)
            console.log(this.products)
            let prods= []
            result.forEach(prod =>{
                if(prod.category_id == value){
                    prods.push(prod)
                }
            })
            this.products = prods;
           })
             }
        },
        onRowSelect(){
            console.log(this.selectedProduct)
        },
       async deleteItems(){
           const site = process.env.VUE_APP_SITEID
                await deleteProduct(this.selectedProduct.product_id).then(result =>  {
                    if(result)
                    {
                    this.$toast.add({severity:'success', summary: 'Item deleted', life: 1500});
                      getProducts(site).then(result => {
                        this.products = result;
                      })
                    
      
    }
      
    })
        }
    }
}
</script>
