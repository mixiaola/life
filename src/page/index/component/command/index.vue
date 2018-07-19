<template>
	<div>
		<div class="left_img">
			<span>未上传</span>
		</div>
		<div class="right_content">
			<el-button type="primary">上传／更换图片</el-button>
			<div class='text1'>建议制作上传 640px*820px 的图片（屏幕实际显示像素为 320px*410px）</div>
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
	    	imgUrl: 'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg',
	    	type: 'input',
	    	showFlag: false
	    }
	  },
	  created () {
		
	  },
	  methods: {
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