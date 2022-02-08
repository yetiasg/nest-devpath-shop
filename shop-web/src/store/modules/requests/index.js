import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import { products } from './productsMock'


export default{
    state(){
        return{
            products,
            currentPage: 1,
            perPage: 20,
            amountOfPages: null,
            amountOfProducts: null,
            selectedProduct: null,
            addProductModal: false,
            importProductsModal: false,
            exportProductsModal: false,
        }
    },
    mutations,
    actions,
    getters
}