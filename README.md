# 乐居后台管理项目

## 介绍

乐居后台管理是基于element-admin-template实现的一套乐居客户端的后台管理系统 主要包含了以下功能:

- 主页大屏展示功能
- 权限管理
- 商品管理
- 注册用户管理
- 营销管理
- 内容管理
- 个人中心

乐居客户端项目仓库地址: https://gitee.com/bufanxy/leju-uniapp

乐居后台管理项目仓库地址: https://gitee.com/bufanxy/leju-admin-vue

乐居后台项目在线预览地址: http://shen_hao222.gitee.io/test_page/#/dashboard

乐居项目的接口地址: http://leju.bufan.cloud/swagger-ui.html

演示账号:admin 密码:123456

> (注:请勿随意删改数据,本项目仅供学习交流使用,禁止商用)

## 使用方法和基本页面展示

### 使用方法

首先从**乐居后台管理项目仓库地址**把项目下载下来, 然后执行命令

```
  npm install
```

> 注意:该项目需要有node环境

## 主要使用的技术栈

- vue-router

> 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。 官网地址: https://router.vuejs.org/zh/

- vuex

> uex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 官网地址: https://vuex.vuejs.org/zh/

- axios

> Axios 是一个基于 promise 的 HTTP 库，简单的讲就是可以发送get、post等请求。 官网地址: https://www.npmjs.com/package/axios

- element-ui

> Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。 官网地址: https://element.eleme.cn/#/zh-CN

- element-admin

> 是一个后台前端解决方案，它基于 vue 和 element-ui实现。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。 官网地址: https://panjiachen.gitee.io/vue-element-admin-site/zh/

- echarts

> echarts是百度开发的一款非常强大的数据可视化工具,可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。 官网地址: https://echarts.apache.org/zh/index.html

## 各模块的主要功能简介

- 主页

> 主要进行一些订单,销量等数据展示,给用户比较直观的数据体验。

- 权限管理

  - 账号管理

  > 该系统的用户账号的增删改查功能

  - 角色管理

  > 配置该系统的角色权限

  - 资源管理

  > 权限路由的增删改查和初始化路由

- 商品管理

  - 商品列表

  > 对乐居客户端展示的商品进行增删改查,并且可以生成每个商品的sku和对其进行增删改查操作

  - 商品分类

  > 商品的分类展示,暂时没有做相关的增删改查操作

  - 品牌管理

  > 对每个商品所属品牌的增删改查的管理

- 订单管理

  - 订单列表

  > 对乐居客户端商品的订单,进行发货,查看订单详情和物流情况以及关闭订单等操作

  - 退单列表

  > 对乐居客户端进行退货的订单执行同意或者拒绝,以及关闭退单等操作

  - 地址管理

  > 收发货地址的增删改查和默认收发货地址的改变

- 注册用户管理

  - 用户列表

  > 查看客户端注册用户的基本信息

- 营销管理

  - 限时活动管理

  > 可以对客户端显示的限时活动的增删改查操作

  - 广告列表

  > 广告的增删改查,类似商品管理

- 内容管理

  - 文章管理

  > 可以对客户端显示的文章进行增删改查操作

  - 素材管理

  > 素材图片的增删改查

- 个人中心

  - 个人主页

  > 当前后台管理系统登录的用户的基本信息展示

  - 个人设置

  > 当前后台管理系统登录的用户的个人设置(暂时只做了样式,预留)

## 部分代码示例

- 登录

  1. 首先在vue.config文件配置webpack的proxy实现跨域,在module.exports导出的对象里加devServer

  ```
    devServer: {
    port: 8080,
    open: true,
    overlay: {
        warnings: false,
        errors: true
    },
    proxy: {
        '/(api|admin|lejuAdmin)': {
            target: host, // 80可以省略不写 所以代理地址和当前项目不是同一个地址!!
            changeOrigin: true, // 如果是跨域 需要添加
            pathRewrite: {
                // ['/admin']: '/abc'   /admin/xx/xx ==> /abc/xx/xx
            }
        }
      }
    },
  ```

  1. 使用axios封装好自己要用的request.js

  ```
  import axios from 'axios'
  import { Message } from 'element-ui'
  import { getToken, clearUserCache } from '@/utils/myAuth'
  import router from '@/router'
  
  // create an axios instance
  // process.env 指的是当前的运行环境 所对应的 配置文件
  const service = axios.create({
      // baseURL: 'http://leju.bufan.cloud', // url = base url + request url
      // withCredentials: true // 跨域携带cookies需要,token认证不需要
      timeout: 5000 // 请求超时时间
  })
  
  // request interceptor
  service.interceptors.request.use(
      config => {
      // do something before request is sent
      // 如果本地有token  携带过去
          var token = getToken()
          if (token) {
              config.headers['token'] = token
          }
          return config
      },
      error => {
          // do something with request error
          console.log(error) // for debug
          return Promise.reject(error)
      }
  )
  
  // response interceptor
  service.interceptors.response.use(
      response => {
          const res = response.data
          // token无效 会返回20002
          if (res.code === 20002) {
              Message({
                  message: res.message + ',请重新登陆!',
                  type: 'error',
                  duration: 5 * 1000
              })
              // 清除用户缓存
              clearUserCache()
              router.push('/login')
          }
  
          return res
      },
      error => {
          console.log('err' + error) // for debug
          Message({
              message: error.message,
              type: 'error',
              duration: 5 * 1000
          })
          return Promise.reject(error)
      }
  )
  /**
  * 合并get与post提交
  * @param {} config
  */
  function http(config) {
      // 动手脚
      const axiosConfig = {
          url: config.url,
          method: config.method
      }
      // 如果data存在 而且不为空对象
      if (config.data) {
          if (Object.keys(config.data).length > 0) {
              var key = config.method.toLowerCase() === 'get' ? 'params' : 'data'
              axiosConfig[key] = config.data
          }
          if (config.data.constructor === FormData) {
              axiosConfig.data = config.data
          }
      }
  
      if (config.headers) {
          axiosConfig.headers = config.headers
      }
      return service(axiosConfig)
  }
  export default http
  ```

  1. 调用request 封装登录api

  ```
  import request from '@/api/request'
  function doLogin(data) {
      return request({
          url: '/lejuAdmin/index/login', // 相对路径
          method: 'post',
          data
      })
  }
  ```

  1. 在login/index.vue登录页面里调用doLogin方法,并将token和userInfo存入localstorage中

  ```
     handleLogin() {
          loginApi
              .doLogin({
                  ...this.loginForm
              })
              .then((res) => {
                  if (res.success) {
                      // 1.获取用户信息
                      var token = res.data.token
                      var info = res.data.userInfo
                      // 2. 存储用户信息和token  存到哪？  如果用户信息频繁变化建议存储ls/vuex ； 如果不经常变化直接存储ls
                      setToken(token)
                      setUserInfo(info)
                      this.$router.push({ path: '/' })
                  } else {
                      this.$message.error('登陆失败！')
                  }
              })
      },
  ```

  1. 在permission.js全局配置路由导航,判断token存在与否的逻辑

  ```
  router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  //     // shtest
  // next()
  // return
  // 获取token
  var token = getToken()
  if (token) {
      // 如果有token 且跳往 登录页面,则默认跳向主页
      if (to.path === '/login') {
          next('/')
          NProgress.done()
          return
      }
      // 判断权限
      if (store.state.user.asyncRoutes.length > 0) {
          // 把当前页面的路由权限存入vuex
          if (to.meta && to.meta.permissionValues) {
              store.commit('user/RESET_BTN_PERMI', to.meta.permissionValues)
          }
          next()
      } else {
          // 重新获取
          await store.dispatch('user/getInitMenus')
              .then(res => {
                  // 把当前页面的路由权限存入vuex
                  if (to.meta && to.meta.permissionValues) {
                      store.commit('user/RESET_BTN_PERMI', to.meta.permissionValues)
                  }
  
                  next(to.path)
              }).catch(err => {
                  // 如果code等于20001说明 路由有脏数据,需要初始化一次
                  if (err.code === 20001) {
                      Message.error('权限动态路由出错,请在资源管理初始化路由')
                      next()
                  } else {
                      Message.error('权限动态路由出错')
                      clearUserCache()
                      next('/login')
                  }
                  NProgress.done()
              })
              }
        } else {
            console.log('没有token')
            // 清下页面权限
            store.commit('user/CLEAR_BTN_PEREMI')
            /* has no token*/
            if (whiteList.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next()
            } else {
                // other pages that do not have permission to access are redirected to the login page.
                next('/login')
                NProgress.done()
            }
        }
    })
    router.afterEach(() => {
        // finish progress bar
        NProgress.done()
    })
  ```

## 组件添加原生点击事件

` @click.native` 不加native 点击事件不生效





