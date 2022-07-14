import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueResource from 'vue-resource'
import interceptor from '@/services/Interceptor.service'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI, { locale })
Vue.http.interceptors.push(interceptor)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
