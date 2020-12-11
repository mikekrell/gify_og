const chromium = require('chrome-aws-lambda');

exports.getScreenshot = async (url) => {
    let result = null;
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
        const screen = await page.screenshot({ type: "png", fullScreen: true });
        result = await screen;
        return result;

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }


};
