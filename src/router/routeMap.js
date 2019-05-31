export default [{
    menu: '智慧物联',
    permissionCode: 'things',
    defaultDock: false,
    icon: '&#xe64e;',
    subMenu: [{
        menu: '物联产品',
        route: '/AdminProductOfThings',
        permissionCode: 'iot_product_check_lookup'
      },
      {
        menu: '产品详情',
        routeReg: /^\/AdminProductOfThings\/AdminProductOfThingsDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'iot_product_check_lookup'
      },
      {
        menu: '产品审核',
        routeReg: /^\/AdminProductOfThings\/AdminProductOfThingsAudit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'iot_product_audit_lookup'
      },
      {
        menu: '物联设备',
        route: '/AdminDeviceOfThings',
        permissionCode: 'iot_device_lookup'
      },
      {
        menu: '设备详情',
        routeReg: /^\/AdminDeviceOfThings\/AdminDeviceOfThingsDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'iot_device_check_lookup'
      },
      {
        menu: '数据分析',
        route: '/AdminDataAnalysis',
        permissionCode: 'iot_data_lookup'
      },
      {
        menu: '实时监控',
        route: '/AdminMonitoring',
        permissionCode: 'iot_control_lookup'
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
        permissionCode: 'platform_homepage_lookup'
      },
      {
        menu: '订单列表',
        route: '/AdminOrder',
        permissionCode: 'platform_order_lookup'
      },
      {
        menu: '订单详情',
        routeReg: /^\/AdminOrder\/AdminDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'platform_order_detail_lookup'
      },
      {
        menu: '商品列表',
        route: '/AdminStore',
        permissionCode: 'platform_goods_lookup'
      },
      {
        menu: '查看商品',
        routeReg: /^\/AdminStore\/AdminStoreDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'platform_goods_detail_lookup'
      },
      {
        menu: '商品分类',
        route: '/Classify',
        permissionCode: 'platform_goodscate_lookup'
      },
      {
        menu: '优惠券',
        route: '/AdminDiscountCoupon',
        permissionCode: 'platform_coupon_lookup'
      },
      {
        menu: '红包',
        route: '/AdminRedPacket',
        permissionCode: 'platform_redpack_lookup'
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
  },
  {
    menu: '信息管理',
    permissionCode: 'checkIn',
    defaultDock: false,
    icon: '&#xe69e;',
    subMenu: [{
        menu: '文章管理',
        route: '/Article',
        permissionCode: 'message_writing_lookup'
      },
      {
        menu: '添加文章',
        route: '/Article/ArticleAdd',
        visible: true,
        permissionCode: 'message_writing_add_lookup'
      },
      {
        menu: '修改文章',
        routeReg: /^\/Article\/ArticleEdit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'message_writing_update_lookup'
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
        permissionCode: 'message_advertisement_add_lookup'
      },
      {
        menu: '修改广告',
        routeReg: /^\/Advertising\/AdvertisingEdit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'message_advertisement_update_lookup'
      },
      {
        menu: '优惠活动',
        route: '/Information',
        permissionCode: 'message_active_lookup'
      },
      {
        menu: '发送活动',
        route: '/Information/NewInformation',
        visible: true,
        permissionCode: 'message_active_send_lookup'
      },
      {
        menu: '查看详情',
        routeReg: /^\/Information\/DetailsInformation\/\d{1,}$/i,
        visible: true,
        permissionCode: 'message_active_detai_lookup'
      }
    ]
  },
  {
    menu: '入驻管理',
    permissionCode: 'checkIn',
    defaultDock: false,
    icon: '&#xe861;',
    subMenu: [{
        menu: '设备厂商',
        route: '/Manufacturer',
        permissionCode: 'enter_device_lookup'
      },
      {
        menu: '查看详情',
        routeReg: /^\/Manufacturer\/ManufacturerDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'enter_device_detail_lookup'
      },
      {
        menu: '审核',
        routeReg: /^\/Manufacturer\/ManufacturerAudit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'enter_device_audit_lookup'
      },
      {
        menu: '商家',
        route: '/Merchant',
        permissionCode: 'enter_seller_lookup'
      },
      {
        menu: '查看详情',
        routeReg: /^\/Merchant\/MerchantDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'enter_seller_detail_lookup'
      }, {
        menu: '审核',
        routeReg: /^\/Merchant\/MerchantAudit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'enter_seller_audit_lookup'
      },
    ]
  },
  {
    menu: '用户管理',
    permissionCode: 'checkIn',
    defaultDock: false,
    icon: '&#xe653;',
    subMenu: [{
        menu: '用户分析',
        route: '/UserAnalysis',
        permissionCode: 'user_analyse_lookup'
      }, {
        menu: '用户列表',
        route: '/User',
        permissionCode: 'user_list_lookup'
      },
      {
        menu: '用户详情',
        routeReg: /^\/User\/UserDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'user_list_detai_lookup'
      },
      {
        menu: '积分明细',
        route: '/Integral',
        permissionCode: 'user_score_lookup'
      },
    ]
  },
  {
    menu: '留言管理',
    permissionCode: 'checkIn',
    defaultDock: false,
    icon: '&#xe65d;',
    subMenu: [{
      menu: '留言与反馈',
      route: '/GuestBook',
      permissionCode: 'leaveword_lookup'
    }, ]
  },
  {
    menu: '系统设置',
    permissionCode: 'system',
    defaultDock: false,
    icon: '&#xe603;',
    subMenu: [{
        menu: '系统设置',
        route: '/System',
        defaultDock: true,
        permissionCode: 'system_set_lookup'
      },
      {
        menu: '安全设置',
        route: '/Security',
        permissionCode: 'system_safeset_lookup'
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
        permissionCode: 'system_log_lookup'
      },
    ]
  },
  {
    menu: '设备厂商',
    permissionCode: 'manufacturer',
    defaultDock: false,
    icon: '&#xe600;',
    subMenu: [{
        menu: '审核查询',
        route: '/EnterpriseAuditedIndex',
        permissionCode: 'manufacturer_audit_lookup'
      },
      {
        menu: '修改注册',
        routeReg: /^\/EnterpriseAuditedIndex\/EnterpriseAuditedEdit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_audit_update_lookup'
      },
      {
        menu: '物联产品',
        route: '/ProductOfThings',
        permissionCode: 'manufacturer_product_lookup'
      },
      {
        menu: '物联产品添加',
        route: '/ProductOfThings/ProductOfThingsAdd',
        visible: true,
        permissionCode: 'manufacturer_product_add_lookup'
      },
      {
        menu: '物联产品修改',
        routeReg: /^\/ProductOfThings\/ProductOfThingsEdit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_product_update_lookup'
      },
      {
        menu: '物联产品详情',
        routeReg: /^\/ProductOfThings\/ProductOfThingsDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_product_detail_lookup'
      },
      {
        menu: '物联设备',
        route: '/DeviceOfThings',
        permissionCode: 'manufacturer_device_lookup'
      },
      {
        menu: '设备详情',
        routeReg: /^\/DeviceOfThings\/DeviceOfThingsDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_device_detail_lookup'
      },
      {
        menu: '数据分析',
        route: '/DataAnalysis',
        permissionCode: 'manufacturer_data_analyse_lookup'
      },
      {
        menu: '实时监控',
        route: '/Monitoring',
        permissionCode: 'manufacturer_control_lookup'
      },
      {
        menu: '菜谱列表',
        route: '/Cookbook',
        permissionCode: 'manufacturer_recipe_lookup'
      },
      {
        menu: '添加菜谱',
        route: '/Cookbook/AddCookbook',
        visible: true,
        permissionCode: 'manufacturer_recipe_add_lookup'
      },
      {
        menu: '修改菜谱',
        routeReg: /^\/Cookbook\/EditCookbook\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_recipe_update_lookup'
      },
      {
        menu: '菜谱分类',
        route: '/CookbookClassify',
        permissionCode: 'manufacturer_recipecate_lookup'
      },
      {
        menu: '菜谱包列表',
        route: '/cookingPackage',
        permissionCode: 'manufacturer_recipepack_lookup'
      }, {
        menu: '修改菜谱包',
        routeReg: /^\/cookingPackage\/EditCookingPackage\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_recipepack_update_lookup'
      },
      {
        menu: '添加菜谱包',
        route: '/cookingPackage/AddCookingPackage',
        visible: true,
        permissionCode: 'manufacturer_recipepack_add_lookup'
      },
      {
        menu: '订单列表',
        route: '/Order',
        permissionCode: 'manufacturer_order_lookup'
      },
      {
        menu: '订单详情',
        routeReg: /^\/Order\/Details\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_order_detail_lookup'
      },
      {
        menu: '商品列表',
        route: '/Store',
        permissionCode: 'manufacturer_goods_lookup'
      },
      {
        menu: '添加商品',
        route: '/Store/AddMenu',
        visible: true,
        permissionCode: 'manufacturer_goods_add_lookup'
      }, {
        menu: '修改商品',
        routeReg: /^\/Store\/EditMenu\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_goods_update_lookup'
      },
      {
        menu: '优惠券',
        route: '/DiscountCoupon',
        permissionCode: 'manufacturer_coupon_lookup'
      }, {
        menu: '红包',
        route: '/RedPacket',
        permissionCode: 'manufacturer_redpack_lookup'
      },
      {
        menu: '广告列表',
        route: '/Advertising',
        permissionCode: 'manufacturer_advertisement_lookup'
      }, {
        menu: '添加广告',
        route: '/Advertising/AdvertisingAdd',
        visible: true,
        permissionCode: 'manufacturer_advertisement_add_lookup'
      }, {
        menu: '修改广告',
        routeReg: /^\/Advertising\/AdvertisingEdit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'manufacturer_advertisement_update_lookup'
      },
      {
        menu: '商城设置',
        route: '/MerchantSystem',
        permissionCode: 'manufacturer_mellset_lookup'
      },
    ]
  },
]
