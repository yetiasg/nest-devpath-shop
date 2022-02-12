<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <div class="list-view">
    <div class="details" v-for="order in orders" :key="order.id">
      <p>{{order.id}}</p>
      <p>{{order.userId}}</p>
      <p>{{order.amount}}</p>
      <p>{{order.totalPrice}}</p>
      <p>{{order.status}}</p>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {

  data(){
    return {
      names: ['id', 'customer', 'amount', 'total price', 'status', 'details'],
    }
  },
  computed:{
    orders(){
      return this.$store.state.requests.orders;
    }
  },
  mounted(){
     this.$store.dispatch('fetchOrders');
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
    width: calc(100%/6);
    padding: 1rem;
  }

  .list-view{
    height: calc(100% - 4.72rem);
    overflow-y: scroll;
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
    width: calc(100%/6);
    padding: 1rem;
    word-wrap: break-word;
  }
</style>