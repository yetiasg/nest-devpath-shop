<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <the-product v-for="product in products" :key="product.id" :product="product"></the-product>
</template>

<script>

import TheProduct from '../TheProduct'
import { products } from '../../../../store/modules/requests/productsMock'

export default {
  components: { TheProduct },
  data(){
    return {
      names: ['id', 'name', 'price', 'description', 'categories', 'stock', 'archived', 'options'],
      products: products
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