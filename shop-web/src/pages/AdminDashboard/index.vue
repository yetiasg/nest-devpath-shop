<template>
    <section>
        <admin-header class="admin-header"></admin-header>
        <the-menu class="admin-menu"></the-menu>
        <content-box>
            <div class="infoBox">
                {{message}}
            </div>
        </content-box>

        <!-- <the-statistics v-show="whereAmI === 'statistics'"></the-statistics>
        <the-products></the-products>
        <the-Categories></the-Categories>
        <the-orders></the-orders>
        <the-users></the-users> -->
    </section>
</template>
<script>

import AdminHeader from './components/AdminHeader'

// import TheStatistics from './views/TheStatistics';
// import TheProducts from './views/TheProducts';
// import TheCategories from './views/TheCategories';
// import TheOrders from './views/TheOrders';
// import TheUsers from './views/TheUsers';

import TheMenu from './components/TheMenu'

import ContentBox from './components/ContentBox'

export default {
    components:{
        AdminHeader,
        // TheStatistics,
        // TheProducts,
        // TheCategories,
        // TheOrders,
        // TheUsers,
        ContentBox,
        TheMenu
    },
    data(){
      return {
        message: 'Admin - dashboard'
      }
    },
    mounted(){
        this.$store.dispatch('tryLogin')
    },
    computed: {
        whereAmI(){
            return this.$router.path
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