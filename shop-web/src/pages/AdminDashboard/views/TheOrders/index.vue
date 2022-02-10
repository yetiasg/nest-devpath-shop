<template>
    <section>
        <div class="infoBox">
          {{message}}
        </div>
    <orders-view></orders-view>
    </section>
</template>

<script>

import OrdersView from '../../components/OrdersView'

export default {
    components: {
        OrdersView
    },
    data(){
      return {
        message: 'Orders'
      }
    }
}
</script>

<style scoped>
    .iew-name{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    section{
        height: 100%;
        width: 100%;
    }
</style>