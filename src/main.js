import ElementUI from 'element-ui'
//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
//element css
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element UI
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
