export default [{
    menu: '智慧物联',
    permissionCode: 'things',
    defaultDock: false,
    icon: '&#xe64e;',
    subMenu: [{
        menu: '物联产品',
        route: '/AdminProductOfThings',
        permissionCode: 'home_employee_lookup'
      },
      {
        menu: '产品详情',
        routeReg: /^\/AdminProductOfThings\/AdminProductOfThingsDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'order_detail_lookup'
      },
      {
        menu: '产品审核',
        routeReg: /^\/AdminProductOfThings\/AdminProductOfThingsAudit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'order_detail_lookup'
      },
      {
        menu: '物联设备',
        route: '/AdminDeviceOfThings',
        permissionCode: 'home_employee_lookup'
      },
      {
        menu: '设备详情',
        routeReg: /^\/AdminDeviceOfThings\/AdminDeviceOfThingsDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'order_detail_lookup'
      },
      {
        menu: '数据分析',
        route: '/AdminDataAnalysis',
        permissionCode: 'home_employee_lookup'
      },
      {
        menu: '实时监控',
        route: '/AdminMonitoring',
        permissionCode: 'home_employee_lookup'
      }
    ]
  },
  {
    menu: '电商平台',
    permissionCode: 'Ebusiness',
    defaultDock: false,
    icon: '&#xe627;',
    subMenu: [{
        menu: '首页',
        route: '/AdminHome',
        permissionCode: 'home_employee_lookup'
      },
      {
        menu: '订单列表',
        route: '/AdminOrder',
        permissionCode: 'order_list_lookup'
      },
      {
        menu: '订单详情',
        routeReg: /^\/AdminOrder\/AdminDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'order_detail_lookup'
      },
      {
        menu: '商品列表',
        route: '/AdminStore',
        permissionCode: 'mall_list_lookup'
      },
      {
        menu: '查看商品',
        routeReg: /^\/AdminStore\/AdminStoreDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'mall_update_lookup'
      },
      // {
      //   menu: '代理商列表',
      //   route: '/Supplier',
      //   permissionCode: 'supplier_list_lookup'
      // },
      // {
      //   menu: '添加代理商',
      //   route: '/Supplier/AddSupplier',
      //   visible: true,
      //   permissionCode: 'supplier_add_lookup'
      // },
      // {
      //   menu: '修改代理商',
      //   // route: '/Supplier/EditSupplier',
      //   routeReg: /^\/Supplier\/EditSupplier\/\d{1,}$/i,
      //   visible: true,
      //   permissionCode: 'supplier_update_lookup'
      // },
      // {
      //   menu: '供应商列表',
      //   route: '/Distributor',
      //   permissionCode: 'supplier_list_lookup'
      // },
      // {
      //   menu: '添加供应商',
      //   route: '/Distributor/AddDistributor',
      //   visible: true,
      //   permissionCode: 'supplier_add_lookup'
      // },
      // {
      //   menu: '修改供应商',
      //   // route: '/Supplier/EditSupplier',
      //   routeReg: /^\/Distributor\/EditDistributor\/\d{1,}$/i,
      //   visible: true,
      //   permissionCode: 'supplier_update_lookup'
    // },
  ]
}, {
  menu: '信息管理',
  permissionCode: 'checkIn',
  defaultDock: false,
  icon: '&#xe69e;',
  subMenu: [{
      menu: '文章管理',
      route: '/Article',
      permissionCode: 'message_faq_lookup'
    },
    {
      menu: '添加文章',
      route: '/Article/ArticleAdd',
      visible: true,
      permissionCode: 'messagepush_add_lookup'
    },
    {
      menu: '修改文章',
      routeReg: /^\/Article\/ArticleEdit\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    },
    // {
    //   menu: '服务网点',
    //   route: '/Service',
    //   permissionCode: 'message_service_lookup'
    // },
    {
      menu: '常见问题',
      route: '/Problems',
      permissionCode: 'message_faq_lookup'
    },
    {
      menu: '广告列表',
      route: '/Advertising',
      permissionCode: 'message_advertisement_lookup'
    },
    {
      menu: '添加广告',
      route: '/Advertising/AdvertisingAdd',
      visible: true,
      permissionCode: 'messagepush_add_lookup'
    },
    {
      menu: '修改广告',
      routeReg: /^\/Advertising\/AdvertisingEdit\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    },
    {
      menu: '优惠活动',
      route: '/Information',
      permissionCode: 'messagepush_lookup'
    },
    {
      menu: '发送活动',
      route: '/Information/NewInformation',
      visible: true,
      permissionCode: 'messagepush_add_lookup'
    },
    {
      menu: '查看详情',
      routeReg: /^\/Information\/DetailsInformation\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    }
  ]
}, {
  menu: '入住管理',
  permissionCode: 'checkIn',
  defaultDock: false,
  icon: '&#xe861;',
  subMenu: [{
      menu: '设备厂商',
      route: '/Manufacturer',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '查看详情',
      routeReg: /^\/Manufacturer\/ManufacturerDetails\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    },
    {
      menu: '审核',
      routeReg: /^\/Manufacturer\/ManufacturerAudit\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    },
    {
      menu: '商家',
      route: '/Merchant',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '查看详情',
      routeReg: /^\/Merchant\/MerchantDetails\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    }, {
      menu: '审核',
      routeReg: /^\/Merchant\/MerchantAudit\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    },
  ]
}, {
  menu: '用户管理',
  permissionCode: 'checkIn',
  defaultDock: false,
  icon: '&#xe653;',
  subMenu: [{
      menu: '用户分析',
      route: '/UserAnalysis',
      permissionCode: 'user_manager_list_lookup'
    }, {
      menu: '用户列表',
      route: '/User',
      permissionCode: 'user_manager_list_lookup'
    },
    {
      menu: '审核',
      routeReg: /^\/User\/UserDetails\/\d{1,}$/i,
      visible: true,
      permissionCode: 'messagepush_detail_lookup'
    },
    {
      menu: '积分明细',
      route: '/Integral',
      permissionCode: 'user_manager_list_lookup'
    },
  ]
}, {
  menu: '留言管理',
  permissionCode: 'checkIn',
  defaultDock: false,
  icon: '&#xe65d;',
  subMenu: [{
    menu: '留言与反馈',
    route: '/GuestBook',
    permissionCode: 'user_faq_list_lookup'
  }, ]
}, {
  menu: '系统设置',
  permissionCode: 'system',
  defaultDock: false,
  icon: '&#xe603;',
  subMenu: [{
      menu: '系统设置',
      route: '/System',
      defaultDock: true,
      permissionCode: 'system_employee_lookup'
    },
    {
      menu: '安全设置',
      route: '/Security',
      permissionCode: 'system_employee_lookup'
    },
    {
      menu: '管理员列表',
      route: '/Administrator',
      permissionCode: 'system_employee_lookup'
    },
    {
      menu: '角色管理',
      route: '/RoleManagement',
      permissionCode: 'system_role_list_lookup'
    },
    {
      menu: '添加角色',
      route: '/RoleManagement/AddRole',
      visible: true,
      permissionCode: 'system_role_add_lookup'
    },
    {
      menu: '修改角色',
      routeReg: /^\/RoleManagement\/EditRole\/\d{1,}$/i,
      visible: true,
      permissionCode: 'system_role_update_lookup'
    },
    {
      menu: '系统日志',
      route: '/SystemLog',
      defaultDock: true,
      permissionCode: 'system_employee_lookup'
    },
  ]
}, {
  menu: '设备厂商',
  permissionCode: 'manufacturer',
  defaultDock: false,
  icon: '&#xe600;',
  subMenu: [{
      menu: '物联产品',
      route: '/ProductOfThings',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '物联产品添加',
      route: '/ProductOfThings/ProductOfThingsAdd',
      visible: true,
      permissionCode: 'menu_add_lookup'
    },
    {
      menu: '物联产品修改',
      routeReg: /^\/ProductOfThings\/ProductOfThingsEdit\/\d{1,}$/i,
      visible: true,
      permissionCode: 'menu_update_lookup'
    },
    {
      menu: '物联产品详情',
      routeReg: /^\/ProductOfThings\/ProductOfThingsDetails\/\d{1,}$/i,
      visible: true,
      permissionCode: 'menu_update_lookup'
    },
    {
      menu: '物联设备',
      route: '/DeviceOfThings',
      permissionCode: 'menu_add_lookup'
    },
    {
      menu: '设备详情',
      routeReg: /^\/DeviceOfThings\/DeviceOfThingsDetails\/\d{1,}$/i,
      visible: true,
      permissionCode: 'menu_add_lookup'
    },
    {
      menu: '数据分析',
      route: '/DataAnalysis',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '实时监控',
      route: '/Monitoring',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '菜谱列表',
      route: '/Cookbook',
      permissionCode: 'manu_list_lookup'
    },
    {
      menu: '添加菜谱',
      route: '/Cookbook/AddCookbook',
      visible: true,
      permissionCode: 'menu_add_lookup'
    },
    {
      menu: '修改菜谱',
      routeReg: /^\/Cookbook\/EditCookbook\/\d{1,}$/i,
      visible: true,
      permissionCode: 'menu_update_lookup'
    },
    {
      menu: '菜谱分类',
      route: '/CookbookClassify',
      permissionCode: 'menu_cate_lookup'
    },
    {
      menu: '菜谱包列表',
      route: '/cookingPackage',
      permissionCode: 'menu_add_lookup'
    }, {
      menu: '修改菜谱包',
      routeReg: /^\/cookingPackage\/EditCookingPackage\/\d{1,}$/i,
      visible: true,
      permissionCode: 'menu_update_lookup'
    },
    {
      menu: '添加菜谱包',
      route: '/cookingPackage/AddCookingPackage',
      visible: true,
      permissionCode: 'menu_cate_lookup'
    },
    {
      menu: '订单列表',
      route: '/Order',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '订单详情',
      routeReg: /^\/Order\/Details\/\d{1,}$/i,
      visible: true,
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '商品列表',
      route: '/Store',
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '商品分类',
      route: '/Classify',
      permissionCode: 'supplierMall_cate_lookup'
    },
    {
      menu: '添加商品',
      route: '/Store/AddMenu',
      visible: true,
      permissionCode: 'home_employee_lookup'
    }, {
      menu: '修改商品',
      routeReg: /^\/Store\/EditMenu\/\d{1,}$/i,
      visible: true,
      permissionCode: 'home_employee_lookup'
    },
    {
      menu: '优惠券',
      route: '/DiscountCoupon',
      permissionCode: 'menu_update_lookup'
    }, {
      menu: '红包',
      route: '/RedPacket',
      permissionCode: 'menu_update_lookup'
    },
  ]
}, {
  menu: '商家',
  permissionCode: 'merchant',
  defaultDock: false,
  icon: '&#xe637;',
  subMenu: [{
      menu: '订单列表',
      route: '/Order',
      permissionCode: 'supplierOrder_list_lookup'
    }, {
      menu: '订单详情',
      routeReg: /^\/Order\/Details\/\d{1,}$/i,
      visible: true,
      permissionCode: 'supplierOrder_detail_lookup'
    },
    {
      menu: '商品列表',
      route: '/Store',
      permissionCode: 'supplierMall_list_lookup'
    },
    {
      menu: '商品分类',
      route: '/Classify',
      permissionCode: 'supplierMall_cate_lookup'
    },
    {
      menu: '添加商品',
      route: '/Store/AddMenu',
      visible: true,
      permissionCode: 'supplierMall_add_lookup'
    }, {
      menu: '修改商品',
      routeReg: /^\/Store\/EditMenu\/\d{1,}$/i,
      visible: true,
      permissionCode: 'supplierMall_update_lookup'
    }, {
      menu: '优惠券',
      route: '/DiscountCoupon',
      permissionCode: 'supplierMall_list_lookup'
    }, {
      menu: '红包',
      route: '/RedPacket',
      permissionCode: 'supplierMall_list_lookup'
    },
  ]
}]
