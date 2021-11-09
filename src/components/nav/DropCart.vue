 <template>
 <div class="ml-3 relative">
            <div>
              <button @click="cartOpen = !cartOpen" class="bg-gray-800 text-gray-300 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
               <font-awesome-icon class="text-gray-300" icon="shopping-cart" />
              </button>
            </div>
          
             <!-- <CartItem/> -->
             <div class="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 pr-2 pl-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" v-if="cartOpen">
               <div>
                <div v-for="product in this.$store.state.cart.cart" :key="product.id">
                  <div class="bg-gray-100 mt-2 p-2 ">
                    <span class="text-md font-semibold"> {{product.name}} </span>
                
                  <span class="ml-4">{{product.price}} </span>
                </div>
                </div>
               </div>
               <div class="" v-if="this.$store.state.cart.cart.length>0">
               <div class="inline-block"> Total Price  </div>
               <div class="inline-block ml-6"> {{this.$store.state.cart.total}} </div>
              
          
             
                <button class="block m-2 p-1 bg-gray-800 rounded text-white" @click="clearCart">
               Clear Cart
             </button>
             <button class="block m-2 p-1 bg-gray-800 rounded text-white">
               Checkout
             </button>
            
               </div>
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
            price: null
        }
    },
    methods :{
      clearCart(){
        this.$store.dispatch('cart/clearCart')
      },
      totalPrice(){
        if (this.$store.state.cart.cart){
          var length = this.$store.cart.account.cart.length()
          for(let i = 0; i <length; i++){
           var price = 0
           price += this.$store.state.cart.cart.product[i].price
           this.price = price
          }
        }
      }
    }

}
 </script>