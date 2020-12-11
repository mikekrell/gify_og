import { writeTempFile } from './file'

const chromium = require('chrome-aws-lambda');

module.exports.getScreenshot = async function (html, title) {
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
        let filePath = await writeTempFile(title, html);
        let fileUrl = `file://${filePath}`;
        await page.goto(fileUrl);
        for (let a = 0; a < 20; a++) {
            let screen = await page.screenshot({ type: "png", fullScreen: true });
            fileList.push(screen)
            setTimeout(function(){
                console.log('screen ' + a)
            },200)
        }


        console.log(fileList)
        return fileList[fileList.length-1];

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
