<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <div class="list-view">
    <div class="details" @click.prevent="getOrderItems(order.id)" v-for="order in orders" :key="order.id">
      <p>{{order.id}}</p>
      <p>{{order.userId}}</p>
      <p>{{order.amount}}</p>
      <p>{{order.totalPrice}}</p>
      <p>{{order.status}}</p>
      <p><span class="remove" title="change status" @click="changeStatus">s</span></p>
      <div class="items">
        <ul>
          <li v-for="item in orderItems" :key="item.id">{{item}}</li>
            <p v-for="row in item" :key="row.id">{{row}}</p>
        </ul>
      </div>
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
    },
    orderItems(){
      return this.$store.state.requests.orderItems
    }
  },
  methods:{
    getOrderItems(id){
      this.$store.dispatch('getOrderItems', id)
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

  .remove{
    display: flex;
    justify-content: center;
    align-items: center;
    width:1.6rem;
    height: 1.6rem;
    font-size: 1rem;
    border-radius: 50px;
    background-color:  rgb(108, 61, 202);
    color: white;
  }

  .remove:hover{
    background-color: rgb(141, 90, 242);
    cursor: pointer;
  }
</style>