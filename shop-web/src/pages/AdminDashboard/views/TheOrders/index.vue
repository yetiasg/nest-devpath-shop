<template>
    <section>

        <div class="infoBox">
          {{message}}
        </div>

    </section>
</template>
<script>


export default {

    data(){
      return {
        message: 'Orders'
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