import {launch} from 'puppeteer-core';
import { chrome }  from 'chrome-aws-lambda';

export async function getScreenshot (url) {

    const browser = await launch({ headless : true });
    const page = await browser.newPage();
    await page.setViewport({width: 300, height: 300})
    await page.goto(url)
    return page.screenshot({type:"png", quality: 100, fullPage: true })
}
