import login from '../controller/login';
import shop from '../controller/shop';
import article from '../controller/article';
import label from '../controller/label';
import banner from '../controller/banner';

const router = require('koa-router')()
router.get('/login', login.login);

router.get('/addNewShop', shop.addNewShop);
router.get('/delShop', shop.delShop);
router.get('/getShopList', shop.getShopList);
router.get('/getShopById', shop.getShopById);

router.get('/addArticle', article.addArticle);
router.get('/delArticle', article.delArticle);
router.get('/getArticleList', article.getArticleList);

router.get('/addLabel', label.addLabel);
router.get('/delLabel', label.delLabel);
router.get('/getLabelList', label.getLabelList);

router.get('/addBanner', banner.addBanner);
router.get('/delBanner', banner.delBanner);
router.get('/getBannerList', banner.getBannerList);

module.exports = router