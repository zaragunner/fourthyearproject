<template>
<Toast/>
    <div class="w-2/3 mx-auto card">
        <DataView   
        v-model:filters="filters" 
        :globalFilterFields="['name']"   
        :value="products" 
        layout="grid" 
        :sortOrder="sortOrder" 
        :sortField="sortField" 
        :paginator="true" 
        :rows="9" >
			<template #header>
                <div class="grid grid-nogutter">
                     <span class="m-2 block p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value"  placeholder="Keyword Search" />
                    </span>

                    <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
                        <Dropdown v-model="sortKey2" :options="sortOptions2" optionLabel="label" placeholder="Sort By Category" @change="onSortChangeCategory($event)"/>
                    </div>
                    
                    
                </div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4 mt-2 m-1 p-1  border-4 border-gray-100 ">
					<div class="product-grid-item   w-64 card">
						
						<div class="product-grid-item-content  mx-auto">
              <router-link :to="`/${slotProps.data.product_id}`">
							<img :src="`http://localhost:4001/${slotProps.data.thumbnail.fileName}`" class="h-36 w-36 mx-auto bg-red-500 object-center" :alt="slotProps.data.name"/>
							
              <div class="product-name mx-auto text-center text-lg font-semibold">{{slotProps.data.name}}</div>
              </router-link>
							<div class="product-description text-center mx-auto">{{slotProps.data.description}}</div>
							</div>
						<div class="product-grid-item-bottom text-center  mx-auto ">
							<span v-if="this.vatRates">€
                                {{ 
                                    getPrice(slotProps.data.netprice , slotProps.data.vat_id)
                                }}
                            </span>
                            <router-link :to="`/${slotProps.data.product_id}`">
							<Button  class=" block ml-20 mt-4 " >View More</Button>
                            </router-link>
						</div>
					</div>
				</div>
			</template>
		</DataView>
	</div>
</template>


<script>
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button'
 import Item from './ItemCard.vue'
 import Toast from 'primevue/toast'
 import InputText from 'primevue/inputtext'
 import { getProducts } from "../../../../api/products/products-api.js";
 import {FilterMatchMode} from 'primevue/api';
import {FilterService} from 'primevue/api';
import { getVatRates } from '../../../../api/vat/vat-api.js'
import {getCategories} from '../../../../api/categories/categories-api.js'
import { onBeforeMount } from '@vue/runtime-core';
export default {
    components: {
        Item,
        DataView,
        DataViewLayoutOptions,
        Dropdown,
        Button,
        InputText,
        Toast
      
       
       
    },
    data (){
    return{
      products: null,
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
                {label: 'Price High to Low', value: '!netprice'},
                {label: 'Price Low to High', value: 'netprice'},
            ],  
      filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
              },
        sortKey2: null,
            sortField2: null,
            sortOptions2: [{"label" : "All" , "value" : 0}],
             
      vatRates: null
     
    }
    },
    async created(){

    await  getProducts().then(result => {
      this.products = result;
      
    })
  
    await getVatRates().then(result => {
        this.vatRates = result;
        console.log(this.vatRates)
    })
     await getCategories().then(res => {
    this.categories = res;
   
    this.categories.forEach(cat => {
        this.sortOptions2.push({"label" : cat.name , "value" : cat.category_id })
    })
 
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
         addToCart(item){
             const cost = this.getPrice(item.netprice, item.vat_id)
                const prod = {
                    item,
                    cost: cost 
                }
              this.$store.dispatch('cart/addToCart',prod)
     console.log("item == " + JSON.stringify(item))
     this.$toast.add({severity:'success', summary: 'Item added to cart', life: 1500});
     
         },
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
         async onSortChangeCategory(event){
             if(event.value.label == 'All'){
                 await getProducts().then(result =>{
                     this.products = result
                 })
             }
             else{
           await getProducts().then(result =>{
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
     }

}
</script>
