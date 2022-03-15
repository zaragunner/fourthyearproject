<template>
<div class="flex">
<div class="h-full w-1/12 p-2  flex-auto ">
    <div class="bg-blue-300 ">
        <p> Edit Configurations </p>
    </div>

  <router-link to="/categories"> <button class="p-2 m-2 bg-gray-700 text-white rounded"  > Categories </button> </router-link>
    <router-link to="/subcategories"> <button class="p-2 m-2 bg-gray-700 text-white rounded"  > SubCategories </button>    </router-link>  
    <router-link to="/vatrates"><button class="p-2 m-2 bg-gray-700 text-white rounded"  > Vat Rates </button></router-link>
</div>
<Toast/>
    <div class="bg-gray-200 w-6/8 p-2 m-1 ">
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
                   <img class="w-24 h-24" :src="data.images.thumbnail"/>
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


            <Column field="category" header="Category" sortable style="min-width: 14rem">
                <template #body="{data}">
                  {{data.category_id}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by category"/>
                </template>
            </Column>

            
            <Column field="description" header="Description"  style="min-width: 14rem">
                <template #body="{data}">
                  {{data.description}}
                </template>
            </Column>

             <Column  style="min-width:8rem" field="price" header="Price" sortable >
                <template #body="{data}">
                  €{{data.price.netprice}}
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
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ],
              filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
              }
        }
    },
    async created(){

     getProducts().then(result => {
      this.products = result;
      
    })
    },
    methods: {
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
        onRowSelect(){
            console.log(this.selectedProduct)
        },
       async deleteItems(){
                await deleteProduct(this.selectedProduct.product_id).then(result =>  {
                    if(result)
                    {
                    this.$toast.add({severity:'success', summary: 'Item deleted', life: 1500});
                      getProducts().then(result => {
                        this.products = result;
                      })
                    
      
    }
      
    })
        }
    }
}
</script>
