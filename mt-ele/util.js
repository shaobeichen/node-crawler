const sqlUtil = require("./sql");
const async = require('async');//并发
const userAgents = require("./userAgent");
const userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
const superagent = require('superagent');//用来发起请求
require('superagent-charset')(superagent);//防止爬取下来的数据乱码，更改字符格式
const cheerio = require('cheerio'); //抓取页面模块


class Ut {
    /**
     * 异步延迟
     * @param {number} time 延迟的时间,单位毫秒
     */
    static sleep(time = 0) {
        var StartTime = new Date().getTime();
        let i = 0;
        while (new Date().getTime() < StartTime + time * 1000) ;
    };

    static proxySlide(proxyAddSql) {
        let urlArr = [];
        let proxyOriginUrl = 'https://www.kuaidaili.com/free/inha/';
        for (let i = 1; i < 3; i++) {
            urlArr.push(`${proxyOriginUrl}${i}`);
        }
        let count = 0;//并发数
        console.log(`现在的代理抓取并发数是${count}`);
        let addSqlUtil = new sqlUtil();
        async.mapLimit(urlArr, 1, (url) => {
            console.log(`查看代理 ${url}`)
            count++;
            superagent
                .get(url)
                .set({
                    'user-Agent': userAgent
                })
                .end((err, res) => {
                    if (err) {
                        // return console.error(err);
                    }
                    let $ = cheerio.load(res.text);
                    $('#list tbody tr').each(async (idx, element) => {
                        let url = `${$(element).find('td').eq(0).text()}:${$(element).find('td').eq(1).text()}`;
                        let addSqlParams = [url];
                        let insertProxyCallback = await addSqlUtil.query(proxyAddSql, addSqlParams);
                        count--;
                        return insertProxyCallback;
                    })
                });
        }, (err, result) => {
            console.log(`查看代理成功`);
        });

    }
}

module.exports = Ut;
