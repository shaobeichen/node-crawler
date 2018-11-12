const eventproxy = require('eventproxy');
const cheerio = require('cheerio');
const express = require('express');
const superagent = require('superagent');
const app = express();
let async = require('async');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
const url = require('url');

let cnodeUrl = 'https://cnodejs.org/';

// 用 superagent 去抓取 https://cnodejs.org/ 的内容
superagent.get(cnodeUrl).end(function (err, res) {
    if (err) {
        return console.error(err);
    }
    let topicUrls = [];
    let $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
        let $element = $(element);
        // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
        // 我们用 url.resolve 来自动推断出完整 url，变成
        // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
        // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
        let href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
    });

    console.log(topicUrls);
});


let concurrencyCount = 0;
let fetchUrl = function (url, callback) {
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
};

let urls = [];
for(let i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log('final:');
    console.log(result);
});
