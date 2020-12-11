import { parse } from 'url'

export default function (req) {
    const {query = { } } = parse(req.url || "", true);
    const {title} = query;
    const parseReqs = {title}
    return parseReqs;
}
