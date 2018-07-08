const sqlHelper = require('../module/sql.js');

const addLabel = async function (ctx) {
    const sql = `insert into label (text) values ('${ctx.query.text}')`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};

const delLabel = async function (ctx) {
    const sql = `delete from label where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};
const getLabelList = async function (ctx) {
    const sql = `select * from label`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: {
            list: result,
            total: result.length
        }
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    addLabel,
    delLabel,
    getLabelList
}