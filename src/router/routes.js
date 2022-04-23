import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/pages/Auth/Login.vue'
import Register from '@/components/pages/Auth/Register.vue'
import Verify from '@/components/pages/Auth/Verify.vue'
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue'
import Catalogue from '@/components/pages/Catalogue/Catalogue.vue'
import Item from '@/components/pages/Item/Item.vue'
import Checkout from '@/components/pages/Checkout/Checkout.vue'
import ContentMangement from '@/components/pages/Admin/ContentManagement.vue'
import Main from '@/components/pages/Main.vue'
import store from '../store/store'
import EditItem from '@/components/pages/Admin/EditItem.vue'
import AddItem from '@/components/pages/Admin/AddItem/AddItem.vue'
import Categories from '../components/pages/Admin/Config/Categories.vue'
import Subcategories from '../components/pages/Admin/Config/Subcategories.vue'
import VatRates from '../components/pages/Admin/Config/VatRates.vue'
import Payment from '../components/pages/Checkout/Payment.vue'
import PaymentSuccess from '../components/pages/Checkout/PaymentSuccess.vue'
import Orders from '../components/pages/Admin/Orders.vue'
import EditOrder from '../components/pages/Admin/EditOrder.vue'
import Options from '../components/pages/Admin/Config/Options.vue';
import MyOrders from '../components/pages/Orders/MyOrders.vue'
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
            {component: Item ,          name: 'Item',             path: '/:id'},
            {component: ContentMangement, name:'Content Management' , path:'/contentmanagement' },
            {component: EditItem ,          name: 'EditItem',             path: '/edititem/:id'},
            {component: AddItem ,          name: 'AddItem',             path: '/addItem'},
            {component: Categories, name:'Categories' , path:'/categories'},
            {component: Subcategories, name:'SubCategories' , path:'/subcategories'},
            {component: VatRates, name:'VatRates' , path:'/vatrates'},
            {component: Payment , name:'Payment' , path:'/payment'},
            {component: PaymentSuccess, name: 'PaymentSuccess', path:'/paymentsuccess'},
            {component: Orders , name : 'Orders' , path:'/orders'},
            {component: EditOrder ,          name: 'EditOrder',             path: '/editorder/:id'},
            {component: Options, name: 'Options' , path:'/options'},
            {component: MyOrders , name: 'MyOrders' , path:'/myorders'}
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