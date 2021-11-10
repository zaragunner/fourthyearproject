<template>
    
<!-- <LoginUI v-if="this.$route.params == '/login'" /> -->
<CatalogueUI  />
</template>

<script>
// import LoginUI from '@/components/pages/LoginUI.vue'
import CatalogueUI from '@/components/pages/CatalogueUI.vue'
export default {
    components :{
        // LoginUI,
        CatalogueUI
    }
}
</script>