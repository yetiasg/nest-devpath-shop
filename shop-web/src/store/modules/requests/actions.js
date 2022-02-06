// import router from '../../../router';
// import config from '../../../config.js';

// // helpers----------------------------------------------
// const getJSON = async(url, options) =>{
//     const response = await fetch(url, options);
//     if (!response.ok) throw new Error(response.message);
//     const data = await response.json();
//     return data;
// };

import { products } from './productsMock'

export default{
  loadProducts(context){
    const amountOfProducts = products.length
    context.commit('setAmountOfProducts', amountOfProducts)
    const perPage = context.state.perPage;
    const amountOfPages = Math.ceil(amountOfProducts / perPage)
    context.commit('setAmountOfPages', amountOfPages)
  }
}