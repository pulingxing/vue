<template lang="html">
	<div class="success">
		<header>
		    <router-link class="back" :to="{name:'帮TA付'}">			
			</router-link>
			<h1>帮付成功</h1>		
    	</header>
    	<section  v-if="">
			<div class="wrap">
			   	<img src="../../assets/images/bangtafu/icon_finish.png" alt="">
			   	<span class="title">帮付成功</span>
			   	<div class="checkDetial"  @click="show">
			   		<div class="check">查看详情</div>
				   	<div class="dropDown" v-show="isShow">
				   		<router-link class="initiator btn" :to="{name:'查看详情'}">
				   			发起人支付
				   		</router-link>
				   		<router-link class="initiator btn" :to="{name:'冻结页'}">
				   			帮付人支付
				   		</router-link>
				   	</div>
			   	</div>
			</div>
			<div class="content">
				<div class="orderInfo">
				   	<span>订单金额</span>
				   	<span>¥20</span>
				</div> 
				<div class="payInfo">
				   	<span>支付方式</span>
				   	<span>微信支付</span>
				</div>
			</div>
			<div class="container">
				<div class="share">
				   	<span>立即分享给朋友,让他帮你付</span>
				   	<span class="sharerBtn">一键分享</span>
				</div>  
				<div class="time">
					<div class="timeInfo">
						<img src="" alt="">
						<span>成单还需:¥</span>
					</div>
					<count-down :currentTime="1521086188" :startTime="1521086188" 
					:endTime="1521110010" :tipText="'距离开始'" :tipTextEnd="'距离结束'" 
					:endText="'已过期'" :dayTxt="''" :hourTxt="'：'" :minutesTxt="'：'" :secondsTxt="''"></count-down>
				</div>
			</div>
		</section>
		

	</div>
</template>

<script>
	import CountDown from 'vue2-countdown'
 	export default {
 		components: {
		    CountDown
		},
 		data() {
 			return {
 				isShow:false,
 				startTime:""
 			}
 		},
 		methods:{
 			show() {
 				this.isShow = !this.isShow;
 			},
 			countDownS_cb: function (x) {
		    	
		  	},
		  	countDownE_cb: function (x) {
		    	
		  	}
 		}
 	}
</script>

<style lang="less" scoped>
 	@import '../../assets/fz.less';
	.success {
		background: #fafafa;
		height: 100%;
		header {
			height: 12vw;
			padding: 0 3vw;
			display: flex;
			align-items: center;
			color:#333;
			background-color: #fff;
			.back {
			position: absolute;
			width: 6vw;
			height: 6vw;
			background: url("../../assets/images/bangtafu/icon_close.png") no-repeat;
			background-size: 100% 100%; 
			}
			h1 {
				width:100%;
				text-align: center;
			}	
		}
		section{
			.wrap {
				.bt();
				width: 100%;
				text-align: center;
				height: 80vw;
				background: #fff;
				img {
					width: 30vw;
					margin-top: 5vw;
				}	
				.title {
					.fz(font-size,36);
					font-weight: bold;
					display: block;
					margin:6vw 0;
				}
				.checkDetial {
					position: relative;
					.check {
						width: 40%;
						height: 12vw;
						margin: 0 auto;
						line-height: 12vw;
						border-radius: 10vw;
						border: 1px solid #333333;
					}
					.dropDown {
						width: 28vw;
						height: 22vw;
						position: absolute;
						top: 5vw;
						right: 10vw;
						background: #fff;
						border: 1px solid #666;
						display: flex;
						flex-wrap: wrap;
						align-content: center;
						justify-content: center;
						.btn{
							width: 90%;
							height:8vw;
							margin: 1vw;
							line-height: 8vw;
							background: rgba(185, 185, 185, .14);
							border: 1px solid #666;
						}
					}
				}
				
			}
			.content{
				background: #fff;
				margin-top: 3vw;
				.orderInfo,.payInfo {
					.bd();
					.flex();
					height: 15vw;
					padding: 3vw;
				}	
			}
			.container {
				margin-top: 3vw;
				background: #fff;
				.fz(font-size,28);
				.share {
					.bd();
					.flex();
					height: 15vw;
					margin:3vw 3vw 0 3vw;				
					.sharerBtn {
						width: 25vw;
						height: 10vw;
						line-height: 10vw;
						text-align: center;
						color: #fff;
						background: @cl;
						border-radius: 8vw;
					}
				}
				.time {
					height: 15vw;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 3vw;
					.timeInfo {
						display: flex;
						align-items: center;
						justify-content: space-between;
						img {
							width: 10vw;
							height: 10vw;
							margin-right: 2vw;
						}
					}
				}
			}
		}

	}
</style>
