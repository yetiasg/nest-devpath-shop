// import router from '../../../router';
import config from '../../../config.js';

// // helpers----------------------------------------------
const getJSON = async(url, options = {}, context) =>{
    const response = await fetch(`${config.BASE_URL}${url}`, options);
    if (!response.ok) {
      console.log(context.dispatch('logout'))
      // context.rootState.auth.dispatch('logout')
      throw new Error(response.message);
    }
    const data = await response.json();
    return data;
};

export default{
  async loadProducts(context){
    const amountOfProducts = context.state.products
    context.commit('setAmountOfProducts', amountOfProducts)
    const perPage = context.state.perPage;
    const amountOfPages = Math.ceil(amountOfProducts / perPage)
    context.commit('setAmountOfPages', amountOfPages)
  },

  async fetchProducts(context){
    const products = await getJSON('/products')
    context.commit('setProducts', products)
  },

  async fetchUsers(context){
    const users = await getJSON('/users', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }}, context)
    context.commit('setUsers', users)
  },

  async fetchOrders(context){
    const orders = await getJSON('/orders', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setOrders', orders)
  },

  async fetchCategories(context){
    const categories = await getJSON('/categories', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setCategories', categories)
  },

  async fetchStatistics(context){
    const statistics = await getJSON('/statistics', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setStatistics', statistics)
  },

  async removeProductById(context, payload){
    await fetch(`${config.BASE_URL}/products/${payload}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${context.rootState.auth.access_token}`
      }
    })
    await context.dispatch('fetchProducts')
  }
}