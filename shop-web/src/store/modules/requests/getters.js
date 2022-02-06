export default{
  getProducts(state){
    const currentPage = state.currentPage;
    const perPage = state.perPage;
    const index = (currentPage - 1) * perPage;
    return state.products.slice(index, index + perPage)
  }
}