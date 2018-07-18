const sqlHelper = require('../module/sql.js');

const addCommand = async function (ctx) {
    const sql = `insert into command (command, openid) values ('${ctx.query.command}','')`;
    console.log(sql)
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};

const delCommand = async function (ctx) {
    const sql = `delete from command where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body; 
};
const getCommandlist = async function (ctx) {
    const sql = `select id, command from command`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result ? 200 : 500,
        em: result ? 'success' : 'error',
        data: {
            list: result,
            total: result.length
        }
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    addCommand,
    getCommandlist,
    delCommand
}