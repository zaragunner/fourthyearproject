<template>
    <div class="w-3/4 mx-auto" v-if="this.orders">
        <DataTable
        header="My Orders"
      class="p-datatable-sm mt-2"
      :value="orders" 
      :paginator="true" 
      :rows="10"
      dataKey="order_id" 
      :rowHover="true" 
      filterDisplay="menu" 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
      :rowsPerPageOptions="[10,25,50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      :globalFilterFields="['name']" 
      responsiveLayout="scroll"
      >
            <template #header>
                 <div class="flex justify-content-center align-items-center">
                    <h5 class="m-0">My Orders</h5>
                   
                 </div>
            </template>
            <template #empty>
                No orders found.
            </template>
       <Column field="order_id" sortable="true" header="Order Number" style="min-width: 8rem">
                    <template #body="{data}">
                   {{data.order_id}}
                </template>
             </Column>
               <Column field="status" sortable="true" header="Order Status" style="min-width: 8rem">
                    <template #body="{data}">
                   {{data.status}}
                </template>
             </Column>
             
            <Column field="items" sortable="true" header="Items" style="min-width: 8rem">
             <template #body="{data}">
                 <ul>
              <li v-for="item in data.order">
                            {{item.item.name}}
                        </li>
                 </ul>
                        </template>
            </Column>
              <Column field="totalPaid" sortable="true" header="Amount Paid" style="min-width: 8rem">
                    <template #body="{data}">
                    <div> €{{getTotal(data)}}</div>
                </template>
             </Column>
             
        </DataTable>
    </div>
</template>
<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {getMyOrders} from '../../../../api/orders/orders-api.js'

export default {
    components:{
        DataTable,
        Column
    },
    data(){
        return{
            orders: null
        }
    },
    async created(){
        await getMyOrders(this.$store.state.account.user.username).then(res =>{
            this.orders = res
        })
    },
    methods:{
        getTotal(data){
            let total = 0 
     data.order.forEach(item => {
      total+= item.cost
     })
     return total
        }
    }
}
</script>
