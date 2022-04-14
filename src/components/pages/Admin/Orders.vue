<template>

<div class="w-2/3 mx-auto" v-if="this.orders != null">
      <DataTable 
      class="p-datatable-sm"
      :value="orders" 
      :paginator="true" 
      :rows="15"
      dataKey="_id" 
      :rowHover="true" 
      v-model:filters="filters" 
      filterDisplay="menu" 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :rowsPerPageOptions="[15,25,50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      :globalFilterFields="['name']" 
      responsiveLayout="scroll"
      :sortOrder="sortOrder"
     :sortField="sortField"
  
      >

           <Column field="image" header="Amount" style="min-width: 8rem">
                <template #body="{data}">
                   <span class="w-24 h-24"> €{{`${data.paymentIntent.amount}`/100}} </span>
                </template>
             </Column>
               <Column field="image" header="Customer" style="min-width: 8rem">
                <template #body="{data}">
                   <span class="w-24 h-24"> {{data.customer.name}} </span>
                </template>
             </Column>
             <Column field="image" header="Address" style="min-width: 8rem">
                <template #body="{data}">
                   <span class="w-24 h-24"> {{data.customer.address}} </span>
                </template>
             </Column>
           <Column field="image" header="Items" style="min-width: 8rem">
                <template #body="{data}">
                        <div v-for="item in data.order">
                            {{item.name}}
                        </div>
                </template> 
             </Column>
             <Column field="image" header="Status" style="min-width: 8rem">
                <template #body="{data}">
                        {{data.status}}
                </template> 
             </Column>
             <Column>
             <template #body="{data}">
                 <router-link :to="`/editorder/${data._id}`">
                 <i class="pi pi-pencil text-gray-400 hover:text-gray-600 cursor-pointer" style="font-size: 1rem"></i>
                 </router-link>
             </template>
             </Column>
        <!-- <Column field="name" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.name}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column> -->

      </DataTable>
</div>
</template>

<script>
import DataTable from 'primevue/datatable'
// import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import { getOrders } from '../../../../api/orders/orders-api'

export default{
    components:{
        DataTable,
        Column
    },
    data(){
        return{
            orders: null,
            selectedOrder: null
        }
    },
   async created(){

     await getOrders().then(result => {
      this.orders = result;
      
    })
    },
}
</script>