<template>
    <section>
        {{message}}
        <users-view></users-view>
    </section>
</template>

<script>

import UsersView from '../../components/UsersView'

export default {
    components:{
        UsersView
    },
    data(){
      return {
        message: 'Users'
      }
    }
}
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
    }
</style>