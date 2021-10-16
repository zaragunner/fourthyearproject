import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import Splashscreen from '@/components/pages/Unauthorised/Splashscreen.vue'
import Login from '@/components/pages/Auth/Login.vue'
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue'
const routes = [
    {
    component: App,
    name: 'App',
    path: '/',
    children : [
        {component: Splashscreen,  name:'Splashscreen', path: '/'},
       { component: Login,  name: 'Login', path: '/login' },
       {component: Dashboard, name: 'Dashboard', path:'/dashboard'}
    ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;