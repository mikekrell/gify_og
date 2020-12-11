import { writeTempFile } from './file'
import { createGIF } from 'gifshot'

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
        let filePath = await writeTempFile(title, html, '.html');
        let fileUrl = `file://${filePath}`;
        await page.goto(fileUrl);
        for (let a = 0; a < 20; a++) {
            let screen = await page.screenshot({ type: "png", fullScreen: true });
            let imagePath = writeTempFile(title + a, screen, '.png');
            let iamgeUrl = `file://${imagePath}`;
            fileList.push(iamgeUrl)
            setTimeout(function(){
                console.log(fileList[a])
            }, 50)
        }

        Promise.all(fileList).then(data=>{
            createGIF({
                'images': fileList,
            }, function (obj) {
                if (!obj.error) {
                    console.log(obj) 
                }
            });
        })

        return fileList[fileList.length-1];

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
