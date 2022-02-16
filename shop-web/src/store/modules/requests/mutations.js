export default{
  setProducts(state, payload){
    state.products = payload
  },
  setUsers(state, payload){
    state.users = payload
  },
  setOrders(state, payload){
    state.orders = payload
  },
  setCategories(state, payload){
    state.categories = payload
  },
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
  handleExportOrdersModal(state, payload){
    state.exportOrdersModal = payload
  },
  handleAddUserModal(state, payload){
    state.addUserModal = payload
  },
  handleAddCategoryModal(state, payload){
    state.addCategoryModal = payload
  },
  handleUpdateProductModal(state, payload){
    state.updateProductModal = payload
  },
  productToUpdate(state, payload){
    state.productToUpdate = payload
  },
  setOrderItems(state, payload){
    state.orderItems = payload
  },
  setCurrentUserOrders(state, payload){
    state.currentUserOrders = payload
  },
  setCurrentUserOrderItems(state, payload){
    state.currentUserOrderItems = payload
  }
}

