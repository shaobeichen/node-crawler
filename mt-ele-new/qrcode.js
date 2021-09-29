const path = require('path')
const puppeteer = require('puppeteer')
const tesseract = require('tesseract.js')

async function screenshotDOMElement(imageName, selector, padding = 0) {
  const rect = await page.evaluate((selector) => {
    const element = document.querySelector(selector)
    const { x, y, width, height } = element.getBoundingClientRect()
    return { left: x, top: y, width, height, id: element.id }
  }, selector)

  return await page.screenshot({
    path: imageName,
    clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    },
  })
}

async function puppeteerLaunch() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('xxxx url', { waitUntil: 'networkidle2' })
  await screenshotDOMElement(page, imageName, '.tel__number img', 1)
}

;(async () => {
  const {
    data: { text },
  } = await tesseract.recognize(path.resolve(__dirname, 'qrcode.png'), 'env', {
    errorHandler: function () {},
  })
  console.log(text)
})()
