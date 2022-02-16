<template>
    <div class="modalView">
      <div class="add-product">
        <label for="firstName">first name</label>
        <input type="text" id="firstName" v-model="firstName">

        <label for="lastName">last name</label>
        <input type="text" id="lastName" v-model="lastName">

        <label for="email">email</label>
        <input type="text" id="email" v-model="email">

        <div class="option-buttons">
          <base-button mode="clearBtn" @click.prevent="resetPassword" class="resetPassword btn">Reset password</base-button>
          <base-button mode="clearBtn" @click.prevent="updateUserData" class="applyChanges btn">Apply changes</base-button>
        </div>
        </div>
      </div>
</template>

<script>
export default {
  date(){
    return {
      firstName: this.$store.state.auth.firstName,
      lastName: this.$store.state.auth.lastName,
      email: this.$store.state.auth.email,
    }
  },
  methods: {
    updateUserData(){
      this.$store.dispatch('updateUserData', {firstName: this.firstName, lastName: this.lastName, email: this.email})
    },
    resetPassword(){
      this.$store.dispatch('resetPassword')
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
    width: calc(100%/6);
    padding: 1rem;
  }

  .list-view{
    height: calc(100% - 4.72rem);
    overflow-y: scroll;
  }

  *{
    color:rgb(123, 123, 123);
  }


  header{
    display: flex;
    justify-content: space-between;
  }

  header span{
    display: flex;
    justify-content: center;
    align-items: center;
    width:2rem;
    height: 2rem;
    font-size: 1.4rem;
    border-radius: 50px;
    background-color: rgb(43, 125, 201);
    color: white;
  }

    header span:hover{
    background-color: rgb(57, 145, 228);
    cursor: pointer;
  }

  .add-product{
    background-color:#F5F5F5;
    border-radius: 10px;
    padding: 1rem;
  }

  input, select, textarea{
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 10px;
    margin: 1rem 0;
    padding: 0.5rem;
  }

  textarea{
    height: 7rem;
  }

  #category {
    height: 7rem;
  }

  .short-input{
    display: flex;
    justify-content: space-between;
  }

  label {
    width: 48%;
  }

  input.stock, input.price{
    width: 10%
  }

  .footer-options{
    display: flex;
    justify-content: space-between;
  }

  .btn{
    border-radius: 10px;
    color: white;
  }

  .applyChanges{
    background-color: #45CB45;
  }

  .applyChanges:hover{
    background-color: #33ae33;
  }

  .resetPassword{
    background-color: #d62828;
  }

  
  .resetPassword:hover{
    background-color: #c41818;
  }
</style>