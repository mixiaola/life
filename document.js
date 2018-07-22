//公共接口
router.get('/upDateImg', async (ctx, next) => { })
router.get('/getOpenId', async (ctx, next) => { })




//登录实现
/**
 *	username: 用户名
 *	password: 密码
 *	
 **/
router.get('/login', async (ctx, next) => { })



//店铺管理：获取数据list接口
/**
 *	pageSize: 获取多少条数据
 *	curPage: 当前页数
 *	city: 选择的城市，默认all
 *
 *	reponse：
 *		total：一共多少条数据库
 *		list：[{
			date: 最后修改时间
			shopName: 店名称
			city： 城市，
			id： 当前索引
 		}]
 *	
 **/
router.get('/getShopList', async (ctx, next) => { })

/**
 * 	id:商城对应id ，没有则为添加新商城
 *	imgUrl: 图片链接
 *	shopTitle: 店铺标题
 *	ticketTitle: 券标题
 *	intro: 使用简洁
 *	validtiy : {
 		start: 开始时间
 		end： 结束时间
 	}
 	city：城市
 	address： 详细地址
	lag:'xxx,xxx'
	shopStartTime: 营业时间
	phone: 电话
	introInfo："",简介link标签
	personText: 个人页记录介绍文案
	label：标签，
	music： 1是，0否
 *
 *	reponse：
 		code： 200，
 *		data：'成功'，
 *	
 **/
router.get('/addNewShop', async (ctx, next) => { })

/**
 * 	id:商城对应id
 *
 *	reponse：
 		code： 200，
 *		data：'成功'，
 *	
 **/
router.get('/delShop', async (ctx, next) => { })

//文章管理
/**
 * 	pageSize: 获取多少条数据
 *	curPage: 当前页数

 *	reponse：
 		code： 200，
 *		data：{
 			id： 文章id 
			date: 添加时间
			title： 标题
			link： 链接
			img：图片，
			text: 引言内容
 		}，
 *	
 **/
router.get('/getArticleList', async (ctx, next) => { })

/**
 * 	id:文章对应id ，没有则为添加新文章
 *	imgUrl: 图片链接
 *	webUrl： 一个外部地址链接（文章链接）
 *	title： 文章标题
 *	text 引言
 *	
 *	
 *	reponse：
 		code： 200，
 *		data：'成功'，
 *	
 **/
router.get('/addArticle', async (ctx, next) => { })

/**
 * 	id:文章对应id
 *
 *	reponse：
 		code： 200，
 *		data：'成功'，
 *	
 **/
router.get('/delArticle', async (ctx, next) => { })

//标签管理
/**
 * 	text:标签文案
 *
 *	reponse：
 		code： 200，
 *		data：'成功'，
 *	
 **/
router.get('/addLabel', async (ctx, next) => { })
/**
 *	reponse：
 		code： 200，
 *		data：[{
			id: 对应索引
			label： 标签名称
 		}]，
 *	
 **/
router.get('/getLabelList', async (ctx, next) => { })
/**
 * 	id:标签对应id
 *
 *	reponse：
 		code： 200，
 *		data：'成功'，
 *	
 **/
router.get('/delLabel', async (ctx, next) => { })

//banner管理
/**
 *  city: 城市
 *
 *	reponse：
 		code： 200，
 *		data：[{
			id: 对应索引
			date： 添加时间
			sort： 展示权重
			img： banner图片
			link： webview链接
 		}]，
 *	
 **/
router.get('/getBannerList', async (ctx, next) => { })
/**
 *	id 有则编辑banner 没有则新建banner
 *  city: 城市
 *	img: banner图片
 *	link：外部url链接
 *	sort： 排序的权重值
 *
 *	reponse：
 		code： 200，
 *		data：[{
			id: 对应索引
			date： 添加时间
			sort： 展示权重
			img： banner图片
			link： webview链接
 		}]，
 *	
 **/
router.get('/addBanner', async (ctx, next) => { })

// 弹窗管理
/**
 *  isShow: 是否展示
 *	img： 弹窗图片
 *	type： input口令 focus公众高关注
 *
 *	reponse：
 *	
 **/
router.get('/showAlert', async (ctx, next) => { })
/**
 *	type： input口令 focus公众高关注
 *
 *	reponse：{
		data:{
			isShow,
			img,
			type：
		}
 }
 *	
 **/
router.get('/getAlert', async (ctx, next) => { })

// 口令管理
router.get('/addCommand', async (ctx, next) => { })
router.get('/getCommandlist', async (ctx, next) => { })
router.get('/delCommand', async (ctx, next) => { })

//数据统计
/**
 *	reponse：
 *		alluserNum： 总体用户量
 *		usedNum： 总体使用数量
 *	
 **/
router.get('/query', async (ctx, next) => { })




//小程序接口
//首页
/**
 *  city: 选择的城市
 *	musicShow： 店内是否播放音乐
 *	ticketType: 全部/可使用/已使用或已过期  1,2,3,4
 *	reponse：
 *		banner: [{img,link}]
 *		shopList:[{
			title,
			img,
			time,
			address,
			ticketTitle:
 }]
 **/
router.get('/getIndexList', async (ctx, next) => { })
//使用口令
/**
 *  openid: 用户的微信id
 }]
 **/
router.get('/useCommand', async (ctx, next) => { })
// 搜索接口
/**
 *  lable： 搜索内容
 *		
	reponse：
 *		shopList:[{
			title,
			img,
			time,
			address,
			ticketTitle:
 }]
 *	
 **/
router.get('/search', async (ctx, next) => { })
/**
 *  openid 用户微信id
 *		
	reponse：
 *		data:[{
			title,
			date,
			img,
			time,
			address,
			personText:
 }]
 *	
 **/
router.get('/getUsedTicket', async (ctx, next) => { })
/**
 * 	id:商城对应id ，没有则为添加新商城
 *	openid: 用户微信id
 *
 *	reponse：
 		imgUrl: 图片链接
	 *	shopTitle: 店铺标题
	 *	ticketTitle: 券标题
	 *	intro: 使用简洁
	 *	validtiy : {
	 		start: 开始时间
	 		end： 结束时间
	 	}
	 	city：城市
	 	address： 详细地址
		lag:'xxx,xxx'
		shopStartTime: 营业时间
		phone: 电话
		introInfo："",简介link标签
		personText: 个人页记录介绍文案
		label：标签，
		music： 1是，0否,
		ticketType: 全部/可使用/已使用或已过期/无券  1,2,3,4，5
		shopId: 商店id
 *	
 **/
router.get('/getShopInfo', async (ctx, next) => { })
/**
 * 	openid:用户微信id
 * 	shopId:用户微信id
 *
 **/
router.get('/usedTicket', async (ctx, next) => { })


module.exports = router









CREATE TABLE`al_abtest_markplatform_check_history`(
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增长ID',
	`rule` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '队列名称',
	`pdate` int(11) NOT NULL DEFAULT '0' COMMENT '导入时间',
	`momoid` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户id',
	`feedid` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '动态id',
	`mark_momoid` bigint(20) NOT NULL DEFAULT '0' COMMENT '标记人id',
	`mark_feed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标记人feed标注',
	`mark_user` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标记人user标注',
	`mark_remark` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标记人备注',
	`mark_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '标记时间',
	`check_momoid` bigint(20) NOT NULL DEFAULT '0' COMMENT '质检id',
	`check_feed` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '质检feed标注',
	`check_user` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '质检user标注',
	`check_remark` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '质检备注',
	`check_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '质检时间',
	`check_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '质检状态',
	PRIMARY KEY(`id`),
	KEY`indx_time`(`check_timestamp`),
	KEY`indx_rule_feed`(`rule`, `feedid`),
	KEY`indx_feedid`(`feedid`),
	KEY`indx_momoid`(`momoid`)
)