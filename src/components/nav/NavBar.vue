<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
            Company Logo
             </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
             <router-link to="/">           <NavItem name="Dashboard" :current='active' />    </router-link>
             <router-link to="catalogue" > <NavItem name="Catalogue" :current='active'/>     </router-link>
            
             <NavItem v-if="this.$store.state.account.groups =='Admin'" name="Content Management" :current='false' href='/' />

            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- cart dropdown -->
       <DropCart class="mr-2"/>
          <!-- Profile dropdown -->
         <UserMenu/>
        
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import UserMenu from '@/components/nav/UserMenu.vue'
import DropCart from '@/components/nav/DropCart.vue'
import NavItem from '@/components/nav/NavItem.vue'
 



export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    UserMenu,
    DropCart,
    NavItem
   },
   props : {
     active: Boolean
   }

}
</script>