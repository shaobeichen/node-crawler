const express = require('express');
const app = express();
const superagent = require('superagent');//用来发起请求
const superagentCharset = require('superagent-charset');//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent);
const async = require('async');//并发
require("opener")('http://127.0.0.1:3000'); //自动打开浏览器
const sleep = require('sleep');
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
    followee: "", //申请关注人id
    token: "", //token
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
let followFuncCurrencyCount = 0;//关注并发数
let followFunc = (reqUrl, callback) => {
    let url = reqUrl;
    followFuncCurrencyCount++;
    console.log(`现在的关注并发数是${followFuncCurrencyCount}`);
    return new Promise((resolve, reject) => {
        superagent.get(url).buffer(true)
            .end((err, ret) => {
                followFuncCurrencyCount--;
                // console.log(followFuncCurrencyCount);
                let items = [...JSON.parse(ret.text).d];
                resolve({code: 200, msg: "", data: items});
                reject({code: 400, msg: "", data: err});
                callback(ret.text);
            });
    });
}
let followeeFuncCurrencyCount = 0;//关注列表并发数
let followeeFunc = (reqUrl, callback) => {
    let url = reqUrl;
    followeeFuncCurrencyCount++;
    console.log(`现在的列表并发数是${followeeFuncCurrencyCount}`);
    return new Promise((resolve, reject) => {
        superagent.get(url).buffer(true)
            .end((err, ret) => {
                followeeFuncCurrencyCount--;
                // console.log(JSON.parse(ret.text).d)
                console.log(`获取到关注人列表`);
                let items = [...JSON.parse(ret.text).d];
                resolve({code: 200, msg: "", data: items});
                reject({code: 400, msg: "", data: err});
                callback(ret.text);
            });
    });
}

app.get('/', function (req, res) {
    //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json');
    res.header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36');

    let flagUrl = `${userListUrl}?${params(userListData)}`;
    let followeeFuncUrlArr = [];
    followeeFuncUrlArr.push(flagUrl);
    let wh = () => {
        async.mapLimit(followeeFuncUrlArr, 1, (url, callback) => {
            (async () => {
                let data = await followeeFunc(url, callback);
                let datadata = data.data;
                if (!datadata.length) {
                    console.log(`结束了，快看看结果吧`);
                    throw 'exit';
                }
                let followFuncUrlArr = [];
                let num = 1;
                for (let item of datadata) {
                    userListData.before = item.updatedAtString;
                    followData.followee = item.followee.objectId;
                    followFuncUrlArr.push(`${followUrl}?${params(followData)}`);
                }
                async.mapLimit(followFuncUrlArr, 2, function (url, callback) {
                    console.log(`第${num}次开始关注`)
                    followFunc(url, callback);
                    num++;
                    sleep(2);
                }, function (err, result) {
                    console.log('final:');
                    console.log(result);
                });

                // flagUrl = `${userListUrl}?${params(userListData)}`;
                followeeFuncUrlArr.push(`${userListUrl}?${params(userListData)}`);
                sleep(2);
                await wh();
            })()
        }, function (err, result) {
            console.log('final:');
            console.log(result);
        });
    };

    wh();

});
var server = app.listen(3000);