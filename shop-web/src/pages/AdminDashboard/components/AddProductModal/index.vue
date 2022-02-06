<template>
  <div class="modalView">
      <div class="add-product">
        <header>
          <p>Add product</p>
          <span>X</span>
        </header>
        <label for="name">name</label>
        <input type="text" id="name">

        <label for="description">description</label>
        <textarea type="text" id="description"></textarea>

        <label for="category">categories</label>
        <select id="category">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>

        <div class="short-input">
          <label for="stock">stock
            <input type="text" id="stock">
          </label>

          <label for="price">price
            <input type="text" id="price">
          </label>
        </div>

        <div class="footer-options">
          <div class="publicTrigger">Yes/No</div>
          <div class="option-buttons">
            <base-button mode="clearBtn" class="cancelBtn btn">Cancel</base-button>
            <base-button mode="clearBtn" class="addProductBtn btn">+ Add product</base-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      categories: [
        {id: 123, name: 'shoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 1253, name: 'shetretoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 12453, name: 'shostges', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 17423, name: 'shrgergaeoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 1243, name: 'shgergqewrtgewrgwergqwertgqw4etgfoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 127643, name: 'shergeoes', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"},
        {id: 1523, name: 'shoergers', description:"swefioswhgfoaqiwhgoiawrhbgo wroi whgfhweirghoqiwregho"}
      ]
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