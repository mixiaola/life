const sqlHelper = require('../module/sql.js');

const addArticle = async function (ctx) {
    let sql;
    if (ctx.query.id) {
        sql = `update shop set imgUrl='${ctx.query.imgUrl}',
                               webUrl='${ctx.query.webUrl}',
                               title='${ctx.query.title}',
                               text='${ctx.query.text}'
                    where id=${JSON.parse(ctx.query.id)}`;
    } else {
        sql = `insert into article (imgUrl, webUrl, title, text)
        values ('${ctx.query.imgUrl}','${ctx.query.webUrl}','${ctx.query.title}','${ctx.query.text}')`;
    }
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};

const delArticle = async function (ctx) {
    const sql = `delete from article where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};
const getArticleList = async function (ctx) {
    const pageSize = ctx.query.pageSize;
    const cur = ctx.query.curPage;
    const sql = `select * from article`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result.length && result.length !== 0 ? 200 : 500,
        em: result.length && result.length !== 0 ? 'success' : 'error',
        data: {
            list: result.slice((cur - 1) * pageSize, cur*pageSize),
            total: result.length
        }
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    addArticle,
    delArticle,
    getArticleList
}