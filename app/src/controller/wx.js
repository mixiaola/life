const sqlHelper = require('../module/sql.js');

const getWxTicket = async function (ctx) {
    const command = ctx.query.command;
    const openid  = ctx.query.openid;
    const sql = `select command from command`;
    const result = await sqlHelper.query(sql);
    let data;
    if (result.length) {
        const openidsql = `insert into user (openid) value ('${openid}');`;
        data = await sqlHelper.change(openidsql);
    }
    var resultData = {
        ec: data.length ? 200 : 500,
        em: data.length ? '成功' : '验证身份失败',
        data: data
    };
    ctx.body = resultData;
    return ctx.body;
};

module.exports = {
    getWxTicket,
    getWxIndexInfo
}