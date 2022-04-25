<template>
<Toast/>
<div class=" mx-auto bg-gray-100 p-2 w-2/3">
    <DataTable 
      class="p-datatable-sm"
      :value="options" 
      :paginator="true" 
      :rows="10"
      dataKey="option_id" 
      :rowHover="true" 
      v-model:selection="selectedOption" 
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
  <h5 class="m-1">Size Option Management </h5>  
   <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText class="p-inputtext-sm" v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span> 
  </div>
     <div class="relative"> 
 <button
        class="absolute top-0 right-0 bg-gray-800 rounded  text-white pr-2 pl-2 pt-1 pb-1"
        @click="openNewOption"
      >
        Add New Option
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
                    <i @click="openEditModal(data)" class="m-1 pi pi-pencil cursor-pointer text-gray-400 hover:text-gray-800" style="font-size: 1.25rem" ></i>
                    <i @click="openConfirmModal(data)" class=" m-1 pi pi-trash cursor-pointer text-red-500 hover:text-red-700" style="font-size: 1.25rem"  ></i>

                </template>
             </Column>
             <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

     <Dialog :modal="true" header="Are you sure you wish to delete this option?" :visible="confirmModalOpen" :style="{width: '50vw'}">
      <div class="m-2"> 
           <p class="inline-block"> Option Name  : </p> 
             <p> {{option? option.name : ''}} </p>
     </div>
                 <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="cancelConfirmModal" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="closeConfirmModal" autofocus />
            </template>
        </Dialog>

        <Dialog :modal="true" header="Edit Option" :visible="editModalOpen" :style="{width: '50vw'}">
      <div class="m-2"> 
           <p class="inline-block"> Option Name  : </p> 
            <InputText v-model="editingOption.name"/>
     </div>
      <div class="m-2"> 
           <p class="inline-block"> Option Description  : </p> 
            <InputText v-model="editingOption.description"/>
     </div>
                 <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="editModalOpen = false" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="submitEditModal" autofocus />
            </template>
        </Dialog>

        <NewOptionModal 
     :visible="newOptionVisible"
     @closeOptionModal="closeOptionModal"
     @cancelOptionModal="cancelOptionModal"
     />
    
</div>
</template>

<script>
import {getOptions , deleteOption, updateOption} from '../../../../../api/options/options-api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import NewOptionModal from "../../Admin/AddItem/NewOptionModal.vue"

import InputText from 'primevue/inputtext'
import {FilterMatchMode} from 'primevue/api';

export default {
    
    components: {
        DataTable,
        Column,
        Dialog,
        Button,
        NewOptionModal,
        InputText,
        Toast
    },
    data() {
        return {
            option: null,
            confirmModalOpen: false,
            options: null,
            selectedOption: null,
            editingRows: [],
            newOptionVisible: false,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            editingOption: null,
            editModalOpen: false
        }
    },
     async created(){
     this.getOptions();
},
methods:{
    async deleteOption(option_id){
        await deleteOption(option_id).then(res => {
            if(res){
                console.log("success")
                this.getOptions()
            }  
            else{
                console.log("fail")
            }      })
    },
   
        openNewOption(){
      this.newOptionVisible = true
    },
    closeOptionModal(){
      this.newOptionVisible = false;
       this.$toast.add({severity:'success', summary: 'Cateogry added', life: 1500});
       this.getOptions();

    },
    cancelOptionModal(){
      this.newOptionVisible = false;
    },

    async getOptions(){
        await getOptions().then(result => {
      this.options = result;
    })
    },
    openConfirmModal(data){
        console.log("opening modal" , data)
        this.confirmModalOpen = true;
        this.option = data
    },
    async closeConfirmModal(){
        await deleteOption(this.option.option_id)
        this.getOptions();
        this.confirmModalOpen = false;
    },
    cancelConfirmModal(){
        this.confirmModalOpen = false;this
    },
     openEditModal(cat){
        this.editModalOpen = true
        this.editingOption = cat;
     },
     closeEditModal(){
         this.editModalOpen = false
     },
     async submitEditModal(){
         const resp = await updateOption({
             option_id : this.editingOption.option_id,
              name : this.editingOption.name,
               description: this.editingOption.description
         })
         if(resp.status == 200){
              this.$toast.add({severity:'success', summary: 'Option Updated', life: 1500});
              this.closeEditModal();
         }
     }
}

}
</script>
