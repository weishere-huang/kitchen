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
import Problems from '@/components/message/Problems'
import Advertising from '@/components/message/Advertising'
import SalesArea from '@/components/salesArea/index'
import Administrator from '@/components/system/Administrator'
import RoleManagement from '@/components/system/RoleManagement'
import AddRole from '@/components/system/addOrEditRole/AddRole'
import EditRole from '@/components/system/addOrEditRole/EditRole'
import CookbookClassify from '@/components/cookbook/Classify'
import Cookbook from '@/components/cookbook/index'
import AddCookbook from '@/components/cookbook/addCookbook/AddCookbook'
import EditCookbook from '@/components/cookbook/addCookbook/EditCookbook'
import User from '@/components/user/User'
import GuestBook from '@/components/user/GuestBook'

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
      children: [{
        path: 'Details/:id/',
        name: 'Details',
        component: Details,
        props: {
          pageName: '订单详情'
        },
        meta: {
          requireAuth: false,
        },
      }, ]
    },

    {
      path: '/Store',
      name: 'Store',
      component: Store,
      props: {
        pageName: '商城列表'
      },
      meta: {
        requireAuth: false,
      },
      children: [{
          path: 'AddMenu',
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
          path: 'EditMenu/:id/',
          name: 'EditMenu',
          component: EditMenu,
          props: {
            pageName: '修改商品'
          },
          meta: {
            requireAuth: false,
          },
        },
      ]
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
    // {
    //   path: '/AddMenu',
    //   name: 'AddMenu',
    //   component: AddMenu,
    //   props: {
    //     pageName: '添加商品'
    //   },
    //   meta: {
    //     requireAuth: false,
    //   },
    // },
    // {
    //   path: '/EditMenu',
    //   name: 'EditMenu',
    //   component: EditMenu,
    //   props: {
    //     pageName: '修改商品'
    //   },
    //   meta: {
    //     requireAuth: false,
    //   },
    // },
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
    {
      path: '/RoleManagement',
      name: 'RoleManagement',
      component: RoleManagement,
      props: {
        pageName: '角色管理'
      },
      meta: {
        requireAuth: false,
      },
      children: [{
          path: 'AddRole',
          name: 'AddRole',
          component: AddRole,
          props: {
            pageName: '添加角色'
          },
          meta: {
            requireAuth: false,
          },
        },
        {
          path: 'EditRole/:id/',
          name: 'EditRole',
          component: EditRole,
          props: {
            pageName: '修改角色'
          },
          meta: {
            requireAuth: false,
          },
        }
      ]
    },
    {
      path: '/CookbookClassify',
      name: 'CookbookClassify',
      component: CookbookClassify,
      props: {
        pageName: '菜谱分类'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/Cookbook',
      name: 'Cookbook',
      component: Cookbook,
      props: {
        pageName: '菜谱列表'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/AddCookbook',
      name: 'AddCookbook',
      component: AddCookbook,
      props: {
        pageName: '添加菜谱'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/EditCookbook',
      name: 'EditCookbook',
      component: EditCookbook,
      props: {
        pageName: '修改菜谱'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/Problems',
      name: 'Problems',
      component: Problems,
      props: {
        pageName: '常见问题'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/Advertising',
      name: 'Advertising',
      component: Advertising,
      props: {
        pageName: '广告列表'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      props: {
        pageName: '用户列表'
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/GuestBook',
      name: 'GuestBook',
      component: GuestBook,
      props: {
        pageName: '留言与反馈'
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
