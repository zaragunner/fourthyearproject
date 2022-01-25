import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/pages/Auth/Login.vue'
import Register from '@/components/pages/Auth/Register.vue'
import Verify from '@/components/pages/Auth/Verify.vue'
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue'
import Catalogue from '@/components/pages/Catalogue/Catalogue.vue'
import Item from '@/components/pages/Item/Item.vue'
import Checkout from '@/components/pages/Checkout/Checkout.vue'
import Main from '@/components/pages/Main.vue'
import store from '../store/store'

const routes = [
    {
        component: Main,
        name: 'Main',
        path: '/',
        children: [
            { component: Dashboard,     name: 'Dashboard',        path: '/',            meta: { auth: true } },
             {component : Catalogue,    name: 'Catalogue',        path: '/catalogue'                          },
            {component: Checkout,       name: 'Checkout',         path: '/checkout'},
            { component: Login,         name: 'Login',            path: '/login',       meta: { auth: false } },
            { component: Register,         name: 'Register',            path: '/register',       meta: { auth: false } },
            { component: Verify,         name: 'Verify',            path: '/verify',       meta: { auth: false } },
            {component: Item ,          name: 'Item',             path: '/:id'}
      
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(() => {
    store.dispatch('account/getGroups')
  store.dispatch('account/fetchUser')
})
export default router;