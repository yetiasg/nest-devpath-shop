<template>
    <section>
        <div class="options">
            <p>{{viewName}}</p>
            <div class="creation-options">
                <base-button mode="filledBtn" @click="openExportOrdersModal" class="export-orders-btn">Export orders</base-button>
            </div>
        </div>
        <export-orders-modal v-if="showExportOrdersModal"></export-orders-modal>
    <orders-view></orders-view>
    </section>
</template>

<script>

import OrdersView from '../../components/OrdersView'
import ExportOrdersModal from '../../components/modals/ExportOrdersModal'

export default {
    components: {
        OrdersView,
        ExportOrdersModal        
    },
    data(){
      return {
        viewName: 'Orders'
      }
    },
    methods: {
        openExportOrdersModal(){
            this.$store.commit('handleExportOrdersModal', true)
            this.exportOrdersModal = !this.exportOrdersModal
        },
    },
    computed: {
        showExportOrdersModal(){
            return this.$store.state.requests.exportOrdersModal
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

    .export-orders-btn{
        background-color: #CB8845;

    }

    .export-orders-btn:hover{
        background-color: #ae7033;

    }
</style>