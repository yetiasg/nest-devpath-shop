<template>
    <section>
        <div class="options">
            <p>{{viewName}}</p>
            <div class="creation-options">
                <base-button mode="filledBtn" @click="openAddCategoryModal" class="addCategoryBtn">+ Add category</base-button>
            </div>
        </div>
        <add-category-modal v-if="showAddCategoryModal"></add-category-modal>
        <categories-view></categories-view>
    </section>
</template>

<script>

import CategoriesView from '../../components/CategoriesView'
import AddCategoryModal from '../../components/modals/AddCategoryModal'

export default {
    components: {
        CategoriesView,
        AddCategoryModal
    },
    data(){
      return {
        viewName: 'Categories',
        addCategoryModal:  this.$store.state.requests.addCategoryModal,
      }
    },
    methods:{
        openAddCategoryModal(){
            this.$store.commit('handleAddUserModal', true)
            this.addCategoryModal = !this.addCategoryModal
        },
    },
    computed:{
        showAddCategoryModal(){
            return this.$store.state.requests.addCategoryModal
        },
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

    .addCategoryBtn{
        background-color: #45CB45;
    }

    .addCategoryBtn:hover{
        background-color: #33ae33;
    }
</style>