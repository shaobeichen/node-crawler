import fs from 'fs'
import chalk from 'chalk'
import puppeteer from 'puppeteer'
import ProgressBar from './progress.js'

const IMAGE_FOLDER = './image'

const pageUrl = (num = 1) => {
  return `https://www.3004ss.com/40995/page-${num}.html`
}

const scrollToBottom = async (page) => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.clientHeight)
  })
  console.log(chalk.green('> 滚动至底部：完成'))
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
      console.log(chalk.blue(`> 前往第${currentPage}页：跳转中`))
      await page.goto(url)
      console.log(chalk.green('> 页面跳转：完成'))
      await page.waitForSelector('body')
      console.log(chalk.green('> 页面渲染：完成'))

      await scrollToBottom(page)

      const inputElement = await page.$$('.alignnone')

      const pageFolderPrefix = `${IMAGE_FOLDER}/${currentPage}`
      createImageFolder()
      createPageFolder(pageFolderPrefix)

      const progress = new ProgressBar(`> 第${currentPage}页 下载进度`, 50)

      for (let i = 0; i < inputElement.length; i++) {
        await inputElement[i].screenshot({
          path: `${pageFolderPrefix}/${i + 1}.png`,
          omitBackground: false,
        })
        progress.render({ completed: i + 1, total: inputElement.length })
      }

      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

const main = async (total) => {
  const browser = await puppeteer.launch()
  console.log(chalk.blue('> 浏览器启动: 完成'))
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)
  console.log(chalk.blue('> 禁用JavaScript: 完成'))

  for (let i = 1; i <= total; i++) {
    if (i > total) break
    await downloadImage(page, pageUrl(i), i)
  }

  await browser.close()
}

export default main
