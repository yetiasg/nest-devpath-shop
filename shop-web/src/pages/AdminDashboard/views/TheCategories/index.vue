<template>
    <section>
        {{viewName}}
        <categories-view></categories-view>
    </section>
</template>

<script>

import CategoriesView from '../../components/CategoriesView'

export default {
    components: {
        CategoriesView
    },
    data(){
      return {
        viewName: 'Categories'
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