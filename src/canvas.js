import { parseReqs } from './parseReqs'
import { getHtml } from './template'
import { getScreenshot } from './chromium';

export default async function(req, res){
    try{
        const parsedReqs = parseReqs(req);
        const html = getHtml(parsedReqs);
        let file = await getScreenshot(html, parsedReqs);
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/png");
        res.end(file);
    }catch(e){
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end('<h1>Internal Server Error</h1>');
        console.error(e)
    }
}
