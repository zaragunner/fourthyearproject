<template>
    <div class="bg-gray-200 w-11/12 mx-auto p-4 m-2 ">
    <button class="p-2 m-2 bg-gray-700 text-white rounded" > Edit Items </button>
    <button class="p-2 m-2 bg-gray-700 text-white rounded" > Delete Items </button>
    <button class="p-2 m-2 bg-gray-700 text-white rounded" > Apply Discount </button>

      <DataTable 
      class="p-datatable-sm"
      :value="products" 
      :paginator="true" 
      :rows="10"
      dataKey="id" 
      :rowHover="true" 
      v-model:selection="selectedProducts" 
      v-model:filters="filters" 
      filterDisplay="menu" 
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :rowsPerPageOptions="[10,25,50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      :globalFilterFields="['name','country.name','representative.name','status']" 
      responsiveLayout="scroll"
      :sortOrder="sortOrder"
     :sortField="sortField"
      >

      <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Category" @change="onSortChange($event)"/>
                    </div>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    
        <Column field="name" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.name}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>


            <Column field="category" header="Category" sortable style="min-width: 14rem">
                <template #body="{}">
                  category
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by category"/>
                </template>
            </Column>

            
            <Column field="description" header="Description"  style="min-width: 14rem">
                <template #body="{data}">
                  {{data.imageAlt}}
                </template>
            </Column>

             <Column field="price" header="Price" sortable style="min-width: 14rem">
                <template #body="{data}">
                  €{{data.price}}
                </template>
            </Column>

             <Column field="image" header="" style="min-width: 14rem">
                <template #body="{data}">
                   <img class="w-24 h-24" :src="data.images.imageSrc"/>
                </template>
             </Column>

             
      </DataTable>
	</div>
</template>

<script>
import DataTable from 'primevue/datatable'

import Column from 'primevue/column'
 import mockdata from '@/mock-data/Products.json'
 import Dropdown from 'primevue/dropdown'

export default {
    components: {
        DataTable,
        Column,
        Dropdown
    },
    data() {
        return {
            products: mockdata,
            selectedProducts: null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ]
        }
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
        }
    }
}
</script>
