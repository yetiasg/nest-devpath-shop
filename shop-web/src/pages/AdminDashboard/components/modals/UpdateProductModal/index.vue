<template>
   <teleport to="body">

   <div class="modalView">
      <div class="add-product">
        <header>
          <p>Update product</p>
          <span @click="closeModal">X</span>
        </header>
        <label for="name">name</label>
        <input type="text" id="name" v-model="name">

        <label for="description">description</label>
        <textarea type="text" id="description" v-model="description"></textarea>

        <label for="category">categories {{categoriesSelected}}</label>
        <select id="category" multiple v-bind="categories">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>

        <div class="short-input">
          <label for="stock">stock
            <input type="number"  min="0" step="1" id="stock" v-model="stock">
          </label>

          <label for="price">price
            <input type="number" min="0" id="price" v-model="price">
          </label>
        </div>

        <div class="footer-options">{{archived}}
          <div class="archivedTrigger">
            <input type="checkbox" id="archived" v-model="archived">
            <label for="archived">archived (make not public)</label>
          </div>
          <div class="option-buttons">
            <base-button mode="clearBtn" @click.prevent="updateProduct" class="addProductBtn btn">Update product</base-button>
          </div>
        </div>
      </div>
      </div>
    </teleport>

</template>

<script>
export default {
  data(){
    return{
      name: this.$store.state.requests.productToUpdate.name,
      description: this.$store.state.requests.productToUpdate.description,
      categoriesSelected: this.$store.state.requests.productToUpdate.categories,
      stock: this.$store.state.requests.productToUpdate.stock,
      price: this.$store.state.requests.productToUpdate.price,
      archived: Boolean(this.$store.state.requests.productToUpdate.archived)
    }
  },
  methods: {
    closeModal(){
      this.$store.commit('handleUpdateProductModal', false)
    },
    updateProduct(){
      const product = {name: this.name, description: this.description, categories: this.categoriesSelected, stock: Number(this.stock), price: parseInt(this.price, 10), archived: Boolean(this.archived), id:this.$store.state.requests.productToUpdate.id, }
      this.$store.dispatch('updateProduct', product)
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

  .add-product{
    width: 40rem;
    min-height: 35rem;
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


  .addProductBtn{
    background-color: #45CB45;
  }

  .addProductBtn:hover{
    background-color: #33ae33;
  }

  .cancelBtn{
    background-color: #d62828;
  }

  
  .cancelBtn:hover{
    background-color: #c41818;
  }

</style>