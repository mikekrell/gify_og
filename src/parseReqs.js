import {parse} from 'url'

export function parseReqs(req) {
    const {query = { } } = parse(req.url || "", true);
    const {title} = query;
    const parseReqs = {title}
    console.log(JSON.stringify(parseReqs))
    return parseReqs;
}
