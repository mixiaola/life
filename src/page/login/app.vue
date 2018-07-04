<template>
	<div class='login'>
		<Header></Header>
		<div class="title">登陆管理</div>
		<el-input class='username' v-model="username" type='text' placeholder="请输入内容"></el-input>
		<el-input class='password' v-model="password" type='password' placeholder="请输入内容"></el-input>
		<el-button class='btn' type="primary" @click='login'>主要按钮</el-button>
		<el-dialog title="提示" :visible.sync="visible" width="30%" center>
		  <span>{{loginText}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="centerDialogVisible">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import Header from '../../component/header/index.vue';
	export default {
	  data () {
	    return {
	      username: '',
	      password: '',
	      loginText: '',
	      visible: false,
	      loginState: false

	    }
	  },
	  created () {
	  },
	  methods: {
	  	login(){
	  		var that = this
	  		this.$http.get('/login', { params: {username: this.username, password:this.password}})
	  			.then(res => {
			        if (res.body && res.body.ec == '200'){
			        	that.loginText = res.body.data
			        	that.visible = true
			        	that.loginState = true
			        } else {
			        	that.loginText = res.body.data
			        	that.visible = true
			        }
		      	});
	  	},
	  	centerDialogVisible(){
	  		this.visible = false
	  		if (this.loginState){
	  			window.location = '/'
	  		} else {
	  			this.password = ''
	  		}
	  	}
	  },
	  components: {
	  	Header
	  }
	}
</script>
<style lang='less' scoped>
	.title{
		color:#000000;
		font-size:20px;
		width:80px;
		height:28px;
		line-height:28px;
		display:block;
		margin-left: auto;
		margin-right: auto;
		margin-top:190px;
	}
	.username{
		width:240px;
		height:40px;
		display:block;
		margin-left: auto;
		margin-right: auto;
		margin-top:24px;
	}
	.password{
		width:240px;
		height:40px;
		display:block;
		margin-left: auto;
		margin-right: auto;
		margin-top:18px;
	}
	.btn{
		width:240px;
		height:40px;
		display:block;
		margin-left: auto;
		margin-right: auto;
		margin-top:18px;
	}
</style>