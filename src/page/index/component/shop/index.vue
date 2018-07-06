<template>
	<div class='shop'>
		<el-button type="primary" class='addBtn'>添加新店</el-button>
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
	      	<el-table-column prop="date" label="最后修改时间"></el-table-column>
	      	<el-table-column prop="name" label="店名"></el-table-column>
	      	<el-table-column prop="city" label="城市"></el-table-column>
	      	<el-table-column prop="pictures" label="描述图片">
                 <template slot-scope="scope">
                    <img :src="scope.row.pictures" width="112" height="80" class="head_pic"/>
                </template>
            </el-table-column>
	      	<el-table-column fixed="right" label="操作" width="100">
		      	<template slot-scope="scope">
		        	<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
		      	</template>
		    </el-table-column>
	    </el-table>
	    <div class="block">
		  <el-pagination
		    layout="total, prev, pager, next"
		    :total="80">
		  </el-pagination>
		</div>
		<el-dialog title="店铺管理" :visible.sync="dialogTableVisible" width='90%' top='5%'>
		  	<div>
  				<el-button type="primary">保存</el-button>
		  		<el-button>取消</el-button>
		  		<div class="uploadImg">
		  			<el-button class='btn'>上传/更换图片</el-button>
		  			<p>建议上传能突出店铺特色的、清晰美观高质量的横版照片。</p>
		  		</div>
		  		

		  		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  			<el-form-item label="店铺标题" prop="name">
					    <el-input v-model="shopTitle"></el-input>
					</el-form-item>
					<el-form-item label="优惠券标题" prop="name">
					    <el-input v-model="ticketTitle"></el-input>
					</el-form-item>
					<el-form-item label="使用简介" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="活动时间" required>
					    <el-col :span="6">
					      <el-form-item prop="date1">
					        <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="1">-</el-col>
					     <el-col :span="6">
					      <el-form-item prop="date2">
					        <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					      </el-form-item>
					    </el-col>
				  	</el-form-item>
				  	<el-form-item label="活动城市" prop="region">
					    <el-select v-model="ruleForm.region" placeholder="请选择活动城市">
					      <el-option label="全部" value="shanghai"></el-option>
					      <el-option label="北京" value="beijing"></el-option>
					    </el-select>
				  	</el-form-item>
				  	<el-form-item label="活动地址" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="经纬坐标" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="营业时间" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="电话" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="简介链接" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="个人页记录文案" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="标签" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  	</el-form-item>
				  	<el-form-item label="店内播放街声歌单" prop="delivery">
					    <el-switch v-model="ruleForm.delivery"></el-switch>
				  	</el-form-item>
				  	<el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					    <el-button @click="resetForm('ruleForm')">取消</el-button>
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
	    	ruleForm: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入活动名称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          region: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ],
	          date1: [
	            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          ],
	          date2: [
	            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
	          ],
	          type: [
	            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
	          ],
	          resource: [
	            { required: true, message: '请选择活动资源', trigger: 'change' }
	          ],
	          desc: [
	            { required: true, message: '请填写活动形式', trigger: 'blur' }
	          ]
	        },
	    	city: '全部',
	    	dialogTableVisible:false,
	      	tableData: [{
	          date: '2016-05-03',
	          name: '王小虎',
	          province: '上海',
	          city: '普陀区',
	          address: '上海市普陀区金沙江路 1518 弄',
	          zip: 200333,
	          pictures:'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg'
	        }, {
	          date: '2016-05-02',
	          name: '王小虎',
	          province: '上海',
	          city: '普陀区',
	          address: '上海市普陀区金沙江路 1518 弄',
	          pictures:'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg',
	          zip: 200333
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          province: '上海',
	          city: '普陀区',
	          address: '上海市普陀区金沙江路 1518 弄',
	          pictures:'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg',
	          zip: 200333
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          province: '上海',
	          city: '普陀区',
	          address: '上海市普陀区金沙江路 1518 弄',
	          pictures:'http://pic.616pic.com/ys_b_img/00/66/73/9KnqqgZBFe.jpg',
	          zip: 200333
	        }],
	    }
	  },
	  created () {
		
	  },
	  methods: {
	  	changeCityFn(city){
	  		console.log(city)
	  		this.city = city
	  	},
	  	handleCommand(command){
	  		this.$message('click on item ' + command);
	  	},
	  	handleClick(item){
	  		console.log(item)
	  		this.dialogTableVisible = true
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
		.btn{
			display:inline-block;
			margin-top:80px;
		}
		p{
			margin-top:16px;
		}
	}
	.demo-ruleForm{
		width:670px;
		margin-top:20px;
	}
</style>
