import { freetypeVersion } from 'canvas';
import {IncomingMessage, ServerResponse} from 'http'
import { parseReqs } from './parseReqs'
import {template} from './template'

export default async function (req, res){
    try{
        const parsedReqs = parseReqs(req);
        const html = template(parsedReqs)
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
