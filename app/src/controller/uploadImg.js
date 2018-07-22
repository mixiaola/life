var co = require('co');
var OSS = require('ali-oss');
var client = new OSS({
    region: 'your region',
    accessKeyId: 'your accessKeyId',
    accessKeySecret: 'Your accessKeySecret',
    bucket: 'your bucket'
});



const upLoadImg = async function (ctx) {
    
    return ctx.body;
};


module.exports = {
    upLoadImg
}