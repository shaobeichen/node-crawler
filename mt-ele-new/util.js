const superagent = require('superagent')//用来发起请求
const superagentCharset = require('superagent-charset')//防止爬取下来的数据乱码，更改字符格式
superagentCharset(superagent)
// const superagentProxy = require('superagent-proxy') //代理IP

const ajax = (url, method = "GET", params, header = {}, charset = "utf-8") => {
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

/**
 * json转URL参数
 * @param json json
 * @returns {string} url参数
 */
const json2params = (json) => {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
    }).join("&")
}

const params2json = (url) => {
    let arr = []; //存储参数的数组
    let res = {}; //存储最终JSON结果对象
    arr = url.split("?")[1].split("&"); //arr=["a=1", "b=2", "c=test", "d"]

    for (let i = 0, len = arr.length; i < len; i++) {
        //如果有等号，则执行赋值操作
        if (arr[i].indexOf("=") != -1) {
            let str = arr[i].split("=");
            //str=[a,1];
            res[str[0]] = str[1];
        } else {//没有等号，则赋予空值
            res[arr[i]] = "";
        }
    }
    res = JSON.stringify(res);//转化为JSON字符串
    return res; //{"a": "1", "b": "2", "c": "test", "d": ""}
}


module.exports = {
    ajax,
    sleep,
    json2params,
    params2json
}