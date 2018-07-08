const sqlHelper = require('../module/sql.js');

const addBanner = async function (ctx) {
    let sql;
    if (ctx.query.id) {
        sql = `update banner set city='${ctx.query.city}',
                               img='${ctx.query.img}',
                               link='${ctx.query.link}',
                               sort='${ctx.query.sort}'
                    where id=${JSON.parse(ctx.query.id)}`;
    } else {
        sql = `insert into banner (city, img, link, sort)
        values ('${ctx.query.city}','${ctx.query.img}','${ctx.query.link}','${ctx.query.sort}')`;
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

const delBanner = async function (ctx) {
    const sql = `delete from banner where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};
const getBannerList = async function (ctx) {
    const sql = `select * from banner`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result.length && result.length !== 0 ? 200 : 500,
        em: result.length && result.length !== 0 ? 'success' : 'error',
        data: {
            list: result,
            total: result.length
        }
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    addBanner,
    delBanner,
    getBannerList
}