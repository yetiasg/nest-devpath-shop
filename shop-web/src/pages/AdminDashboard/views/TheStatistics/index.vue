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
    }
}
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
    }
</style>