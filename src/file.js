import {createHash} from 'crypto';
import { join } from 'path';
import {tmpdir} from 'os'
import {writeFile} from 'fs'
import {promisify} from 'util';

const promiseWriteFile = promisify(writeFile)

export async function writeTempFile (fileName, html) {
    const hashedFileName = createHash("md5").update(fileName).digest('hex') + ".html";
    console.log(hashedFileName)

    const filePath = join(tmpdir(), hashedFileName);
    console.log(filePath)

    await promiseWriteFile(filePath, html);

    return filePath
}
