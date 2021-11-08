<template>
    <NavBar/>
    <router-view />
</template>
<script>
import NavBar from '@/components/nav/NavBar.vue'
export default {
    components :{
        NavBar
    }
    
}
</script>