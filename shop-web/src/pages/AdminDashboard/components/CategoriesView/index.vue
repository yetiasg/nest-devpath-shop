<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <the-category v-for="category in categories" :key="category.id" :category="category"></the-category>
</template>

<script>

import TheCategory from '../TheCategory'

export default {
  components: { TheCategory },
  data(){
    return {
      names: ['id', 'name', 'description', 'options'],
      categories: [
        {id: 123, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 1253, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 12453, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 17423, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 1243, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 127643, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 1523, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"}
      ]
    }
  }
}
</script>


<style scoped>
  .names{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 10px;
  }

  .names > p{
    width: calc(100%/8);
    padding: 1rem;
  }

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