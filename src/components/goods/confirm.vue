<template lang="html">
	<transition name="slide">
		<div class="sure" v-show="confirmVisible">
			<header class="header">
				<router-link class="back" :to="{name:'发起订单'}">			
				</router-link>
				<h1>确认订单</h1>		
			</header>

			<section>
				<div class="userInfo" @click="editAddress()">
					<span  class="username">{{address.consignee}}</span>
					<span class="address">{{address.region_name}}</span>
					<span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span> 
				</div>
				<div class="goodsInfo">
					<div class="imgBox">
						<img :src="confirm.goods_picture">
					</div>
					<div class="info">
						<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
						<span class="title">{{confirm.goods_name}}</span>
						<span class="style">
							<i v-if="confirm.spec_name">{{chose}}</i>
							<i>{{confirm.spec_name}}</i>
						</span>
						<div class="priceBox">
							<div>
								<span class="money">¥{{confirm.price}}</span>
								<span class="income">{{confirm.amount_payment_name}}</span>
							</div>
							<span>×{{confirm.goods_number}}</span>
						</div>
					</div>
				</div>
				<div class="priceInfo">
					<span class="express">普通快递 ¥{{confirm.fare_price_format}}<img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
					<span class="money">共{{confirm.goods_number}}件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计: <i>¥{{confirm.price_total_format}}</i></span>
				</div>
				<div class="comment">
					<div class="commentBox">
						<textarea type="text"  @input="descInput" @focus="focus()" v-model="inputWords" placeholder="对参与帮付的朋友说声感谢吧~" onfocus="this.placeholder=''" maxlength="100"></textarea>
						<span class="remnant">{{remnant}}/20</span>
					</div>
				</div>	
			</section>

			<footer class="footers">
				<div class="priceBox">
					<span>合计:<i>¥{{confirm.price_total_format}}</i></span>
					<span class="tip">(含运费:{{confirm.fare_price_format}})</span>
				</div>
				
				<button class="payBtn" @click="submitOrder">找人代付</button>
				
			</footer>

			<v-success v-if="successShow" :success="successData"></v-success>

		</div>
	</transition>
</template>

<script>
	import Success from "@/components/goods/success.vue";
	import { Dialog } from 'vant';
    export default {
		props:['goodsInfo'],
		components: {
			'v-success':Success
		},
      	data(){
        	return {
			  popupVisible:false,
			  confirmVisible:true,
			  successShow:false,
			  remnant:20,
			  chose:'已选：',
			  confirmData:{},
			  thanksWords:'',
			  inputWords:'',
			  confirm:{},
			  address:{},
			  successData:{}
        	};
      	},
      	methods: {
      		handleClick() {
      			this.popupVisible = true;
			},
			backClick() {
				this.confirmVisible = !this.confirmVisible;
			},
			descInput() {
				var txtVal = this.inputWords.length;
				this.remnant = 20 - txtVal;
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
			submitOrder() { 
				let addressId = this.address.address_id;
				let goodsId = this.$route.params.goodsId;
				let goodsSpecId = this.$route.params.goodsSpecId;
				let thanksWords = this.inputWords;
				this.$api({
					method: 'post',
					url: '/order-help-pay/submit-pre-order',
					data:{
						token:window.token,
						goods_id:goodsId,
						goods_spec_id:goodsSpecId,
						address_id:addressId,
						thanks_words:thanksWords
					}
				}).then((response) => {
					this.submitData = response.data;
					this.successData = response.data.data;
					if(this.submitData.code == 0) {
						this.successShow = !this.successShow;
					}else {
						Dialog.alert({
							message: '提交失败,请稍后重新提交'
							}).then(() => {
							return
						});
					}
					console.log(this.successData)
				}).catch(function(error) {
					alert(error)
				})
						
			},
			editAddress() {
				window.webkit.messageHandlers.QBaddress.postMessage()
			}

		},
		  
	  	created() {
			this.$api({
				method: 'post',
				url: '/order-help-pay/pre-confer-order',
				data:{
					token:window.token,
					goods_spec_id: this.$route.params.goodsSpecId,
					goods_id: this.$route.params.goodsId
				}
			}).then((response) => {
				this.confirmData = response.data;
				this.confirm = this.confirmData.data;
				this.address =this.confirmData.data.address;
				console.log(this.confirm);
			}).catch(function(error) {
				alert(error)
			})	
        } 
    }
</script>

<style lang="less" scoped>
	@import '../../assets/fz.less';
	.sure {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 600;
		padding-bottom:14vw; 
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
			.arrow {
	            width: 3vw;
	            height: 5vw;
	            top: 50%;
	            right:3vw;
	            position: absolute;
	            transform: translateY(-50%);
			}
			.userInfo {
				width: 100%;
				padding: 3vw;
				margin-top:3vw;
				background: #fff;
				position: relative;
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
				margin:3vw 0;
				background: #fff;
				.fz(font-size,28);
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
						width: 4vw;
						height: 4vw;
					}
					.title {
						.fz(font-size,34);
						display: inline;
					}
					.style {
						margin:3vw 0;
						color: #999999;
						display: block;
					}
					.priceBox {
						.flex();
						.money{
							color: @cl;
							.fz(font-size,34);
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
			}
			.priceInfo {
				width: 100%;
				padding:0 3vw;
				margin-bottom: 3vw;
				background: #fff;
				.express {
					.bd();
					padding:3vw 0;
					display: block;
					position: relative;
					.fz(font-size,28);
					.arrow{
						right:0;
					}
				}
				.money{
					width: 100%;
					padding: 3vw;
					text-align: right;
					display: inline-block;
					i{
						color: @cl;
						.fz(font-size,34);
                        font-weight: 600;
					}
				}
			}
			.comment {
				width: 100%;
				padding: 5vw;
				background: #fff;
				.commentBox {
					position: relative;
					border: 1px solid rgba(185, 185, 185, .3);
					textarea {
						width: 100%;
						height: 20vw;
						border: none;	
					}
					.remnant {
						position: absolute;
						bottom: 0;
						right: 0;
						.fz(font-size,26);
					}
				}
				.thanks {
					border: 1px solid #ccc;
				}
			}
		}
		footer {
			.bt();
			.flex();
			width: 100%;
			height: @vh;
			bottom: 0;
			left: 0;
			position: fixed;
			background: #fff;
			bottom: 8vh;
			.priceBox {
				width: 60%;
				span{
					display: block;
					margin-left: 10%;
					.fz(font-size,28);
					&.tip {
						color: #999999;
						.fz(font-size,24);
					}
				}
				i {
					color: @cl;
					.fz(font-size,34);
					font-weight: 600;
				}
			}
				
			.payBtn {
				width: 40%;
				height: 100%;
				color: #fff;
				line-height: 14vw;
				text-align: center;
				background: #ccac68;
			}	
		}
	} 
</style>
