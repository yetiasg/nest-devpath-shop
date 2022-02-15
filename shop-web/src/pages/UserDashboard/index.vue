<template>
    <section>
        <user-header class="user-header"></user-header>
        <the-menu class="user-menu"></the-menu>
        <content-box>
            <user-details v-show="whereAmI('/user-details')"></user-details>
            <user-orders v-show="whereAmI('/user-orders')"></user-orders>
        </content-box>
    </section>
</template>
<script>

import UserHeader from './components/UserHeader'
import UserDetails from './views/UserDetails'
import UserOrders from './views/UserOrders'
import TheMenu from './components/TheMenu'
import ContentBox from './components/ContentBox'

export default {
    components:{
        UserDetails,
        UserOrders,
        UserHeader,
        ContentBox,
        TheMenu
    },
    data(){
      return {
        message: 'User - dashboard',
        rootUserRoute: '/user/dashboard'
      }
    },
    methods: {
        whereAmI(direction){
            return this.$route.path === (this.rootUserRoute+direction)
        }
    }
}
</script>

<style scoped>
    .user-header{
        position: fixed;
        top:0;
        left: 0;
    }

</style>