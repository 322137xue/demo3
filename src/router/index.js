import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ], hidden: true
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '学生页面', icon: 'documentation', affix: false }
      }
    ], hidden: true
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: '商品', icon: 'guide', noCache: true }
      }
    ], hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ],
  },
  // 首页
  {
    path: '/system - management',
    component: Layout,
    redirect: '/system - management/sub - route - 1',
    name: 'SY',
    meta: {
      title: '首页',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management -1',
        component: () => import('@/views/gtz/index'),
        meta: {
          title: '工作台',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management -2',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '我的学期课务',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management-3',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '当前课务',
          icon: 'role - icon'
        }
      }, {
        path: 'role - management-4',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '我的授课计划',
          icon: 'role - icon'
        }
      },
    ]
  },
  //课务相关
  {
    path: '/system - management-2',
    component: Layout,
    redirect: '/system - management/sub - route - 2',
    name: 'KWG',
    meta: {
      title: '课务相关',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management-1',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '课程安排',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-2',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '机房分配',
          icon: 'role - icon'
        }
      },
    ]
  },
  // 综合管理
  {
    path: '/system - management-3',
    component: Layout,
    redirect: '/system - management/sub - route - 3',
    name: 'ZHG',
    meta: {
      title: '综合管理',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management -1',
        component: () => import('@/views/YH/index'),
        meta: {
          title: '用户管理',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-2',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '班级管理',
          icon: 'role - icon'
        }
      },
      {
        path: 'user - management-3',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '专业管理',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-4',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '课务管理',
          icon: 'role - icon'
        }
      },
      {
        path: 'user - management-5',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '学期管理',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-6',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '时间段管理',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management -7',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '机房管理',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management -8',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '设备管理',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management-9',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '修改学生密码',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management-10',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '导入数据',
          icon: 'role - icon'
        }
      },
    ]
  },
  // 数据检索
  {
    path: '/system - management-4',
    component: Layout,
    redirect: '/system - management/sub - route - 4',
    name: 'DATA',
    meta: {
      title: '数据检索',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management-1',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '设备报障及维修',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-2',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '教学反馈',
          icon: 'role - icon'
        }
      },
      {
        path: 'user - management-3',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '师生考勤纪录',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-4',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '课程检索',
          icon: 'role - icon'
        }
      },
      {
        path: 'user - management-5',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '机器使用检索',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-6',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '开门记录查询',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management-6',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '违规使用',
          icon: 'role - icon'
        }
      },
    ]
  },
  // 反馈处理
  {
    path: '/system - management-5',
    component: Layout,
    redirect: '/system - management/sub - route - 5',
    name: 'FKC',
    meta: {
      title: '反馈处理',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management-1',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '设备报修及处理',
          icon: 'user - icon'
        }
      },
      {
        path: 'role - management-2',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '违规使用',
          icon: 'role - icon'
        }
      },
      {
        path: 'role - management-3',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '违规标注',
          icon: 'role - icon'
        }
      }, {
        path: 'role - management-4',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '违规组',
          icon: 'role - icon'
        }
      },
    ]
  },
  // 设备命令注入
  {
    path: '/system - management-6',
    component: Layout,
    redirect: '/system - management/sub - route - 6',
    name: 'SBM',
    meta: {
      title: '设备命令注入',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '命令注入',
          icon: 'user - icon'
        }
      },
    ]
  },
  // 任务调度
  {
    path: '/system - management-7',
    component: Layout,
    redirect: '/system - management/sub - route - 7',
    name: 'RWU',
    meta: {
      title: '任务调度',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management-1',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '任务管理',
          icon: 'user - icon'
        }
      },
      {
        path: 'user - management-2',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '任务日志',
          icon: 'user - icon'
        }
      },
    ]
  },
  // 设置
  {
    path: '/system - management-8',
    component: Layout,
    redirect: '/system - management/sub - route - 8',
    name: 'SZ',
    meta: {
      title: '任务调度',
      icon: 'system - icon'
    },
    children: [
      {
        path: 'user - management',
        component: () => import('@/views/guide/index'),
        meta: {
          title: '系统设置',
          icon: 'user - icon'
        }
      },
    ]
  },
]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    hidden: true,
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        hidden: true

      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        },
        hidden: true

      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }, hidden: true

      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true },
        hidden: true

      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ],
    hidden: true

  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ],
    hidden: true

  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ], hidden: true

  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ], hidden: true

  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ], hidden: true

  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ], hidden: true

  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ], hidden: true

  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ], hidden: true

  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ], hidden: true

  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ], hidden: true

  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
