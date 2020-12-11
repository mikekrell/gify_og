import { writeTempFile } from './file'
import { join } from 'path';
import { tmpdir } from 'os'

const chromium = require('chrome-aws-lambda');
const GIFEncoder = require('gif-encoder-2')
const { writeFile, createWriteStream } = require('fs')
const path = require('path')

module.exports.getScreenshot = async function (html, title) {
    let browser = null;


    try {
        let fileList = []
        const encoder = new GIFEncoder(300, 300, html, true);
        const newFile = join(tmpdir(), 'og.gif');
        const writeStream = createWriteStream(newFile)

        encoder.setDelay(50)

        encoder.createReadStream().pipe(writeStream)

        encoder.start()

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
            let screen = await page.screenshot({ type: "jpeg" });
            setTimeout(function(){
                encoder.addFrame(screen)
                console.log('screen added')
            }, 50)
        }
        console.log(encoder)
        encoder.finish();

        const buffer = encoder.out.getData()
        return buffer;

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
