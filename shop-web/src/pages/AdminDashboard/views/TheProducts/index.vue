<template>
    <section>
        <div class="options">
            <p>{{viewName}}</p>
            <div class="creation-options">
                <base-button mode="filledBtn" @click="addProduct" class="add-product-btn">+ Add product</base-button>
                <base-button mode="filledBtn" @click="importProducts" class="import-products-btn">Import products</base-button>
                <base-button mode="filledBtn" @click="exportProducts" class="export-products-btn">Export products</base-button>
            </div>
        </div>
        <teleport to="body" v-if="modal">
            <add-product-modal></add-product-modal>
        </teleport>
        <products-view></products-view>
    </section>
</template>

<script>
import BaseButton from '../../../../components/baseComponents/BaseButton.vue'
import ProductsView from '../../components/ProductsView'
import AddProductModal from '../../components/AddProductModal'

export default {
    components:{
        ProductsView,
        BaseButton,
        AddProductModal
    },
    data(){
      return {
        viewName: 'Products',
        modal: false
      }
    },
    methods: {
        addProduct(){
            this.showModal()
        },

        importProducts(){
            this.showModal()

        },

        exportProducts(){
            this.showModal()

        },

        showModal(){
            this.modal = true
        },

        hideModal() {
            this.modal = false
        }
    },
    computed: {
        
    },
    mounted(){
        this.$store.dispatch('tryLogin')
    }
}
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
    }

    .options{
        display: flex;
        justify-content: space-between;
    }

    .creation-options{
        display: flex;
    }

    .filledBtn{
        margin: 0 1rem;
        padding: 0.2rem 0.5rem;
        border: 0px;
        color: white;
        font-weight: 400;
        border-radius: 10px;
    }

    .filledBtn:hover{
        margin: 0 1rem;
        padding: 0.2rem 0.5rem;
        border: 0px;
    }

    .add-product-btn{
        background-color: #45CB45;
    }

    .add-product-btn:hover{
        background-color: #33ae33;
    }

    .import-products-btn{
        background-color: #45B0CB;
    }

    .import-products-btn:hover{

        background-color: #3193ac;
    }

    .export-products-btn{
        background-color: #CB8845;

    }

    .export-products-btn:hover{
        background-color: #ae7033;

    }
</style>