<template lang="html">
	<div class="success">
		<header class="header">
			<router-link class="back" :to="{name:'发起订单'}">			
			</router-link>
			<h1>成功发起</h1>		
    	</header>
		<div class="wrap">
		   	<img src="../../assets/images/bangtafu/icon_finish.png" alt="">
		   	<span class="title">您的帮付订单已经成功发起</span>
		   	<router-link :to="{name:'我的帮付'}">
		   		<span class="check">查看详情</span>
		   </router-link>
		</div>
		<div class="container">
			<div class="share">
			   	<span>立即分享给朋友,让他帮你付</span>
			   	<button type="button" class="sharerBtn"
				   v-clipboard:copy="message"
				   v-clipboard:success="onCopy"
				   v-clipboard:error="onError">一键分享</button>
				
				<!-- <button type="button" class="sharerBtn" @shareClick="share">一键分享</button> -->
			</div>  
			<div class="time">
				<div class="content">
					<img v-lazy="success.goods_picture">
					<span>成单还需:<i>¥{{success.order_price}}</i></span>
				</div>
				<v-countdown :startTime="success.remaining_begin_time" 
				:endTime="success.remaining_end_time" :tipText="'距离开始'" 
				:tipTextEnd="'距离结束'" :endText="'已过期'" :dayTxt="'：'" :hourTxt="'：'" 
				:minutesTxt="'：'" :secondsTxt="''">
				</v-countdown>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import CountDown from '@/common/_countdown.vue';
 	export default {
		props:['success'],
 		components: {
		    'v-countdown':CountDown
		},
		data() {
			return {
				
				startTime:0,
				endTime:0,
				message:'https://www.baidu.com/'

			}
		},
		methods: {
			onCopy: function (e) {
				Toast({
					message: '复制成功',
					duration: 1000
				});
			},
			onError: function (e) {
				Toast({
					message: '无法复制该文本',
					duration: 1000
				});
			}
			
		}
		 
 	}
</script>

<style lang="less" scoped>
 	@import '../../assets/fz.less';
	.success {
		width:100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 600;
		background: #fafafa;
		.header {
			.flex();
			height: 14vw;
			color:#333;
			position: relative;
			background-color: #fff;
			padding: 0 3vw;
			h1 {
				width:100%;
				text-align: center;
			}
			.back {
				width: 6vw;
				height: 6vw;
				position: absolute;
				background: url("../../assets/images/bangtafu/icon_close.png") no-repeat;
				background-size: 100% 100%; 
			}		
		}
		.wrap {
			.bt();
			width: 100%;
			height: 80vw;
			background: #fff;
			text-align: center;
			img {
				width: 30vw;
				margin-top: 5vw;
			}
			span {
				display: block;
				&.title {
					.fz(font-size,36);
					font-weight: bold;
					margin:6vw 0;
				}
				&.check {
					width: 40%;
					height: 12vw;
					line-height: 12vw;
					border: 1px solid #333333;
					border-radius: 10vw;
					position: relative;
					left: 30%; 
				}
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
					color: #fff;
					line-height: 10vw;
					text-align: center;
					background: @cl;
					border-radius: 8vw;
				}
			}
			.time {
				.flex();
				height: 15vw;
				padding: 0 3vw;
				.content {
					.flex();
					img {
						width: 10vw;
						height: 10vw;
						margin-right: 2vw;
					}
					i {
						color: @cl;
					}
				}
			}
		}

	}
</style>
