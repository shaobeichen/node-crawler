const express = require('express');
const app = express();
const cheerio = require('cheerio');//抓取页面模块
const superagent = require('superagent');//请求库
const superagentCharset = require('superagent-charset');//防止爬取下来的数据乱码，更改字符格式
const Entities = require('html-entities').XmlEntities;
let entities = new Entities();
superagentCharset(superagent);
require("opener")('http://127.0.0.1:3000'); //自动打开浏览器

let initUrl = 'https://github.com/LeachZhou/blog/projects/2/columns/3414755/cards';
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
                return console.error(err);
            }
            let $ = cheerio.load(res.text);
            $('.issue-card').find('.js-comment-body').each(function (idx, element) {
                console.log(entities.decode($(element).text()))
            })
        });

});
app.listen(3000);
