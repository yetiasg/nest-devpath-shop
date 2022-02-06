<template>
    <section>
        {{viewName}}
    <statistics-view></statistics-view>
    </section>
</template>

<script>
import StatisticsView from '../../components/StatisticsView'

export default {
    components: {
        StatisticsView
    },
    data(){
      return {
        viewName: 'Statistics'
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
    }
</style>