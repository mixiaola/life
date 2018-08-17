const sqlHelper = require('../module/sql.js');
const request = require('request')
//获取卡券
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

//首页
const getWxIndexInfo = async function (ctx) {
    const openid = ctx.query.openid;
    const city = ctx.query.city == '全部' ? '' : ctx.query.city;

    const getUser = `select * from user where openid='${openid}';`;
    const user = await sqlHelper.query(getUser);
    const bannerSql = `select * from banner ${city ? `where city='${city}'` : ''};`;
    const banner = await sqlHelper.query(bannerSql);
    const inputSql = `select * from alert where type='input';`;
    const focusSql = `select * from alert where type='focus';`;
    const input = await sqlHelper.query(inputSql);
    const focus = await sqlHelper.query(focusSql);
    // 全部
    const ticketSqlall = `select id, shopTitle, ticketTitle, validtiyEnd, music from shop ${city ? `where city='${city}'` : ''};`;
    const ticket = await sqlHelper.query(ticketSqlall);
    //已使用
    const usedTicketidSql = `select shopid from usershop where openid='${openid}'`;
    const usedTicketid = await sqlHelper.query(usedTicketidSql);
    const usedTicketSql = `select id, shopTitle, ticketTitle, validtiyEnd, music from shop where id in (
                        ${usedTicketid.map((item)=>{
                            return item.shopid;
                        })}
                        )${city ? `and city='${city}'` : ''};`;
    const usedTicket = await sqlHelper.query(usedTicketSql);
    ticket.map((item) => {
        item.status = 2;
        if (new Date() - new Date(item.validtiyEnd) > 0){
            item.status = 4;
        }
        usedTicketid.map((data)=>{
            if(data.shopid==item.id) {
                item.status = 3;
            }
        })
    })
    console.log(ticket)
    const result = {
        isGetTicket: user.length ? 1 : 0,
        banner: banner,
        ticket: ticket,
        command: input,
        subscription: focus
    }
    var resultData = {
        ec: 200,
        em: '成功',
        data: result
    };
    ctx.body = resultData;
    return ctx.body;
};
//获取文章列表
const getWxArticle = async function (ctx) {
    const sql = `select * from article`;
    const data = await sqlHelper.query(sql);
    var resultData = {
        ec: data.length ? 200 : 500,
        em: data.length ? '成功' : '失败',
        data: data
    };
    ctx.body = resultData;
    return ctx.body;
};
//使用卡券
const useWxTicketById = async function (ctx) {
    const sql = `insert into usershop (openid, shopid) values ('${ctx.query.openid}', ${ctx.query.shopid})`;
    const data = await sqlHelper.change(sql);
    var resultData = {
        ec: data.length ? 200 : 500,
        em: data.length ? '成功' : '失败',
        data: data
    };
    ctx.body = resultData;
    return ctx.body;
};
const getOpenId = async function (ctx) {
    await request.get('https://api.weixin.qq.com/sns/jscode2session?appid=wxc3aa2eeefec9c1bf&secret=c0da1ded4ef213494b7e15ad381d6e21&js_code=' + ctx.query.code + '&grant_type=authorization_code', function(error, response, body){
            ctx.body = body;
            return ctx.body
    })
}

//获取卡券信息
const getWxTicketById = async function (ctx) {
    // 全部
    const ticketSqlall = `select id, shopTitle, ticketTitle, validtiyEnd, music from shop ${city ? `where city='${city}'` : ''};`;
    const ticket = await sqlHelper.query(ticketSqlall);
    //已使用
    const usedTicketidSql = `select shopid from usershop where openid='${openid}'`;
    const usedTicketid = await sqlHelper.query(usedTicketidSql);
    const usedTicketSql = `select id, shopTitle, ticketTitle, validtiyEnd, music from shop where id in (
                        ${usedTicketid.map((item) => {
            return item.shopid;
        })}
                        )${city ? `and city='${city}'` : ''};`;
    const usedTicket = await sqlHelper.query(usedTicketSql);
    ticket.map((item) => {
        item.status = 2;
        if (new Date() - new Date(item.validtiyEnd) > 0) {
            item.status = 4;
        }
        usedTicketid.map((data) => {
            if (data.shopid == item.id) {
                item.status = 3;
            }
        })
    })
    var resultData = {
        ec: ticket.length ? 200 : 500,
        em: ticket.length ? '成功' : '失败',
        data: ticket
    };
    ctx.body = resultData;
    return ctx.body;
};
module.exports = {
    getWxTicket,
    getWxIndexInfo,
    getWxArticle,
    getOpenId,
    useWxTicketById,
    getWxTicketById
}