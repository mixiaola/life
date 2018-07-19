<template>
	<div class='manage_page'>
		<el-row class="tac">
			<div class="border"></div>
		  	<el-col :span="5" class='menu'>
			    <el-menu
			      default-active="2"
			      class="el-menu-vertical-demo">
			      <el-submenu index="1">
			        <template slot="title">
			          <!-- <i class="el-icon-location"></i> -->
			          <span>内容管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="1-1" @click='handleclick(1,1)'>店铺管理</el-menu-item>
			          <el-menu-item index="1-2" @click='handleclick(1,2)'>文章管理</el-menu-item>
			          <el-menu-item index="1-3" @click='handleclick(1,3)'>推荐标签管理</el-menu-item>
			          <el-menu-item index="1-4" @click='handleclick(1,4)'>Banner管理</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="2">
			        <template slot="title">
			          <!-- <i class="el-icon-location"></i> -->
			          <span>弹窗管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="2-1" @click='handleclick(2,1)'>输入口令引导弹窗</el-menu-item>
			          <el-menu-item index="2-2" @click='handleclick(2,2)'>公众号关注引导弹窗</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="3">
			        <template slot="title">
			          <!-- <i class="el-icon-location"></i> -->
			          <span>数据管理</span>
			        </template>
			        <el-menu-item-group>
			          <el-menu-item index="3-1" @click='handleclick(3,1)'>口令管理</el-menu-item>
			          <el-menu-item index="3-2" @click='handleclick(3,2)'>数据统计查看</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			    </el-menu>
		  	</el-col>
		  	<el-col :span="16" class='manage'>
		  		<Index v-if="managePage=='index'"></Index>
		  		<Shop v-if="managePage=='shop'"></Shop>
		  		<Article v-if="managePage=='article'"></Article>
		  		<Lable v-if="managePage=='lable'"></Lable>
		  		<Banner v-if="managePage=='banner'"></Banner>
		  		<Command v-if="managePage=='command'"></Command>
		  		<Subscription v-if="managePage=='subscription'"></Subscription>
		  		<Ticket v-if="managePage=='ticket'"></Ticket>
		  		<Query v-if="managePage=='query'"></Query>
		  	</el-col>
		</el-row>
	</div>
</template>
<script>
	import Index from './component/index/index.vue'
	import Shop from './component/shop/index.vue'
	import Article from './component/article/index.vue'
	import Lable from './component/lable/index.vue'
	import Banner from './component/banner/index.vue'
	import Command from './component/command/index.vue'
	import Subscription from './component/subscription/index.vue'
	import Ticket from './component/ticket/index.vue'
	import Query from './component/query/index.vue'
  	export default {
	  	data () {
		    return {
		      managePage: 'shop'
		    }
		},
	    methods: {
	      handleclick(key, keyPath) {
	      	if (key == '1' && keyPath == '1'){
	      		this.managePage = 'shop'
	      	}else if(key == '1' && keyPath == '2'){
	      		this.managePage = 'article'
	      	}else if(key == '1' && keyPath == '3'){
	      		this.managePage = 'lable'
	      	}else if(key == '1' && keyPath == '4'){
	      		this.managePage = 'banner'
	      	}else if(key == '2' && keyPath == '1'){
	      		this.managePage = 'command'
	      	}else if(key == '2' && keyPath == '2'){
	      		this.managePage = 'subscription'
	      	}else if(key == '3' && keyPath == '1'){
	      		this.managePage = 'ticket'
	      	}else if(key == '3' && keyPath == '2'){
	      		this.managePage = 'query'
	      	}
	      }
	    },
	    components: {
		  	Index,
		  	Shop,
		  	Article,
		  	Lable,
		  	Banner,
		  	Command,
		  	Subscription,
		  	Ticket,
		  	Query
		  }
  	}
</script>
<style lang='less' scoped>
	.manage_page{
		height:100%;
		.tac{
			height:100%;
		}
	}
	.tac ul{
		height:100%;
	}
	.menu{
		position: fixed;
	    bottom: 0;
	    top: 100px;
	}
	.manage{
		margin-left: 23%;
		margin-top: 20px;
		min-height:440px;
	}
</style>