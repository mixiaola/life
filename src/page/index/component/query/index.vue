<template>
	<div class='container'>
		<div class='titleUser'>总体单个用户量</div>
		<div class='titleUserNumber'>{{ticketNumber}}</div>
		<div class='titleTicket'>优惠总使用数量</div>
		<div class='titleTicketNumber'>{{userNumber}}</div>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      userNumber:'',
	      ticketNumber: ''
	    }
	  },
	  created () {
	  	this.getData()
	  },
	  methods: {
	  	getData(){
	  		this.$http.get('/query', { params: {}})
	  			.then(res => {
	  				if (res.body.ec == '200'){
	  					console.log('res-->', res.body.data)
	  					this.userNumber = res.body && res.body.data && res.body.data.usedNum
	  					this.ticketNumber = res.body && res.body.data && res.body.data.alluserNum
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
	.container{
		color:#606266;
		margin-left:100px;
		.titleUser{
			margin-top:40px;
			font-size: 14px;
		}
		.titleUserNumber{
			margin-top:20px;
			font-size: 40px;
		}
		.titleTicket{
			margin-top:80px;
			font-size: 14px;
		}
		.titleTicketNumber{
			margin-top:20px;
			font-size: 40px;
		}
	}
</style>