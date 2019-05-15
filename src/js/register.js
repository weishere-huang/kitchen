import Vue from 'vue'
import Register from '../Register.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Axios from '../AxiosRequest';
import '../assets/less/layout.less'
import global from '../components/global/Global'
Vue.config.productionTip = false
Vue.prototype.global = global;
Vue.prototype.axios = axios;
Vue.prototype.Axios = Axios;
Vue.use(ElementUI)
new Vue({
  el: '#register',
  components: {
    Register
  },
  template: '<Register/>',
})
