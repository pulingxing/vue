<template lang="html">
	<transition name="slide">
		<div class="confirm">
			<v-header><h1 slot="title">我的帮付</h1></v-header>

			<section>
				<div class="userInfo">
					<img :src="orders.user_portrait" alt="">
					<span  class="username">{{orders.user_name}}&nbsp;&nbsp;发起订单：{{orders.order_no}}</span>
				</div>
				<div class="goodsInfo">
					<div class="imgBox">
						<img :src="orders.goods_goods_picture_url" alt="">
					</div>
					<div class="info">
						<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
						<span class="title">{{orders.goods_name}}</span>
						<span class="style">80|500ml</span>
						<span class="money">{{orders.price_goods}}</span>
						<span class="income">{{orders.amount_payment_name}}</span>
					</div>
				</div>
				<div class="priceInfo">
					<div class="box">
						<span>成单还需:<i>{{orders.remaining_pay_format}}</i></span>	
						<span class="payAll">全部支付</span></span>
					</div>
				</div>
				<div class="inputMoney">
					<span>¥</span>
					<input type="number" v-model="values" placeholder="请输入帮付金额" onfocus="this.placeholder=''" onblur="if (value=='') {placeholder='请输入帮付金额'}">
				</div>
				<div class="harvest" @click="handleClick">
					<span>成单后预计获得抵付金:¥202</span>
					<span>
						<img class="help" src="../../assets/images/bangtafu/icon_bangzhu.png" alt="">
					</span>
				</div>
				<div class="prompt">
					<span class="notice">!</span>
					该帮付订单最少支付 ¥{{orders.min_payment_float}}。
				</div>
				<div class="popup" v-show="popupVisible">
					<div class="message">
						<h1>帮付收益说明</h1>
						<p> 1、抵付金 = 帮付人实付款 × 返还比例；<br>
							2、发起的帮付订单在完成所需数额后，正式生效，帮付人所得的抵付金处于冻结状态，在发起人确认收货的7天后发放；<br>
							3、订单未完成或是发起人有退款的情况下，订单失败，已冻结的抵付金失效，帮付人支付的金额将全部返还；<br>
							4、发起人支付自己发起的帮付订单时，无抵付金收益；<br>
							5、如有疑问请咨询客服热线400-115-6966。</p>
						<button @click="handleClick">我知道了</button>
					</div>
				</div>
			</section>

			<footer>
				<div class="payBtn" @click="sureClick">确认支付</div>
			</footer>
		</div>
	</transition>
</template>

<script>
	import { Dialog } from 'vant';
	import Header from '@/common/_header.vue'
    export default {
		props:['preview'],
    	components:{
            'v-header':Header
        },
		data(){
			return {
				popupVisible:false,
				orders:{},
				values:''	  
			};
		},
		methods: {
			handleClick() {
		        this.popupVisible = !this.popupVisible;
			},
		    sureClick() {
				if(this.values < 20){
					Dialog.alert({
						message: '该订单最少支付20,请重新填写支付金额',
						confirmButtonText:'重新填写'

					}).then(() => {
					// on close
					});
				}else{
					Dialog.confirm({
						message: '弹窗内容'
					}).then(() => {
						this.$router.push({path:'/pay'})
					}).catch(() => {
					// on cancel
					});
				}
				
		    }
		},
		created() {
			console.log(this.$route.params.payingId);
			this.$api({
                method: 'post',
                url: 'order-help-pay/user-pre-confer-order',
                data: {
					token:window.token,
                    order_id: this.$route.params.payingId
                }
            }).then((response) => {
				this.orderDetailData = response.data;
				this.orders = this.orderDetailData.data       
                console.log(this.orderDetailData); 
            }).catch(function(error) {
                alert(error)
            })
		}
    }
</script>

<style lang="less" scoped>
	@import '../../assets/fz.less';	
	.confirm {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 600;
		background: #fafafa;
		header {
			.flex();
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
			margin-top: 3vw;
			.userInfo {
				.fx();
				padding: 3vw;
				border: none;
				background: #fff;	
				img {
              	  	width: 10vw;
              	  	height: 10vw;
              	  	margin-right: 3vw;
              	  	border-radius: 50%;
            	}       
	      	}
			.goodsInfo {
				.flex();
				width: 100%;
				padding: 3vw;
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
					.fz(font-size,28);
					img {
						width: 4vw;
						height: 4vw;
					}
					.title {
						display: inline;
					}
					.style {
						display: block;
						margin:3vw 0;
						color: #999999;
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
			.priceInfo {
				padding:3vw;
				background: #fff;
				.fz(font-size,28);
				.box{
					.bd();
					.flex();
					width: 100%;
					height: 15vw;
					.payAll {
						width: 20vw;
						height: 8vw;
						.fz(font-size,24);
						text-align: center;
						border-radius: 27px;
						line-height: 8vw;
						border: 1px solid #666666;
					}
				}
			}
			.inputMoney {
				.flex();
				width: 100%;
				height: 20vw;
				padding:3vw;		
				background: #fff;
				.fz(font-size,50);
				input {
					width: 95%;
					height: 10vw;
					.fz(font-size,50);
				}		
			}
			.harvest {
				.flex();
				margin-top: 3vw;
				background: #fff;
				padding: 3vw;
				.fz(font-size,28);
				img{
					width: 30px;
					height: 30px;
				}
			}
			.prompt {
				padding: 3vw;
				.fz(font-size,24);
				.notice {
					width: 4vw;
					height: 4vw;
					text-align: center;
					line-height: 4vw;
					border-radius: 50%;
					background:#ff6666;
					color: #fff; 
					display: inline-block;
				}
			}
			.popup {
				position: absolute;
				top: 0;
				left: 0;
				width:100%; 
				height: 100%;
				z-index: 100;
				background: rgba(0,0,0,0.5);
				.message {
					width: 80%;
					margin:0 auto;
					.fz(font-size,28);
					padding: 5vw 3vw;
					border-radius: 12px;
					background: #fff;
					position: relative;
					top: 50%;
					transform: translateY(-50%);

					h1 {
						text-align: center;
						.fz(font-size,34);
						font-weight: bold;
						padding-bottom:3vw;
					}
					p {
						line-height: 8vw;
						padding-bottom: 3vw;
					}
					button {
						width: 100%;
						height: 10vw;
						margin: 0 auto;
						display: block;
						border-radius: 8vw;
						color: #fff;
						background:@cl; 
					}
				}
			}
		}

		footer {
			width: 100%;
			height: 14vw;
			position: fixed;
			bottom: 0;
			left: 0;
			.payBtn {
				width: 100%;
				height: 100%;
				line-height: 14vw;
				color: #fff;
				text-align: center;
				background: @cl;
			}
			.mint-popup {
				width: 80%;
				.fz(font-size,28);
				line-height: 8vw;
				border-radius: 12px;
				background: #fafafa;
				text-align: center;
				p{
					padding: 3vw;
				}
				.reinputBtn {
					border-top: 1px solid #999999;
					height: 12vw;
					text-align: center;
					line-height: 12vw;
					color: @cl;				 
				}
				.confirmBtn {
					border-top: 1px solid #999999;
					height: 14vw;
					span {
						width: 49%;
						height: 100%;
						line-height: 14vw;
						border: none;
						display: inline-block;
						text-align: center;
						border-bottom-radius: 12px;
						&.cancel {
							border-right: 1px solid #999999;
						}
						&:active {
							color: @cl;
						}
					}
				}
			}	
		}
	}  
</style>
