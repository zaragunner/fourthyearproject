<template>
  <div class="mx-auto bg-gray-100 p-2 w-2/3">
    <DataTable
      class="p-datatable-sm"
      :value="subcategories"
      :paginator="true"
      :rows="10"
      dataKey="sub_category_id"
      :rowHover="true"
      v-model:selection="selectedCategory"
      v-model:filters="filters"
      filterDisplay="menu"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
       :globalFilterFields="['name', 'description']"
    >
      <template #header>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h5 class="m-1">SubCategory Management</h5>
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
              @click="openNewSubCategory"
            >
              Add New Sub-Category
            </button>
          </div>
        </div>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column
        field="name"
        sortable="true"
        header="Name"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>
      <Column field="description" header="Description" style="min-width: 8rem">
        <template #body="{ data }">
          {{ data.description }}
        </template>
      </Column>
      <Column header="Actions" style="min-width: 8rem">
        <template #body="{ data }">
          <i
           @click="openEditModal(data)"
            class="m-1 pi pi-pencil cursor-pointer text-gray-400 hover:text-gray-800"
            style="font-size: 1.25rem"
          ></i>
          <i
            @click="openConfirmModal(data)"
            class="
              m-1
              pi pi-trash
              cursor-pointer
              text-red-500
              hover:text-red-700
            "
            style="font-size: 1.25rem"
          ></i>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>

  <Dialog
    :modal="true"
    header="Are you sure you wish to delete this category?"
    :visible="confirmModalOpen"
    :style="{ width: '50vw' }"
  >
    <div class="m-2">
      <p class="inline-block">Category Name :</p>
      <p>{{ subcategory ? subcategory.name : "" }}</p>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="cancelConfirmModal"
        class="p-button-text"
      />
      <Button label="Submit" icon="pi pi-check" @click="submitConfirmModal" />
    </template>
  </Dialog>

  <Dialog :modal="true" header="Edit Sub-Category" :visible="editModalOpen" :style="{width: '50vw'}">
      <div class="m-2"> 
           <p class="inline-block">Sub-Category Name  : </p> 
            <InputText v-model="editingCat.name"/>
     </div>
      <div class="m-2"> 
           <p class="inline-block">Sub-Category Description  : </p> 
            <InputText v-model="editingCat.description"/>
     </div>
                 <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="editModalOpen = false" class="p-button-text"/>
                <Button label="Submit" icon="pi pi-check" @click="submitEditModal" autofocus />
            </template>
        </Dialog>

  <NewSubCategoryModal
    :visible="newSubCategoryVisible"
    @closeSubCategoryModal="closeSubCategoryModal"
    @cancelSubCategoryModal="cancelSubCategoryModal"
  />
</template>

<script>
import {
  getSubCategories,
  deleteSubCategory,
  updateSubCategory
} from "../../../../../api/sub-categories/sub-categories-api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import NewSubCategoryModal from "../../Admin/AddItem/NewSubCategoryModal.vue";

import InputText from 'primevue/inputtext'
import {FilterMatchMode,FilterOperator} from 'primevue/api';
export default {
  components: {
    DataTable,
    Column,
    Dialog,
    Button,
    NewSubCategoryModal,
    InputText
  },
  data() {
    return {
      confirmModalOpen: false,
      subcategory: null,
      subcategories: null,
      selectedCategory: null,
      editingRows: [],
      newSubCategoryVisible: false,
       filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
      editingCat:null,
       editModalOpen: false
    };
  },
  async created() {
    this.getSubCategories();
  },
  methods: {
    async getSubCategories() {
     const site = process.env.VUE_APP_SITEID
    await getSubCategories(site).then((result) => {
        this.subcategories = result;
      });
    },
    openConfirmModal(data) {
      this.confirmModalOpen = true;
      this.subcategory = data;
    },

    async submitConfirmModal() {
      console.log(this.subcategory);
      await deleteSubCategory(this.subcategory.sub_category_id).then((res) => {
        if (res) {
          this.getSubCategories();
          this.confirmModalOpen = false;
        } else {
          console.log("fail");
        }
      });
    },
    closeSubCategoryModal() {
      this.newSubCategoryVisible = false;
      this.$toast.add({
        severity: "success",
        summary: "Sub Cateogry added",
        life: 1500,
      });
      this.getSubCategories();
    },
    openNewSubCategory() {
      this.newSubCategoryVisible = true;
    },
    cancelSubCategoryModal() {
      this.newSubCategoryVisible = false;
    },

    cancelConfirmModal() {
      this.confirmModalOpen = false;
      this;
    },
     openEditModal(cat){
        this.editModalOpen = true
        this.editingCat = cat;
     },
     closeEditModal(){
         this.editModalOpen = false
     },
     async submitEditModal(){
       
         const resp = await updateSubCategory({
             sub_category_id : this.editingCat.sub_category_id,
              name : this.editingCat.name,
               description: this.editingCat.description
         })
         if(resp.status == 200){
              this.$toast.add({severity:'success', summary: 'Sub-Category Updated', life: 1500});
              this.closeEditModal();
         }
         else{
           alert("failed")
         }
     }
  },
};
</script>
