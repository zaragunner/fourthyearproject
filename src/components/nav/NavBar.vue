<template>
  <Disclosure as="nav" :style="`background-color : ${this.$store.state.site.theme.colours.primary}`" v-slot="{ open }">
    <div class="w-7xl  px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <div v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <div v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class=" text-white flex-shrink-0 flex items-center">
          <img class="h-8 w-8" src="@\assets\WIT.jpg"/>
          <p class="ml-2  "> {{this.$store.state.site.site.name}}</p>
          
             </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">

             <router-link to="/"> 
                <NavItem class="mt-4" name="Dashboard" v-if="this.$store.state.account.groups =='Public' || this.$store.state.account.groups ==''  || this.$store.state.account.groups == null" :current='active' /> 
             </router-link>

             <router-link to="/catalogue" >
                <NavItem v-if="this.$store.state.account.groups =='Public' ||
                               this.$store.state.account.groups ==''  || 
                              this.$store.state.account.groups == null"
                         name="Catalogue" 
                         :current='active'/>  
               </router-link>

            <router-link to="/contentmanagement" >
             <NavItem v-if="this.$store.state.account.groups =='Admin'" name="Content Management" :current='false' />
             </router-link>

              <router-link to="/orders" >
             <NavItem v-if="this.$store.state.account.groups =='Admin'" name="Orders" :current='false' />
             </router-link>

            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- cart dropdown -->
      
          <!-- Profile dropdown -->
          <span class="w-1/2 inline bg-red-400 font-semi-bold rounded-lg text-center" v-if="this.$store.state.account.groups == 'Admin' ">Admin Mode Active </span>
         <UserMenu v-if="this.$store.state.account.user"/>
        <SigninMenu v-if="!this.$store.state.account.user" />
         
        
              

                 <DropCart v-if="this.$store.state.account.groups =='Public' || this.$store.state.account.groups == null" class="mr-2"/>
        </div>
      </div>
    </div>

  </Disclosure>
  </template>

<script>
import { Disclosure, DisclosureButton } from '@headlessui/vue'
import UserMenu from '@/components/nav/UserMenu.vue'
import DropCart from '@/components/nav/DropCart.vue'
import NavItem from '@/components/nav/NavItem.vue'
import SigninMenu from '@/components/nav/SigninMenu.vue'
 



export default {
  components: {
    Disclosure,
    DisclosureButton,
    // DisclosurePanel,
    UserMenu,
    DropCart,
    NavItem,
    SigninMenu
   },
   props : {
     active: Boolean
   }

}
</script>