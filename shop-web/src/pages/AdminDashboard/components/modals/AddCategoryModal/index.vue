<template>
   <teleport to="body">

   <div class="modalView">
      <div class="add-category">
        <header>
          <p>Add Category</p>
          <span @click="closeModal">X</span>
        </header>
        <label for="name">name</label>
        <input type="text" id="name" v-model="name">

        <label for="description">description</label>
        <textarea type="text" id="description" v-model="description"></textarea>

        <div class="footer-options">
          <div class="option-buttons">
            <base-button mode="clearBtn" @click.prevent="createProduct" class="addCategoryBtn btn">+ Add Category</base-button>
          </div>
        </div>
      </div>
      </div>
    </teleport>

</template>

<script>
export default {
  data(){
    return {
      name: '',
      description: '',
    }
  },
  methods: {
    closeModal(){
      this.$store.commit('handleAddCategoryModal', false)
    }, 
    createProduct(){
      const category = {name: this.name, description: this.description}
      this.$store.dispatch('createCategory', category)
    }
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


  .add-category{
    width: 40rem;
    min-height: 35rem;
    background-color:#F5F5F5;
    border-radius: 10px;
    padding: 1rem;
  }

  header span:hover{
    background-color: rgb(57, 145, 228);
    cursor: pointer;
  }

  input, textarea{
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


  .addCategoryBtn{
    background-color: #45CB45;
  }

  .addCategoryBtn:hover{
    background-color: #33ae33;
  }

  .cancelBtn{
    background-color: #d62828;
  }

  
  .cancelBtn:hover{
    background-color: #c41818;
  }

</style>