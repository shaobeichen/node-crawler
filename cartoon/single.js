import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'
import ProgressBar from './progress.js'
import { imageFolder, pageSkip } from './config.js'

const scrollToBottom = async (page) => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.clientHeight)
  })
  console.log(chalk.green('> 滚动至底部：完成'))
}

const createPageFolder = (name) => {
  let isCreated = false

  if (!fs.existsSync(name)) {
    fs.mkdirSync(name)
    console.log(chalk.green('> 创建 PAGE 文件夹：完成'))
  } else {
    isCreated = true
    console.log(chalk.yellow(`> 跳过 ${name}`))
  }

  return { isCreated }
}

const extractCurrentPageNumber = async (page) => {
  const currentPageNumber = await page.evaluate(() => {
    return document.querySelector('.current').innerText
  })
  console.log(chalk.green('> 提取当前页数：完成'))
  return currentPageNumber
}

const extractLastPageNumber = async (page) => {
  const lastPageNumber = await page.evaluate(() => {
    const content = Array.from(
      document.querySelectorAll('.article-content>.article-paging .post-page-numbers'),
    )
    content.pop()
    return content.pop().innerText
  })
  console.log(chalk.green('> 提取最后一页页数：完成'))
  return lastPageNumber
}

const adjustCurrentSingleFinally = async (page, folderPrefix) => {
  const lastPageNumber = await extractLastPageNumber(page)
  const status = fs.existsSync(`${folderPrefix}/${lastPageNumber}`)
  if (status) {
    console.log(chalk.green('> 全集是否下载结束：完成 \n'))
  } else {
    console.log(chalk.yellow('> 全集是否下载结束：未完成'))
  }
  return status
}

const extractNextPage = async (page) => {
  const nextPage = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.post-page-numbers')).pop().getAttribute('href')
  })
  console.log(chalk.green('> 提取下一页 LINK ：完成 \n'))
  return nextPage
}

const downloadImage = async (page, url, folderPrefix) => {
  return new Promise(async (resolve, reject) => {
    try {
      const spinner = ora({
        text: chalk.yellow(`前往 ${url} `),
        color: 'yellow',
      })
      spinner.start()
      await page.goto(url)
      spinner.succeed()
      console.log(chalk.green('> 子页面跳转：完成'))

      await page.waitForSelector('body')
      console.log(chalk.green('> 子页面渲染：完成'))

      const isEnd = await adjustCurrentSingleFinally(page, folderPrefix)

      if (pageSkip && isEnd) {
        resolve({ isEnd })
        return
      }

      //   await scrollToBottom(page)
      const currentPage = await extractCurrentPageNumber(page)
      const currentFolder = `${folderPrefix}/${currentPage}`
      const { isCreated } = createPageFolder(currentFolder)

      const nextPage = await extractNextPage(page)

      if (pageSkip && isCreated) {
        resolve({ nextPage })
        return
      }

      const progress = new ProgressBar(`> 第${currentPage}页 下载进度`, 50)

      const inputElement = await page.$$('.alignnone')
      for (let i = 0; i < inputElement.length; i++) {
        await inputElement[i].screenshot({
          path: `${currentFolder}/${i + 1}.png`,
          omitBackground: false,
        })
        progress.render({ completed: i + 1, total: inputElement.length })
      }

      resolve({ nextPage })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 *
 * @param {*} page page实例
 * @param {*} url 单集url
 * @param {*} folderPrefix 文件夹前缀
 */
const single = async (page, url, folderPrefix) => {
  const { nextPage, isEnd } = await downloadImage(page, url, folderPrefix)
  if (isEnd) return
  if (nextPage) await single(page, nextPage, folderPrefix)
}

export default single
