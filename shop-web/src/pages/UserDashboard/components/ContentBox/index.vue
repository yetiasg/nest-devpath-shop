<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {
  data(){
    return {
      message: 'Content box'
    }
  },
  computed: {
    whereAmI(){
      return this.$router.path
    }
  }
}
</script>

<style scoped>
    section{
      position: fixed;
      top:4.72rem;
      left: 18.14rem;
      height: calc(100vh - 4.72rem);
      width: calc(100% - 18.14rem);
      padding: 2rem;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
</style>