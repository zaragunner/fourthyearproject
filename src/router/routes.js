import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import Splashscreen from '@/components/pages/Unauthorised/Splashscreen.vue'
import Login from '@/components/pages/Auth/Login.vue'
const routes = [
    {
    component: App,
    name: 'App',
    path: '/',
    children : [
        {component: Splashscreen,  name:'Splashscreen', path: '/'},
       { component: Login,  name: 'Login', path: '/login' }
    ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;