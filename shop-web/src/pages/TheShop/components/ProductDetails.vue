<template>
    <div class="details-container" @click.stop>
      <span class="closeModal" @click="backToProducts">x</span>
      <h3>{{currentProduct?.name}}</h3>
      <p>Description: {{currentProduct?.description}}</p>
      <p>Price: {{currentProduct?.price}} zł</p>
      <label>Amount: </label>
      <input type="number" name="amount" id="amount" v-model="amount">
      <base-button @click.prevent="addProductToCart(currentProduct?.id)">Add to cart</base-button>
    </div>
</template>

<script>


export default {
  data(){
    return{
      amount: 1,
      selectedProduct: this.$store.state.requests.selectedProduct
    }
  },
  methods:{
    backToProducts(){
      this.$store.commit('setSelectedProduct', null);
    },
    addProductToCart(id){
      this.$store.commit('updateCart', {id, amount: this.amount})
    }
  },  
  computed: {
    currentProduct() {
      return this.$store.state.requests.currentProduct
    }
  }

}
</script>

<style scoped>
  .details-container{
    position: relative;
    background-color: white;
    width: 50rem;
    height: 35rem;
    border-radius: 10px;
    padding: 1rem;
  }

  .closeModal{
    position: absolute;
    right: 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    text-align: center;
    border-radius: 50px;
    background-color: rgb(246, 227, 192);
  }

  .closeModal:hover{
    background-color: rgb(241, 218, 172);
    transition: ease-in 0.2s;
  }

</style>