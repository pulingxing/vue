<template lang="html">
	<transition name="slide">
		<div class="confirm">

			<header class="header">
				<div class="back" @click="confirmClick"></div>
				<h1>确认订单</h1>		
			</header>

			<section>
				<div class="userInfo">
					<img :src="orders.user_portrait" alt="">
					<span  class="username">{{orders.user_name}}&nbsp;&nbsp;发起订单：{{orders.order_no}}</span>
				</div>
				<div class="goodsInfo">
					<img :src="orders.goods_picture_url" alt="">
					<div class="info">
						<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
						<span class="title">{{orders.goods_name}}</span>
						<span class="style">
							<i v-if="orders.spec_name">{{chose}}</i>
							<i>{{orders.spec_name}}</i>
						</span>
						<span class="money">{{orders.price_goods}}</span>
						<span class="income">{{orders.amount_payment_name}}</span>
					</div>
				</div>
				<div class="priceInfo">
					<div class="box">
						<span>成单还需:<i>{{orders.remaining_pay_format}}</i></span>	
						<span class="payAll" @click="payAll()">全部支付</span></span>
					</div>
				</div>
				<!-- <div class="inputMoney"> -->
					<!-- <span>¥</span>
					<input type="number" v-model="values" placeholder="请输入帮付金额" @focus="focus()"> -->
					
				
				<!-- </div> -->
				<van-field
					v-model="values"
					label="¥"
					icon="clear"
					placeholder="请输入帮他付金额"
					@click-icon="values = ''"
				/>

				<div class="harvest" @click="handleClick">
					<span>成单后预计获得抵付金:¥{{orders.amount_payment_scale}}</span>
					<span>
						<img class="help" src="../../assets/images/bangtafu/icon_bangzhu.png" alt="">
					</span>
				</div>
				<div class="prompt">
					<span class="notice">!</span>
					该帮付订单最少支付 ¥{{orders.min_payment}}。
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

			<footer class="footers">
				<div class="payBtn" @click="sureClick()">确认支付</div>
			</footer>

			
		</div>
	</transition>
</template>

<script>
	import { Dialog } from 'vant';
	import Pay from '@/common/_pay.vue';
    export default {
		props:['preview'],
    	components:{
			'v-pay':Pay
        },
		data(){
			return {
				popupVisible:false,
				payShow:false,
				values:'',
				orders:{},
				helpDatas:{},
				chose:'已选：'	  
			};
		},
		created() {
			window.iosPayClick = this.iosPayClick;
			let orderId = this.preview;
			this.$api({
                method: 'post',
                url: 'order-help-pay/user-pre-confer-order',
                data: {
					token: window.token,
                    order_id: this.preview
                }
            }).then((response) => {
				this.orderDetailData = response.data;
				this.orders = this.orderDetailData.data;
				// console.log(this.orders)
            }).catch(function(error) {
                alert(error)
			});  
		},
		methods: {
			handleClick() {
		        this.popupVisible = !this.popupVisible;
			},
			
			confirmClick() {
            	this.$emit('confirmClicked')
			},
			focus(){
				this.placeholder='';
				const nav = document.querySelector(".footers")
				const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
				window.onresize = function () {
					const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
					if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
						if (clientHeight > nowClientHeight) {
							//键盘弹出的事件处理
							nav.style.bottom = '-8vh'
						}else{
							nav.style.bottom = '0'
						}
					}
				}
			},
			// 调用原生
			payAll() {
				let payAll = this.orders.remaining_pay;
				
				let orderType = 15
				this.$api({
						method: 'post',
						url: 'order-help-pay/user-submit-pre-order',
						data: {
							token: window.token,
							order_id: this.preview,
							current_pay: payAll
						}
					}).then((response) => {
						this.helpDatas = response.data.data;
						let orderIds = this.helpDatas.order_user_id;
						if(this.GLOBAL.isAndroid){
							console.log(orderIds,orderType);
							this.payClick(orderIds,orderType);
						}else {
							this.iosPayClick();
						}
					}).catch(function(error) {
						alert(error)
				});
				// 这里是调用安卓支付
				
				
				
			},
			// 调原生
			payClick(orderIds,orderType) {
				
				window.android.andPay(orderIds,orderType);
			},

			iosPayClick() {
				alert("ios找到我")
			},
		    sureClick() {
				let minPrice = this.orders.min_payment_float;
				let maxPrice = this.orders.remaining_pay;
				let remainPrice = this.orders.remaining_pay;
				let usesrId = this.orders.user_id;
				let isOwn = this.orders.is_own;
				let first = this.orders.order_first;
				if(this.values < minPrice){
					Dialog.alert({
						message: '低于最少帮付价格,请重新填写价格',
						confirmButtonText:'重新填写'
					}).then(() => {
					
					});
				}else if(this.values > maxPrice){
					Dialog.alert({
						message: '您填写的金额超过帮付最高价格,请重新填写价格',
						confirmButtonText:'重新填写'
					}).then(() => {
						
					});
				}else if(isOwn == 1 && first != 1 && this.values != maxPrice){
					Dialog.alert({
						message: '您是发起人，需支付订单剩余的全部金额',
						confirmButtonText:'重新填写'
					}).then(() => {
						
					});
				}else {
					Dialog.confirm({
						message: '确认支付',
						confirmButtonText:'确认'
					}).then(() => {
						this.$api({
								method: 'post',
								url: 'order-help-pay/user-submit-pre-order',
								data: {
									token: window.token,
									order_id: this.preview,
									current_pay: this.values
								}
							}).then((response) => {
								this.helpDatas = response.data.data;
								var orderIds = this.helpDatas.order_user_id;
								var orderType = 15;
								if(this.GLOBAL.isAndroid){
									console.log(orderIds,orderType);
									this.payClick(orderIds,orderType);
								}else {
									this.iosPayClick();
								}
							}).catch(function(error) {
								alert(error)
						});	
					}).catch(() => {
					});
				}	
		    }
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
			margin-bottom: 1vh;
			height: @vh;
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
			.userInfo {
				.fx();
				padding: 3vw;
				border: none;
				background: #fff;
				.fz(font-size,26);	
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
			
				img {
					width: 30vw;
					height: 30vw;
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
					color:#999999;
					.fz(font-size,34);
				}		
			}
			.harvest {
				.flex();
				margin-top: 3vw;
				background: #fff;
				padding: 3vw;
				.fz(font-size,28);
				img{
					width: 6vw;
					height: 6vw;
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
			height: @vh;
			position: fixed;
			bottom: 0;
			left: 0;
			// transition: bottom 0.2s;
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
