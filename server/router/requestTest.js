/**
 * Created by chenjz on 2017/7/29.
 */

module.exports = function (app) {
    app.post('/newworld', function(req, res) {
        console.log('response will be sent by the next function ...');
    })

    app.get('/test/:id', function(req, res) {		// 获取 get 参数
        console.log(req.params);
        res.send('user ' + req.params.id);
    });

    app.get('/ttest/:id/:name', function(req, res) {
        res.send('id为' + req.params.id + ', name为' + req.params.name);
        res.end();
    });

    app.get('/user/isLogin', function(req, res) {
        console.log('index登录否？: ', req.session.username);
        let resultText = req.session.username ? '已登录' : '未登录';
        res.send(resultText)
        res.end()
    })
}
