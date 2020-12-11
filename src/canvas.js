
import { parseReqs } from './parseReqs'
import { getHtml } from './template'
import { writeTempFile } from './file'
import { getScreenshot } from './chromium';

export default async function(req, res){
    try{
        const parsedReqs = parseReqs(req);
        const html = getHtml(parsedReqs);
        const filePath = await writeTempFile(parsedReqs.title , html);
        const fileUrl = `file://${filePath}`;
        console.log(fileUrl)

        const file = await getScreenshot(fileUrl);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(html);
    }catch(e){
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end('<h1>Internal Server Error</h1>');
        console.error(e)
    }
}
