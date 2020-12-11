const chromium = require('chrome-aws-lambda');

export async function getScreenshot (url) {
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
        return await screen;

    } catch (error) {
        return console.error(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
