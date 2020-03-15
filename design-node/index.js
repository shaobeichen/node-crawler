const FormData = require('form-data')
const cheerio = require('cheerio') //抓取页面模块 
const superagent = require('superagent')//用来发起请求
const superagentCharset = require('superagent-charset')//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent)
const async = require('async')
const request = require('request')
const fs = require("fs")

let page = 1
let baseUrl = "https://www.shouhuizhaopian.com/app/index.php?i=1&uniacid=1&t=undefined&v=1.3&m=ewei_shopv2&from=wxapp&c=entry&a=wxapp&do=main&sign=f3733b8c949273ea89bb23ae90e4258d&pn=comment&op=list&id=2&page="

const main = async () => {
    const { text } = await ajax(`${baseUrl}${page}`, "GET")
    const list = JSON.parse(text).data.list
    console.log(`==========================执行第${page}页完毕==========================`)
    for (let i = 1; i < list.length; i++) {
        let imgUrl = list[i].images.length ? list[i].images[0] : ""
        let filename = `${page}-${i}.png`
        await sleep(500)
        if (imgUrl) {
            await request(imgUrl).pipe(fs.createWriteStream("./image/" + filename))
            console.log(`保存了${page}-${i}.png`)
        }
    }
    page += 1
    main()
}


const ajax = function (url, method = "GET", params, header = {}, charset = "utf-8") {
    return new Promise((resolve, reject) => {
        //网页页面信息是gb2312，所以charset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
        let prefix
        switch (method) {
            case "GET":
                prefix = superagent(method, url).query(params)
                break
            case "POST":
                prefix = superagent(method, url).send(params)
                break
            default:
                prefix = superagent(method, url).query(params)
                break
        }
        prefix
            .set(header)
            .charset(charset)
            .buffer(true)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

main()
// https://www.jianshu.com/p/fa9ad46d58a3