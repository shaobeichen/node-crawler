/**
 * 华为壹刻传媒锁屏壁纸爬虫接口
 */
const fs = require('fs')
const qs = require('qs')
const axios = require('axios')
const dayjs = require('dayjs')
const StreamZip = require('node-stream-zip')

/**
 * 获取登录密钥信息
 */
const loginClient = async () => {
  try {
    const url = 'https://servicesupport1.hicloud.com/servicesupport/theme/login-client.do'
    const body = {
      userId: '865330042669015',
      firmware: '9',
      locale: 'cn',
      screen: '2280*1080',
      realscreen: '2280*1080',
      density: '3.0',
      version: '9.1.0.017',
      buildNumber: 'COL-AL109.1.0.337(C00E333R1P1)',
      phoneType: 'COL-AL10',
      mcc: '460',
      mnc: '02',
      versionCode: '90100017',
      isoCode: 'CN',
      ver: '1.6',
      type: '2',
    }
    const data = await axios.post(`${url}?${qs.stringify(body)}`, {})
    // console.log(data)
    return data
    // {
    //     "secretKey": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQ7AE34AxwHx1ZL8Zz4v07VWpsYIaNhMgh0rpgPOOd5ZtlIYYV5HyBIjIJdZXIeYOGQOsn+hCaPK4l7jf9Zw5okeB44cjjA7e1g7lDsS6I8feaiJYT2CIDbZ0PicNDerHyVsswsrGco24ksEPwjVG0qJ5FTfPuf8jxknELoJaXYQIDAQAB",
    //     "checkSingatures": "a5p41qMTArkOGG3oTLmAQ7Z73ZaTJvvVi3Lbjy0BCrE+r6dU7eTH4XoJalT2FXm/3dYq2w9ARu2WZAa3j/Bnzk26ddAYLa8hgO5HByjw6LOQCmFOk6Aw/ICZWd6THCFTt5j9wWuqpBnOdenCQxk/c/TAMqNjO4ORj2jJ00UCSiA=",
    //     "sign": "063Z10064211CN@D3C2555DA0A66E340A0A80AC664924AA89D0E42C1EA6E99122C410D958D2D97E",
    //     "resultinfo": "success",
    //     "interfaceSecret": "d010069f-6f4a-4803-af2f-256b6c0a1235",
    //     "resultcode": "0",
    //     "spid": "themeClient_00001",
    //     "userId": "D3C2555DA0A66E340A0A80AC664924AA89D0E42C1EA6E99122C410D958D2D97E",
    //     "encryptSecret": "5fc5e6c32ec5d14aa96838403a006eef645a3e0268ae64c8111900198d158182"
    // }
  } catch (e) {
    console.log('ERR: ' + e)
  }
}

/**
 * 获取主题杂志
 * @param {String} sign 来自loginClient的sign
 */
const getThemeMagazine = async (sign) => {
  try {
    const url = 'https://servicesupport1.hicloud.com/servicesupport/theme/getThemeMagazine.do'
    const body = {
      sign,
      language: 'Chinese',
      themename: 'Balance(magazine)',
      author: 'Huawei Emotion UI',
      version: '2.3',
      screen: '2280*1080',
      phoneType: 'COL-AL10',
      buildNumber: 'COL-AL109.1.0.337(C00E333R1P1)',
      isoCode: 'CN',
      ver: '1.0',
      romversion: '9.1.0',
      versionCode: '420000',
    }
    const { data } = await axios.post(`${url}?${qs.stringify(body)}`, {})
    // console.log(data)
    return data
    // {
    //     channellist: [
    //       {
    //         ver: '2.3.6482',
    //         resUrl: 'null',
    //         previewurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/preIcon_20191011091542.jpg',
    //         filesize: '250521',
    //         chname: '体育',
    //         url: 'https://theme-hw-drcn.dbankcdn.cn/dl/hitopdl/magazine/2199/06/2_20201214184346_06_114588345899111.zip',
    //         enname: 'sports',
    //         fileHashCode: '2D4E857F459241303F7B16C74B45A939AD2A3DE2CD1C730F2C986266AAAEC548',
    //         alterFileHost: [Array],
    //         filecount: '1',
    //         iconurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/icon_20190604151432.png',
    //         typeid: '06',
    //         updatetime: '1607942628829',
    //         ROLLPOOLSIZE: '42',
    //         channelid: '16036',
    //         md5: 'CF792CB2EE61825557249FCC0A3FE565',
    //         desc: '展现力量与技巧瞬间，共享魅力与激情时刻。'
    //       },
    //       {
    //         ver: '2.3.6562',
    //         resUrl: 'null',
    //         previewurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/preIcon_20191011091449.jpg',
    //         filesize: '482045',
    //         chname: '生活',
    //         url: 'https://theme-hw-drcn.dbankcdn.cn/dl/hitopdl/magazine/2199/05/2_20201222181119_05_114588345899111.zip',
    //         enname: 'life',
    //         fileHashCode: '7C8C70DF7130CE6CBBFF61468EE6EF1EE0EE48630595E415CF1B391937B229C9',
    //         alterFileHost: [Array],
    //         filecount: '5',
    //         iconurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/icon_20190604151334.png',
    //         typeid: '05',
    //         updatetime: '1608631884632',
    //         ROLLPOOLSIZE: '42',
    //         channelid: '10581',
    //         md5: '934A2F8B0D9B57E33730235044795A0E',
    //         desc: '生活中的喜闻乐见，带你共享感悟生活的温馨时刻。'
    //       },
    //       {
    //         ver: '2.3.6532',
    //         resUrl: 'null',
    //         previewurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/preIcon_20191011091419.jpg',
    //         filesize: '104667',
    //         chname: '时尚',
    //         url: 'https://theme-hw-drcn.dbankcdn.cn/dl/hitopdl/magazine/2199/04/2_20201218182057_04_114588345899111.zip',
    //         enname: 'fashion',
    //         fileHashCode: '240D9C7A7A40E127AC9B4B6708CD569637E1FE8E45391002BB5C5E3506D5CC85',
    //         alterFileHost: [Array],
    //         filecount: '1',
    //         iconurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/icon_20190604144510.png',
    //         typeid: '04',
    //         updatetime: '1608286859377',
    //         ROLLPOOLSIZE: '42',
    //         channelid: '16030',
    //         md5: 'EC2425EA5D504F7397C0AA2DB2EC7219',
    //         desc: '时尚是一种态度，关注世界潮流动态，共时尚生活品味起舞。'
    //       },
    //       {
    //         ver: '2.3.6562',
    //         resUrl: 'null',
    //         previewurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/preIcon_20191011091326.jpg',
    //         filesize: '178179',
    //         chname: '明星',
    //         url: 'https://theme-hw-drcn.dbankcdn.cn/dl/hitopdl/magazine/2199/03/2_20201222162706_03_114588345899111.zip',
    //         enname: 'star',
    //         fileHashCode: '9846854E8916509D1306086D092DACCB4A3B702C3D1805F469F110893176B3C2',
    //         alterFileHost: [Array],
    //         filecount: '1',
    //         iconurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/icon_20190604144406.png',
    //         typeid: '03',
    //         updatetime: '1608625627620',
    //         ROLLPOOLSIZE: '42',
    //         channelid: '16026',
    //         md5: 'CB6E0068780431DED3124B47E4360599',
    //         desc: '聚焦帅哥美女青春偶像，共同聆听艺术家们的见闻故事。'
    //       },
    //       {
    //         ver: '2.3.6562',
    //         resUrl: 'null',
    //         previewurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/preIcon_20191011091117.jpg',
    //         filesize: '442590',
    //         chname: '汽车',
    //         url: 'https://theme-hw-drcn.dbankcdn.cn/dl/hitopdl/magazine/2199/02/2_20201222182929_02_114588345899111.zip',
    //         enname: 'car',
    //         fileHashCode: '9B902E7BA47042AC3D1F60A326151B970B00AA4E43106D1AC24C564B61BBEF60',
    //         alterFileHost: [Array],
    //         filecount: '1',
    //         iconurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/icon_20190604144239.png',
    //         typeid: '02',
    //         updatetime: '1608632971943',
    //         ROLLPOOLSIZE: '42',
    //         channelid: '16028',
    //         md5: '0668A721830F99911FF8BE98C2AE4816',
    //         desc: '带您体验车的激情，领略飞机的风采，在梦的海洋扬帆起航。'
    //       },
    //       {
    //         ver: '2.3.6562',
    //         resUrl: 'null',
    //         previewurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/preIcon_20191011091004.jpg',
    //         filesize: '773311',
    //         chname: '旅行',
    //         url: 'https://theme-hw-drcn.dbankcdn.cn/dl/hitopdl/magazine/2199/01/2_20201222162353_01_114588345899111.zip',
    //         enname: 'travel',
    //         fileHashCode: '098E7681784A1EF698286E8393ED5A436E7D560E039913B2683AD8E2FB2C3E53',
    //         alterFileHost: [Array],
    //         filecount: '2',
    //         iconurl: 'https://theme-drcn.dbankcdn.com/dl/hitopdl/magazine/2199/icon_20190604144147.png',
    //         typeid: '01',
    //         updatetime: '1608625436772',
    //         ROLLPOOLSIZE: '42',
    //         channelid: '15837',
    //         md5: '443653B6EA8394920510820A72B31F00',
    //         desc: '屏幕上的世界旅行，领略世界各地的地理风光和人文风采。'
    //       }
    //     ],
    //     delPics: [],
    //     recordCount: 6,
    //     resultinfo: 'success',
    //     description: null,
    //     resultcode: '0',
    //     magazineid: '2199'
    //   }
  } catch (e) {
    console.log('ERR: ' + e)
  }
}

/**
 * 获取支持在线信息（没什么用）
 */
const getSupportOnlineInfo = async () => {
  try {
    const url = 'https://servicesupport.hicloud.com/servicesupport/theme/getSupportOnlineInfo.do'
    const body = {
      firmware: '9',
      locale: 'Chinese',
      version: '2.3',
      buildNumber: 'COL-AL109.1.0.337(C00E333R1P1)',
      phoneType: 'COL-AL10',
      isoCode: 'CN',
      ver: '1.5',
      // 当时抓包这个参数是单独显示出来的，不过也放在query上
      versionCode: '420000',
    }
    const data = await axios.post(`${url}?${qs.stringify(body)}`, {})
    // console.log(data)
    return data
    // {
    //     "supportOnlineFont": "1",
    //     "supportOnlineRing": "1",
    //     "supportOnlineTodayRecommend": "0",
    //     "supportOnlineTheme": "1",
    //     "serverUrl": "http://servicesupport1.hicloud.com:8080/",
    //     "sslUrl": "https://servicesupport1.hicloud.com:443/",
    //     "resultinfo": "success",
    //     "whiteList": [
    //         "www.nepoui.com",
    //         "campaign-music.hicloud.com",
    //         "hihonortheme.beats-digital.com",
    //         "club.huawei.com",
    //         "weixin.wei-ben.com",
    //         "cn.club.vmall.com",
    //         "fz.quanminshouxie.com",
    //         "cdc.hispace.hicloud.com",
    //         "gxh.vip.qq.com",
    //         "www.facebook.com",
    //         "www.booking.com",
    //         "appgallery.cloud.huawei.com",
    //         "www.hihonor.com",
    //         "campaign-dre.music.hicloud.com",
    //         "campaign-dra.music.hicloud.com",
    //         "com.huawei.himovie.overseas",
    //         "www.ukh5.com",
    //         "appgallery.cloud.huawei.com",
    //         "wuhuang.ukh5.com",
    //         "hwhd.galaxyfont.com",
    //         "www.rainfn.com",
    //         "www.hanyi.com.cn",
    //         "fz.quanminshouxie.com",
    //         "huaweimobileservices.com",
    //         "huaweiucd.wjx.cn",
    //         "livesres-p01-drcn.dbankcdn.com",
    //         "themes.cloud.huawei.com",
    //         "com.huawei.appmarket",
    //         "campaign-drru.music.cloud.huawei.com",
    //         "lordsmobile.igg.com",
    //         "vip.jfyf.com",
    //         "static.jfyf.com",
    //         "www.huawei.com",
    //         "awap2.jos.hicloud.com",
    //         "gallery.consumer.huawei.com",
    //         "campaign-dre.music.hicloud.com",
    //         "https://j.youzan.com",
    //         "wx.weibenh5.com",
    //         "https://open.toutiao.com",
    //         "https://h5.bizhiquan.com",
    //         "https://consumer.huawei.com/fr/",
    //         "https://contentcenter-drcn.dbankcdn.com",
    //         "https://drcn.video.cloud.huawei.com",
    //         "https://skytone-drcn.dbankcdn.com",
    //         "https://shop44037136.m.youzan.com",
    //         "vmall://com.vmall.client",
    //         "hwmycenter://com.huawei.mycenter",
    //         "https://shop44037136.youzan.com",
    //         "https://passport.youzan.com",
    //         "https://wo.hicloud.com/",
    //         "https://huaweiucd.wjx.cn",
    //         "https://themes.cloud.huawei.com",
    //         "https://awap-dra.jos.hicloud.com/",
    //         "https://campaign-music.hicloud.com",
    //         "https://m.alipay.com",
    //         "https://render.alipay.com",
    //         "https://pro.m.jd.com",
    //         "https://v.youku.com",
    //         "https://m.youku.com/",
    //         "https://h5.visualchina.com",
    //         "https://www.earthhour.org.cn",
    //         "https://msale.vmall.com",
    //         "http://cdc.hispace.hicloud.com",
    //         "http://a.vmall.com",
    //         "https://m.vmall.com",
    //         "https://id1.cloud.huawei.com",
    //         "https://mp.weixin.qq.com/s/yjoChTQSZIcA18Rj4jBRwA",
    //         "https://consumer.huawei.com/ru/community/details/topicId_4234/",
    //         "hiapp://com.huawei.appmarket?activityName=activityUri|appdetail.activity&params={\"params\":[{\"name\":\"uri\",\"type\":\"String\",\"value\":\"app|C100160093\"}]}&channelId=1234567",
    //         "https://uowap.hicloud.com/",
    //         "https://oauth-login.cloud.huawei.com",
    //         "https://cdn.jyblife.com",
    //         "https://campaigncs-dra.himovie.hicloud.com",
    //         "https://nps-drcn.platform.hicloud.com",
    //         "https://livesres-p01-drcn.dbankcdn.com",
    //         "https://pages.tmall.com",
    //         "https://s.click.taobao.com",
    //         "https://m.tb.cn",
    //         "https://tb.ele.me",
    //         "https://s.click.ele.me",
    //         "https://h5.ele.me/",
    //         "https://id5.cloud.huawei.com/",
    //         "https://shop.huawei.com/",
    //         "https://uowap.hicloud.com",
    //         "https://cdn.jyblife.com",
    //         "https://manhua.weibo.cn",
    //         "https://lkme.cc",
    //         "https://m.damai.cn",
    //         "https://m.tb.cn/h.VKxAoPH",
    //         "https://nxyhq.pin-dao.cn",
    //         "https://m.ximalaya.com",
    //         "https://passport.ximalaya.com",
    //         "https://asale.vmall.com",
    //         "https://smartrobot-drcn.platform.hicloud.com",
    //         "https://ctrl.zookingsoft.com/",
    //         "https://static.zookingsoft.com/",
    //         "http://10.1.51.247:8080",
    //         "https://huaweiucd.wjx.cn",
    //         "https://w.wjx.top",
    //         "https://uowap.hicloud.com",
    //         "https://www.wjx.top",
    //         "https://fc.ele.me/",
    //         "https://taoquan.taobao.com/",
    //         "https://quan.suning.com/",
    //         "https://wx.amo9.com/h5/public/gene/redir.do?proj=hwsjzs",
    //         "https://tb.ele.me/",
    //         "https://runion.meituan.com",
    //         "https://i.meituan.com",
    //         "eleme://",
    //         "https://quan.suning.com/",
    //         "https://passport.suning.com/",
    //         "https://res.m.suning.com",
    //         "https://www.chengzijianzhan.com/",
    //         "https://cache.gaode.con",
    //         "https://artand.cn/",
    //         "https://hw.yidianzixun.com",
    //         "https://xw.qq.com",
    //         "https://m.ifeng.com/",
    //         "https://ztdspic.xiezixiansheng.com",
    //         "https://feeds.cloud.huawei.com",
    //         "https://wx.cgf.org.cn/",
    //         "https://lvhua.wx.dx.houpukeji.com",
    //         "https://www.wjx.cn/jq/95523858.aspx",
    //         "https://consumer.huawei.com/ru",
    //         "http://superman.cmcm.com/yinsixieyi-finaldocx.html",
    //         "huaweihealth://huaweihealth.app",
    //         "https://h5hosting-drcn.dbankcdn.cn/",
    //         "https://detail.tmall.com/",
    //         "https://10000148.shop.21move.net",
    //         "https://bkzjapi.21move.net",
    //         "https://osscdn.21move.net",
    //         "https://hgivr.21move.net",
    //         "https://ufile.oss-cn-qingdao.aliyuncs.com",
    //         "https://bjufile.oss-cn-beijing.aliyuncs.com",
    //         "https://wx.tenpay.com",
    //         "https://himail-infoflow.oss-cn-shanghai.aliyuncs.com",
    //         "https://hellowebfonts.oss-cn-beijing.aliyuncs.com",
    //         "https://cdnloc.21move.net:8443",
    //         "https://10000148.shop.21move.net",
    //         "https://ucca.tmall.com",
    //         "https://detail.m.tmall.com/",
    //         "https://appgallery.huawei.com/",
    //         "https://cache.amap.com",
    //         "https://mp.weixin.qq.com",
    //         "https://www.wjx.cn/jq/99848686.aspx",
    //         "https://www.wjx.top/jq/100445531.aspx",
    //         "https://www.wjx.top/jq/100445531.aspx",
    //         "https://upfile1.hicloud.com",
    //         "https://ucca.m.tmall.com",
    //         "https://shop291363746.m.taobao.com",
    //         "https://privacy.hihonor.com/",
    //         "https://m.douyu.com/6090282"
    //     ],
    //     "resultcode": "0",
    //     "supportOnlineWallpaper": "1",
    //     "ringUrl": "https://api-drcn.music.hicloud.com/music-apph5-service/h5/index.html#/tone?from=theme&layoutID=LM5VXra8ASwl9Rjts"
    // }
  } catch (e) {
    console.log('ERR: ' + e)
  }
}

/**
 * 获取主题杂志Zip包
 * @param {String} url 地址
 */
const getZip = async (url) => {
  try {
    const { data } = await axios(url, {
      url,
      method: 'GET',
      responseType: 'stream',
    })
    return data
  } catch (e) {
    console.log('ERR: ' + e)
  }
}

// 保存zip文件
const saveZip = (zipData, zipPath, wallpaperPath) => {
  return new Promise(async (resolve, reject) => {
    const writer = await fs.createWriteStream(zipPath)
    zipData.pipe(writer)
    writer.on('close', () => {
      // 解压zip保存文件
      const zip = new StreamZip({
        file: zipPath,
        storeEntries: true,
      })
      zip.on('ready', async () => {
        zip.extract(null, wallpaperPath, (err, count) => {
          zip.close()
          resolve()
        })
      })
    })
  })
}

/**
 * 主程序
 */
const main = async () => {
  console.log('==================执行开始==================')

  const { sign } = await loginClient()
  const res = await getThemeMagazine(sign)
  if (res) {
    const { channellist } = res

    // 下载zip
    const zipData = await getZip(channellist[0].url)

    // 创建当日文件夹
    const dirName = dayjs().format('YYYY-MM-DD')
    const path = await fs.readdirSync('./')
    if (!path.includes('archive')) await fs.mkdirSync('./archive')
    const archivePath = await fs.readdirSync('./archive')
    if (!archivePath.includes(dirName)) await fs.mkdirSync(`./archive/${dirName}`)
    const dirPath = await fs.readdirSync(`./archive/${dirName}`)
    const wallpaperPath = `./archive/${dirName}/wallpaper`
    if (!dirPath.includes('wallpaper')) await fs.mkdirSync(wallpaperPath)

    const zipPath = `./archive/${dirName}/wallpaper.zip`
    await saveZip(zipData, zipPath, wallpaperPath)

    const wallpaperFiles = fs.readdirSync(wallpaperPath)
    const suffix = ['jpg', 'png', 'jpeg']
    const wallpaperFilesFilter = wallpaperFiles.filter((v) => {
      const [itemName, itemSuffix] = v.split('.')
      return !v.includes('icon') && suffix.includes(itemSuffix)
    })

    const base = 'https://cdn.jsdelivr.net/gh/LeachZhou/node-crawler@master/yikechuanmei/archive'
    const wallpaperUrlBase = `${base}/${dirName}/wallpaper/`
    const wallpaperUrl = wallpaperFilesFilter.map((v) => wallpaperUrlBase + v)

    // 生成单个json
    const filename = `./archive/${dirName}/${dirName}.json`
    await fs.writeFileSync(filename, JSON.stringify({ wallpaper: wallpaperUrl }))
    console.log(`==================已保存${dirName}==================`)

    // 归总json
    if (!path.includes('total.json'))
      await fs.writeFileSync(
        './total.json',
        JSON.stringify({
          wallpaper: [],
        }),
      )
    const data = await fs.readFileSync('./total.json', 'utf-8')
    const parseData = JSON.parse(data)
    const [first] = parseData.wallpaper
    if (!first || (first && first.date !== dirName)) {
      parseData.wallpaper.unshift({
        url: wallpaperUrl,
        date: dirName,
      })
      await fs.writeFileSync('./total.json', JSON.stringify(parseData))
      console.log('==================归总完成==================')
    }
  }
  console.log('==================执行完毕==================')
}

main()
