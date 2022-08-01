import chalk from 'chalk'
import puppeteer from 'puppeteer'
import list from './list.js'
import { baseUrl } from './config.js'

const main = async () => {
  const browser = await puppeteer.launch()
  console.log(chalk.blue('> 浏览器启动: 完成'))

  const page = await browser.newPage()

  await page.setJavaScriptEnabled(false)
  console.log(chalk.blue('> 禁用JavaScript: 完成'))

  await list(page, baseUrl)

  await browser.close()
}

main()
