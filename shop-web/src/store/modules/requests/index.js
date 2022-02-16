import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'


export default{
    state(){
        return{
            products: [],
            users: [],
            orders: [],
            categories: [],
            statistics: {},
            currentPage: 1,
            perPage: 7,
            amountOfPages: null,
            amountOfProducts: null,
            selectedProduct: null,
            addProductModal: false,
            importProductsModal: false,
            exportOrdersModal: false,
            addUserModal: false,
            addCategoryModal: false,
            updateProductModal: false,
            productToUpdate: {},
            orderItems: [],
            currentUserOrders: [],
            currentUserOrderItems: []
        }
    },
    mutations,
    actions,
    getters
}