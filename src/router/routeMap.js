//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [{
    menu: '平台主页',
    permissionCode: 'home',
    defaultDock: true,
    icon: '&#xe626;',
    subMenu: [{
      menu: '首页',
      route: '/Home',
      permissionCode: ''
    }]
  },
  {
    menu: '订单管理',
    permissionCode: 'order',
    defaultDock: true,
    icon: '&#xe60d;',
    subMenu: [{
        menu: '订单列表',
        route: '/Order',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '订单详情',
        route: '/Details',
        // routeReg: /^\/Order\/Details\/\d{1,}$/i,
        defaultDock: true,
        permissionCode: 'order_details_look_up'
      },
    ]
  },
  {
    menu: '商城管理',
    permissionCode: 'store',
    defaultDock: true,
    icon: '&#xe634;',
    subMenu: [{
        menu: '商品列表',
        route: '/Store',
        permissionCode: ''
      },
      {
        menu: '商品分类',
        route: '/Classify',
        permissionCode: ''
      },
      {
        menu: '添加商品',
        route: '/AddMenu',
        permissionCode: ''
      },
      {
        menu: '修改商品',
        route: '/EditMenu',
        permissionCode: ''
      }
    ]
  },
  {
    menu: '菜谱管理',
    permissionCode: 'cookbook',
    defaultDock: true,
    icon: '&#xe640;',
    subMenu: [{
        menu: '菜谱列表',
        route: '/Cookbook',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '添加菜谱',
        route: '/AddCookbook',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '修改菜谱',
        route: '/EditCookbook',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '菜谱分类',
        route: '/CookbookClassify',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
    ]
  },
  {
    menu: '信息管理',
    permissionCode: 'msg',
    defaultDock: true,
    icon: '&#xe629;',
    subMenu: [{
        menu: '服务网点',
        route: '/Service',
        permissionCode: ''
      },
      {
        menu: '常见问题',
        route: '/Problems',
        permissionCode: ''
      },
      {
        menu: '广告列表',
        route: '/Advertising',
        permissionCode: ''
      }
    ]
  },
  {
    menu: '销售区域',
    permissionCode: 'area',
    defaultDock: true,
    icon: '&#xe605;',
    subMenu: [{
      menu: '销售区域',
      route: '/SalesArea',
      permissionCode: ''
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
    defaultDock: true,
    icon: '&#xe646;',
    subMenu: []
  },
  {
    menu: '系统管理',
    permissionCode: 'system',
    defaultDock: true,
    icon: '&#xe633;',
    subMenu: [{
        menu: '管理员列表',
        route: '/Administrator',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '角色管理',
        route: '/RoleManagement',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '添加角色',
        route: '/RoleManagement/AddRole',
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
      {
        menu: '修改角色',
        routeReg:/^\/RoleManagement\/EditRole\/\d{1,}$/i,
        defaultDock: true,
        permissionCode: 'order_look_up'
      },
    ]
  },

  //预留样式模板
  // {
  //   menu: '员工管理',
  //   permissionCode: 'personnel"',
  //   icon: '&#xe68d;',
  //   subMenu: [{
  //       menu: '员工管理',
  //       route: '/Personnel',
  //       permissionCode: 'employee_lookup'
  //     },
  //     {
  //       menu: '员工详情',
  //       routeReg: /^\/Personnel\/Modification\/\d{1,}$/i,
  //       visible: true,
  //       permissionCode: 'employee_modification_lookup'
  //     },
  //     {
  //       menu: '添加员工',
  //       route: "/Personnel/PersnnelAdd",
  //       visible: true,
  //       permissionCode: 'employee_add_lookup'
  //     }
  //   ]
  // },
]
