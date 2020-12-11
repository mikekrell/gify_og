import { freetypeVersion } from 'canvas';

const chromium = require('chrome-aws-lambda');
const { record } = require('puppeteer-recorder')
export async function getScreenshot (url) {
    let browser = null;

    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        let page = await browser.newPage();
        await page.setViewport({width:300, height: 300});
        await page.goto(url);
        const screen = await record({
            browser: browser, // Optional: a puppeteer Browser instance,
            page: page, // Optional: a puppeteer Page instance,
            output: 'output.gif',
            fps: 60,
            frames: 60 * 5, // 5 seconds at 60 fps
            prepare: function (browser, page) { /* executed before first capture */ },
            render: function (browser, page, frame) { /* executed before each capture */ }
        });

        return screen;

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
