 <template>
  <section>
    <ul>
      <li v-for="product in products" :key="product.id" @click="selectProduct(product.id)">
        <img :src="product.img" :alt="product.name">
        <div class="data">
          <span>
            <p>{{product.name}}</p>
          </span>
          <p>{{product.price}}zł</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  methods: {
    selectProduct(id){
      this.$store.commit('setSelectedProduct', id);
    }
  },
  computed:{
    products(){
      return this.$store.getters.getProducts;
    }
  }
}
</script>

<style scoped>
  section{
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  ul{
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }

  li{
    background-color: rgb(255, 255, 255);
    margin: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(100, 100, 100, 0.15);
    /* border: 1px solid rgba(180, 180, 180, 0.253); */
    cursor: pointer;
  }

  .data{
    padding: 0 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
  }
  

  img{
    position: relative;
    max-width: calc(100% - 1rem);
    border-radius: 10px;
    margin: 0.5rem;
  }

  @media screen and (min-width:550px) and (max-width:768px){
    ul{
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    li{
      flex-basis: 40%;
    }
  }  
  
  @media screen and (min-width:769px) and (max-width:1024px){
    ul{
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    li{
      flex-basis: 25%;
    } 
  }    

  @media screen and (min-width:1024px){
    ul{
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    li{
      flex-basis: 21%;
    } 
  }  
</style>