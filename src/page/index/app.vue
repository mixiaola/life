<template>
	<div>
		<Header></Header>
		<div>index页面</div>
	</div>
</template>
<script>
	import Header from '../../component/header/index.vue';
	export default {
	  data () {
	    return {
	      list: [],
	    }
		},
// 		id:商城对应id ，没有则为添加新商城
//  *	imgUrl: 图片链接
//  *	shopTitle: 店铺标题
//  *	ticketTitle: 券标题
//  *	intro: 使用简洁
//  *	validtiy : {
//  		start: 开始时间
//  		end： 结束时间
//  	}
//  	city：城市
//  	address： 详细地址
// 	lag:'xxx,xxx'
// 	shopStartTime: 营业时间
// 	phone: 电话
// 	introInfo："",简介link标签
// 	personText: 个人页记录介绍文案
// 	label：标签，
// 	music： 1是，0否
	  created () {
			console.log(123131231)
			this.$http.get('/login', { params: {username: 'admin', password:123456}}).then(response => {
        console.log(1);
      }, response => {
        console.log(response);
			});
			const data = {
				// id:1,
				imgUrl:'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg',
				shopTitle: '北欧家具',
				ticketTitle: '七折券',
				intro: '满100打七折',
				validtiyStart:'2018-07-05',
				validtiyEnd:'2018-08-05',
				city: '北京',
				address: '朝阳区望京soho',
				lag:'116，37',
				shopStartTime:'早9：00，晚7:00',
				phone:'13796621250',
				introInfo:'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg',
				personText:'我买了这个，超便宜！',
				label:'小清闲',
				music:1
			}
			// this.$http.get('/addNewShop', { params: data} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/delShop', { params: {id:2}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/getShopList', { params: {pageSize:2,curPage:2,city:'全部'}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
      // });
	  },
	  methods: {

	  },
	  components: {
	  	Header
	  }
	}
</script>
