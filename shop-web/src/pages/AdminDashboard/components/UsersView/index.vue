<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <div class="list-view">
    <the-user v-for="user in users" :key="user.id" :user="user"></the-user>
  </div>
</template>

<script>

import TheUser from '../TheUser'

export default {
  components: { TheUser },
  data(){
    return {
      names: ['id', 'email', 'fullname', 'address', 'options'],
      users: [
        {id: 123, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
        {id: 65, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
        {id: 13423, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
        {id: 14263, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
        {id: 1243, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
        {id: 12343, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
        {id: 16323, email: 'yetiasg@gmail.com', fullname:'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'},
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
    width: calc(100%/5);
    padding: 1rem;
  }

  .list-view{
    height: calc(100% - 4.72rem);
    overflow-y: scroll;
  }
</style>