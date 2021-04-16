'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080 // dev port
const host = defaultSettings.host
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
  // 跨域
  //   1. 开发
  //     a) webpack devServer  proxy 配置代理
  //     b) cors 后台配置跨域资源共享 可以实现前台无感知请求数据
  //     c) nginx 解决跨域
  //   2. 生成环境
  //     a) 集成到后台  不存在跨域了
  //     b) 如果是前台独立部署
  //       i) 后他开启cors配置
  //       ii) 前台发送的是相对请求,改成绝对地址 axios.baseURL

  // 打包的时候用  参照后台的命名空间
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    //  http://bufanui.com:80 (80可以省略不写,所有的没有显示端口的域名都是80端口)
    // 跨域 :  协议  域名  端口 任意一个不同 就会产生跨域
    // 浏览器的同源策略导致的 在页面中 通过js语法访问其他域的数据会被限制
    // 解决跨域:
    // 1. 如果是开发阶段,可以通过配置webpack.devServer.proxy 来解决
    // 2. 如果打包部署继承到了后台,webpack失效,但是也不存在跨域了(协议,域名,端口都一致了)
    // 3. 特殊> 如果打包后,前台项目单独部署(apache/nginx等启动),跨域依然存在
    //     - a.后台配置cors忽略跨域请求的主机
    //         .  https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS
    //     - b.后台配置nginx

    proxy: {
      // 配置代理 希望拦截当前的host地址 替换为目标地址
      // key: {}   ;  key为拦截的规则,可以是正则表达式
      // '/(api|admin)': {
      '/(api|admin|lejuAdmin)': {
        target: host, // 80可以省略不写 所以代理地址和当前项目不是同一个地址!!
        changeOrigin: true, // 如果是跨域 需要添加
        pathRewrite: {
          // ['/admin']: '/abc'   /admin/xx/xx ==> /abc/xx/xx
        }
      }
      // '/abc': {
      //   target: `http://localhost:80`, // 80可以省略不写 所以代理地址和当前项目不是同一个地址!!
      //   changeOrigin: true, // 如果是跨域 需要添加
      //   pathRewrite: {
      //     // ['/admin']: '/abc'   /admin/xx/xx ==> /abc/xx/xx
      //   }
      // },

    }
    // 用mock模拟的一个登陆服务  开发时不需要的  包括整个的登陆逻辑
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
