require('./check-versions')()

let config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
let autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable

global.dbHandel = require('../server/dbService/dbHandle');

let app = express()   // Express服务
// 需要使用body-parser模块,要不然post方法获取不到传递的参数
const bodyParser = require('body-parser')
// 设置接收参数的大小,主要针对于base64的图片
app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// vue路由使用 history 模式，需要配置 express，暂放！
// var history = require('connect-history-api-fallback');
// app.use(history());

// 设置 session
let session = require('express-session')
app.use(session({
    secret: 'wechat',
    cookie:{
        maxAge: 1000 * 60 * 30
    }
}));

let compiler = webpack(webpackConfig)

let appServer = require('../server')

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
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

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 路由服务
appServer(app)

// 获取 socket 上下文
const socketio = require('../server/socket')

// 原生http 服务
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    socketio.ctx.initSocket(socket)
})


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

server.listen(port, () => {
    console.log("Express server listening on port " + port);
})

module.exports = {
  ready: readyPromise,
  close: () => {
      server.close()
  }
}
