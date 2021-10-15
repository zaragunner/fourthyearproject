
<template>
  <amplify-authenticator>
    <div>
      <NavBar/>
     <Dashboard/>
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>
</template>


<script>
import NavBar from '@/components/nav/NavBar.vue'
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue'
export default {
    name: 'Login',
    components: {
      Dashboard,
      NavBar
    }
}
</script>
