import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'
import single from './single.js'
import { imageFolder, listSkip } from './config.js'

const extractNextPage = async (page) => {
  const nextPage = await page.evaluate(() => {
    const link = document.querySelector('.next-page>a')
    if (link) return link.getAttribute('href')
    else return
  })
  console.log(chalk.green('> 提取下一页 LINK ：完成'))
  return nextPage
}

const extractListLink = async (page) => {
  const linkArray = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.thumbnail')).map((v) => v.getAttribute('href'))
  })
  console.log(chalk.green('> 提取当前列表 LINK ：完成 \n'))
  return linkArray
}

const createImageFolder = () => {
  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder)
    console.log(chalk.green('> 创建 IMAGE 文件夹：完成'))
  }
}

const createSingleFolder = (listLink) => {
  const singleFolder = listLink
    .split('/')
    .pop()
    .replace(/[^0-9]/gi, '')
  const folder = `${imageFolder}/${singleFolder}`

  let isCreated = false
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
    console.log(chalk.green('> 创建 SINGLE 文件夹：完成'))
  } else {
    isCreated = true
    console.log(chalk.yellow(`> 跳过 ${folder}`))
  }
  return { folder, isCreated }
}

const linkSingle = async (page, listArray) => {
  for (let i = 0; i < listArray.length; i++) {
    const { folder, isCreated } = await createSingleFolder(listArray[i])
    if ((listSkip && !isCreated) || !listSkip) await single(page, listArray[i], folder)
  }
}

const list = async (page, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const spinner = ora({
        text: chalk.yellow(`前往 ${url} `),
        color: 'yellow',
      })
      spinner.start()
      await page.goto(url)
      spinner.succeed()
      console.log(chalk.green('> 页面跳转：完成'))

      await page.waitForSelector('body')
      console.log(chalk.green('> 页面渲染：完成'))

      createImageFolder()

      const listArray = await extractListLink(page)

      await linkSingle(page, listArray)

      const nextPage = await extractNextPage(page)
      nextPage && list(page, nextPage)

      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

export default list
