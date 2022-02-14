<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  
  <div class="list-view">
    <div class="details" v-for="product in products" :key="product.id">
      <p>{{product.id}}</p>
      <p>{{product.name}}</p>
      <p>{{product.price}}</p>
      <p>{{product.description}}</p>
      <p>{{product.categories}}</p>
      <p>{{product.stock}}</p>
      <p>{{product.archived}}</p>
      <p><span class="remove" @click="removeProduct(product.id)">X</span>
      <span class="update" @click="uodateProduct(product.id)">U</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      names: ['id', 'name', 'price', 'description', 'categories', 'stock', 'archived', 'options'],
    }
  },
  computed:{
    products(){
      return this.$store.getters.getProducts;
    }
  },
  methods:{
    removeProduct(id){
      this.$store.dispatch('removeProductById', id)
    }
  },
  mounted(){
     this.$store.dispatch('fetchProducts');
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
    width: calc(100% / 8);
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
    width: calc(100%/8);
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
    background-color: rgb(201, 43, 43);
    color: white;
  }

  .remove:hover{
    background-color: rgb(228, 57, 57);
    cursor: pointer;
  }
</style>