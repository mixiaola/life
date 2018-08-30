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
			//获取卡券
			// this.$http.get('/getWxTicket', {params:{command:'defr546', openid:'2435tftg5gyt'}}).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });	
			//搜索接口
			// this.$http.post('/addNewShop', {rule: 'qqq'}).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });		
			//首页
			const data = {
				openid: '123',
				city: '北京',
			}
			// this.$http.get('/getWxIndexInfo', {params:data}).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });	
			//获取卡券信息
			// this.$http.get('/getWxTicketById', {params:data}).then(response => {
   //      console.log(1);
   //    }, response => {
   //      console.log(response);
			// });	
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
			padding-top:100px;
		}
	}
</style>

<style type="text/css">
	html,body{
		height:100%;
	}
</style>