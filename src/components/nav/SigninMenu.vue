 <template>
 <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton :style="`background-color : ${this.$store.state.site.theme.colours.primary}`" class=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                  <font-awesome-icon class=" m-2.5 text-gray-300 " icon="user" />
                  </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem @click="this.$router.push('/login')" v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign In</a>
                </MenuItem>
                <MenuItem @click="this.$router.push('/register')" v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Register</a>
                </MenuItem>
              
                
             
               
                
              </MenuItems>
            </transition>
          </Menu>
 </template>

 <script>
import {  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

export default {
  data (){
    return{
      username: ''
    }
  },
    components:{
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    },
    mounted(){
    },
    methods:{
     
    }

}
 </script>
 