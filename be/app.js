/**
 * Created by chenjz on 2017/10/19.
 */
import logger from 'morgan';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

// 数据库
import db from './dbHandle';

// 路由服务
import router from './routes';

// 原生http 服务
import httpServer from 'http';
import socketio from 'socket.io';

// 获取 socket 上下文
import socketCtx from './socket';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// default port where dev server listens for incoming traffic
let port = process.env.PORT || 8081;

let app = express(); // Express服务

// cors
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,PATCH,OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// 需要使用body-parser模块,要不然post方法获取不到传递的参数
// 设置接收参数的大小,主要针对于base64的图片
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置 session
app.use(
  session({
    name: 'sgAlfred',
    secret: 'wechat',
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());

app.use(logger('dev'));

// 注册路由服务
router(app);

// webSocket 服务
const server = httpServer.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
  socketCtx.initSocket(socket);
});

let readyPromise = new Promise((resolve) => {});

console.log('> Starting dev server...');

server.listen(port, () => {
  console.log('Express server listening on port ' + port);
});

export default {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
