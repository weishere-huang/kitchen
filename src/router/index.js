import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import Order from '@/components/order/index'
import Store from '@/components/store/index'
import Classify from '@/components/store/Classify'
import Details from '@/components/order/Details'
import AddMenu from '@/components/store/AddMenu'
import EditMenu from '@/components/store/EditMenu'
import Service from '@/components/message/Service'
import SalesArea from '@/components/salesArea/index'
import Administrator from '@/components/system/Administrator'

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
      path: '/Details',
      name: 'Details',
      component: Details,
      props: {
        pageName: '订单详情'
      },
      meta: {
        requireAuth: false,
      },
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
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify,
      props: {
        pageName: '商品分类'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/AddMenu',
      name: 'AddMenu',
      component: AddMenu,
      props: {
        pageName: '添加商品'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/EditMenu',
      name: 'EditMenu',
      component: EditMenu,
      props: {
        pageName: '修改商品'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/Service',
      name: 'Service',
      component: Service,
      props: {
        pageName: '服务网点'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/SalesArea',
      name: 'SalesArea',
      component: SalesArea,
      props: {
        pageName: '销售区域'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/Administrator',
      name: 'Administrator',
      component: Administrator,
      props: {
        pageName: '管理员列表'
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
