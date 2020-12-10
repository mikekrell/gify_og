import {IncomingMessage, ServerResponse} from 'http'
import { parseReqs } from './parseReqs'

export default async function (req, res){
    parseReqs(req);
    try{
        const html =  `
        <DOCTYPE html>
        <html>
        <meta charset="utf-8">
        <title>OG GIFY</title>
        <link hre="https://fonts.googleapis.com/css?family=Fjalla+One" rel="stylesheet">
        <script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-157cd5b220a5c80d4ff8e0e70ac069bffd87a61252088146915e8726e5d9f147.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lettering.js/0.7.0/jquery.lettering.min.js"></script>
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
          <script id="INLINE_PEN_JS_ID">
            $(document).ready(function () {
            $(".title").lettering();
            $(".button").lettering();
            });

            $(document).ready(function () {
            animation();
            }, 1000);

            $('.button').click(function () {
            animation();
            });


            function animation() {
            var title1 = new TimelineMax();
            title1.to(".button", 0, { visibility: 'hidden', opacity: 0 });
            title1.staggerFromTo(".title span", 0.5,
            { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
            { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 }, 0.05);
            title1.to(".button", 0.2, { visibility: 'visible', opacity: 1 });
            }
                //# sourceURL=pen.js
            </script>
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
