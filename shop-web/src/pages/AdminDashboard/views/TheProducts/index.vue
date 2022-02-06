<template>
    <section>
        {{viewName}}
        <products-view class="products-view"></products-view>
    </section>
</template>

<script>

import ProductsView from '../../components/ProductsView'

export default {
    components:{
        ProductsView
    },
    data(){
      return {
        viewName: 'Products'
      }
    },
    mounted(){
        this.$store.dispatch('tryLogin')
    }
}
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    }
</style>