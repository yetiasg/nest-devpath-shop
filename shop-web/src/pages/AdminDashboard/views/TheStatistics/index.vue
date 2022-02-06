<template>
    <section>
        {{viewName}}
    </section>
</template>

<script>
export default {
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