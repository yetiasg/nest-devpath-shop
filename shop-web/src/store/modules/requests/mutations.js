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
  handleAddProductModal(state, payload){
    state.addProductModal = payload
  },
  handleImportProductsModal(state, payload){
    state.importProductsModal = payload
  },
  handleExportProductsModal(state, payload){
    state.exportProductsModal = payload
  }
}