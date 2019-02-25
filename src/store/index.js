import Vue from 'vue'
import vuex from 'vuex'
import getArea from './area_store'
Vue.use(vuex);
export default new vuex.Store({
    modules: {
        getArea
    }
})
