import Vue from 'vue'
import VueRouter from 'vue-router'
import Device from '../views/Device.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/device',
        name: 'device',
        component: Device,
    },
    {
        path: '/',
        name: 'home',
        component: Device,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
]

const router = new VueRouter({
    routes,
})

router.beforeEach(async (to, from, next) => {
    //if user is not logged in, redirect to the login page
    if (to.name !== 'login' && localStorage?.getItem('user') === null) {
        next({ name: 'login' })
    } else {
        next()
    }
})
export default router
