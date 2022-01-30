<template>
  <div class="modalView" @click="backToBeers">
    <beer-details></beer-details>
  </div>
</template>

<script>
import BeerDetails from './BeerDetails.vue';
export default {
  components:{
    BeerDetails,
  },
  data(){
    return{
      selectedBeer: this.$store.state.requests.selectedBeer
    }
  },
  methods:{
    backToBeers(){
      this.$store.commit('setSelectedBeer', null);
      this.$store.commit('setSortingModalMode', 'closed')

    }
  }
}
</script>

<style scoped>
  .modalView{
    width: 100%;
    min-height: 110vh;
    background-color: rgba(194, 194, 194, 0.705);
    z-index: 5;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
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