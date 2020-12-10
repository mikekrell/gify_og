const puppeteer = require('puppeteer');
import { chrome }  from 'chrome-aws-lambda';

export async function getScreenshot (url) {

    const browser = await puppeteer.launch({ headless : true });
    const page = await browser.newPage();
    await page.goto(url)
    await page.setViewport({ width: 300, height: 300 })

    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);

    return await browser.close(); //page.screenshot({type:"png", quality: 100, fullPage: true })

}
