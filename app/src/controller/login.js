const sqlHelper = require('../module/sql.js');

const login = async function (ctx) {
    const sql = `select username, password from administrator`;
    const result = await sqlHelper.query(sql);
    let resultData = '用户名或密码不正确';
    result.map((item)=>{
        if (item.username == ctx.query.username && item.password == ctx.query.password) {
            resultData = '登陆成功'
            ctx.cookies.set('isLogin', ctx.query.username, {httpOnly:false})
        }
    })
    var data = {
        ec: resultData ==='登陆成功'?200:403,
        em: resultData,
        data: resultData
    };
    ctx.body = data;
    return ctx.body;
};
const showAlert = async function (ctx) {
    const sql = `update alert set isShow=${ctx.query.isShow}, 
                img='${ctx.query.img}'
                where type='${ctx.query.type}'`;
    const result = await sqlHelper.change(sql);
    var data = {
        ec: result.length ? 200 : 403,
        em: result.length? '请求成功':'请求失败',
    };
    ctx.body = data;
    return ctx.body;
};

const getAlert = async function (ctx) {
    const sql = `select img, isShow, type from alert
                where type='${ctx.query.type}'`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result.length ? 200 : 403,
        em: result.length ? '请求成功' : '请求失败',
        data: result[0]
    };
    ctx.body = data;
    return ctx.body;
};

const query = async function (ctx) {
    const sql = `select count(*) num from command where openid<>'';`;
    const result = await sqlHelper.query(sql);
    var data = {
        ec: result.length ? 200 : 403,
        em: result.length ? '请求成功' : '请求失败',
        data: {
            alluserNum: result[0].num,
            usedNum: '逻辑暂未开发'
        }
    };
    ctx.body = data;
    return ctx.body;
};

module.exports = {
    login,
    showAlert,
    getAlert,
    query
}