<template>
	<div class='index'>
		<div class='title'>欢迎 admin！</div>
		<div class='text'>在右侧导航选择要管理的部分。</div>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      tableData: [],
	    }
	  },
	  created () {
		
	  },
	  methods: {
	  	
	  },
	  components: {
	  }
	}
</script>
<style scoped lang="less">
	.index{
		.title{
			color:#000000;
			font-size:40px;
			font-weight: bolder;
			margin-top:70px;
			margin-left:70px;
		}
		.text{
			font-size:24px;
			color:rgba(0,0,0,0.54);
			margin-top:30px;
			margin-left:70px;
		}
	}
</style>