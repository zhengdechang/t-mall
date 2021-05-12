import Vue from 'vue'
import App from './App'
import './static/css/style.css'

//兄弟间传值
import bus from './pubilc/bus.js'
Vue.prototype.$bus = bus

Vue.config.productionTip = false

App.mpType = 'app'


// Vuex
import store from './store/store.js'
Vue.prototype.$store = store



const app = new Vue({
    ...App
})
app.$mount()
