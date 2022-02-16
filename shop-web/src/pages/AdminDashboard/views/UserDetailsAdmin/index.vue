<template>
    <section>
        {{viewName}}
    <details-view></details-view>
    </section>
</template>

<script>
import DetailsView from '../../components/DetailsView'

export default {
    components: {
        DetailsView
    },
    data(){
      return {
        viewName: 'User details'
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