import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    { //主页
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '主页', icon: 'dashboard' }
        }]
    },
    { //权限管理
        path: '/auth',
        component: Layout,
        redirect: '/auth/user',
        name: 'auth',
        meta: { title: '权限管理', icon: 'auth' },
        alwaysShow: true,
        children: [{
                path: 'user',
                name: 'authUser',
                component: () =>
                    import ('@/views/auth/user/index'),
                meta: { title: '账号管理', icon: 'account' }
            },
            {
                path: 'role',
                name: 'authRole',
                component: () =>
                    import ('@/views/auth/role/index'),
                meta: { title: '角色管理', icon: 'role' }
            },
            {
                path: 'permission',
                name: 'authPermission',
                component: () =>
                    import ('@/views/auth/permission/index'),
                meta: { title: '资源管理', icon: 'menu' }
            }

        ]
    },
    { //商品管理
        path: '/product',
        component: Layout,
        redirect: '/product/list',
        name: 'Content',
        alwaysShow: true, // 当子路由只有一个时候,也让他展开
        meta: { title: '商品管理', icon: 'el-icon-s-shop' },
        children: [{
                path: 'list',
                name: 'ProductList',
                component: () =>
                    import ('@/views/product/index'),
                meta: { title: '商品列表', icon: 'el-icon-shopping-bag-2' }
            },
            {
                path: 'addDetail',
                name: 'addDetail',
                hidden: true,
                component: () =>
                    import ('@/views/product/addDetail/index'),
                meta: {
                    title: '新增商品',
                    icon: 'el-icon-shopping-bag-2',
                    activeMenu: '/product/list' // 触发左侧目录高亮路由
                }
            },
            {
                path: 'category',
                name: 'productCategory',
                component: () =>
                    import ('@/views/product/category/index'),
                meta: { title: '商品分类', icon: 'el-icon-menu' }
            },
            {
                path: 'brand',
                name: 'productBrand',
                component: () =>
                    import ('@/views/product/brand/index'),
                meta: { title: '品牌管理', icon: 'el-icon-present' }
            }

        ]
    },
    { //订单管理
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        name: 'order',
        meta: { title: '订单管理', icon: 'el-icon-tickets' },
        alwaysShow: true,
        children: [{
                path: 'list',
                name: 'orderList',
                component: () =>
                    import ('@/views/order/list/index'),
                meta: { title: '订单列表', icon: 'el-icon-document-checked' }
            },
            { //订单详情
                path: 'orderDetail',
                name: 'orderDetail',
                hidden: true,
                component: () =>
                    import ('@/views/order/list/detail/index'),
                meta: { title: '订单详情', icon: 'table', activeMenu: '/order/list' }
            },
            {
                path: 'back',
                name: 'backList',
                component: () =>
                    import ('@/views/order/back/index'),
                meta: { title: '退单列表', icon: 'el-icon-document-delete' }
            },
            { //退单详情
                path: 'backDetail',
                name: 'backDetail',
                hidden: true,
                component: () =>
                    import ('@/views/order/back/detail/index'),
                meta: { title: '退单详情', icon: 'table', activeMenu: '/order/back' }
            },
            {
                path: 'address',
                name: 'addressList',
                component: () =>
                    import ('@/views/order/address/index'),
                meta: { title: '地址管理', icon: 'el-icon-school' }
            }

        ]
    },
    { //注册用户管理
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        name: 'user',
        meta: { title: '注册用户管理', icon: 'el-icon-s-custom' },
        alwaysShow: true,
        children: [{
                path: 'list',
                name: 'userList',
                component: () =>
                    import ('@/views/user/index'),
                meta: { title: '用户列表', icon: 'el-icon-user' }
            }

        ]
    },
    { //营销管理
        path: '/market',
        component: Layout,
        redirect: '/market/activity',
        name: 'Content',
        alwaysShow: true, // 当子路由只有一个时候,也让他展开
        meta: { title: '营销管理', icon: 'el-icon-goods' },
        children: [{
                path: 'activity',
                name: 'Activity',
                component: () =>
                    import ('@/views/market/activity/index'),
                meta: { title: '限时活动', icon: 'el-icon-files' }
            },
            {
                path: 'adList',
                name: 'AdList',
                component: () =>
                    import ('@/views/market/adList/index'),
                meta: { title: '广告列表', icon: 'el-icon-document-copy' }
            }

        ]
    },
    { //内容管理
        path: '/content',
        component: Layout,
        redirect: '/content/article',
        name: 'Content',
        alwaysShow: true, // 当子路由只有一个时候,也让他展开
        meta: { title: '内容管理', icon: 'el-icon-folder' },
        children: [{
                path: 'article',
                name: 'Article',
                component: () =>
                    import ('@/views/content/article/index'),
                meta: { title: '文章管理', icon: 'el-icon-document' }
            },
            {
                path: 'addArticle',
                name: 'AddArticle',
                hidden: true,
                component: () =>
                    import ('@/views/content/article/detail/index'),
                meta: {
                    title: '新增文章',
                    icon: 'el-icon-document',
                    activeMenu: '/content/article' // 触发左侧目录高亮路由
                }
            },
            {
                path: 'editArticle/:id',
                name: 'EditArticle',
                hidden: true,
                component: () =>
                    import ('@/views/content/article/detail/index'),
                meta: {
                    title: '新增文章',
                    icon: 'el-icon-document',
                    activeMenu: '/content/article' // 触发左侧目录高亮路由
                }
            },
            {
                path: ' materia',
                name: ' Materia',
                component: () =>
                    import ('@/views/content/materia/index'),
                meta: { title: '素材管理', icon: 'el-icon-picture-outline' }
            },
        ]
    },






    // *代表所有路由注册的页面,如果访问的路由不存在,则导向404
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