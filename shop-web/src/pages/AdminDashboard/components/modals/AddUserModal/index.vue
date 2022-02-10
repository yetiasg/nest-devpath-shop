<template>
   <teleport to="body">

   <div class="modalView">
      <div class="add-user">
        <header>
          <p>Add User</p>
          <span @click="closeModal">X</span>
        </header>
        <label for="email">email</label>
        <input type="text" id="name">

        <div class="footer-options">
          <div class="option-buttons">
            <base-button mode="clearBtn" class="cancelBtn btn">Cancel</base-button>
            <base-button mode="clearBtn" class="addUserBtn btn">+ Add User</base-button>
          </div>
        </div>
      </div>
      </div>
    </teleport>

</template>

<script>
export default {
  methods: {
    closeModal(){
      this.$store.commit('handleAddUserModal', false)
    },
  }
}
</script>

<style scoped>

  *{
    color:rgb(123, 123, 123);
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

  .add-user{
    width: 40rem;
    min-height: 35rem;
    background-color:#F5F5F5;
    border-radius: 10px;
    padding: 1rem;
  }

  input{
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 10px;
    margin: 1rem 0;
    padding: 0.5rem;
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


  .addUserBtn{
    background-color: #45CB45;
  }

  .addUserBtn:hover{
    background-color: #33ae33;
  }

  .cancelBtn{
    background-color: #d62828;
  }

  
  .cancelBtn:hover{
    background-color: #c41818;
  }

</style>