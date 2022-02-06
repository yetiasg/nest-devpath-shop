<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <the-user v-for="user in users" :key="user.id" :user="user"></the-user>
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