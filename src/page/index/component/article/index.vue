<template>
	<div class='shop'>
		<el-button type="primary" class='addBtn' @click='handleClick'>添加文章</el-button>
		<el-table class='shop_table' :data="tableData"  style="width: 100%">
	      	<el-table-column prop="date" label="最后修改时间">
	      		<template slot-scope="scope">
		        	{{getDateTimeString(scope.row.date)}}
		      	</template>
	      	</el-table-column>
	      	<el-table-column prop="title" label="店名"></el-table-column>
	      	<el-table-column prop="webUrl" label="链接"></el-table-column>
	      	<el-table-column prop="imgUrl" label="文章图片">
                 <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" width="112" height="80" class="head_pic"/>
                </template>
            </el-table-column>
	      	<el-table-column fixed="right" label="操作" width="100">
		      	<template slot-scope="scope">
		        	<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
		      	</template>
		    </el-table-column>
	    </el-table>
	    <div class="block">
		  <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" v-if='total || total==0' :total="total"> </el-pagination>
		</div>


		<!-- 弹层新增或修改文章信息 -->
		<el-dialog @close="closeFn" title="店铺管理" v-if='dialogTableVisible' :visible.sync="dialogTableVisible" width='90%' top='5%'>
		  	<div>
  				<el-button type="primary" @click="submitForm">保存</el-button>
		  		<div class="uploadImg" v-if='!imgUrl'>
		  			<el-button class='btn' type="primary">上传/更换图片</el-button>
		  			<p>建议上传能突出店铺特色的、清晰美观高质量的横版照片。</p>
		  		</div>
		  		<div class="uploadImg" v-if='imgUrl'>
		  			<el-button class='btn' type="primary">上传/更换图片</el-button>
		  			<div class="drop"></div>
		  			<img :src="imgUrl">
		  		</div>
		  		
		  		<el-form :model="ruleForm" ref="form" :rules="rules" label-width="150px" class="demo-ruleForm">
		  			<el-form-item label="文章链接" prop="webUrl">
					    <el-input v-model="ruleForm.webUrl" placeholder="请输入店铺标题"></el-input>
					</el-form-item>
					<el-form-item label="文章标题" prop="title">
					    <el-input v-model="ruleForm.title" placeholder="请输入相关文章的链接"></el-input>
					</el-form-item>
					<el-form-item label="文章引言" prop="text">
					    <el-input v-model="ruleForm.text" placeholder="请输入文章引言"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm">保存</el-button>
					    <el-button type="danger" @click="delForm" v-if='id'>删除本条目</el-button>
				  	</el-form-item>
				</el-form>
		  	</div>
		</el-dialog>




	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      tableData: [],
	      curPage:1,
	      total:null,
	      imgUrl: 'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg',
	      ruleForm:{
	      	webUrl:'',
	      	title:'',
	      	text:''
	      },
	      //表单验证规则
	        rules: {
	          	webUrl: [{
	          		required: true, message: '请输入店铺标题', trigger: 'change' 
	          	}],
	          	title: [{
	          		required: true, message: '请输入相关文章的链接', trigger: 'change' 
	          	}],
	          	text:[{
	          		required: true, message: '请输入文章引言', trigger: 'change' 
	          	}]
	        },
	      	dialogTableVisible:false
	    }
	  },
	  created () {
		this.getShopList()
	  },
	  methods: {
	  	getDateTimeString(time){
	  		let date = new Date(parseInt(time))
	  		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
	  	},
	  	handleCurrentChange(curPage){
	  		this.curPage = curPage
	  		this.getShopList()
	  	},
	  	handleClick(item){
	  		if (item && item.id){
	  			this.id = item.id
	  			this.$http.get('/getArticleById', { params: {id: this.id}})
		  			.then(res => {
		  				if (res.body.ec == '200'){
		  					this.imgUrl = res.body.data[0].imgUrl
		  					this.ruleForm =  {
					          	webUrl: res.body.data[0].webUrl,
						      	title: res.body.data[0].title,
						      	text: res.body.data[0].text
					        }
		  				} else {
		  					this.$message.error(res.body.data)
		  				}
			      	});
	  		} else {
	  			this.id = null
	  			this.ruleFormRestart()
	  		}
	  		this.dialogTableVisible = true
	  	},
	  	ruleFormRestart(){
	  		// this.imgUrl = ''
	  		this.ruleForm =  {
	  			webUrl:'',
		      	title:'',
		      	text:''
	        }
	  	},
	  	getShopList(callback){
	  		var that = this
	  		this.$http.get('/getArticleList', { params: { curPage:this.curPage,pageSize:10}})
	  			.then(res => {
	  				that.tableData = res.body.data && res.body.data.list
	  				that.total = res.body.data.total
			        callback && callback()
		      	});
	  	},
	  	submitForm(){
	  		var that = this
	  		this.$nextTick(() => {
		        this.$refs.form.validate((valid) => {
		          if (valid) {
		          	this.ruleForm.imgUrl = this.imgUrl
		          	if (this.id){
		          		this.ruleForm.id = this.id
		          	}
		            this.$http.get('/addArticle', { params: this.ruleForm})
			  			.then(res => {
			  				if (res.body.ec == '200'){
			  					//刷新table
			  					this.curPage = 1
			  					this.getShopList(function(){
			  						that.dialogTableVisible = false
			  					})
			  					this.ruleFormRestart()
			  				}else {
								this.$message.error(res.body.data)
			  				}
				      	});
		          } else {
		            console.warn('error submit!!');
		            return false;
		          }
		        });
	        })
	  	},
	  	delForm(){
	  		var that = this
	  		this.$http.get('/delShop', { params: {id: this.id}})
	  			.then(res => {
			        if (res.body.ec == 200){
			        	this.$message({
				          message: res.body.data,
				          type: 'success'
				        });
				        this.tableData.map(function (item, index){
				        	if (item.id == that.id){
				        		that.tableData.splice(index,1)
				        		that.total = that.total-1
				        	}
				        })
			        } else {
			        	this.$message.error(res.body.data)
			        }
			        this.dialogTableVisible = false
		      	});
	  	},
	  	closeFn(){
	  		this.ruleFormRestart()
	  	}
	  },
	  components: {
	  }
	}
</script>
<style lang='less' scoped>
	.shop{
		padding-left: 20px;
		padding-top: 10px;
		.changeCity{
			display:inline-block;
			margin-left:10px;
		}
		.block{
			margin-top:20px;
		}
		.shop_table{
			margin-top: 20px;
		}
	}
	.uploadImg{
		width:390px;
		height:240px;
		background:#FDFDFD;
		text-align: center;
		border:1px solid #EBEBEB;
		margin-top:20px;
		position: relative;
		.btn{
			position: absolute;
			top: 20px;
			left: 50%;
			width:140px;
			margin-left: -70px;
			display:inline-block;
			margin-top:80px;
			z-index:9;
		}
		.drop{
			width:100%;
			position: absolute;
			height:100%;
			opacity: 0.4;
			background:#000;
			z-index:1;
		}
		p{
			margin-top:160px;
			color:#999
		}
		img{
			width:100%;
			height:100%;
		}
	}
	.demo-ruleForm{
		width:670px;
		margin-top:20px;
	}
</style>