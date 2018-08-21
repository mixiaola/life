const sqlHelper = require('../module/sql.js');
// const request = require('request')
const request = require('superagent');
//status: 2可使用，3已使用，4已过期
//获取卡券
const getWxTicket = async function (ctx) {
    const command = ctx.query.command;
    const openid  = ctx.query.openid;
    const sql = `select * from command where command='${command}'`;
    const result = await sqlHelper.query(sql);
    let em = '成功';
    let ec = 200;
    if (result.length) {
        const idSql = `select * from user where openid='${openid}'`;
        const idRes = await sqlHelper.query(idSql);
        if (idRes.length) {
          em = '您已经领取过验证码';
          ec = 504;
        } else {
          const openidsql = `insert into user (openid) value ('${openid}');`;
          await sqlHelper.change(openidsql);
        }
    } else {
        em = '请输入争取验证码';
        ec = 504;
    }

    var resultData = {
        ec: ec,
        em: em,
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
    const ticketSqlall = `select * from shop ${city ? `where city='${city}'` : ''};`;
    const ticket = await sqlHelper.query(ticketSqlall);
    //已使用
    const usedTicketidSql = `select shopid from usershop where openid='${openid}'`;
    const usedTicketid = await sqlHelper.query(usedTicketidSql);
    let usedTicket;
    if (usedTicketid.length) {
        const usedTicketSql = `select * from shop where id in (
                        ${usedTicketid.map((item) => {
                return item.shopid;
            })}
                        )${city ? `and city='${city}'` : ''};`;
        usedTicket = await sqlHelper.query(usedTicketSql);
    }
    ticket.length&&ticket.map((item) => {
        item.status = 2;
        if (new Date() - new Date(item.validtiyEnd) > 0){
            item.status = 4;
        }
        usedTicketid.length&&usedTicketid.map((data)=>{
            if(data.shopid==item.id) {
                item.status = 3;
            }
        })
    })
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
    var res = await request.get('https://api.weixin.qq.com/sns/jscode2session?appid=wxc3aa2eeefec9c1bf&secret=c0da1ded4ef213494b7e15ad381d6e21&js_code=' + ctx.query.code + '&grant_type=authorization_code')
    var data = {
        ec: res.text?200:500,
        em: res.text ? 'success' : 'error',
        data: JSON.parse(res.text)
    };
    ctx.body = data;
    return ctx.body
}

//获取单个卡券信息
const getWxTicketById = async function (ctx) {
    const openid = ctx.query.openid;
    const shopid = ctx.query.shopid;
    //已使用
    const usedTicketidSql = `select * from usershop where openid='${openid}' and shopid=${shopid}`;
    const usedTicketid = await sqlHelper.query(usedTicketidSql);
    const sql = `select * from shop where id = ${shopid}`;
    const ticket = await sqlHelper.query(sql);
    ticket.length&&ticket.map((item) => {
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
        ec: ticket ? 200 : 500,
        em: ticket ? '成功' : '失败',
        data: ticket
    };
    ctx.body = resultData;
    return ctx.body;
};
const getWxUseTicket = async function (ctx) {
    const openid = ctx.query.openid;
    //已使用
    const usedTicketidSql = `select shopid from usershop where openid='${openid}'`;
    const usedTicketid = await sqlHelper.query(usedTicketidSql);
    let usedTicket = [];
    if (usedTicketid.length) {
      const usedTicketSql = `select * from shop where id in (
                        ${usedTicketid.map((item) => {
                return item.shopid;
            })});`;
        usedTicket = await sqlHelper.query(usedTicketSql);
    }
    var resultData = {
        ec: usedTicket ? 200 : 500,
        em: usedTicket ? '成功' : '失败',
        data: usedTicket
    };
    ctx.body = resultData;
    return ctx.body;
};
const getWxSerachList = async function (ctx) {
    const label = ctx.query.label;
    const sql = `select * from shop where shopTitle like '%${label}%';`;
    const result = await sqlHelper.query(sql);

    var data = {
        ec: result ? 200 : 403,
        em: result ? '请求成功' : '请求失败',
        shopList: result
    };
    ctx.body = data;
    return ctx.body;
};
module.exports = {
    getWxTicket,
    getWxIndexInfo,
    getWxArticle,
    getOpenId,
    useWxTicketById,
    getWxTicketById,
    getWxSerachList,
    getWxUseTicket
}