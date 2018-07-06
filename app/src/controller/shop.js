const sqlHelper = require('../module/sql.js');

const addNewShop = async function (ctx) {
    if (ctx.query.id) {
       sql = `update shop set imgUrl='${ctx.query.imgUrl}',
                                shopTitle='${ctx.query.shopTitle}',
                                ticketTitle='${ctx.query.ticketTitle}',
                                intro='${ctx.query.intro}',
                                validtiyStart='${ctx.query.validtiyStart}',
                                validtiyEnd='${ctx.query.validtiyEnd}',
                                city='${ctx.query.city}',
                                address='${ctx.query.address}',
                                lag='${ctx.query.lag}',
                                shopStartTime='${ctx.query.shopStartTime}',
                                phone='${ctx.query.phone}',
                                introInfo='${ctx.query.introInfo}',
                                personText='${ctx.query.personText}',
                                label='${ctx.query.label}',
                                music='${ctx.query.music}'
                    where id=${JSON.parse(ctx.query.id)}`;
     } else {
        sql = `insert into shop (imgUrl, shopTitle, ticketTitle, intro, validtiyStart,validtiyEnd,city,address,lag,shopStartTime,phone,introInfo,personText,label,music)
        values ('${ctx.query.imgUrl}','${ctx.query.shopTitle}','${ctx.query.ticketTitle}','${ctx.query.intro}','${ctx.query.validtiyStart}','${ctx.query.validtiyEnd}','${ctx.query.city}','${ctx.query.address}','${ctx.query.lag}','${ctx.query.shopStartTime}','${ctx.query.phone}','${ctx.query.introInfo}','${ctx.query.personText}','${ctx.query.label}','${ctx.query.music}')`;
     }
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length?200:500,
        em: result.length ? 'success' : 'error',
        data: result.length?'更改成功':'数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};

const delShop = async function (ctx) {
    const sql = `delete from shop where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.length ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};
const getShopList = async function (ctx) {
    const pageSize = ctx.query.pageSize;
    const cur = ctx.query.curPage;
    const city = ctx.query.city;
    let sql;
    if(city=='全部'){
        sql = `select * from shop`;
    } else {
        sql = `select * from shop where city='${city}'`;
    }
    console.log(sql)
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result.length ? 200 : 500,
        em: result.length ? 'success' : 'error',
        data: result.splice((cur - 1) * pageSize, pageSize)
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    addNewShop,
    delShop,
    getShopList
}