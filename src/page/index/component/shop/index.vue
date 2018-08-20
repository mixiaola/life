<template>
	<div class='shop'>
		<el-button type="primary" class='addBtn' @click='handleClick'>添加新店</el-button>
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
			    	<el-dropdown-item command='台北'>台北</el-dropdown-item>
			  	</el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-table class='shop_table' :data="tableData"  style="width: 100%">
	      	<el-table-column prop="date" label="最后修改时间">
	      		<template slot-scope="scope">
                    {{getDateTimeString(scope.row.date)}}
                </template>
	      	</el-table-column>
	      	<el-table-column prop="shopTitle" label="店名"></el-table-column>
	      	<el-table-column prop="city" label="城市"></el-table-column>
	      	<el-table-column prop="imgUrl" label="描述图片">
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
		<!-- 弹层新增或修改店铺信息 -->
		<el-dialog @close='closeFn' title="店铺管理" v-if='dialogTableVisible' :visible.sync="dialogTableVisible" width='90%' top='5%'>
		  	<div>
  				<el-button type="primary" @click="submitForm">保存</el-button>
		  		<!-- <div class="uploadImg" v-if='!imgUrl'>
		  			<el-button class='btn' type="primary">上传/更换图片</el-button>
		  			<p>建议上传能突出店铺特色的、清晰美观高质量的横版照片。</p>
		  		</div>
		  		<div class="uploadImg" v-if='imgUrl'>
		  			<el-button class='btn' type="primary">上传/更换图片</el-button>
		  			<div class="drop"></div>
		  			<img :src="imgUrl">
		  		</div> -->
		  		

		  		<el-form :model="ruleForm" ref="form" :rules="rules" label-width="150px" class="demo-ruleForm">
		  			<el-form-item label="店铺标题" prop="shopTitle">
					    <el-input v-model="ruleForm.shopTitle" placeholder="请输入店铺标题"></el-input>
					</el-form-item>
					<el-form-item label="店铺图片" prop="imgUrl">
					    <el-input v-model="ruleForm.imgUrl" placeholder="请输入店铺标题"></el-input>
					</el-form-item>
					<el-form-item label="优惠券标题" prop="ticketTitle">
					    <el-input v-model="ruleForm.ticketTitle" placeholder="请输入优惠券标题"></el-input>
					</el-form-item>
					<el-form-item label="使用简介" prop="intro">
					    <el-input type="textarea" v-model="ruleForm.intro"  placeholder="请输入使用简介"></el-input>
				  	</el-form-item>
				  	<el-form-item label="活动时间" required>
					    <el-col :span="8">
					      <el-form-item prop="validtiyStart">
					        <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.validtiyStart" style="width: 100%;"></el-date-picker>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="1"></el-col>
					     <el-col :span="8">
					      <el-form-item prop="validtiyEnd">
					        <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.validtiyEnd" style="width: 100%;"></el-date-picker>
					      </el-form-item>
					    </el-col>
				  	</el-form-item>
				  	<el-form-item label="活动城市" prop="city">
					    <el-select v-model="ruleForm.city" placeholder="请选择活动城市">
					      <el-option label="全部" value="全部"></el-option>
					      <el-option label="上海" value="上海"></el-option>
					      <el-option label="厦门" value="厦门"></el-option>
					      <el-option label="成都" value="成都"></el-option>
					      <el-option label="武汉" value="武汉"></el-option>
					      <el-option label="台北" value="台北"></el-option>
					    </el-select>
				  	</el-form-item>
				  	<el-form-item label="活动地址" prop="address">
					    <el-input type="text" v-model="ruleForm.address"  placeholder="请输入活动地址"></el-input>
				  	</el-form-item>
				  	<el-form-item label="经纬坐标" prop="lag">
					    <el-input type="text" v-model="ruleForm.lag" placeholder="请输入经纬坐标（格式：精度;纬度）"></el-input>
				  	</el-form-item>
				  	<el-form-item label="营业时间" prop="shopStartTime">
					    <el-input type="text" v-model="ruleForm.shopStartTime" placeholder="请输入营业时间"></el-input>
				  	</el-form-item>
				  	<el-form-item label="电话" prop="phone">
					    <el-input type="text" v-model="ruleForm.phone"  placeholder="请输入电话"></el-input>
				  	</el-form-item>
				  	<!-- todo -->
				  	<el-form-item label="简介图文">
					    <template slot-scope="scope" class='introInfoContainer'>
					    	<el-button @click='addText'> + 添加文字段落</el-button>
					    	<el-button @click='addImg'> + 添加图片</el-button>
					    	<div class="introInfo" v-for='item in ruleForm.introInfo'>
					    		<el-input type="textarea" v-if='item.uid=="text"' v-model='item.content' placeholder='请输文字段落'></el-input>
					    		<el-input type="text" v-if='item.uid!="text"' v-model='item.content' placeholder='请输入图片url'></el-input>
					    	</div>
					    </template>
				  	</el-form-item>
				  	<el-form-item label="个人页记录文案" prop="personText">
					    <el-input type="textarea" v-model="ruleForm.personText" placeholder="请输入个人页记录文案"></el-input>
				  	</el-form-item>
				  	<el-form-item label="标签" prop="label">
					    <el-input type="text" v-model="ruleForm.label" placeholder="请输入标签"></el-input>
				  	</el-form-item>
				  	<el-form-item label="店内播放街声歌单" prop="music">
					    <el-switch v-model="ruleForm.music"></el-switch>
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
	    	id: null,
	    	curPage: 1,
	    	city: '全部',
	    	total: null,
	    	// imgUrl: 'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg',
	    	ruleForm: {
	    		imgUrl:'',
	          shopTitle: '',
	          ticketTitle: '',
	          intro: '',
	          validtiyStart: '',
	          validtiyEnd: '',
	          city: '',
	          address: '',
	          lag: '',
	          shopStartTime: '',
	          phone: '',
	          introInfo:[],
	          personText: '',
	          label: '',
	          music: true,
	        },
	        //表单验证规则
	        rules: {
	        	imgUrl:[{
	        		required: true, message: '请输入店铺图片链接', trigger: 'change' 
	        	}],
	          	shopTitle: [{
	          		required: true, message: '请输入店铺标题', trigger: 'change' 
	          	}],
		        ticketTitle: [{
		        	required: true, message: '请输入优惠券标题', trigger: 'change' 
		        }],
		        intro: [{
		        	required: true, message: '请输入使用简介', trigger: 'change'
		        }],
		        validtiyStart: [{
		        	// type: 'date', required: true, message: '请选择活动开始时间', trigger: 'change' 
		        	required: true, message: '请选择活动开始时间', trigger: 'change' 
		        }],
		        validtiyEnd: [{
		        	// type: 'date', required: true, message: '请选择活动结束时间', trigger: 'change' 
		        	required: true, message: '请选择活动结束时间', trigger: 'change' 
		        }],
		        city: [{
		        	required: true, message: '请选择城市', trigger: 'change' 
		        }],
		        address:[{
		        	required: true, message: '请填写地址', trigger: 'change'
		        }],
		        lag: [{
		        	required: true, message: '请填写经纬度（格式：精度;纬度）', trigger: 'change' 
		        }],
		        shopStartTime: [{
		        	required: true, message: '请填写活动开始时间', trigger: 'change' 
		        }],
		        phone: [{
		        	required: true, message: '请填写电话号码', trigger: 'change' 
		        }],
		        introInfo: [{
		        	required: true, message: '请填写简介图文', trigger: 'change'
		        }],
		        personText: [{
		        	required: true, message: '请填写简介链接', trigger: 'change' 
		        }],
		        label: [{
		        	required: true, message: '请填写标签', trigger: 'change' 
		        }]
	        },
	    	dialogTableVisible:false,
	      	tableData: [],
	    }
	  },
	  created () {
		this.getShopList()
	  },
	  methods: {
		checkTypeIsArray (o) {
       		return Object.prototype.toString.call(o)=="[object Array]";
		},
	  	addText(){
	  		if (!this.checkTypeIsArray(this.ruleForm.introInfo)){
	  			this.ruleForm.introInfo = []
	  		}
	  		this.ruleForm.introInfo.push({
	  			uid:'text',
	  			content:''
	  		})
	  	},
	  	addImg(){
	  		if (!this.checkTypeIsArray(this.ruleForm.introInfo)){
	  			this.ruleForm.introInfo = []
	  		}
	  		this.ruleForm.introInfo.push({
	  			uid:'img',
	  			content:''
	  		})
	  	},
	  	getDateTimeString(time){
	  		let date = new Date(parseInt(time))
	  		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
	  	},
	  	handleCurrentChange(curPage){
	  		this.curPage = curPage
	  		this.getShopList()
	  	},
	  	handleCommand(command){
	  		this.city = command
	  		this.getShopList()
	  	},
	  	getShopList(callback){
	  		var that = this
	  		this.$http.get('/getShopList', { params: {city: this.city, curPage:this.curPage,pageSize:10}})
	  			.then(res => {
	  				that.tableData = res.body.data && res.body.data.list
	  				that.total = res.body.data.total
			        callback && callback()
		      	});
	  	},
	  	ruleFormRestart(){
	  		// this.imgUrl = ''
	  		this.ruleForm =  {
	  			imgUrl:'',
	          shopTitle: '',
	          ticketTitle: '',
	          intro: '',
	          validtiyStart: '',
	          validtiyEnd: '',
	          city: '',
	          address: '',
	          lag: '',
	          shopStartTime: '',
	          phone: '',
	          introInfo:[],
	          personText: '',
	          label: '',
	          music: true
	        }
	  	},
	  	handleClick(item){
	  		if (item && item.id){
	  			this.id = item.id
	  			this.$http.get('/getShopById', { params: {id: this.id}})
		  			.then(res => {
		  				if (res.body.ec == '200'){
		  					console.log('data->', res.body.data[0])
		  					this.ruleForm =  {
		  						imgUrl: res.body.data[0].imgUrl,
					          shopTitle: res.body.data[0].shopTitle,
					          ticketTitle: res.body.data[0].ticketTitle,
					          intro: res.body.data[0].intro,
					          validtiyStart: res.body.data[0].validtiyStart,
					          validtiyEnd: res.body.data[0].validtiyEnd,
					          city: res.body.data[0].city,
					          address: res.body.data[0].address,
					          lag: res.body.data[0].lag,
					          shopStartTime: res.body.data[0].shopStartTime,
					          phone: res.body.data[0].phone,
					          personText: res.body.data[0].personText,
					          label: res.body.data[0].label,
					          music: res.body.data[0].music=='1'? true: false,
					          introInfo:JSON.parse(res.body.data[0].introInfo)
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
	  	submitForm(){
	  		var that = this
	  		this.$nextTick(() => {
		        this.$refs.form.validate((valid) => {
		          if (valid) {
		          	if (this.ruleForm && this.ruleForm.lag && this.ruleForm.lag.split(';').length!=2){
		          		console.log(this.ruleForm.lag.split(';'))
		          		this.$message.error('请输入正确的经纬度坐标')
		          		return 
		          	}
		          	if (this.id){
		          		this.ruleForm.id = this.id
		          	}
		          	if (this.checkTypeIsArray(this.ruleForm.introInfo)){
		          		this.ruleForm.introInfo = JSON.stringify(this.ruleForm.introInfo)
		          	}
		          	if (typeof this.ruleForm.validtiyStart != 'string'){
		          		this.ruleForm.validtiyStart = this.ruleForm.validtiyStart.getFullYear() + '-' +  (parseInt(this.ruleForm.validtiyStart.getMonth()) + 1) + '-' +  this.ruleForm.validtiyStart.getDate()
		          	}
		          	if (typeof this.ruleForm.validtiyEnd != 'string'){
		          		this.ruleForm.validtiyEnd = this.ruleForm.validtiyEnd.getFullYear() + '-' +  (parseInt(this.ruleForm.validtiyEnd.getMonth()) + 1) + '-' +  this.ruleForm.validtiyEnd.getDate()
		          	}
		          	if (this.ruleForm.music){
		          		this.ruleForm.music = 1
		          	}else {
		          		this.ruleForm.music = 0
		          	}
		          	console.log('this.ruleForm-->', this.ruleForm)
		            this.$http.get('/addNewShop', { params: this.ruleForm})
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
	.introInfo{
		max-width:300px;
		img{
			width:100%;
			vertical-align: top;
		}
	}
</style>
