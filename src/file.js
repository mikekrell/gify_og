const crypto =  require( 'crypto');
const path =  require( 'path');
const os =  require( 'os')
const fs  =  require( 'fs')
const util =  require( 'util');

const promiseWriteFile = util.promisify(fs.writeFile())

module.exports.writeTempFile =  async (fileName, html) => {
    const moonLanding = new Date()

    const hashedFileName = crypto.createHash("md5").update(fileName + moonLanding.getMilliseconds()).digest('hex') + ".html";

    const filePath = path.join(os.tmpdir(), hashedFileName);

    await promiseWriteFile(filePath, html);

    return filePath
}

module.exports.writeImageFile = async (fileName, data, ext) => {
    const moonLanding = new Date()

    const hashedFileName = crypto.createHash("md5").update(fileName + moonLanding.getMilliseconds()).digest('hex') + `.${ext}`;

    const filePath = join(tmpdir(), hashedFileName);

    await promiseWriteFile(filePath, data);

    return filePath
}
