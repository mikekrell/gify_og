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

        await page.goto(url || 'https://example.com');
        const screen = await page.screenshot({ type: "png", quality: 70, fullScreen: true });
        result = await screen;
    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }


    return result
};
