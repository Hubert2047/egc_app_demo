import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
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
    console.log(JSON.parse(localStorage?.getItem('user')))
    if (to.name !== 'login' && localStorage?.getItem('user') === null) {
        next({ name: 'login' })
    } else {
        console.log('else')
        next()
    }
})
export default router
