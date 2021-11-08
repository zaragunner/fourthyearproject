<template>
    
<LoginUI v-if="this.$store.state.account.authStatus === false" />
<CatalogueUI v-if="this.$store.state.account.authStatus === true"  />
</template>

<script>
import LoginUI from '@/components/pages/LoginUI.vue'
import CatalogueUI from '@/components/pages/CatalogueUI.vue'
export default {
    components :{
        LoginUI,
        CatalogueUI
    }
}
</script>