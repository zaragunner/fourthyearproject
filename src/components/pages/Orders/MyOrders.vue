<template>
    <div v-if="this.orders">
        {{this.orders}}
    </div>
</template>
<script>
import {getMyOrders} from '../../../../api/orders/orders-api.js'

export default {
    data(){
        return{
            orders: null
        }
    },
    async created(){
        await getMyOrders(this.$store.state.account.user.username).then(res =>{
            this.orders = res
        })
    }
}
</script>
