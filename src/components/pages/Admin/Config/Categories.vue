<template>
<div class=" mx-auto bg-gray-100 p-2 w-2/3">
    <DataTable 
      class="p-datatable-sm"
      :value="categories" 
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
     :globalFilterFields="['name', 'description']"
      >

 <template #header>
     <div class="grid grid-cols-2 gap-4">
  <div>
  <h5 class="m-1">Category Management </h5>  
   <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText class="p-inputtext-sm" v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span> 
  </div>
     <div class="relative"> 
 <button
        class="absolute top-0 right-0 bg-gray-800 rounded  text-white pr-2 pl-2 pt-1 pb-1"
        @click="openNewCategory"
      >
        Add
      </button>
         </div>
     
  
</div>
                   
                   
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
                <template #body="{data}" >
                    <i class="m-1 pi pi-pencil cursor-pointer text-gray-400 hover:text-gray-800" style="font-size: 1.25rem" ></i>
                    <i @click="openConfirmModal(data)" class=" m-1 pi pi-trash cursor-pointer text-red-500 hover:text-red-700" style="font-size: 1.25rem"  ></i>

                </template>
             </Column>
             <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

     <Dialog :modal="true" header="Are you sure you wish to delete this category?" :visible="confirmModalOpen" :style="{width: '50vw'}">
      <div class="m-2"> 
           <p class="inline-block"> Category Name  : </p> 
             <p> {{category? category.name : ''}} </p>
     </div>
                 <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="cancelConfirmModal" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="closeConfirmModal" autofocus />
            </template>
        </Dialog>

        <NewCategoryModal 
     :visible="newCategoryVisible"
     @closeCategoryModal="closeCategoryModal"
     @cancelCategoryModal="cancelCategoryModal"
     />
    
</div>
</template>

<script>
import {getCategories , deleteCategory} from '../../../../../api/categories/categories-api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import NewCategoryModal from "../../Admin/AddItem/NewCategoryModal.vue"

import InputText from 'primevue/inputtext'
import {FilterMatchMode} from 'primevue/api';

export default {
    
    components: {
        DataTable,
        Column,
        Dialog,
        Button,
        NewCategoryModal,
        InputText
    },
    data() {
        return {
            category: null,
            confirmModalOpen: false,
            categories: null,
            selectedCategory: null,
            editingRows: [],
            newCategoryVisible: false,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
        }
    },
     async created(){
     this.getCategories();
},
methods:{
    async deleteCategory(category_id){
        await deleteCategory(category_id).then(res => {
            if(res){
                console.log("success")
                this.getCategories()
            }  
            else{
                console.log("fail")
            }      })
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

    async getCategories(){
        await getCategories().then(result => {
      this.categories = result;
    })
    },
    openConfirmModal(data){
        console.log("opening modal" , data)
        this.confirmModalOpen = true;
        this.category = data
    },
    async closeConfirmModal(){
        await deleteCategory(this.category.category_id)
        this.getCategories();
        this.confirmModalOpen = false;
    },
    cancelConfirmModal(){
        this.confirmModalOpen = false;this
    }
}

}
</script>
