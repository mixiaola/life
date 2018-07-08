<template>
	<div class='login_page'>
		<Header></Header>
		<div class="manage">
			<Manage></Manage>
		</div>
	</div>
</template>
<script>
	import Header from '../../component/header/index.vue';
	import Manage from './manage.vue';
	export default {
	  data () {
	    return {
	      list: [],
	    }
		},
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
			this.$http.get('/getShopList', { params: {pageSize:10,curPage:1,city:'全部'}} ).then(response => {
        console.log(1);
      }, response => {
        console.log(response);
			});
			const artcile = {
				imgUrl:'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg',
				webUrl:'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg',
				title:'好的家具',
				text:'如何挑选一个适合生活的家具呢？'
			}
			// this.$http.get('/addArticle', { params: artcile} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/delArticle', { params: {id:2}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/getArticleList', { params: {pageSize:3,curPage:2}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });

			// this.$http.get('/addLabel', { params: {text:'舒适'}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/delLabel', { params: {id:2}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/getLabelList' ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });

			const banner = {
				id:2,
				city:'上海',
				img:'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg',
				link:'https://img.momocdn.com/album/62/46/6246EA9E-F23A-B592-11F0-EF9471B924BF20161112_L.jpg',
				sort:9
			}
			// this.$http.get('/addBanner', { params: banner} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/delLabel', { params: {id:2}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			this.$http.get('/getBannerList' ).then(response => {
        console.log(1);
      }, response => {
        console.log(response);
			});
		
	  },
	  methods: {
	  	
	  },
	  components: {
	  	Header,
	  	Manage
	  }
	}
</script>
<style scoped lang='less'>
    .login_page{
		height:100%;
		.manage{
			height:100%;
			padding-top:100px;
		}
	}
</style>

<style type="text/css">
	html,body{
		height:100%;
	}
</style>