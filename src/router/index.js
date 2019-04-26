import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import AdminHome from '@/components/home/AdminHome'
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
import Information from '@/components/information/index'
import NewInformation from '@/components/information/NewInformation'
import DetailsInformation from '@/components/information/DetailsInformation'
import CookingPackage from '@/components/cookingPackage/index'
import AddCookingPackage from '@/components/cookingPackage/add&&edit/AddCookingPackage'
import EditCookingPackage from '@/components/cookingPackage/add&&edit/EditCookingPackage'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/Home',
    },
    {
      path: '/CookingPackage',
      name: 'CookingPackage',
      component: CookingPackage,
      props: {
        pageName: '菜谱包列表'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'AddCookingPackage',
          name: 'AddCookingPackage',
          component: AddCookingPackage,
          props: {
            pageName: '添加菜谱包'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'EditCookingPackage/:id/',
          name: 'EditCookingPackage',
          component: EditCookingPackage,
          props: {
            pageName: '修改菜谱包'
          },
          meta: {
            requireAuth: true,
          },
        }
      ]
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
      path: '/AdminHome',
      name: 'AdminHome',
      component: AdminHome,
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
        pageName: '代理商'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'AddSupplier',
          name: 'AddSupplier',
          component: AddSupplier,
          props: {
            pageName: '添加代理商'
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
            pageName: '修改代理商'
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
    {
      path: '/Information',
      name: 'Information',
      component: Information,
      props: {
        pageName: '消息通知'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'NewInformation',
          name: 'NewInformation',
          component: NewInformation,
          props: {
            pageName: '发送消息'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'DetailsInformation/:id/',
          name: 'DetailsInformation',
          component: DetailsInformation,
          props: {
            pageName: '查看详情'
          },
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
  ]
})

export default router
