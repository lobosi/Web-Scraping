const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('//*[@id="imgBlkFront"]')
  const src = await el.getProperty('src')
  const image = await src.jsonValue()

  const [el2] = await page.$x('//*[@id="productTitle"]')
  const txt = await el2.getProperty('textContent')
  const title = await txt.jsonValue()

  const [el3] = await page.$x('//*[@id="buyNewSection"]/h5/div/div[2]/div/span[2]')
  const txt2 = await el3.getProperty('textContent')
  const price = await txt2.jsonValue()

  console.log({image, title, price});

  browser.close()
}

scrapeProduct('https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748/ref=sr_1_3?keywords=brain+books&qid=1579482575&sr=8-3')
