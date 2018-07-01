const resultModule = require('../lib/result.js');

const login = async function (ctx) {
    console.log('login');
    ctx.body = resultModule.ok({
        data: 'aaa'
    });

    return ctx.body;
};

module.exports = {
    login
}