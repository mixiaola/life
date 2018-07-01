<template>
	<div>	hahah
		<el-input placeholder="请输入内容"></el-input>
		<el-input placeholder="请输入内容1"></el-input>
		<img :src="src">
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      list: [],
	      src: require('../../imgs/1.png')
	    }
	  },
	  created () {
	  	console.log(123131231)
	  },
	  methods: {
	  }
	}
</script>