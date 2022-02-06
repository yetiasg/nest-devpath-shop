<template>
  <div class="names">
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
  <div class="list-view">
    <the-product v-for="product in products" :key="product.id" :product="{id: product.id,name: product.name, price: product.price, description: product.description, categories: product.categories, stock: product.stock, archived: product.archived}"></the-product>
  </div>
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

</style>