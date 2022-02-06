<template>
    <nav :class="isFontLight">
        <ul>
            <li v-for="page in showMenuList" :key="page">
                <router-link :to="page.path">
                    <span :class="activeClass(page.path)">{{page.name}}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    data(){
        return{
            pages: [
                {path: '/admin/dashboard/statistics', name: 'Statistics', show: true},
                {path: '/admin/dashboard/products', name: 'Products', show: true},
                {path: '/admin/dashboard/categories', name: 'Categories', show: true},
                {path: '/admin/dashboard/orders', name: 'Orders', show: true},
                {path: '/admin/dashboard/users', name: 'Users', show: true},
            ]
        }
    },
    methods: {
        activeClass(path){
            return path === this.$route.path ? 'active' : ''
        }
    },
    computed:{
        showMenuList(){
            return this.pages.filter(page => page.show)
        },        
        isFontLight(){
            return this.pages.map(page => {
                if(page.path === this.$route.path){
                    if(page.isFontLight) return 'lightFontMode'
                }
            })
        }
    }
}
</script>

<style scoped>
    nav{
        position: fixed;
        top:4.72rem;
        left: 0;
        width:18.14rem;
        box-sizing: border-box;
        height: 100vh;
        background-color:#F5F5F5;
    }

    .lightFontMode{
        color: white;
    }

    .lightFontMode .active::after,
    .lightFontMode li a:hover > span::after,
    .lightFontMode p a:hover>span::after{
        content: '';
        background-color: white;
        height: 1px;
        position: absolute;
        bottom: -5px;
        left: -3px;
        width: calc(100% + 6px);
        z-index: 100;
    }

    h1{
        font-size: 1.4rem;
        letter-spacing: 1px ;
    }

    nav > ul{
        min-width: 40%;
        margin-top:2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        flex-wrap: wrap;
        list-style-type: none;
    }

    li{
        box-sizing: border-box;
        padding: 0 5px 5px 5px;
        margin: 0 1rem;
    }

    li, p{
        font-weight: 700;
    }

    li, p ,h1{
        cursor: pointer;
    }

    a{
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 15px 0;
    }

    li a, p{
        transition: 0.3s ease-out;
    }

    li:hover a, p:hover{
        transform: translateY(-5px);
        
    }

    span{
        position: relative;
        margin: 0 25px;
    }

    /* .active::after{
        content: '';
        background-color: black;
        height: 1px;
        position: absolute;
        bottom: -5px;
        left: -3px;
        width: calc(100% + 6px);
        z-index: 100;
    } */


    /* li a:hover > span::after, p a:hover>span::after{
        content: '';
        background-color: black;
        height: 1px;
        position: absolute;
        bottom: -5px;
        left: -3px;
        width: calc(100% + 6px);
        z-index: 100;
    } */

    /* @media (max-width: 1024px){
        nav > ul, p{
            display: none;
        }
    } */
</style>