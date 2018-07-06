import login from '../controller/login';
import shop from '../controller/shop';

const router = require('koa-router')()
router.get('/login', login.login);
router.get('/addNewShop', shop.addNewShop);
router.get('/delShop', shop.delShop);
router.get('/getShopList', shop.getShopList);

module.exports = router