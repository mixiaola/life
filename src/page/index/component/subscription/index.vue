<template>
	<div>
		<div class="left_img" v-if='!imgUrl'>
			<span>未上传</span>
		</div>
		<img :src="imgUrl" v-if='imgUrl' class='left_img'>
		<div class="right_content">
			<el-input v-model="imgUrl" placeholder="请输入图片链接"></el-input>
			<el-button type="primary"  class='primary' @click="showAlert">上传／更换图片</el-button>
			<div class='text1'>建议制作上传 640px* 700px 的图片（屏幕实际显示像素为 320px*350px）</div>
			<div class='switch'>
				<span>弹窗开关</span>
				<el-switch v-model="showFlag" @change='changeSwitch'></el-switch>
			</div>
			<div class='text2'>若关闭弹窗开关，则用户在使用中不会看到该弹窗。</div>
		</div>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	    	imgUrl: '',
	    	type: 'focus',
	    	showFlag: false
	    }
	  },
	  created () {
		this.getDate()
	  },
	  methods: {
	  	getDate(){
	  		this.$http.get('/getAlert', { params: {type:this.type}})
	  			.then(res => {
	  				if (res.body.ec == '200'){
	  					this.imgUrl = res.body && res.body.data && res.body.data.img || ''
	  					this.showFlag = (res.body && res.body.data && res.body.data.isShow) == '1'?true:false
	  					console.log(this.showFlag, 123123123)
	  				} else {
	  					this.$message.error(res.body.data);
	  				}
		      	});
	  	},
	  	changeSwitch(flag){
	  		this.showFlag = flag
	  		this.showAlert()
	  	},
	  	showAlert(){
	  		this.$http.get('/showAlert', { params: {isShow: this.showFlag, img:this.imgUrl,type:this.type}})
	  			.then(res => {
	  				if (res.body.ec == '200'){
	  					this.$message('修改成功');
	  				} else {
	  					this.$message.error(res.body.data);
	  				}
		      	});
	  	}
	  },
	  components: {
	  }
	}
</script>
<style scoped lang='less'>
	.primary{
		margin-top:10px;
	}
	.left_img{
		width:320px;
		height: 410px;
		line-height: 410px;
		text-align: center;
		display: inline-block;
		vertical-align: top;
		border:1px solid #EBEBEB;
		border-radius: 12px;
		margin-top: 20px;
		span{
			color: #bbb;
		}
	}
	.right_content{
		display: inline-block;
		vertical-align: top;
		margin-left: 32px;
		margin-top: 20px;
		.text1{
			width:250px;
			margin-top:32px;
			height:59px;
			line-height:30px;
			color:#606266;
		}
		.switch{
			margin-top:45px;
			margin-bottom:32px;
			span{
				margin-right:5px;
			}
		}
		.text2{
			margin-top:32px;
			color:#606266;
		}
	}
</style>