<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <the-order v-for="order in orders" :key="order.id" :order="order"></the-order>
</template>

<script>
import TheOrder from '../TheOrder'

export default {
  components: { TheOrder },
  data(){
    return {
      names: ['id', 'customer', 'amount', 'total price', 'status', 'details'],
      orders: [
        {id: 123, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },
        {id: 5, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },
        {id: 12433, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },
        {id: 14623, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },
        {id: 123453, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },
        {id: 1543623, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },
        {id: 44, customer: {id: '43536423', fullName: 'Mateusz Żupa', address: '43-211 Piasek, Al. Dębowa 22'}, amount: 4, totalPrice: 344.89, status: 'paid' },

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