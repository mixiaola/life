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
	// this.$http.get('/getShopById', { params: {id:1}} ).then(response => {
 //        console.log(1);
 //      }, response => {
 //        console.log(response);
	// 		});
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/delLabel', { params: {id:2}} ).then(response => {
      //   console.log(1);
      // }, response => {
      //   console.log(response);
			// });
			// this.$http.get('/getBannerList' ).then(response => {
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