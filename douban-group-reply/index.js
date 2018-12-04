const express = require('express');
const app = express();
const cheerio = require('cheerio');//抓取页面模块
const superagent = require('superagent');//请求库
const superagentCharset = require('superagent-charset');//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent);
require("opener")('http://127.0.0.1:3000'); //自动打开浏览器

let initUrl = 'https://www.douban.com/group/topic/121301073/';
let commentUrl = 'https://www.douban.com/group/topic/121301073/add_comment#last';
let cookie = 'dbcl2="169543392:UOnFQifyrQA"; ck=I1tm; __utmc=30149280; ap_v=0,6.0; __utmz=30149280.1543907908.65.60.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1543910190%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DsGyHw2vs6GM0n_ZazfYMdHnDZ-8QkZaugcj6LSSjJ-rxVkgXf5MEYf21XStLyDBIXm1GZAe54YW3kkS-VkVAN_%26wd%3D%26eqid%3Deb8543cd00045531000000065c062a3b%22%5D; _pk_ses.100001.8cb4=*; __utma=30149280.411793276.1523871459.1543907908.1543910191.66; __utmt=1; _pk_id.100001.8cb4=140c72bc194b8d46.1523871458.57.1543914647.1543907908.; __utmb=30149280.194.6.1543914647532';
let contentType = 'multipart/form-data; boundary=----WebKitFormBoundaryNRIBZbCaE6kcMJU9';
let userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36';

let data = {
    'ck': 'I1tm',
    'rv_comment': '顶一下呀',
    'start': '0',
    'submit_btn': '发送',
    'Content-Length': cookie.length
}

let header = {
    'Referer': initUrl,
    'Cookie': cookie,
    'Content-Type': contentType,
    'User-Agent': userAgent,
    'Upgrade-Insecure-Requests': '1'
}

app.get('/', function (req, res) {
    //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundaryNRIBZbCaE6kcMJU9');
    res.header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36');
    res.header('Referer', initUrl);
    res.header('Cookie', cookie);

    // 用 superagent 去抓取内容
    superagent
        .post(commentUrl)
        .send(data)
        .set(header)
        .end(function (err, res) {
            console.log(res)
            if (err) {
                return console.error(err);
            }
            console.log(res.text);
            return false;
        });

});
// app.listen(3000);


// captcha_image 验证码图片id
// captcha_field 验证码输入框id
// last          输入框id   name="rv_comment"
// submit_btn    发送按钮name