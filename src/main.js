import ElementUI from 'element-ui'
//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//element css
import 'element-ui/lib/theme-chalk/index.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element UI
Vue.use(ElementUI)
//bootstrap-vue UI
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
