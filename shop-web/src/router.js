import {createRouter, createWebHistory} from 'vue-router'

import TheAuth from './pages/TheAuth'
import TheShop from './pages/TheShop'
import AdminDashboard  from './pages/AdminDashboard'
import UserDashboard  from './pages/UserDashboard'
import TheCart  from './pages/TheCart'


import TheStatistics from './pages/AdminDashboard/views/TheStatistics'
import TheProducts from './pages/AdminDashboard/views/TheProducts'
import TheCategories from './pages/AdminDashboard/views/TheCategories'
import TheOrders from './pages/AdminDashboard/views/TheOrders'
import TheUsers from './pages/AdminDashboard/views/TheUsers'

import UserOrders from './pages/UserDashboard/views/UserOrders'
import UserDetails from './pages/UserDashboard/views/UserDetails'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'rootRoute', redirect: {path: '/shop'}},
        {path: '/shop', name: 'shop', component: TheShop, meta: {requireUmAuth: true}},
        {path: '/auth', name: 'auth', component: TheAuth, meta: {requireUnAuth: true}},
        {path: '/cart', name: 'cart', component: TheCart, meta: {requireUnAuth: true}},
        {path: '/user/dashboard', name: 'userDashboard', component: UserDashboard, meta: {requireAuth: true, role: 'USER'}, children: [
            {path: '/user/dashboard/user-orders', name: 'UserOrders', component: UserOrders},
            {path: '/user/dashboard/user-details', name: 'UserDetails', component: UserDetails},
        ]},
        {path: '/admin/dashboard', name: 'adminDashboard', component: AdminDashboard, meta: {requireAuth: true, role: 'ADMIN'}, children: [
            {path: '/admin/dashboard/statistics', name: 'Statistics', component: TheStatistics, meta: {requireAuth: true, role: 'ADMIN'}},
            {path: '/admin/dashboard/products', name: 'Products', component: TheProducts, meta: {requireAuth: true, role: 'ADMIN'}},
            {path: '/admin/dashboard/categories', name: 'Categories', component: TheCategories, meta: {requireAuth: true, role: 'ADMIN'}},
            {path: '/admin/dashboard/orders', name: 'Orders', component: TheOrders, meta: {requireAuth: true, role: 'ADMIN'}},
            {path: '/admin/dashboard/users', name: 'Users', component: TheUsers, meta: {requireAuth: true, role: 'ADMIN'}},
        ]},
        // {path: '/:notFound(.*)', name: 'NotFoundRoute', redirect: '/'}
    ],
    scrollBehavior(){
        return {top: 0}
    }
})

router.beforeEach(async(to, from, next) => {
    localStorage.setItem('role', 'ADMIN')

    const access_token = localStorage.getItem('access_token')
    const role = localStorage.getItem('role')
    const routerAuthCheck = !!access_token

    if(to.matched.some(record => record.meta.requireAuth)){
        if(to.matched.some(record => record.meta.role)) {
            if(routerAuthCheck && to.matched.some(record => record.meta.role === role)){
                next();
            }
        else {
            if(routerAuthCheck){
                console.log({role, aaaa:'sdsdss'})
                next();
            }
        }
        }else next('/auth')
    }
    else next()
})

export default router

