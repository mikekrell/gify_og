const chrome = require('chrome-aws-lambda')
const launch = require('puppeteer-core')

const exePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function getOptions () {
    let options = {
        args: [],
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    }

    return options
}

async function getScreenshot (url) {
    const options = await getOptions();
    const browser = await launch(options);
    const page = await browser.newPage();
    await page.setViewport({width: 300, height: 300})
    await page.goto(url)
    return page.screenshot({type:"png", quality: 100, fullPage: true })
}

export default getScreenshot;
