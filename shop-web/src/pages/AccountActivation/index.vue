<template>
  <section>
    <teleport to="body">
      <div class="modalView">
        <div class="activation">
          <p>Activate your accout</p>
          <base-button class="btn" mode="filledBtn" @click="activateAccount">Activate</base-button>
        </div>
      </div>
    </teleport>
  </section>
</template>


<script>
export default {
  data(){
    return {
      activationToken: this.$route.params.id
    }
  },
  methods: {
    activateAccount(){
      this.$store.dispatch('activateAccount', {token: this.activationToken} )
    }
  }
}
</script>

<style scoped>
  section{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modalView{
    width: 100%;
    min-height: 100vh;
    background-color: rgba(194, 194, 194, 0.705);
    z-index: 5;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .activation{
    width: 15rem;
    background-color:#F5F5F5;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn{
    border-radius: 10px;
    color: white;
    background-color: #45CB45;
    border:none;
    width: auto
  }

  .btn:hover{
    background-color: #33ae33;
    border:none
  }
</style>