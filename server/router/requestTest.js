/**
 * Created by chenjz on 2017/7/29.
 */

const appResponse = require('./resHandle')

module.exports = function (app) {
    app.post('/newworld', (req, res) => {
        console.log('response will be sent by the next function ...');
    })

    app.get('/test/:id', (req, res) => {		// 获取 get 参数
        console.log(req.params);
        res.send('user ' + req.params.id);
    });

    app.get('/ttest/:id/:name', (req, res) => {
        res.send('id为' + req.params.id + ', name为' + req.params.name);
        res.end();
    });

    app.get('/user/isLogin', (req, res) => {
        console.log('index登录否？: ', req.session.username);
        let resultText = req.session.username ? '已登录' : '未登录';
        res.send(resultText)
        res.end()
    })

    app.get('/user/logout', (req, res) => {
        req.session.username = ''
    })

    // 用户登录
    app.post('/user/login', (req, res) => {

        // console.log('登录信息：' , req)

        let result = {};
        // 可能是 微信号，可能是 手机号等等。
        // if (req.body.username) {
            result = {
                code: 0,
                userinfo: {
                    id: 'chenjz',
                    nickname: '钻',
                }
            }
            req.session.username = 'chenjz';
        // } else {
        //     result = {
        //         code: 2,
        //         message: '登录失败'
        //     }
        // }

        // 处理成为 json 格式的返回。。
        appResponse(res, JSON.stringify(result))
    })
}
