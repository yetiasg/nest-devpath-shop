<template>
    <section>
        <div class="view-name">
          {{viewName}}
        </div>
    </section>
</template>

<script>
export default {
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