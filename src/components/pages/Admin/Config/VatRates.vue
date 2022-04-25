<template>
<Toast/>
<div class=" mx-auto bg-gray-100 p-2 w-2/3">
    <DataTable 
      class="p-datatable-sm"
      :value="vatrates" 
      :paginator="true" 
      :rows="10"
      dataKey="category_id" 
      :rowHover="true" 
      v-model:selection="selectedVatRate" 
      v-model:filters="filters" 
      filterDisplay="menu" 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :rowsPerPageOptions="[10,25,50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" 
      responsiveLayout="scroll"
      :sortOrder="sortOrder"
     :sortField="sortField"
     @rowSelect="onRowSelect"
      :globalFilterFields="['name']"
      >

 <template #header>
                    <div class="grid grid-cols-2 gap-4">
          <div>
            <h5 class="m-1">Vat Rate Management</h5>
             <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText class="p-inputtext-sm" v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span> 
          </div>
          <div class="relative">
            <button
              class="
                absolute
                top-0
                right-0
                bg-gray-800
                rounded
                text-white
                pr-2
                pl-2
                pt-1
                pb-1
              "
              @click="openNewVatRate"
            >
              Add New Vat Rate
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
               <Column field="rate" header="Rate" style="min-width: 8rem">
                <template #body="{data}">
                   {{data.rate}}
                </template>
             </Column>
               <Column  header="Actions" style="min-width: 8rem">
                <template #body="{data}" >
                    <i @click="openEditModal(data)" class="m-1 pi pi-pencil cursor-pointer text-gray-400 hover:text-gray-800" style="font-size: 1.25rem" ></i>
                    <i class=" m-1 pi pi-trash cursor-pointer text-red-500 hover:text-red-700" style="font-size: 1.25rem"  ></i>

                </template>
             </Column>
             <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

  <Dialog :modal="true" header="Edit VAT rate: " :visible="editModalOpen" :style="{width: '50vw'}">
      <div class="m-2"> 
           <p class="inline-block">Vate Rate Name  : </p> 
            <InputText v-model="editingRate.name"/>
     </div>
      <div class="m-2"> 
           <p class="inline-block">VAT rate  : </p> 
            <InputText v-model="editingRate.rate"/>
     </div>
                 <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="editModalOpen = false" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="submitEditModal" autofocus />
            </template>
        </Dialog>


     <NewVatRateModal 
     :visible="newVatRateVisible"
     @closeVatModal="closeVatModal"
     @cancelVatModal="cancelVatModal"
     />
    
</div>
</template>

<script>
import {getVatRates, updateVatRate} from '../../../../../api/vat/vat-api'
import DataTable from 'primevue/datatable'
import Toast from 'primevue/toast'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import NewVatRateModal from '../AddItem/NewVatRateModal.vue'
import InputText from 'primevue/inputtext'
import {FilterMatchMode,FilterOperator} from 'primevue/api';
export default {
    
    components: {
        DataTable,
        Column,
        NewVatRateModal,
        InputText,
        Dialog,
        Button,
        Toast
    },
    data() {
        return {
            vatrates: null,
            selectedVatRate: null,
            editingRows: [],
            newVatRateVisible: false,
             filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
              editingRate:null,
       editModalOpen: false
        }
    },
     async created(){
    this.getVatRates();
},
methods:{ 

    async getVatRates(){
      const site = process.env.VUE_APP_SITEID
    await getVatRates(site).then(result => {
      this.vatrates = result;
    })
    },
      openNewVatRate(){
      this.newVatRateVisible = true
    },
    closeVatModal(){
      this.newVatRateVisible = false;
       this.$toast.add({severity:'success', summary: 'VAT rate added', life: 1500});
       this.getVatRates();

    },
    cancelVatModal(){
      this.newVatRateVisible = false;
    },
    openEditModal(rate){
        this.editModalOpen = true
        this.editingRate = rate;
     },
     closeEditModal(){
         this.editModalOpen = false
     },
     async submitEditModal(){
       
         const resp = await updateVatRate({
             vat_id : this.editingRate.vat_id,
              name : this.editingRate.name,
               rate: this.editingRate.rate
         })
         if(resp.status == 200){
              this.$toast.add({severity:'success', summary: 'Sub-Category Updated', life: 1500});
              this.closeEditModal();
         }
         else{
           alert("failed")
         }
     }
}

}
</script>
