 <template>
 <div class="ml-3 relative">
            <div>
              <button @click="cartOpen = !cartOpen" class="bg-gray-800 text-gray-300 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
               <font-awesome-icon class="text-gray-300" icon="shopping-cart" />
              </button>
            </div>
          
             <!-- <CartItem/> -->
             <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" v-if="cartOpen">
               <div>
                <div v-for="product in this.$store.state.account.cart" :key="product.id">
                  <span> {{product.name}} </span>
                </div>
               </div>
               <p> Total Price </p>
               
                 
                <button class="bg-gray-700 rounded text-white" @click="clearCart">
               Clear Cart
             </button>
             
             </div>

             
             

                
            
          </div>
 </template>

 <script>

export default {
    components:{

    },
    data(){
        return {
            cartOpen: false,
        }
    },
    methods :{
      clearCart(){
        this.$store.dispatch('account/clearCart')
      }
    }

}
 </script>