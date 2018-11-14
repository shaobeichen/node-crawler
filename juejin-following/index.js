const express = require('express');
const app = express();
const superagent = require('superagent');//用来发起请求
const superagentCharset = require('superagent-charset');//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent);
const async = require('async');//并发
/**
 * json转URL参数
 * @param json json
 * @returns {string} url参数
 */
const params = (json) => {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }).join("&");
}
//关注接口url及参数
let followUrl = 'https://follow-api-ms.juejin.im/v1/follow';  //关注接口
let followData = {
    follower: "582d0cae2f301e005949fcef", //请求用户id（我）
    followee: "a15cc70ce463005644171a", //申请关注人id
    token: "eyJhY2Nlc3NfdG9rZW4iOiI4dTZNZFlZSlR0ODh6SFhmIiwicmVmcmVzaF90b2tlbiI6Ik14REVWNlVWc1NkNGp5d3ciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D", //token
    device_id: "1541584638855", //设备号
    src: "web", //终端
}

//关注人列表url及参数
let userListUrl = 'https://follow-api-ms.juejin.im/v1/getUserFolloweeList'; //关注人列表接口
let userListData = {
    uid: "58a15cc70ce463005644171a",
    currentUid: '582d0cae2f301e005949fcef',
    src: 'web',
    before: ''
}

app.get('/', function (req, res) {
    //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json');

    let reqUrl = `${userListUrl}?${params(userListData)}`;
    //网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
    superagent.get(reqUrl)
        .charset('utf-8')
        .end(function (err, ret) {
            // console.log(JSON.parse(ret.text).d)
            let items = [...JSON.parse(ret.text).d];
            if (err) {
                console.log('ERR: ' + err);
                res.json({code: 400, msg: err});
                return;
            }
            res.json({code: 200, msg: "", data: items});
        });
});
var server = app.listen(3000)
