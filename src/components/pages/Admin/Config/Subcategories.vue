<template>
<div class=" mx-auto bg-gray-100 p-2 w-2/3">
    <DataTable 
      class="p-datatable-sm"
      :value="subcategories" 
      :paginator="true" 
      :rows="10"
      dataKey="category_id" 
      :rowHover="true" 
      v-model:selection="selectedCategory" 
      v-model:filters="filters" 
      filterDisplay="menu" 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :rowsPerPageOptions="[10,25,50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" 
      responsiveLayout="scroll"
      :sortOrder="sortOrder"
     :sortField="sortField"
     @rowSelect="onRowSelect"
      >

 <template #header>
                   <h5 class="m-1">Category Management </h5>   
            </template>
     

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
           <Column field="name" sortable="true" header="Name" style="min-width: 8rem">
                    <template #body="{data}">
                   {{data.name}}
                </template>
             </Column>
               <Column field="description" header="Description" style="min-width: 8rem">
                <template #body="{data}">
                   {{data.description}}
                </template>
             </Column>
               <Column  header="Actions" style="min-width: 8rem">
                <template #body="" >
                    <i class="m-1 pi pi-pencil cursor-pointer text-gray-400 hover:text-gray-800" style="font-size: 1.25rem" ></i>
                    <i class=" m-1 pi pi-trash cursor-pointer text-red-500 hover:text-red-700" style="font-size: 1.25rem"  ></i>

                </template>
             </Column>
             <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
</div>
</template>

<script>
import {getSubCategories} from '../../../../../api/sub-categories/sub-categories-api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
// import InputText from 'primevue/inputtext'
export default {
    
    components: {
        DataTable,
        Column,
        // InputText
    },
    data() {
        return {
            subcategories: null,
            selectedCategory: null,
            editingRows: [],
        }
    },
     async created(){
     await getSubCategories().then(result => {
      this.subcategories = result;
    })
},

}
</script>
