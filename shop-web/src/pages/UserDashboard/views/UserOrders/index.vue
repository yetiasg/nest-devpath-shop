<template>
    <section>
        {{viewName}}
    <orders-view></orders-view>
    </section>
</template>

<script>
import OrdersView  from '../../components/OrdersView'

export default {
    components: {
        OrdersView
    },
    data(){
      return {
        viewName: 'Oser orders'
      }
    }
}
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
    }
</style>