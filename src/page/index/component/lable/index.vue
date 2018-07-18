<template>
	<div>
		<div class="text">此处已添加的标签，会出现在「搜索页」及「搜索无结果页」作为给用户的搜索关键词引导。两处显示最多显示两行，建议添加 6-8 个，每个标签字数 2-5 个。确保此处输入的推荐标签是添加的店铺已有标签。</div>
		<div class="lable">
			<el-button class='lable_button' v-for="item in tableData" :key="item.id" type="primary">{{item.text}} <i class="el-icon-delete el-icon--right" @click="delLable(item)"></i></el-button>
		</div>
		<div class="input">
			<el-input v-model="inputLable" placeholder="请输入标签" style='width: 300px;'></el-input>
			<el-button type="primary" class='btn' @click="add">添加</el-button>
		</div>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	    	inputLable:'',
	      	tableData: [],
	    }
	  },
	  created () {
		this.getLable()
	  },
	  methods: {
	  	delLable(item){
	  		let that = this
	  		console.log('item-->', item)
	  		this.$http.get('/delLabel', { params: {id: item.id}})
	  			.then(res => {
	  				this.tableData.map(function (ite, index){
			        	if (ite.id == item.id){
			        		that.tableData.splice(index,1)
			        	}
			        })
		      	});
	  	},
	  	add(){
	  		if(!this.inputLable){
	  			this.$message.error('请输入标签名字')
	  			return
	  		}
	  		let that = this
	  		this.$http.get('/addLabel', { params: {text: this.inputLable}})
	  			.then(res => {
	  				if (res.body.ec == 200){
	  					that.getLable()
	  					that.inputLable = ''
			        } else {
			        	this.$message.error(res.body.data)
			        }
		      	});
	  	},
	  	getLable(callback){
	  		var that = this
	  		this.$http.get('/getLabelList', { params: {}})
	  			.then(res => {
	  				if (res.body.ec == 200){
		  				that.tableData = res.body.data && res.body.data.list
				        callback && callback()
			        } else {
			        	this.$message.error(res.body.data)
			        }
		      	});
	  	}
	  },
	  components: {
	  }
	}
</script>
<style scoped lang='less'>
	.text{
		width: 470px;
		color:#606266;
		line-height:1.5;
	}
	.lable{
		margin-top:40px;
		margin-bottom:40px;
		width: 600px;
		.lable_button{
			margin-right:20px;
			margin-bottom:20px;
			margin-left:0;
		}
	}
	.input{

	}
</style>