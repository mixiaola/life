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

module.exports = {
    login
}