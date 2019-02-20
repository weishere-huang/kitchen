import Vue from 'vue'
import PrintOrder from '../PrintOrder.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Axios from '../AxiosRequest';
import '../assets/less/layout.less'
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.Axios = Axios;
Vue.use(ElementUI)
new Vue({
  el: '#printorder',
  components: {
    PrintOrder
  },
  template: '<PrintOrder/>',
})
