import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import Order from '@/components/order/index'
import AdminOrder from '@/components/order/AdminOrder'
import Store from '@/components/store/index'
import AdminStore from '@/components/store/adminStore/AdminStore'
import AdminStoreDetails from '@/components/store/adminStore/AdminDetails'
import Classify from '@/components/store/Classify'
import Details from '@/components/order/Details'
import AdminDetails from '@/components/order/AdminDetails'
import AddMenu from '@/components/store/AddMenu'
import EditMenu from '@/components/store/EditMenu'
import Service from '@/components/message/Service'
import Problems from '@/components/message/Problems'
import Advertising from '@/components/message/Advertising'
import Supplier from '@/components/supplier/index'
import AddSupplier from '@/components/supplier/AddSupplier'
import EditSupplier from '@/components/supplier/EditSupplier'
import Administrator from '@/components/system/Administrator'
import RoleManagement from '@/components/system/RoleManagement'
import SystemLog from '@/components/system/SystemLog'
import System from '@/components/system/System'
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
        requireAuth: true,
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
        requireAuth: true,
      },
      children: [{
        path: 'Details/:id/',
        name: 'Details',
        component: Details,
        props: {
          pageName: '订单详情'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
    },
    {
      path: '/AdminOrder',
      name: 'AdminOrder',
      component: AdminOrder,
      props: {
        pageName: '订单列表'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'AdminDetails/:id/',
        name: 'AdminDetails',
        component: AdminDetails,
        props: {
          pageName: '订单详情'
        },
        meta: {
          requireAuth: true,
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
        requireAuth: true,
      },
      children: [{
          path: 'AddMenu',
          name: 'AddMenu',
          component: AddMenu,
          props: {
            pageName: '添加商品'
          },
          meta: {
            requireAuth: true,
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
            requireAuth: true,
          },
        },
      ]
    },
    {
      path: '/AdminStore',
      name: 'AdminStore',
      component: AdminStore,
      props: {
        pageName: '商城列表'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'AdminStoreDetails/:id/',
        name: 'AdminStoreDetails',
        component: AdminStoreDetails,
        props: {
          pageName: '修改商品'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
    },
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify,
      props: {
        pageName: '商品分类'
      },
      meta: {
        requireAuth: true,
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
    //     requireAuth: true,
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
    //     requireAuth: true,
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
        requireAuth: true,
      },
    },
    {
      path: '/Supplier',
      name: 'Supplier',
      component: Supplier,
      props: {
        pageName: '供应商'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'AddSupplier',
          name: 'AddSupplier',
          component: AddSupplier,
          props: {
            pageName: '添加供应商'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'EditSupplier/:id',
          name: 'EditSupplier',
          component: EditSupplier,
          props: {
            pageName: '修改供应商'
          },
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
    {
      path: '/Administrator',
      name: 'Administrator',
      component: Administrator,
      props: {
        pageName: '管理员列表'
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/System',
      name: 'System',
      component: System,
      props: {
        pageName: '系统设置'
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/SystemLog',
      name: 'SystemLog',
      component: SystemLog,
      props: {
        pageName: '系统日志'
      },
      meta: {
        requireAuth: true,
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
        requireAuth: true,
      },
      children: [{
          path: 'AddRole',
          name: 'AddRole',
          component: AddRole,
          props: {
            pageName: '添加角色'
          },
          meta: {
            requireAuth: true,
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
            requireAuth: true,
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
        requireAuth: true,
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
        requireAuth: true,
      },
      children: [{
          path: 'AddCookbook',
          name: 'AddCookbook',
          component: AddCookbook,
          props: {
            pageName: '添加菜谱'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'EditCookbook/:id',
          name: 'EditCookbook',
          component: EditCookbook,
          props: {
            pageName: '修改菜谱'
          },
          meta: {
            requireAuth: true,
          },
        },
      ]
    },
    {
      path: '/Problems',
      name: 'Problems',
      component: Problems,
      props: {
        pageName: '常见问题'
      },
      meta: {
        requireAuth: true,
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
        requireAuth: true,
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
        requireAuth: true,
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
        requireAuth: true,
      },
    },
  ]
})

export default router
