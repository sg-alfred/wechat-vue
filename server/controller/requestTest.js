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

}
