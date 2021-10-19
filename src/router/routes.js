import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import Splashscreen from '@/components/pages/Unauthorised/Splashscreen.vue'
import Login from '@/components/pages/Auth/Login.vue'
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue'
// import store from '../store/store'
// import store from '@/store/store.js'
const routes = [
    {
        component: App,
        name: 'App',
        path: '/',
        children: [
            { component: Splashscreen,  name: 'Splashscreen', path: '/',         meta: { auth: false } },
            { component: Login,         name: 'Login',        path: '/login',    meta: { auth: false } },


            { component: Dashboard, name: 'Dashboard',        path: '/dashboard', meta: { auth: true } }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

//  router.beforeEach((to, from, next) => {
     
//     const route_requires_auth = to.meta.auth;
//   {
//       var auth = store.state.account.authorized
//       console.log("AUTH STATUS =" + auth)
//         if (auth) {
//             if (route_requires_auth) {
//                 next();
//             } else {
//                 next('/dashboard');
//             }
//         }
//         else {
            
//             if (route_requires_auth) {
//                 next('/');
//             } else {
//                 if (to.matched.length === 0) {
//                     router.replace('/')
//                 }
//                 else {
//                     next();
//                 }
//             }
        
//         }
    
// }
//  })
 

export default router;