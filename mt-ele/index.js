
const { ajax, sleep, json2params, params2json } = require("./util")
const async = require("async")//并发
const $ = require("cheerio")//抓取页面模块
const sqlUtil = require("./sql")
const userAgents = require("./userAgent")

let addSqlUtil = new sqlUtil()
let addSql = "INSERT INTO list(itemId,title,imgUrl,score,areaName,avgPrice) VALUES(?,?,?,?,?,?)"
let updateSql = "UPDATE list SET address = ?,phone = ?,time = ? WHERE itemId = ?"

// 分页
let page = 1
// 列表url
let url = `https://lyg.meituan.com/meishi/rating/pn${page}/`
// header信息 
const headers = {
    "Host": "lyg.meituan.com",
    "User-Agent": userAgents[parseInt(Math.random() * userAgents.length)]
}

const listRequest = async () => {
    const { text } = await ajax(url, "GET", "", headers)
    if (text.includes("验证中心")) {
        console.log(text)
        return
    }

    const jsonArr = text.match(/<script.*?>([\s\S]+?)<\/script>/g)
    for (let i = 0; i < jsonArr.length; i++) {
        if (jsonArr[i].includes("prefer")) {
            const jsonArrReplace = jsonArr[i].replace(/\<script\>|\<\/script\>/g, "").split("window._appState = ")[1]
            const { prefer } = JSON.parse(jsonArrReplace.substring(0, jsonArrReplace.length - 1))
            for (let j = 0; j < prefer.length; j++) {
                const { itemId, title, imgUrl, score, areaName, avgPrice } = prefer[j]
                await addSqlUtil.query(addSql, [itemId, title, imgUrl, score, areaName, avgPrice])
            }
            break
        }
    }

    console.log(`==========================列表第${page}页请求完毕==========================`)
    page += 1
    url = `${url.split("pn")[0]}pn${page}/`
    await sleep(1000)
    // listRequest()
}

const storeRequest = async (poiId) => {
    if (!poiId) return
    // 店铺路径
    let storeUrl = `https://www.meituan.com/meishi/${poiId}/`
    const { text } = await ajax(storeUrl, "GET", "", headers)
    if (text.includes("验证中心")) {
        console.log(text)
        return
    }

    const jsonArr = text.match(/<script.*?>([\s\S]+?)<\/script>/g)
    for (let i = 0; i < jsonArr.length; i++) {
        if (jsonArr[i].includes("detailInfo")) {
            const jsonArrReplace = jsonArr[i].replace(/\<script\>|\<\/script\>/g, "").split("window._appState = ")[1]
            const { detailInfo } = JSON.parse(jsonArrReplace.substring(0, jsonArrReplace.length - 1))
            const { address, phone, time, poiId } = detailInfo
            await addSqlUtil.query(updateSql, [address, phone, time, poiId])
            break
        }
    }
    console.log(`==========================商店${poiId}请求完毕==========================`)
}

storeRequest(170659361)
// listRequest()