const puppeteer = require('puppeteer')

async function init() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const a = await page.goto('https://meishi.meituan.com/i/?ci=102&stid_b=1')
  console.log(a)
  const result = await page.$$('.poi-item-wrapper')
  console.log(result)

  await browser.close()
}

init()
