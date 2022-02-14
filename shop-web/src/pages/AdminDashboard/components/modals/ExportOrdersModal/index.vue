<template>
  <teleport to="body">

   <div class="modalView">
      <div class="export-orders">
        <header>
          <p>Export orders</p>
          <span @click="closeModal">X</span>
        </header>

        <label for="name">from</label>
        <input type="date" id="name">

        <label for="name">to</label>
        <input type="date" id="name">

        <div class="option-buttons">
          <base-button mode="clearBtn" class="cancelBtn btn">Cancel</base-button>
          <base-button mode="clearBtn" class="exportOrdersBtn btn">Export orders</base-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  methods: {
    closeModal(){
      this.$store.commit('handleExportOrdersModal', false)
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

  .export-orders{
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

  .option-buttons{
    display: flex;
    justify-content: space-between;
  }

  .btn{
    border-radius: 10px;
    color: white;
  }


  .exportOrdersBtn{
    background-color: #CB8845;
  }

  .exportOrdersBtn:hover{
    background-color: #ae7033;
  }

  .cancelBtn{
    background-color: #d62828;
  }

  
  .cancelBtn:hover{
    background-color: #c41818;
  }

</style>