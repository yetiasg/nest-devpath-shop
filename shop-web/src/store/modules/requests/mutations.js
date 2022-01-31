export default{
  setAmountOfProducts(state, payload){
    state.amountOfProducts = payload;
  },
  setAmountOfPages(state, payload){
    state.amountOfPages = payload;
  },
  setCurrentPage(state, payload){
    state.currentPage = payload
  },
  setSelectedProduct(state, payload){
    state.selectedProduct = payload
  },
}