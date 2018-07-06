<template>
	<div class='header'>
		<img class='logo' src="../../imgs/logo.png">
		<div class="logout" v-if='username' v-on:click="showBtn">
			{{username}}
			<span class="icon"></span>
			<img v-if='show' src="../../imgs/logoutBtn.png" class='btn' v-on:click="logout">
		</div>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      list: [],
	      username: '',
	      show: false
	    }
	  },
	  created () {
	  	this.username = this.getCookie('isLogin')
	  },
	  methods: {
	  	showBtn(){
	  		this.show = !this.show
	  	},
	  	clearAllCookie() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if(keys) {
					for(var i = keys.length; i--;)
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
				}
		},
		logout: function () {
	      this.clearAllCookie()
	      window.location = '/pageLogin'
	    },
	  	getCookie(c_name){
	  		let c_start,c_end;
			if (document.cookie.length>0){
			  	c_start=document.cookie.indexOf(c_name + "=")
			  	if (c_start!=-1){ 
			    	c_start=c_start + c_name.length+1 
			    	c_end=document.cookie.indexOf(";",c_start)
				    if (c_end==-1) c_end=document.cookie.length
				    return unescape(document.cookie.substring(c_start,c_end))
			    } 
			}
			return ""
			}
	  	}
	}
</script>
<style lang='less'>
	*{
		padding: 0;
		margin:0;
	}
	ul, ol{
		list-style: none;
	}
	a{
		text-decoration: none;
	}
	html, body{
		background: #fff;
		font-size: 14px;
		line-height: 22px;
	}
</style>
<style lang='less' scoped>
	.header{
		height: 100px;
		line-height: 100px;
		vertical-align: top;
		border-bottom: 1px solid #EBEBEB;
		position:fixed;
		width:100%;
		top:0;
		left:0;
		z-index:100;
		background:#fff;
		.logo{
			height: 52px;
			margin-top: 24px;
			margin-left: 135px;
		}
		.logout{
			float: right;
			height: 20px;
			line-height: 20px;
			font-size: 16px;
			margin-top: 40px;
			margin-right: 150px;
			color: #606266;
			box-sizing: border-box;
			cursor: pointer;
			position: relative;
			.icon{
				display: inline-block;
			    vertical-align: top;
			    margin-left: 8px;
			    width: 0;
			    margin-top: 8px;
			    height: 0;
			    border-left: 7px solid transparent;
			    border-right: 7px solid transparent;
			    border-top: 7px solid #606266;
			    

			}
			.btn{
		    	position: absolute;
		    	width:152px;
	    	    top: 20px;
	    		left: 0px
		    }
		}
	}
</style>