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
import proxyMiddleware from 'http-proxy-middleware'
import webpackConfig from './webpack.dev.conf'
import devMiddlewareM from 'webpack-dev-middleware'
import hotMiddlewareM from 'webpack-hot-middleware'
import bodyParser from 'body-parser'

// 数据库
import db from '../server/dbHandle';

// 路由服务
import router from '../server/routes'

// 原生http 服务
import httpServer from 'http'
import socketio from 'socket.io'

// 获取 socket 上下文
import socketCtx from '../server/socket'

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
// 需要使用body-parser模块,要不然post方法获取不到传递的参数

// 设置接收参数的大小,主要针对于base64的图片
app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// vue路由使用 history 模式，需要配置 express，暂放！
// var history import 'connect-history-api-fallback');
// app.use(history());

// 设置 session
import session from 'express-session'
app.use(session({
    secret: 'wechat',
    cookie:{
        maxAge: 1000 * 60 * 30
    }
}));

let compiler = webpack(webpackConfig)

const devMiddleware = devMiddlewareM(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

const hotMiddleware = hotMiddlewareM(compiler, {
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

app.use(logger('dev'));

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 如何设置 favicon ？？
// app.use(favicon(path.join(__dirname, '../static/favicon.ico')))
app.use(staticPath, express.static('./static'))

// 路由服务
router(app)

// webSocket 服务
const server = httpServer.createServer(app)

const io = socketio(server)

io.on('connection', (socket) => {
    socketCtx.ctx.initSocket(socket)
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

export default {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
