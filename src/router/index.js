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

    {
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
    {
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
                meta: { title: '用户列表', icon: 'el-icon-user', componentUrl: '@/views/user/index' }
            }

        ]
    },
    {
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
    {
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