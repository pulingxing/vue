<template lang="html">
	<transition name="slide">
		<div class="check">
			<header class="header">
				<div class="back" @click="backClick"></div>
				<h1>确认订单</h1>		
			</header>
			<section>
				<div class="state">
					<img src="../../assets/images/bangtafu/icon_clock.png" alt="">
					<span>{{check.order_status_name}}</span>
				</div>
				<div class="userInfo">
					<span  class="username">{{address.consignee}}({{address.telephone}})</span>
					<span class="address">地址:{{address.region_name}}{{address.detail_address}}</span>
					<span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span> 
				</div>
				<div class="goodsInfo">
					<div class="imgBox">
						<img :src="check.goods_picture" alt="">
					</div>
					<div class="info">
						<img :src="check.goods_picture" alt="">
						<span class="title">{{check.goods_name}}</span>
						<span class="style">{{check.goods_spec_name}}</span>
						<span class="money">¥{{check.price_total}}</span>
						<span class="income">{{check.amount_payment_name}}</span>
					</div>
				</div>
				<div class="obtain">
					<div class="total">
						<span>订单合计(含运费)</span><i>¥{{check.price_total}}</i>
					</div>
					<div class="paid">
						<span>已帮付:</span><i>-&nbsp;¥{{check.has_paid}}</i>
					</div>
					<div>
						<span class="surplus">成单还需&nbsp;：&nbsp;<i>¥{{check.price_total-check.has_paid}}</i></span>
					</div>
				</div>
				<div class="boss">			
					<div class="personNumber" @click="nameClick">           
						<span>{{check.paid_user_word}}</span>
						<span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
					</div>
			
					<ul>
						<li class="bossInfo" v-for="u in check.users" :key="u.id">
							<img :src="u.portrait" alt="">
							<span class="phoneNumber">{{u.user_name}}<br>{{u.create_time_format}}</span>
							<span>{{u.help_money_format}}</span>
						</li>
					</ul>
				</div>
				<div class="orderDetial">
					<span v-for="l in check.logs" :key="l.id">{{l}}</span>

				</div>
				<div class="btn">	
					<div class="btnBox">
						<!-- <button @click="cancelOrder">取消订单</button>		 -->
						<button type="button" class="sharerBtn"
						v-clipboard:copy="message"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError"
						>分享好友</button>	
						<button class="see" @click="confirmClick">支付剩余</button>	
					</div>
				</div>
				<v-confirm @confirmClicked="confirmClick" v-if="showConfirm" :preview="check.order_id"></v-confirm>
				<v-name @nameClicked="nameClick" v-show="showName" :name="orders"></v-name>  
			</section>
		</div>
	</transition>
</template>

<script>
	import { Toast } from 'mint-ui';
	import Name from '@/common/_name.vue';
	import Confirm from  "@/components/help/confirm";
    export default {
		props:['check','address'],
		components:{
			'v-name':Name,
			'v-confirm':Confirm
		},
    	data(){
            return{
				popupVisible:false,
				showName:false,
				showConfirm:false,
				orderData:{},
				orders:{},
				cancleDatas:{},
				cancelVal:'',
				cancelIdx:'',
				reason:'',
				list:[],
				tips:[],
				message:'https://www.baidu.com/',
				radio:''
            };
        },
        methods:{
            handleClick() {
                this.popupVisible = !this.popupVisible ;
			},
			nameClick() {
				this.showName = !this.showName;
			},
			backClick() {
				this.$emit('backClicked')
			},
			confirmClick() {
				this.showConfirm = !this.showConfirm;
			},
			
			onCopy() {
				Toast({
					message: '复制成功',
					duration: 1000
				});
			},

			onError() {
				Toast({
					message: '无法复制该文本',
					duration: 1000
				});
			},
            
		}
		
    }
</script>

<style lang="less" scoped>
	@import '../../assets/fz.less';	
	.check {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 600;
		background: #fafafa;
		header {
			.flex();
			margin-bottom: 3vw;
			height: 14vw;
			color:#333;
			padding: 0 3vw;
			position: relative;
			background-color: #fff;
			.back {
				width: 3vw;
				height: 6vw;
				position: absolute;
				background: url("../../assets/images/bangtafu/icon_nav_back.png") no-repeat;
				background-size: 100% 100%; 
			}
			h1 {
				width:100%;
				text-align: center;
			}	
		}
		section {
			.state {
				.fx();
				padding: 5vw 3vw;
				background: #ff6666;
				margin-bottom:3vw;
				color: #fff;
				border: none;
				position: relative;
		        img{
		        	width: 6vw;
		        	height: 6vw;
		        	margin-right: 2vw;
		        }	        
	      	}
			.userInfo {
				width: 100%;
				padding: 3vw;
				background: #fff;
				margin-top:3vw;
				position: relative;
				.arrow {
					position: absolute;
			        width: 3vw;
			        height: 5vw;
			        top: 50%;
			        right:3vw;
			        transform: translateY(-50%);
				}
				.username {
					.fz(font-size,36);
					display: block;
					font-weight: bold;
					margin-bottom: 3vw;
				}
				.address {
					.fz(font-size,28);
				}	
			}	
			.goodsInfo {
				.flex();
				width: 100%;
				padding:3vw;
				background: #fafafa;
				.imgBox{
					width: 30vw;
					height: 30vw;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.info{
					width: 65%;
					height: 30vw;
					img {
						width: 5vw;
						height: 5vw;
					}
					.title {
						.fz(font-size,30);
						display: inline;
					}
					.style {
						display: block;
						margin:3vw 0;
						color: #999999;
						.fz(font-size,28);
					}
					.money{
						.fz(font-size,34);
						color: @cl;
						font-weight: 600;
					}
					.income {
						color: #ffffff;
                        .fz(font-size, 26);
                        border-radius: 4px;
                        padding: 0 2px;
                        background-color: #ccac68;	
					}
				}
			}
			.obtain {
				background: #fff;
				text-align: right;
				padding: 3vw;
				.fz(font-size,28);
				.total {
					.flex();
					padding-bottom: 1vw;
				}
				.paid {
					.flex();
					padding-bottom: 3vw;
				}
				.surplus {
					.bt();	
					width: 100%;
					padding-top:3vw;
					i {
						.fz(font-size,34);
						color: @cl;
						font-weight: 600;
					}				
				}
			}
			.boss {
		        width: 100%;
		        background: #fff;
		        margin-top: 3vw;
		        .personNumber {
		            .bd();
		            .flex();
		            padding: 3vw;
		          }
		        .bossInfo {
		        	.flex();
		            padding: 3vw;
		            .fz(font-size,28);
		            img{
			            width: 10vw;
			            height: 10vw;
			            border-radius: 50%;
		            }
		            
		        }
		    }	
		    .orderDetial {
		    	background: #fff;
		    	margin-top: 3vw;
		    	padding: 3vw;
		    	.fz(font-size,28);
		    	span {
		    		display: block;
		    		margin:2vw 0;
		    	}
			}
			.btn {
				padding: 0 3vw 3vw 3vw;
				background: #fff;
				.btnBox {
					.bt();
					.fl();	
					span ,button{
						margin: 2vw;
						width: 25vw;
						height: 10vw;
						text-align: center;
						line-height: 10vw;
						border: 1px solid rgba(185, 185, 185, .74);
						border-radius: 8vw;
						background: #fff;
					}
				}
			}
			.see {
				margin: 2vw;
				width: 25vw;
				height: 10vw;
				text-align: center;
				line-height: 10vw;
				border: 1px solid rgba(185, 185, 185, .74);
				border-radius: 8vw;
			}
			.mint-popup {
				width:100vw;

				h1 {
					text-align: center;
					line-height: @vh;
					background: #fafafa;
					position: relative;
					.confirm {
						position: absolute;
						right: 3vw;
						top:50%;
						transform: translateY(-50%;)
					}
				}
				.tips {
					.fz(font-size,26);
					padding: 3vw;
					span {
						display: block;
						color:#999999;
					}
				}
				.box {
					.flex();
				}
				
			}
		   

		}		
	}  
</style>
