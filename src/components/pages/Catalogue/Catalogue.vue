<template>
<Toast/>
    <div class="w-2/3 mx-auto card">
        <DataView   :globalFilterFields="['name']"  :value="products" :layout="layout" :sortOrder="sortOrder" :sortField="sortField" :paginator="true" :rows="9" >
			<template #header>
                <div class="grid grid-nogutter">
                    <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
                    </div>
                      <span class="m-2 block p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value"  placeholder="Keyword Search" />
                    </span>
                    <div class="col-6" style="text-align: right">
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
			</template>

			<template #list="slotProps">
				<div class="col-12">
					<div class="product-list-item">
						<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.name"/>
						<div class="product-list-detail">
							<div field="name" class="product-name">{{slotProps.data.name}}</div>
							<div class="product-description">{{slotProps.data.description}}</div>
							</div>
						<div class="product-list-action">
							<span class="product-price">${{slotProps.data.netprice}}</span>
							<Button class="ml-4" icon="pi pi-shopping-cart" label="Add to Cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
								</div>
					</div>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4">
					<div class="product-grid-item ml-4 w-64 card">
						<div class="product-grid-item-top">
							<div>
							
								<span class="product-category">{{slotProps.data.category}}</span>
							</div>
						</div>
						<div class="product-grid-item-content">
              <router-link :to="`/${slotProps.data.product_id}`">
							<img :src="`http://localhost:4001/${slotProps.data.thumbnail.fileName}`" class="h-36 w-36" :alt="slotProps.data.name"/>
							
              <div class="product-name">{{slotProps.data.name}}</div>
              </router-link>
							<div class="product-description">{{slotProps.data.description}}</div>
							</div>
						<div class="product-grid-item-bottom">
							<span v-if="this.vatRates" class="product-price">€
                                {{ 
                                    getPrice(slotProps.data.netprice , slotProps.data.vat_id)
                                }}
                            </span>
							<Button @click="addToCart(slotProps.data)" class="ml-8" icon="pi pi-shopping-cart"></Button>
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

import { getVatRates } from '../../../../api/vat/vat-api.js'
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
              } ,
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
        }
     }

}
</script>
