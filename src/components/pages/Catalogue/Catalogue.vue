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
							<span class="product-price">${{slotProps.data.price.netprice}}</span>
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
              <router-link :to="`/${parseInt(slotProps.data.product_id)}`">
							<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.name"/>
							
              <div class="product-name">{{slotProps.data.name}}</div>
              </router-link>
							<div class="product-description">{{slotProps.data.description}}</div>
							</div>
						<div class="product-grid-item-bottom">
							<span class="product-price">${{slotProps.data.price.netprice}}</span>
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
                {label: 'Price High to Low', value: '!price.netprice'},
                {label: 'Price Low to High', value: 'price.netprice'},
            ],  
      filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
              } 
     
    }
    },
    async created(){

     getProducts().then(result => {
      this.products = result;
      
    })
    },
     methods: {
         addToCart(item){
              this.$store.dispatch('cart/addToCart',item)
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
