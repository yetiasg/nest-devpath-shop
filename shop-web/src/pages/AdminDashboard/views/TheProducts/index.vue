<template>
    <section>
        <div class="options">
            <p>{{viewName}}</p>
            <div class="creation-options">
                <base-button mode="filledBtn" @click="openAddProductModal" class="add-product-btn">+ Add product</base-button>
                <base-button mode="filledBtn" @click="openImportProductsModal" class="import-products-btn">Import products</base-button>
                <base-button mode="filledBtn" @click="openExportProductsModal" class="export-products-btn">Export products</base-button>
            </div>
        </div>
        <add-product-modal v-if="showAddProductModal"></add-product-modal>
        <import-products-modal v-if="showImportProductsModal"></import-products-modal>
        <export-products-modal v-if="showExportProductsModal"></export-products-modal>
        <products-view></products-view>
    </section>
</template>

<script>
import BaseButton from '../../../../components/baseComponents/BaseButton.vue'
import ProductsView from '../../components/ProductsView'
import AddProductModal from '../../components/modals/AddProductModal'
import ImportProductsModal from '../../components/modals/ImportProductsModal'
import ExportProductsModal from '../../components/modals/ExportProductsModal'

export default {
    components:{
        ProductsView,
        BaseButton,
        AddProductModal,
        ImportProductsModal,
        ExportProductsModal        
    },
    data(){
      return {
        viewName: 'Products',
        addProductModal:  this.$store.state.requests.addProductModal,
        importProductsModal:  this.$store.state.requests.importProductsModal,
        exportProductsModal:  this.$store.state.requests.exportProductsModal,
      }
    },
    methods: {
        openAddProductModal(){
            this.$store.commit('handleAddProductModal', true)
            this.addProductModal = !this.addProductModal
        },

        openImportProductsModal(){
            this.$store.commit('handleImportProductsModal', true)
            this.importProductsModal = !this.importProductsModal
        },

        openExportProductsModal(){
            this.$store.commit('handleExportProductsModal', true)
            this.exportProductsModal = !this.exportProductsModal
        },
    },
    computed: {
        showAddProductModal(){
            return this.$store.state.requests.addProductModal
        },
        showImportProductsModal(){
            return this.$store.state.requests.importProductsModal
        },
        showExportProductsModal(){
            return this.$store.state.requests.exportProductsModal
        }
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