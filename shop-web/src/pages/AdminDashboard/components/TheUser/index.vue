<template>
  <div class="details">
    <p v-for="property in user" :key="property">{{property}}</p>
  </div>
</template>

<script>

export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>
<style scoped>
  .details{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #F5F5F5;
    border-radius: 10px;
    margin: 0.5rem 0;
  }

  .details > p{
    width: calc(100%/8);
    padding: 1rem;
    word-wrap: break-word;
  }
</style>