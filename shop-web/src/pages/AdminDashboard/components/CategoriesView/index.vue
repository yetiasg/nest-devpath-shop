<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <div class="list-view">
    <the-category  he-category v-for="category in categories" :key="category.id" :category="category"></the-category>
  </div>
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
    width: calc(100% - 17px);
  }

  .names > p{
    width: calc(100%/4);
    padding: 1rem;
  }

  .list-view{
    height: calc(100% - 4.72rem);
    overflow-y: scroll;
  }
  
</style>