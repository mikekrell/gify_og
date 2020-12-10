import {IncomingMessage, ServerResponse} from 'http'

export default async function handler(req, res){
    try{
        const html =  `
        <DOCTYPE html>
        <html>
        <meta charset="utf-8">
        <title>OG GIFY</title>
        <link hre="https://fonts.googleapis.com/css?family=Fjalla+One" rel="stylesheet">
        <style>
            html {
            height: 100%;
            }

            body {
            font-family: 'Fjalla One', sans-serif;
            background: #FFFFFF;
            }

            .container {
            display: block;
            position: absolute;
            padding: 50px;
            width: 300px;
            height: 300px;
            }

            .button {
            float: left;
            position: relative;
            bottom: -65px;
            left: 50%;
            transform: translateX(-50%) rotate(-10deg);
            color: #e55643;
            text-transform: uppercase;
            opacity: 0;
            visibility: hidden;
            cursor: pointer;
            }
            .button span {
            transform: skew(-10deg);
            display: block;
            float: left;
            text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px;
            }

            h1 {
            color: #fff;
            text-transform: uppercase;
            font-size: 42px;
            margin: 0;
            line-height: 47px;
            letter-spacing: 2px;
            }

            .title {
            transform: translateX(-50%) rotate(-10deg);
            display: block;
            float: left;
            left: 50%;
            position: relative;
            }
            .title span {
            transform: skew(-10deg);
            display: block;
            float: left;
            text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
            min-width: 10px;
            min-height: 10px;
            position: relative;
            }

            .title:nth-child(1) {
            color: #e55643;
            }
            .title:nth-child(2) {
            color: #2b9f5e;
            }
            .title:nth-child(3) {
            color: #f1c83c;
            }

        </style>
        <body>
        <section class="container">
        <h1>
            <span class="title">Merry</span>
            <span class="title">Christmas</span>
        </h1>
        </section>
        </body>
        </html>
        `
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
