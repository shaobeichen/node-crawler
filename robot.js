const cheerio = require('cheerio'); //抓取页面模块
const express = require('express');
const superagent = require('superagent');//用来发起请求
const superagentCharset = require('superagent-charset');//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent);
const app = express();
let async = require('async');
const fs = require("fs");

const baseUrl = 'https://www.qqtn.com/'


app.get('/', function(req, res) {
    //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //类型
    var type = req.query.type;
    //页码
    var page = req.query.page;
    type = type || 'weixin';
    page = page || '1';
    var route = `tx/${type}tx_${page}.html`
    //网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
    superagent.get(baseUrl + route)
        .charset('gb2312')
        .end(function(err, sres) {
            var items = [];
            if (err) {
                console.log('ERR: ' + err);
                res.json({ code: 400, msg: err, sets: items });
                return;
            }
            var $ = cheerio.load(sres.text);
            $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function(idx, element) {
                var $element = $(element);
                var $subElement = $element.find('img');
                var thumbImgSrc = $subElement.attr('src');
                let name = $(element).attr('title');
                let url = $element.attr('href');
                items.push({
                    title: name,
                    href: url,
                    thumbSrc: thumbImgSrc
                });
                superagent.get(thumbImgSrc).pipe(fs.createWriteStream(`down/${Math.random()*1000}.jpg`));
            });
            res.json({ code: 200, msg: "", data: items });
        });
});
var server = app.listen(3000)
