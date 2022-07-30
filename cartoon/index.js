const fs = require('fs')
const puppeteer = require('puppeteer')

const IMAGE_FOLDER = './image'
const total = 137

const pageUrl = (num = 1) => {
  return `https://www.3004ss.com/40995/page-${num}.html`
}

const scrollToBottom = async (page) => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.clientHeight)
    console.log('滚动完成')
  })
}

const createImageFolder = () => {
  if (!fs.existsSync(IMAGE_FOLDER)) fs.mkdirSync(IMAGE_FOLDER)
}

const createPageFolder = (name) => {
  if (!fs.existsSync(name)) fs.mkdirSync(name)
}

const downloadImage = async (page, url, currentPage) => {
  return new Promise(async (resolve, reject) => {
    try {
      await page.goto(url)
      await page.waitForSelector('body')

      await scrollToBottom(page)

      const inputElement = await page.$$('.alignnone')

      console.log(`第${currentPage}页 开始抓取`)

      const pageFolderPrefix = `${IMAGE_FOLDER}/${currentPage}`
      createImageFolder()
      createPageFolder(pageFolderPrefix)

      for (let i = 0; i < inputElement.length; i++) {
        await inputElement[i].screenshot({
          path: `${pageFolderPrefix}/${i + 1}.png`,
          omitBackground: false,
        })
        console.log(`${i}.png 已抓取`)
      }

      console.log(`第${currentPage}页 抓取完成`)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)

  for (let i = 1; i <= total; i++) {
    if (i > total) break
    await downloadImage(page, pageUrl(i), i)
  }

  await browser.close()
}

main()
