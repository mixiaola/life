const sqlHelper = require('../module/sql.js');
const getsqlData = (data) => {
    return data.replace("'", "\\'");
}
const addNewShop = async function (ctx) {
    let sql;
    const params = ctx.request.body.params;
    if (params.id) {
        sql = `update shop set imgUrl='${getsqlData(params.imgUrl)}',
                                street='${getsqlData(params.street)}',
                                shopTitle="${getsqlData(params.shopTitle)}",
                                ticketTitle='${getsqlData(params.ticketTitle)}',
                                intro='${getsqlData(params.intro)}',
                                validtiyStart='${getsqlData(params.validtiyStart)}',
                                validtiyEnd='${getsqlData(params.validtiyEnd)}',
                                city='${getsqlData(params.city)}',
                                address='${getsqlData(params.address)}',
                                lag='${getsqlData(params.lag)}',
                                shopStartTime='${getsqlData(params.shopStartTime)}',
                                phone='${params.phone}',
                                introInfo='${getsqlData(params.introInfo)}',
                                personText='${getsqlData(params.personText)}',
                                label='${params.label}',
                                music='${params.music}',
                                date='${Date.parse(new Date())}'
                    where id=${JSON.parse(params.id)}`;
     } else {
        sql = `insert into shop (imgUrl, street, shopTitle, ticketTitle, intro, validtiyStart,validtiyEnd,city,address,lag,shopStartTime,phone,introInfo,personText,label,music,date)
        values ('${getsqlData(params.imgUrl)}','${getsqlData(params.street)}','${getsqlData(params.shopTitle)}','${getsqlData(params.ticketTitle)}','${getsqlData(params.intro)}','${getsqlData(params.validtiyStart)}','${getsqlData(params.validtiyEnd)}','${params.city}','${getsqlData(params.address)}','${params.lag}','${params.shopStartTime}','${params.phone}','${getsqlData(params.introInfo)}','${getsqlData(params.personText)}','${params.label}','${params.music}','${Date.parse(new Date())}')`;
     }
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result?200:500,
        em: result ? 'success' : 'error',
        data: result?'更改成功':'数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};

const delShop = async function (ctx) {
    const sql = `delete from shop where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result ? 200 : 500,
        em: result ? 'success' : 'error',
        data: result ? '更改成功' : '数据库操作失败'
    };
    ctx.body = data;
    return ctx.body;
};

const getShopById = async function (ctx) {
    const sql = `select * from shop where id=${JSON.parse(ctx.query.id)}`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result? 200 : 500,
        em: result? 'success' : 'error',
        data: result
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
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result ? 200 : 500,
        em: result ? 'success' : 'error',
        data: {
            list: result.slice((cur - 1) * pageSize, cur*pageSize),
            total: result.length
        }
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    addNewShop,
    delShop,
    getShopList,
    getShopById
}