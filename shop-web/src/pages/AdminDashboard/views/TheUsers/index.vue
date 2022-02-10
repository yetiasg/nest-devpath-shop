<template>
    <section>
        <div class="options">
            <p>{{viewName}}</p>
            <div class="creation-options">
                <base-button mode="filledBtn" @click="openAddUsertModal" class="add-user-btn">+ Add user</base-button>
            </div>
        </div>
        <add-user-modal v-if="showAddUserModal"></add-user-modal>
        <users-view></users-view>
    </section>
</template>

<script>

import UsersView from '../../components/UsersView'
import AddUserModal from '../../components/modals/AddUserModal'

export default {
    components:{
        UsersView,
        AddUserModal
    },
    data(){
      return {
        viewName: 'Users',
        addUserModal:  this.$store.state.requests.addUserModal,
      }
    },
    methods:{
        openAddUsertModal(){
            this.$store.commit('handleAddUserModal', true)
            this.addUserModal = !this.addUserModal
        },
    },
    computed:{
        showAddUserModal(){
            return this.$store.state.requests.addUserModal
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

    .add-user-btn{
        background-color: #45CB45;
    }

    .add-user-btn:hover{
        background-color: #33ae33;
    }
</style>