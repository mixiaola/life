import login from '../controller/login';

const router = require('koa-router')()
router.get('/login', login.login);


module.exports = router