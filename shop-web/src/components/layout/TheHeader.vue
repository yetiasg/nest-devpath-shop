<template>
  <header>
    <p><router-link to="/">your-shop-name</router-link></p>
    <div>
      <base-button class="accountBtn" link mode="clearBtn" :to="`/shop`">shop</base-button>
      <base-button class="accountBtn" link mode="clearBtn" :to="`/cart`">cart</base-button>
      <base-button v-show="((whereAmI !== '/auth'))" class="accountBtn" link mode="clearBtn"  :to="`/${whoAmI}/dashboard`">account</base-button>
      <base-button class="accountBtn" v-show="((whereAmI !== '/auth'))"  @click="logout" mode="clearBTtn" link to="/" ><span class="logoutBtn">logout</span></base-button>
    </div>
  </header>
</template>
<script>
export default {

  computed:{
    whereAmI(){
      return this.$route.path;
    },
    whoAmI(){
      return localStorage.getItem('role').toLowerCase()
    }

  }, 
    methods: {
      logout(){
        this.$store.dispatch('logout')
      }
    }
}
</script>

<style scoped>
  @media screen and (max-width: 360px) {
    header{
      height: calc((100vh - 85vh)/2);
    }
    p{
      font-size: 1.2rem;
      padding: 0 0 0 calc(((100% - 92%)/2) + 1%);
    }
    .accountBtn{
      display: flex;
      padding: 0 calc(((100% - 92%)/2) + 1%) 0 0;
    }
  }

  @media screen and (min-width: 361px) and (max-width: 768px){
    header{
      height: calc((100vh - 84vh)/2);
    }
    p{
      font-size: 1.2rem;
      padding: 0 0 0 calc(((100% - 87%)/2) + 1%);
    }
    .accountBtn{
      display: flex;
      padding: 0 calc(((100% - 88%)/2) + 1%) 0 0;
    }
  }

  @media screen and (min-width: 768px){
    header{
      height: calc((100vh - 83vh)/2);
    }
    p{
      font-size: 1.2rem;
      padding: 0 0 0 calc(((100% - 85%)/2) + 1%);
    }

  }

  @media screen and (min-width: 1204px){
    p{
      font-size: 1.2rem;
      padding: 0 0 0 calc(((100% - 1024px)/2));
    }
    .accountBtn{
      padding: 0 calc(((100% - 1024px)/2)) 0 0;
    }
  }

  header{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .accountBtn{
    margin: 0 2rem;
  }

  div{
    margin: 2rem;
  }

</style>