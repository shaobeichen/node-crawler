/**
 * 参考文章：
 * 《nodejs实现,每天定时自动读取数据库数据-生成excel表格-发送给老板邮箱》
 * https://blog.csdn.net/zzwwjjdj1/article/details/52129192
 */
const express = require('express');
const app = express();
const cheerio = require('cheerio');//抓取页面模块
const superagent = require('superagent');//请求库
const superagentCharset = require('superagent-charset');//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent);

let initUrl = 'http://www.66ip.cn/mo.php?sxb=&tqsl=100';
let userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36';

app.get('/', function (req, res) {
    //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('User-Agent', userAgent);

    superagent
        .get(initUrl)
        .end(function (err, res) {
            if (err) {
                console.log(err);
            }
            let $ = cheerio.load(res.text);
            console.log($('body').text())
        });

});
app.listen(3000);
