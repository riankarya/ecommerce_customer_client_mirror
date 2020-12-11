import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vueperslides/dist/vueperslides.css'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.config.productionTip = false
Vue.component(VueCountdown.name, VueCountdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
