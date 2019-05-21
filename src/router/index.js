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
import AdvertisingAdd from '@/components/message/advertisingAdd/AddAdvertising'
import AdvertisingEdit from '@/components/message/advertisingAdd/EditAdvertising'
import Supplier from '@/components/supplier/index'
import AddSupplier from '@/components/supplier/AddSupplier'
import EditSupplier from '@/components/supplier/EditSupplier'
import Administrator from '@/components/system/Administrator'
import RoleManagement from '@/components/system/RoleManagement'
import SystemLog from '@/components/system/SystemLog'
import System from '@/components/system/System'
import Security from '@/components/system/Security'
import AddRole from '@/components/system/addOrEditRole/AddRole'
import EditRole from '@/components/system/addOrEditRole/EditRole'
import CookbookClassify from '@/components/cookbook/Classify'
import Cookbook from '@/components/cookbook/index'
import AddCookbook from '@/components/cookbook/addCookbook/AddCookbook'
import EditCookbook from '@/components/cookbook/addCookbook/EditCookbook'
import User from '@/components/user/User'
import Integral from '@/components/user/Integral'
import GuestBook from '@/components/user/GuestBook'
import Information from '@/components/information/index'
import NewInformation from '@/components/information/NewInformation'
import DetailsInformation from '@/components/information/DetailsInformation'
import CookingPackage from '@/components/cookingPackage/index'
import AddCookingPackage from '@/components/cookingPackage/add&&edit/AddCookingPackage'
import EditCookingPackage from '@/components/cookingPackage/add&&edit/EditCookingPackage'
import Distributor from '@/components/distributor/index'
import AddDistributor from '@/components/distributor/AddSupplier'
import EditDistributor from '@/components/distributor/EditSupplier'
import DiscountCoupon from '@/components/marketing/DiscountCoupon'
import RedPacket from '@/components/redPacket/RedPacket'
import ProductOfThings from '@/components/Instrumentation/productOfThings/ProductOfThings'
import AdminDeviceOfThings from '@/components/Instrumentation/adminDeviceOfThings/index'
import AdminDeviceOfThingsDetails from '@/components/Instrumentation/adminDeviceOfThings/Details'
import ProductOfThingsAdd from '@/components/Instrumentation/productOfThings/ProductOfThingsAdd'
import ProductOfThingsEdit from '@/components/Instrumentation/productOfThings/ProductOfThingsEdit'
import ProductOfThingsDetails from '@/components/Instrumentation/productOfThings/Details'
import AdminProductOfThings from '@/components/Instrumentation/adminProductOfThings/AdminProductOfThings'
import AdminProductOfThingsAudit from '@/components/Instrumentation/adminProductOfThings/Audit'
import AdminProductOfThingsDetails from '@/components/Instrumentation/adminProductOfThings/Details'
import AdminMonitoring from '@/components/Instrumentation/adminMonitoring/Monitoring'
import AdminDataAnalysis from '@/components/Instrumentation/adminDataAnalysis/DataAnalysis'
import DeviceOfThings from '@/components/Instrumentation/deviceOfThings/index'
import DeviceOfThingsDetails from '@/components/Instrumentation/deviceOfThings/Details'
import Monitoring from '@/components/Instrumentation/monitoring/Monitoring'
import DataAnalysis from '@/components/Instrumentation/dataAnalysis/DataAnalysis'
import Manufacturer from '@/components/checkIn/manufacturer/Manufacturer'
import ManufacturerAudit from '@/components/checkIn/manufacturer/Audit'
import ManufacturerDetails from '@/components/checkIn/manufacturer/Details'
import Merchant from '@/components/checkIn/merchant/Merchant'
import MerchantAudit from '@/components/checkIn/merchant/Audit'
import MerchantDetails from '@/components/checkIn/merchant/Details'
import UserAnalysis from '@/components/user/userAnalysis/UserAnalysis'
import UserDetails from '@/components/user/UserDetails'
import Article from '@/components/article/Article'
import ArticleAdd from '@/components/article/Add'
import ArticleEdit from '@/components/article/Edit'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/Home',
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article,
      props: {
        pageName: '文章列表'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'ArticleAdd',
          name: 'ArticleAdd',
          component: ArticleAdd,
          props: {
            pageName: '添加文章'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'ArticleEdit/:id/',
          name: 'ArticleEdit',
          component: ArticleEdit,
          props: {
            pageName: '修改文章'
          },
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
    {
      path: '/Manufacturer',
      name: 'Manufacturer',
      component: Manufacturer,
      props: {
        pageName: '设备厂商'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'ManufacturerDetails/:id/',
        name: 'ManufacturerDetails',
        component: ManufacturerDetails,
        props: {
          pageName: '查看详情'
        },
        meta: {
          requireAuth: true,
        },
      }, {
        path: 'ManufacturerAudit/:id/',
        name: 'ManufacturerAudit',
        component: ManufacturerAudit,
        props: {
          pageName: '审核'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
    },
    {
      path: '/Merchant',
      name: 'Merchant',
      component: Merchant,
      props: {
        pageName: '商家'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'MerchantDetails/:id/',
          name: 'MerchantDetails',
          component: MerchantDetails,
          props: {
            pageName: '查看详情'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'MerchantAudit/:id/',
          name: 'MerchantAudit',
          component: MerchantAudit,
          props: {
            pageName: '审核'
          },
          meta: {
            requireAuth: true,
          },
        },
      ]
    },
    {
      path: '/Monitoring',
      name: 'Monitoring',
      component: Monitoring,
      props: {
        pageName: '实时监控'
      },
      meta: {
        requireAuth: true,
      },
      children: []
    },
    {
      path: '/DataAnalysis',
      name: 'DataAnalysis',
      component: DataAnalysis,
      props: {
        pageName: '数据分析'
      },
      meta: {
        requireAuth: true,
      },
      children: []
    },
    {
      path: '/DeviceOfThings',
      name: 'DeviceOfThings',
      component: DeviceOfThings,
      props: {
        pageName: '物联设备'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'DeviceOfThingsDetails/:id/',
        name: 'DeviceOfThingsDetails',
        component: DeviceOfThingsDetails,
        props: {
          pageName: '设备详情'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
    },
    {
      path: '/AdminDataAnalysis',
      name: 'AdminDataAnalysis',
      component: AdminDataAnalysis,
      props: {
        pageName: '数据分析'
      },
      meta: {
        requireAuth: true,
      },
      children: []
    },
    {
      path: '/AdminMonitoring',
      name: 'AdminMonitoring',
      component: AdminMonitoring,
      props: {
        pageName: '实时监控'
      },
      meta: {
        requireAuth: true,
      },
      children: []
    },
    {
      path: '/AdminProductOfThings',
      name: 'AdminProductOfThings',
      component: AdminProductOfThings,
      props: {
        pageName: '物联产品'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'AdminProductOfThingsDetails/:id/',
        name: 'AdminProductOfThingsDetails',
        component: AdminProductOfThingsDetails,
        props: {
          pageName: '产品详情'
        },
        meta: {
          requireAuth: true,
        },
      }, {
        path: 'AdminProductOfThingsAudit/:id/',
        name: 'AdminProductOfThingsAudit',
        component: AdminProductOfThingsAudit,
        props: {
          pageName: '产品审核'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
    },
    {
      path: '/ProductOfThings',
      name: 'ProductOfThings',
      component: ProductOfThings,
      props: {
        pageName: '物联产品'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'ProductOfThingsAdd',
          name: 'ProductOfThingsAdd',
          component: ProductOfThingsAdd,
          props: {
            pageName: '产品添加'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'ProductOfThingsEdit/:id/',
          name: 'ProductOfThingsEdit',
          component: ProductOfThingsEdit,
          props: {
            pageName: '产品修改'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'ProductOfThingsDetails/:id/',
          name: 'ProductOfThingsDetails',
          component: ProductOfThingsDetails,
          props: {
            pageName: '产品详情'
          },
          meta: {
            requireAuth: true,
          },
        },
      ]
    },
    {
      path: '/AdminDeviceOfThings',
      name: 'AdminDeviceOfThings',
      component: AdminDeviceOfThings,
      props: {
        pageName: '物联设备'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'AdminDeviceOfThingsDetails/:id/',
        name: 'AdminDeviceOfThingsDetails',
        component: AdminDeviceOfThingsDetails,
        props: {
          pageName: '设备详情'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
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
      path: '/Security',
      name: 'Security',
      component: Security,
      props: {
        pageName: '安全设置'
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/DiscountCoupon',
      name: 'DiscountCoupon',
      component: DiscountCoupon,
      props: {
        pageName: '优惠券'
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/Integral',
      name: 'Integral',
      component: Integral,
      props: {
        pageName: '积分明细'
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/RedPacket',
      name: 'RedPacket',
      component: RedPacket,
      props: {
        pageName: '红包'
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
      path: '/Distributor',
      name: 'Distributor',
      component: Distributor,
      props: {
        pageName: '供应商'
      },
      meta: {
        requireAuth: true,
      },
      children: [{
          path: 'AddDistributor',
          name: 'AddDistributor',
          component: AddDistributor,
          props: {
            pageName: '添加供应商'
          },
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'EditDistributor/:id',
          name: 'EditDistributor',
          component: EditDistributor,
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
      children: [{
        path: 'AdvertisingAdd',
        name: 'AdvertisingAdd',
        component: AdvertisingAdd,
        props: {
          pageName: '发送消息'
        },
        meta: {
          requireAuth: true,
        },
      }, {
        path: 'AdvertisingEdit/:id/',
        name: 'AdvertisingEdit',
        component: AdvertisingEdit,
        props: {
          pageName: '查看详情'
        },
        meta: {
          requireAuth: true,
        },
      }]
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
      children: [{
        path: 'UserDetails/:id/',
        name: 'UserDetails',
        component: UserDetails,
        props: {
          pageName: '用户详情'
        },
        meta: {
          requireAuth: true,
        },
      }, ]
    },
    {
      path: '/UserAnalysis',
      name: 'UserAnalysis',
      component: UserAnalysis,
      props: {
        pageName: '用户分析'
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
