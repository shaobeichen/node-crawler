const eventproxy = require('eventproxy');
const cheerio = require('cheerio');
const express = require('express');
const superagent = require('superagent');
const app = express();
var async = require('async');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
const url = require('url');

let cnodeUrl = 'https://cnodejs.org/';

// 用 superagent 去抓取 https://cnodejs.org/ 的内容
superagent.get(cnodeUrl).end(function (err, res) {
    if (err) {
        return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
        // 我们用 url.resolve 来自动推断出完整 url，变成
        // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
        // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
    });

    console.log(topicUrls);
});

