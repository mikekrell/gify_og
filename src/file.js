import {createHash} from 'crypto';
import { join } from 'path';
import {tmpdir} from 'os'
import {writeFile} from 'fs'
import {promisify} from 'util';

const promiseWriteFile = promisify(writeFile)

module.exports.writeTempFile =  async (fileName, html) => {
    const moonLanding = new Date()

    const hashedFileName = createHash("md5").update(fileName + moonLanding.getMilliseconds()).digest('hex') + ".html";

    const filePath = join(tmpdir(), hashedFileName);

    await promiseWriteFile(filePath, html);

    return filePath
}

module.exports.writeTempFile = async (fileName, data, ext) => {
    const moonLanding = new Date()

    const hashedFileName = createHash("md5").update(fileName + moonLanding.getMilliseconds()).digest('hex') + `.${ext}`;

    const filePath = join(tmpdir(), hashedFileName);

    await promiseWriteFile(filePath, data);

    return filePath
}
