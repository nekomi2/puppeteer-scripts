const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try{
 
  await page.goto('https://www.notion.so/Lecture-Notes-2178426424e34c359c2183d04f611d77')
  await page.waitForXPath('//*[@id="notion-app"]/div/div[1]/div/div[2]/div[3]/div[5]/a/div/div/div[1]/div')
  let p = await page.$$eval("#notion-app > div > div.notion-cursor-listener > div > div.notion-scroller.vertical.horizontal > div.notion-page-content > div > a", l => l.map(x => x.href))	
  await Promise.allSettled(p.map(async x => {
  	let page = await browser.newPage()
  	await page.goto(x, {waitUntil: 'networkidle0'})
  	let title = await page.$eval(("#notion-app > div > div.notion-cursor-listener > div > div.notion-scroller.vertical.horizontal > div:nth-child(1) > div > div.notion-selectable.notion-page-block > div"), a=>a.innerText)
  	console.log('making pdf: ' + title)
  	await page.pdf({path:'./' + title + '.pdf'})
  }))

  }

  catch(e){
    console.error(e);
  }
  await browser.close();
})();
