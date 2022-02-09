<template>
    <section>
        <admin-header class="admin-header"></admin-header>
        <the-menu class="admin-menu"></the-menu>
        <content-box>
            <the-statistics v-show="whereAmI('/statistics')"></the-statistics>
            <the-products v-show="whereAmI('/products')"></the-products>
            <the-categories v-show="whereAmI('/categories')"></the-categories>
            <the-orders v-show="whereAmI('/orders')"></the-orders>
            <the-users v-show="whereAmI('/users')"></the-users>
        </content-box>
    </section>
</template>
<script>

import AdminHeader from './components/AdminHeader'

import TheStatistics from './views/TheStatistics';
import TheProducts from './views/TheProducts';
import TheCategories from './views/TheCategories';
import TheOrders from './views/TheOrders';
import TheUsers from './views/TheUsers';

import TheMenu from './components/TheMenu'

import ContentBox from './components/ContentBox'

export default {
    components:{
        AdminHeader,
        TheStatistics,
        TheProducts,
        TheCategories,
        TheOrders,
        TheUsers,
        ContentBox,
        TheMenu
    },
    data(){
      return {
        message: 'Admin - dashboard',
        rootAdminRoute: '/admin/dashboard'
      }
    },
    methods: {
        whereAmI(direction){
            return this.$route.path === (this.rootAdminRoute+direction)
        }
    }
}
</script>

<style scoped>
    .admin-header{
        position: fixed;
        top:0;
        left: 0;
    }

</style>