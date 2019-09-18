var express = require('express');
var moment = require('moment');
var audio = require('../tools/playAudio');
// var bodyParser = require('body-parser');
var app = express();
app.use(express.json());
var _webContents = null;
/**
 * @api {post} /data 红外线推送
 * @apiName create
 * @apiDescription 红外线推送
 * @apiGroup infraredFlux
 *
 * @apiSuccess {json} result
 * @apiSuccessExample {json}
 *  +D0\r\n 正常
 *  +D1\r\n 数据接收异常
 * @apiSampleRequest http://localhost:3000/data
 * @apiVersion 1.0.0
 */
app.post('/data', function (req, res, next) {
    req.body = req.body || {};
    // ignore GET
    if ('GET' == req.method || 'HEAD' == req.method) return next();
    // parse
    if (req.body == {}) {
        // res.send('+D1\r\n');
        res.json({
            "Status": 0,
            "Error": "",
            "Result": "+D1"
        })
    } else {

        var fluxs = [];
        req.body.Data.forEach(c => {
            console.log(c)
            //时间格式转换
            // var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
            // var formatedDate = ("20" + c.T + "00").replace(pattern, '$1-$2-$3 $4:$5:$6');
            if (c.I > 0) {
                // 进
                audio.textToAudio("欢迎光临").then(result => {
                    // console.log(result)
                    audio.play(_webContents,result);

                })
            }else if (c.O > 0) {
                // 出
                audio.textToAudio("谢谢惠顾").then(result => {
                    // console.log(result)
                    audio.play(_webContents,result);

                })
            }
        });
        res.json({
            "Status": 0,
            "Error": "",
            "Result": "+D0"
        })
    }
});
/**
 * @api {post} /sta 红外线状态
 * @apiName create
 * @apiDescription 红外线状态 1小时推送一次
 * @apiGroup infraredFlux
 *
 * @apiSuccess {json} result
 * @apiSuccessExample {json}
 *  +D0\r\n 正常
 *  +D1\r\n 数据接收异常
 * @apiSampleRequest http://localhost:3000/sta
 * @apiVersion 1.0.0
 */
app.post('/sta', function (req, res, next) {
    res.json({
        "Status": 0,
        "Error": "",
        "Result": "+S0"
    })
});

/**
 * @api {post} /syn 红外线同步
 * @apiName create
 * @apiDescription 摄像头推送
 * @apiGroup infraredFlux
 *
 * @apiSuccess {json} result
 * @apiSuccessExample
 *  +D0\r\n 正常
 *  +D1\r\n 数据接收异常
 * @apiSampleRequest http://localhost:3000/syn
 * @apiVersion 1.0.0
 */
app.post('/syn', function (req, res, next) {

    var r = '+T' + moment().format('YYYYMMDDHHmmss')
    // res.set("Content-Type", 'text/plain');
    // res.send(r);
    res.json({
        "Status": 0,
        "Error": "",
        "Result": r
    })
});

/**
 * @api {post} /err 红外线错误
 * @apiName create
 * @apiDescription 红外线错误
 * @apiGroup infraredFlux
 *
 * @apiSuccess {json} result
 * @apiSuccessExample
 *  +D0\r\n 正常
 *  +D1\r\n 数据接收异常
 * @apiSampleRequest http://localhost:3000/err
 * @apiVersion 1.0.0
 */
app.post('/err', function (req, res, next) {

    if (req.body.TimeOut[0].RX1 == 1) {
       console.log("无法接收到 RX1 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[1].RX2 == 1) {
       console.log("无法接收到 RX2 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[2].RX3 == 1) {
       console.log("无法接收到 RX3 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[3].RX4 == 1) {
       console.log("无法接收到 RX4 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[4].RX5 == 1) {
       console.log("无法接收到 RX5 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[5].RX6 == 1) {
       console.log("无法接收到 RX6 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[6].RX7 == 1) {
       console.log("无法接收到 RX7 的无线信号，请及时处理！ ")
    }
    if (req.body.TimeOut[7].RX8 == 1) {
       console.log("无法接收到 RX8 的无线信号，请及时处理！ ")
    }
    if (req.body.FlashFull == 1) {
       console.log("离线储存溢出故障，请出厂初始化数据接收器！  ")
    }
    if (req.body.CrcErr == 1) {
       console.log("离线数据读取错误，请出厂初始化数据接收器！  ")
    }

    // res.send('+E0\r\n');
    // res.send('+E1\r\n');
    res.json({
        "Status": 0,
        "Error": "",
        "Result": "+E0"
    })

});

/**
 * @api {post} /cfg 红外线配置
 * @apiName create
 * @apiDescription 红外线配置
 * @apiGroup infraredFlux
 *
 * @apiSuccess {json} result
 * @apiSuccessExample
 *  +D0\r\n 正常
 *  +D1\r\n 数据接收异常
 * @apiSampleRequest http://localhost:3000/cfg
 * @apiVersion 1.0.0
 */
app.post('/cfg', function (req, res, next) {

    // res.send('+C0\r\n');
    // res.send('+C1\r\n');
    res.json({
        "Status": 0,
        "Error": "",
        "Result": "+C0"
    })
});

module.exports = {
    listen: (webContents, port) => {
        _webContents = webContents;
        var server = app.listen(port, function () {
            var host = server.address().address
            var port = server.address().port
            console.log("httpServer一已启动 http://%s:%s", host, port)
        })
    }

}
//createServer函数会返回 一个对象，这个对象有一个叫做 listen 的方法，
// 这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。
