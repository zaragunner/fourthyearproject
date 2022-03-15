<template>
    <NavBar v-if="this.$store.state.site.theme"/>
    <router-view />
    <Footer  v-if="this.$store.state.site.site"/>

</template>
<script>
import Footer from '@/components/footer/footer.vue'
import NavBar from '@/components/nav/NavBar.vue'
import {getSite } from '../../../api/sites/sites-api'
import {getTheme } from '../../../api/themes/themes-api'
export default {
    components :{
        NavBar,
        Footer
    },
      async beforeCreate(){
        await getSite(process.env.VUE_APP_SITEID).then(result => {
            console.log("RESULT" , result)
     this.$store.dispatch('site/setSite' , result)
    })

    await getTheme(process.env.VUE_APP_SITEID).then(result => {
        this.$store.dispatch('site/setTheme' , result)    })
    
    
    
    
    }
    
}
</script>