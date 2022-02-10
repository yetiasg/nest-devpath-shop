<template>
  <header>
    <p><router-link to="/">your-shop-name</router-link></p>
    <div>
      <base-button class="accountBtn" link mode="clearBtn" :to="`/shop`">shop</base-button>
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
      const role = localStorage.getItem('role')
      return role?.toLowerCase()
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

  p{
    font-size: 1.2rem;
    margin-left: 2rem;
  }

  header{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #EEEEEE;
    height: 4.72rem;
  }

  .accountBtn{
    margin: 0 2rem;
  }
</style>