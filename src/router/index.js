import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import Order from '@/components/order/index'
import Store from '@/components/store/index'


Vue.use(Router)



const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/Home',
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      props: {
        pageName: '主页'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      props: {
        pageName: '订单列表'
      },
      meta: {
        requireAuth: false,
      },
      children: []
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store,
      props: {
        pageName: '订单列表'
      },
      meta: {
        requireAuth: false,
      },
    },
    // {
    //   path: '/',
    //   redirect: '/Login',
    // },
    // {
    //   path: '/Login',
    //   name: 'Login',
    //   component: Login,
    //   meta: {
    //     requireAuth: false,
    //   },
    // },
    // {
    //   path: '/Home',
    //   name: 'Home',
    //   component: Home,
    //   props: {
    //     pageName: '默认工作台'
    //   },
    //   meta: {
    //     requireAuth: true
    //   },
    // },
  ]
})

export default router
