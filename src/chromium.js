import { writeTempFile } from './file'
const chromium = require('chrome-aws-lambda');

module.exports.getScreenshot = async function (html, title) {
    const gifshot = require('gifshot'); 
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
        let filePath = await writeTempFile(title, html, '.html');
        let fileUrl = `file://${filePath}`;
        await page.goto(fileUrl);
        for (let a = 0; a < 20; a++) {
            let screen = await page.screenshot({ type: "png", fullScreen: true });
            let imagePath = writeTempFile(title + a, screen, '.png');
            let iamgeUrl = `file://${imagePath}`;
            fileList.push(iamgeUrl)
            setTimeout(function(){
                
            }, 50)
        }

        let returnData = Promise.all(fileList).then(data=>{
            console.log(data)
            gifshot.createGIF({
                'images': data,
            }, function (obj) {
                if (!obj.error) {
                    let image = obj.image;
                    console.log(image)
                }
            });
        })

        return returnData;

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
