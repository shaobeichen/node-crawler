const cheerio = require('cheerio') //抓取页面模块 
const superagent = require('superagent')//用来发起请求
const superagentCharset = require('superagent-charset')//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent)
const async = require('async')
const fs = require("fs")

const baseUrl = 'https://www.xinli001.com/info?page=1'
console.log("执行开始")

const main = async () => {
    try {
        const data = await ajax(baseUrl)
        console.log(data)
        console.log("执行完毕")
        // let items = []
        // let $ = cheerio.load(data.text)
        // $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function (idx, element) {
        //     let $element = $(element)
        //     let $subElement = $element.find('img')
        //     let thumbImgSrc = $subElement.attr('src')
        //     let name = $(element).attr('title')
        //     let url = $element.attr('href')
        //     items.push({
        //         title: name,
        //         href: url,
        //         thumbSrc: thumbImgSrc
        //     })
        //     superagent.get(thumbImgSrc).pipe(fs.createWriteStream(`down/${Math.random() * 1000}.jpg`))
        // })
        // res.json({ code: 200, msg: "", data: items })
    } catch (e) {
        console.log('ERR: ' + e)
    }
}


const ajax = function (url, charset = "utf-8") {
    return new Promise((resolve, reject) => {
        //网页页面信息是gb2312，所以charset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
        superagent
            .get(url)
            .charset(charset)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

main()
// https://www.jianshu.com/p/fa9ad46d58a3