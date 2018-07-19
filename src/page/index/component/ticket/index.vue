<template>
	<div>
		<div class="text">此处已添加的口令，意味着用户在小程序使用时输入任意一条口令即可获得全部优惠，每个用户只能领取一次。</div>
		<div class="lable">
			<el-button class='lable_button' v-for="item in tableData" :key="item.id" type="primary">{{item.command}} <i class="el-icon-delete el-icon--right" @click="delLable(item)"></i></el-button>
		</div>
		<div class="input">
			<el-input v-model="inputLable" placeholder="请输入新口令" style='width: 300px;'></el-input>
			<el-button type="primary" class='btn' @click="add">添加口令</el-button>
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
	  		this.$http.get('/delCommand', { params: {id: item.id}})
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
	  			this.$message.error('请输入新口令')
	  			return
	  		}
	  		let that = this
	  		this.$http.get('/addCommand', { params: {command: this.inputLable}})
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
	  		this.$http.get('/getCommandlist', { params: {}})
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