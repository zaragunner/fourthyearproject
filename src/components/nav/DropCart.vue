 <template>
 <div class="ml-3  relative">
            <div>
              <button :style="`background-color : ${this.$store.state.site.theme.colours.primary} `" @click="cartOpen = !cartOpen" class="text-gray-300 mr-3 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <i v-if="this.$store.state.cart.cart.length > 0" class="pi pi-shopping-cart" style="font-size: 1.5rem"  v-badge="this.$store.state.cart.cart.length"></i>
              </button>
            </div>
          
             <!-- <CartItem/> -->
             <div class="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 pr-2 pl-2 z-10 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" v-if="cartOpen">
               <div>
               <div v-if="this.$store.state.cart.cart.length == 0 ">
                    There are no items in your cart yet
               </div>
                <div v-for="product in this.$store.state.cart.cart" :key="product.product_id">
                  <div class="bg-gray-100 mt-2 p-2 ">
                     <img :src="`http://localhost:4001/${product.item.thumbnail.fileName}`"  class="inline w-12 h-16 mr-2 object-center object-cover group-hover:opacity-75" />
                    <span class="text-md font-semibold"> {{product.item.name}} </span>
                
                  <span class="ml-4">€ {{ 
                                    getPrice(product.item.netprice , product.item.vat_id)
                                }}  </span>
                     <p v-if="this.options" class="ml-4"><span class="font-semibold"> Product Size : </span>{{ getSize(product.item.size)}} </p>
                  
                </div>
                </div>
               </div>
               <div class="" v-if="this.$store.state.cart.cart.length>0">
               <div class="inline-block font-semibold"> Total Price  </div>
               <div class="inline-block ml-6"> €{{this.$store.state.cart.total}} </div>
              
          
             
                <button class="block m-2 p-1 bg-gray-800 rounded text-white" @click="clearCart">
               Clear Cart
             </button>
             <router-link :to="this.$store.state.account.user ? '/checkout' : '/login' ">
             <button @click="cartOpen = false" class="block m-2 p-1 bg-gray-800 rounded text-white">
               Checkout
             </button>
             
             </router-link>
            
               </div>
                 </div>
               
             </div>

 </template>

 <script>

import { getVatRates }  from '../../../api/vat/vat-api.js'
import {getOption, getOptions} from '../../../api/options/options-api.js'
  export default {
    components:{

    },
    onMounted(){
      console.log(this.$store.state.cart.cart)
    },
    async created() {
    try {
      this.$store.dispatch('cart/checkLocalStorage')
    }
    catch{
      console.log("empty")
    }
    await getOptions().then(res=> {
      this.options = res
      console.log(this.options)
    })
    await getVatRates().then(res => {
    this.vatRates = res
 
    })

    console.log("STATE CART" , this.$store.state.cart.cart)
    },
    data(){
        return {
            cartOpen: false,
            price: null,
            vatRates: null,
            options: null
        }
    },
    methods :{
      clearCart(){
        this.$store.dispatch('cart/clearCart')
        this.cartOpen = false;
      },
     getSize(id){
       const op = this.options.filter(option =>{
                    return option.option_id == id
             })
         const name = op[0].name
         console.log(name)
          return name
      },
       getPrice(price, vatID){
             const vrate = this.vatRates.filter(rate =>{
                    return rate.vat_id == vatID
             })

             const p =  price * (1 + vrate[0].rate)
             const cost  = Math.round(p * 100) / 100
            return cost
         },

      totalPrice(){
        if (this.$store.state.cart.cart){
          var length = this.$store.cart.account.cart.length()
          console.log(this.$store.state.cart.cart)
          for(let i = 0; i <length; i++){
           var price = 0
           price += this.$store.state.cart.cart.product[i].cost
           this.price = price
          }
        }
      },
    
    }

}

 </script>