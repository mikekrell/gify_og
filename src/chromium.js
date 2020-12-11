import { writeTempFile } from './file'

const chromium = require('chrome-aws-lambda');

module.exports.getScreenshot = async function (title, html) {
    let browser = null;

    try {
        let fileList = []

        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        let page = await browser.newPage();

        await page.setViewport({width:300, height: 300});
        for (let a = 0; a < 20; a++) {
            let filePath = await writeTempFile(parsedReqs.title, html);
            let fileUrl = `file://${filePath}`;
            await page.goto(url);
            let screen = await page.screenshot({ type: "png", fullScreen: true });
            fileList.push(screen)
        }

        return fileList[0];

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
