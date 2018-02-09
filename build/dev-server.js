/**
 * Created by chenjz on 2017/10/19.
 */
import checkVersion from './check-versions'
import config from '../config'
import opn from 'opn'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './webpack.dev.conf'
import devMiddlewareM from 'webpack-dev-middleware'
import hotMiddlewareM from 'webpack-hot-middleware'
import proxyMiddleware from 'http-proxy-middleware'

checkVersion()

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false
let autoOpenBrowser = !!config.dev.autoOpenBrowser

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable

let app = express()   // Express服务

let compiler = webpack(webpackConfig)

const devMiddleware = devMiddlewareM(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = hotMiddlewareM(compiler, {
  log: () => {
  }
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

app.use(logger('dev'));

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 如何设置 favicon ？？
app.use(favicon(path.join(__dirname, '../static/favicon.ico')))
app.use(staticPath, express.static('./static'))

let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    // opn(uri)     // 暂时关掉自动 打开浏览器
  }
  _resolve()
})

app.listen(port, () => {
  console.log("Express server listening on port " + port);
})

export default {
  ready: readyPromise,
  close: () => {
    app.close()
  }
}
