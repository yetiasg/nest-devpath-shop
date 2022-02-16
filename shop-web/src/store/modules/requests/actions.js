import router from '../../../router';
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/v1'

// // helpers----------------------------------------------
const getJSON = async(url, options = {}, context) =>{
    const response = await fetch(`${BASE_URL}${url}`, options);
    if (!response.ok) {
      console.log(context.dispatch('logout'))
      // context.rootState.auth.dispatch('logout')
      throw new Error(response.message);
    }
    const data = await response.json();
    return data;
};

// Products -----------------------

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

  async fetchAllProducts(context){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const products = await getJSON('/products/all', {headers})
    context.commit('setProducts', products)
  },

  async removeProductById(context, payload){
    await fetch(`${BASE_URL}/products/${payload}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${context.rootState.auth.access_token}`
      }
    })
    await context.dispatch('fetchAllProducts')
  },
  
  async createProduct(context, product){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }

    const config = { headers }
    await axios.post(`${BASE_URL}/products`, product, 
      config
    )
    await context.dispatch('fetchAllProducts')
    context.commit('handleAddProductModal', false)
  },

  async updateProduct(context, product){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }

    const config = { headers }
    await axios.patch(`${BASE_URL}/products/${product.id}`, product, 
      config
    )
    await context.dispatch('fetchAllProducts')
    context.commit('handleUpdateProductModal', false)
  },


// Users -----------------------

  async fetchUsers(context){
    const users = await getJSON('/users', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }}, context)
    context.commit('setUsers', users)
  },

  async removeUserById(context, id){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    await axios.delete(`${BASE_URL}/users/${id}`, config)
    await context.dispatch('fetchUsers')
  },

  async activateAccount(context, payload){
    await axios.post(`${BASE_URL}/auth/activate/${payload.token}`)
    router.replace('/')
  },

  async inviteUser(context, email){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    await axios.post(`${BASE_URL}/users/invite`,email , config)
  },


// Categories -----------------------

  async fetchCategories(context){
    const categories = await getJSON('/categories', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setCategories', categories)
  },

  async createCategory(context, category){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }

    const config = { headers }
    await axios.post(`${BASE_URL}/categories`, category, 
      config
    )
    await context.dispatch('fetchCategories')
    context.commit('handleAddCategoryModal', false)
  },

  async removeCategory(context, id){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    await axios.delete(`${BASE_URL}/categories/${id}`, config)
    await context.dispatch('fetchCategories')
  },


// Orders -----------------------

  async fetchOrders(context){
    const orders = await getJSON('/orders', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setOrders', orders)
  },
  
  async getOrderItems(context, id){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    const orderItems = await axios.get(`${BASE_URL}/orders/${id}`, config)
    context.commit('setOrderItems', orderItems.data.orderItems)
    await context.dispatch('fetchOrders')
  },


// Statistics -----------------------

  async fetchStatistics(context){
    const statistics = await getJSON('/statistics', {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setStatistics', statistics)
  },


// UserOrders -----------------------

  async fetchCurrentUserOrders(context){
    const orders = await getJSON(`/orders/user`, {headers: {
      'Authorization': `Bearer ${context.rootState.auth.access_token}`
    }})
    context.commit('setCurrentUserOrders', orders)
  },

  async getCurrentUserOrderItems(context, id){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    const orderItems = await axios.get(`${BASE_URL}/orders/${id}`, config)
    context.commit('setCurrentUserOrderItems', orderItems.data.orderItems)
    await context.dispatch('fetchCurrentUserOrders')
  },


// UserDetails -----------------------

  async updateUserData(context, user){
    console.log(context.rootState.auth.userId, user, context.rootState.auth.access_token)
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    await axios.patch(`${BASE_URL}/users/${context.rootState.auth.userId}`, user, config)
  },

  async resetPassword(context){
    const headers = {
      Authorization: `Bearer ${context.rootState.auth.access_token}`
    }
    const config = { headers }
    await axios.post(`${BASE_URL}/auth/password/reset`, {}, config)
  }
}