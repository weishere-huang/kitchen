//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [{
    menu: '平台主页',
    permissionCode: 'home',
    defaultDock: false,
    icon: '&#xe626;',
    subMenu: [{
        menu: '首页',
        route: '/Home',
        permissionCode: 'home_supplier_lookup'
      },
      {
        menu: '首页',
        route: '/AdminHome',
        permissionCode: 'home_employee_lookup'
      }
    ]
  },
  {
    menu: '订单管理',
    permissionCode: 'order',
    defaultDock: false,
    icon: '&#xe60d;',
    subMenu: [{
        menu: '订单列表',
        route: '/Order',
        permissionCode: 'supplierOrder_list_lookup'
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
        menu: '订单详情',
        routeReg: /^\/Order\/Details\/\d{1,}$/i,
        visible: true,
        permissionCode: 'supplierOrder_detail_lookup'
      }
    ]
  },
  {
    menu: '商品管理',
    permissionCode: 'store',
    defaultDock: false,
    icon: '&#xe634;',
    subMenu: [{
        menu: '商品列表',
        route: '/Store',
        permissionCode: 'supplierMall_list_lookup'
      },
      {
        menu: '商品列表',
        route: '/AdminStore',
        permissionCode: 'mall_list_lookup'
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
      },
      {
        menu: '修改商品',
        routeReg: /^\/Store\/EditMenu\/\d{1,}$/i,
        visible: true,
        permissionCode: 'supplierMall_update_lookup'
      },
      {
        menu: '修改商品',
        routeReg: /^\/AdminStore\/AdminStoreDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'mall_update_lookup'
      }
    ]
  },
  {
    menu: '菜谱管理',
    permissionCode: 'cookbook',
    defaultDock: false,
    icon: '&#xe640;',
    subMenu: [{
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
    ]
  },
  {
    menu: '信息管理',
    permissionCode: 'msg',
    defaultDock: false,
    icon: '&#xe629;',
    subMenu: [{
        menu: '服务网点',
        route: '/Service',
        permissionCode: 'message_service_lookup'
      },
      {
        menu: '常见问题',
        route: '/Problems',
        permissionCode: 'message_faq_lookup'
      },
      {
        menu: '广告列表',
        route: '/Advertising',
        permissionCode: 'message_advertisement_lookup'
      }
    ]
  },
  {
    menu: '代理商',
    permissionCode: 'area',
    defaultDock: false,
    icon: '&#xe605;',
    subMenu: [{
      menu: '代理商列表',
      route: '/Supplier',
      permissionCode: 'supplier_list_lookup'
    }, {
      menu: '添加代理商',
      route: '/Supplier/AddSupplier',
      visible: true,
      permissionCode: 'supplier_add_lookup'
    }, {
      menu: '修改代理商',
      // route: '/Supplier/EditSupplier',
      routeReg: /^\/Supplier\/EditSupplier\/\d{1,}$/i,
      visible: true,
      permissionCode: 'supplier_update_lookup'
    }]
  },
  // {
  //   menu: '文章管理',
  //   permissionCode: 'article',
  //   defaultDock: true,
  //   icon: '&#xe67d;',
  //   subMenu: []
  // },
  {
    menu: '用户管理',
    permissionCode: 'user',
    defaultDock: false,
    icon: '&#xe646;',
    subMenu: [{
        menu: '用户列表',
        route: '/User',
        permissionCode: 'user_manager_list_lookup'
      },
      {
        menu: '留言与反馈',
        route: '/GuestBook',
        permissionCode: 'user_faq_list_lookup'
      }
    ]
  },
  {
    menu: '消息通知',
    permissionCode: 'information',
    defaultDock: false,
    icon: '&#xe646;',
    subMenu: [{
        menu: '消息通知',
        route: '/Information',
        permissionCode: 'messagepush_lookup'
      },
      {
        menu: '发送消息',
        route: '/Information/NewInformation',
        visible: true,
        permissionCode: 'user_manager_list_lookup'
      },
      {
        menu: '查看详情',
        routeReg: /^\/Information\/DetailsInformation\/\d{1,}$/i,
        visible: true,
        permissionCode: 'user_manager_list_lookup'
      }
    ]
  },
  {
    menu: '系统管理',
    permissionCode: 'system',
    defaultDock: false,
    icon: '&#xe633;',
    subMenu: [{
        menu: '系统设置',
        route: '/System',
        defaultDock: true,
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
  },
]
