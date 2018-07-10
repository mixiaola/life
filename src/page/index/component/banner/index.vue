<template>
	<div  class='shop'>
		<el-button type="primary" class='addBtn' @click='handleClick'>添加新banner</el-button>
		<div class="changeCity">
			<el-dropdown @command="handleCommand">
			  	<el-button type="primary">
			    	选择城市<i class="el-icon-arrow-down el-icon--right"></i>
			  	</el-button>
			  	<el-dropdown-menu slot="dropdown">
			    	<el-dropdown-item command='全部'>全部</el-dropdown-item>
			    	<el-dropdown-item command='上海'>上海</el-dropdown-item>
			    	<el-dropdown-item command='厦门'>厦门</el-dropdown-item>
			    	<el-dropdown-item command='成都'>成都</el-dropdown-item>
			    	<el-dropdown-item command='武汉'>武汉</el-dropdown-item>
			  	</el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-table class='shop_table' :data="tableData"  style="width: 100%">
	      	<el-table-column prop="validtiyEnd" label="添加时间"></el-table-column>
	      	<el-table-column prop="sort" label="展示权重"></el-table-column>
	      	<el-table-column prop="link" label="链接"></el-table-column>
	      	<el-table-column prop="img" label="文章图片">
                 <template slot-scope="scope">
                    <img :src="scope.row.img" width="112" height="80" class="head_pic"/>
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
		<el-dialog @close='closeFn' title="店铺管理" v-if='dialogTableVisible' :visible.sync="dialogTableVisible" width='90%' top='5%'>
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
		  			<el-form-item label="跳转链接" prop="webUrl">
					    <el-input v-model="ruleForm.webUrl" placeholder="请输入店铺标题"></el-input>
					</el-form-item>
					<el-form-item label="活动城市" prop="link">
					    <el-select v-model="ruleForm.link" placeholder="请选择活动城市">
					      <el-option label="全部" value="shanghai"></el-option>
					      <el-option label="上海" value="beijing"></el-option>
					      <el-option label="厦门" value="beijing"></el-option>
					      <el-option label="成都" value="beijing"></el-option>
					      <el-option label="武汉" value="beijing"></el-option>
					    </el-select>
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
	      city:'全部',
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
	  	handleCommand(command){
	  		this.city = command
	  		this.getShopList()
	  	},
	  	handleCurrentChange(curPage){
	  		this.curPage = curPage
	  		this.getShopList()
	  	},
	  	getShopList(callback){
	  		var that = this
	  		this.$http.get('/getBannerList', { params: {city: this.city, curPage:this.curPage,pageSize:10}})
	  			.then(res => {
	  				that.tableData = res.body.data && res.body.data.list
	  				that.total = res.body.data.total
	  				console.log(res, 12313123)
			        callback && callback()
		      	});
	  	},
	  	handleClick(item){
	  		if (item && item.id){
	  			this.id = item.id
	  			//todo 获取页面数据接口
	  			// this.$http.get('/getShopList', { params: {city: this.city, curPage:this.curPage,pageSize:10}})
		  		// 	.then(res => {
		  		// 		that.tableData = res.body.data && res.body.data.result
		  		// 		that.total = res.body.data.total
				  //       console.log('res->', res)
			   //    	});
	  		} else {
	  			this.id = null
	  			this.ruleFormRestart()
	  		}
	  		this.dialogTableVisible = true
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
		            this.$http.get('/addBanner', { params: this.ruleForm})
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
	  		this.$http.get('/delBanner', { params: {id: this.id}})
	  			.then(res => {
			        if (res.body.ec == 200){
			        	this.$message({
				          message: res.body.data,
				          type: 'success'
				        });
				        this.tableData.map(function (item, index){
				        	if (item.id == that.id){
				        		that.tableData.splice(index,1)
				        	}
				        })
			        } else {
			        	this.$message.error(res.body.data)
			        }
			        this.dialogTableVisible = false
		      	});
	  	},
	  	ruleFormRestart(){
	  		this.ruleForm =  {
	        }
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