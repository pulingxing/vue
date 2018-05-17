<template>
	<transition name="slide">
		<div class="wrap">
			<mt-navbar class="page-part" v-model="selected">
				<div class="navbar" @click="getPaying"><mt-tab-item id="paying">进行中</mt-tab-item></div>
				<div class="navbar" @click="getPaid"><mt-tab-item id="paid">已成单</mt-tab-item></div>
				<div class="navbar" @click="getFail"><mt-tab-item id="fail">未成单</mt-tab-item></div>
			</mt-navbar>
			<div class="menu-wrapper" ref="menuwrapper">
				<div>
					<mt-tab-container v-model="selected">
						<mt-tab-container-item id="paying">
							<section v-if="!orders.length" class="nothing">
								<div class="prompt">
									<img src="../../assets/images/bangtafu/icon_blank.png" alt="">
									<div>您还没有订单哦~</div>
								</div>
							</section>
							<section v-else class="container" v-for="(val,index) in orders" :key="index">
								<div class="content">
									<span>订单编号:{{val.order_no}}</span>
									<count-down
									:startTime="val.remaining_begin_time" :endTime="val.remaining_end_time" 
									:tipText="'距离开始'" :tipTextEnd="'距离结束'" :endText="'已过期'" 
									:dayTxt="''" :hourTxt="'：'" :minutesTxt="'：'" :secondsTxt="''">
									</count-down>
								</div>
								<div @click="checkClick(val,index)">
									<div class="goodsInfo">
										<div class="imgBox">
											<img :src="val.goods_picture" alt="">
										</div>
										<div class="info">
											<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
											<span class="title">{{val.goods_name}}</span>
											<span class="style">
												<i v-if="val.goods_spec_name">{{chose}}</i>
												<i>{{val.goods_spec_name}}</i>
											</span>
											<span class="money">¥{{val.price_goods}}</span>
											<span class="income">{{val.amount_payment_name}}</span>
										</div>
									</div>
								</div>

								<div class="priceInfo">已帮付¥{{val.has_paid}},成单还需：<i>¥{{val.remaining_paying}}</i></div>
								<div class="btn">
									<div class="btnBox">
										<button @click="cancelOrder(val,index)">
											取消订单
										</button>	
										<button type="button" class="sharerBtn"
										v-clipboard:copy="url"
										v-clipboard:success="onCopy"
										v-clipboard:error="onError"
										>一键分享</button>	
										<button class="see" @click="confirmClick(val,index)">支付剩余</button>
											
									</div>
								</div>
							</section>
						</mt-tab-container-item>
						<mt-tab-container-item id="paid">
							<section v-if="!orders.length" class="nothing">
								<div class="prompt">
									<img src="../../assets/images/bangtafu/icon_blank.png" alt="">
									<div>您还没有订单哦~</div>
								</div>
							</section>
							<section class="container" v-for="f in orders" :key="f.id">
								<div class="content" >
									<span>订单编号:{{f.order_no}}</span>
									<span>已成单</span>
								</div>	
								<router-link class="goodsInfo" :to="{name:'已完成订单',params:{orderId:f.order_id}}">
									<div class="imgBox">
										<img :src="f.goods_picture" alt="">
									</div>
									<div class="info">
										<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
										<span class="title">{{f.goods_name}}</span>
										<span class="style">
											<i v-if="f.goods_spec_name">{{chose}}</i>
											<i>{{f.goods_spec_name}}</i></span>
										<span class="money">¥{{f.price_goods}}</span>
										<span class="income">{{f.amount_payment_name}}</span>
									</div>
								</router-link>
								<div class="priceInfo">已帮付¥{{f.has_paid}},成单还需：<i>¥{{f.remaining_paying}}</i></div>
								<div class="btn">	
									<div class="btnBox">
										<router-link class="see" 
										:to="{name:'已完成订单',params:{orderId:f.order_id}}">
											查看详情
										</router-link>		
									</div>
								</div>	
							</section>
						</mt-tab-container-item>
						<mt-tab-container-item id="fail">
							<section v-if="!orders.length" class="nothing">
								<div class="prompt">
									<img src="../../assets/images/bangtafu/icon_blank.png" alt="">
									<div>您还没有未成单的订单</div>
								</div>
							</section>
							<section v-else class="container" v-for="(val,index) in orders" :key="index">
								<div class="content">
									<span>订单编号:{{val.order_no}}</span>
									<span>未成单</span>
								</div>
								<div class="goodsInfo">
									<div class="imgBox">
										<img :src="val.goods_picture" alt="">
									</div>
									<div class="info">
										<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
										<span class="title">{{val.goods_name}}</span>
										<span class="style">
											<i v-if="val.goods_spec_name">{{chose}}</i>
											<i>{{val.goods_spec_name}}</i></span>
										<span class="money">¥{{val.price_goods}}</span>
										<span class="income">{{val.amount_payment_name}}</span>
									</div>
								</div>
								<div class="priceInfo">已帮付¥{{val.has_paid}},成单还需：<i>¥{{val.remaining_paying}}</i></div>
								<div class="btn">	
									<div class="btnBox">
									<span @click="deleteOrder(val,index)">删除订单</span>			
									</div>
								</div>	
							</section>
						</mt-tab-container-item>
					</mt-tab-container>
				</div>
			</div>
			<!-- 取消订单弹窗 -->
			<mt-popup v-model="popupVisible" position="bottom" >
				<h1>取消订单
					<span class="confirm" @click="sureReason">确认</span>
				</h1>
				<div class="tips">
					<span v-for="t in tips" :key="t.id">{{t}}</span>
				</div>
				<van-radio-group v-model="radio">
					<van-cell-group>
					<van-cell v-for="(item,index) in list" 
					@click="getReason(item,index)"
					:key="index">
						<div class="box">
						{{item}}
						<van-radio :name="index"></van-radio>
						</div>
						
					</van-cell>
					</van-cell-group>
				</van-radio-group>
			</mt-popup>	

			<v-confirm @confirmClicked="confirmBack" v-if="showConfirm" :preview="orderId"></v-confirm>
			<v-check @backClicked="backClick" v-if="showCheck" :check="checkOrder" :address="checkOrder.address"></v-check>  
			
		</div>
		
	</transition>
</template>

<script>
	import { Dialog } from 'vant';
	import { Toast } from 'mint-ui';
	import Confirm from  "@/components/help/confirm";
	import Check from '@/components/mine/check';
	import BScroll from 'better-scroll';
	import CountDown from 'vue2-countdown'
	export default{
		components: {
			CountDown,
			'v-confirm':Confirm,
			'v-check':Check
		},
		data() {
			return {
				selected:'paying',
				checked:true,
				chose:'已选：',
				orders:{},
				initiateDatas:{},
				popupVisible:false,
				showConfirm :false,
				showCheck:false,
				orderId:'',
				radio:'',
				cancleDatas:{},
				checkOrder:{},
				cancelVal:'',
				cancelIdx:'',
				reason:'',
				list:[],
				tips:[],
				listHeight:[],  
                scrollY:0,
				url:'https://www.baidu.com/',
			};
	    },
	    methods: {
			_initScroll() {
					this.meunScroll = new BScroll(this.$refs.menuwrapper, {
					click: true
				})        
			},
			confirmClick(val,index) {
				this.showConfirm = !this.showConfirm;
				this.orderId = val.order_id
			},
			confirmBack() {
				this.showConfirm = !this.showConfirm;
			},
			backClick() {
				this.showCheck = !this.showCheck;
			},
			getPaying() {
				this.$api({
					method:'post',
					url:'/order-help-pay/orders-initiate',
					data:{
						token:window.token,
						order_type:'paying'
					}
				}).then((res)=>{
					this.initiateDatas = res.data;
					this.orders =  this.initiateDatas.data.orders;
					this.$nextTick(() => {
						this._initScroll();
					})
				}).catch((error)=>{
					console.log(error);
				})
			},
			getPaid() {
				this.$api({
					method:'post',
					url:'/order-help-pay/orders-initiate',
					data:{
						token:window.token,
						order_type:'paid'
					}
				}).then((res)=>{
					this.initiateDatas = res.data;
					this.orders =  this.initiateDatas.data.orders;
					this.$nextTick(() => {
						this._initScroll();
					}) 	
				}).catch((error)=>{
					console.log(error);
				})
			},
			getFail() {
				this.$api({
					method:'post',
					url:'/order-help-pay/orders-initiate',
					data:{
						token:window.token,
						order_type:'fail'
					}
				}).then((res)=>{
					this.initiateDatas = res.data;
					this.orders =  this.initiateDatas.data.orders;
					this.failId = this.initiateDatas.data.orders.order_id;
					this.$nextTick(() => {
						this._initScroll();
					})
				}).catch((error)=>{
					console.log(error);
				})
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
			checkClick(val,index) {
				
				this.$api({
					method: 'post',
					url: '/order-help-pay/order-detail-own',
					data: {
						token:window.token,
						order_id:val.order_id
					}
				}).then((response) => {
					this.orderData = response.data; 
					this.checkOrder = this.orderData.data;
					this.showCheck = !this.showCheck;
				}).catch(function(error) {
					alert(error)
				})
			},

			cancelOrder(val,index) {
				this.popupVisible = !this.popupVisible;
				this.$api({
					method:'post',
					url:'/order-help-pay/cancel-order',
					data:{
						token:window.token	
					}
				}).then((res)=>{
					this.cancleDatas = res.data;
					this.tips = this.cancleDatas.data.tips;
					this.list = this.cancleDatas.data.reasons;
					this.cancelVal = val;
					this.cancelIdx = index;
				}).catch((error)=>{
					console.log(error);
				})
			},

			getReason(item) {
				this.reason = item
				// console.log(this.reason)
			},
			
			sureReason() {
				let orderId = this.cancelVal.order_id
				let index = this.cancelIdx
				this.popupVisible = !this.popupVisible;
				this.$api({
					method:'post',
					url:'/order-help-pay/cancel-order',
					data:{
						token:window.token,
						order_id:orderId,
						cancel_reason:this.reason
					}
				}).then((res)=>{
					this.orders.splice(index,1);
				}).catch((error)=>{
					console.log(error);
				})
			},
			
			deleteOrder(val,index) {
				Dialog.confirm({
					message:'确认删除'
				}).then(() => {
					this.$api({
						method:'post',
						url:'order-help-pay/delete-order',
						data:{
							token:window.token,
							order_id:val.order_id
						}
					}).then(() => {
						this.orders.splice(index,1);
					})
							
				}).catch(() => {
					return
				});
				
			}
				
		},
		created() {
			this.$api({
				method:'post',
				url:'/order-help-pay/orders-initiate',
				data:{
					token:window.token,
					order_type:'paying'
				}
			}).then((res)=>{
				this.initiateDatas = res.data;
				this.orders =  this.initiateDatas.data.orders;
				this.$nextTick(() => {
                    this._initScroll();
				})
				// console.log(this.initiateDatas)
			}).catch((error)=>{
				console.log(error);
			})
		}

	}
</script>

<style lang="less" scoped>
	@import '../../assets/fz.less';
	.wrap {

		.page-part{
            .bd();
			.flex();
			height: 7vh;
            .is-selected {
                // border-bottom: none;
				color:@cl; 
				border-bottom: 3px solid #f03d37
            }
            .navbar {
                width: 20vw;
			}
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
				
		.menu-wrapper{
			height: 77vh;
			overflow: hidden;
			.mint-tab-container {
				width: 100%;
				margin-top: 3vw;
				.nothing {
					width: 100vw;
					height: 76vh;
					.prompt {
						position: relative;
						top:20vh;
						background: #fafafa;
						text-align: center;
						.fz(font-size,40);
						
					}
				}
				.container{ 
					margin-bottom:3vw;
					.content {
						.flex();
						flex-wrap: nowrap;
						padding: 3vw;
						background: #fff;
						.fz(font-size,26);	
					}    
					.goodsInfo {
						.bt();
						.bd();
						.flex();
						width: 100%;
						height: 40vw;
						padding: 0 3vw;
						// margin: 3vw 0;
						background: #fff;
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
						text-align: right;
						i {
							.fz(font-size,34);
							color: @cl;
							font-weight: 600;
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
				} 
				
			}
		}
	}
</style>