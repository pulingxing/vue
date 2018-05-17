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
							<section v-else class="container" v-for="(p,index) in orders" :key="index">
								<div class="content">
									<span>订单编号:{{p.order_no}}</span>
									<count-down
									:startTime="p.remaining_begin_time" :endTime="p.remaining_end_time" 
									:tipText="'距离开始'" :tipTextEnd="'距离结束'" :endText="'已过期'" >
									</count-down>
								</div>
								<router-link :to="{name:'帮付订单',params:{orderId:p.order_id}}">
								<div class="goodsInfo">
									<div class="imgBox">
										<img :src="p.goods_url" alt="">
									</div>
									<div class="info">
										<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
										<span class="title">{{p.goods_name}}</span>
										<span class="style">已选：<i>{{p.goods_spec_name}}</i>丨<i>{{p.goods_spec_name}}</i></span>
										<span class="money">¥{{p.price_goods}}</span>
										<span class="income">{{p.amount_payment_name}}</span>
									</div>
								</div>
								</router-link>
								<div class="priceInfo">已帮付¥{{p.has_paid}},成单还需：<i>¥{{p.remaining_paying}}</i></div>
								<div class="btn">	
									<div class="btnBox">
										<button type="button" class="sharerBtn"
										v-clipboard:copy="message"
										v-clipboard:success="onCopy"
										v-clipboard:error="onError"
										>一键分享</button>	
										<button class="see" @click="payClick">继续支付</button>	
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
								<div class="goodsInfo" @click="stateClick(f)">
									<div class="imgBox">
										<img :src="f.goods_url" alt="">
									</div>
									<div class="info">
										<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
										<span class="title">{{f.goods_name}}</span>
										<span class="style">已选：<i>{{f.goods_spec_name}}</i>丨<i>{{f.goods_spec_name}}</i></span>
										<span class="money">¥{{f.price_goods}}</span>
										<span class="income">{{f.amount_payment_name}}</span>
									</div>
								</div>	
								<div class="priceInfo">已帮付¥{{f.has_paid}},成单还需：<i>¥{{f.remaining_paying}}</i></div>
								<div class="btn">	
									<div class="btnBox">
									<button class="see" @click="stateClick(f)">查看详情</button>		
									</div>
								</div>	
							</section>
						</mt-tab-container-item>
						<mt-tab-container-item id="fail">
							<section v-if="!orders.length" class="nothing">
								<div class="prompt">
									<img src="../../assets/images/bangtafu/icon_blank.png" alt="">
									<div>没有找到相关商品，重新试试吧~</div>
								</div>
							</section>
							<section v-else class="container" v-for="(val,index) in orders" :key="index">
								<div class="content">
									<span>未成单</span>
								</div>
								<div class="goodsInfo">
									<div class="imgBox">
										<img :src="val.goods_url" alt="">
									</div>
									<div class="info">
										<img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
										<span class="title">{{val.goods_name}}</span>
										<span class="style">已选：<i>{{val.goods_spec_name}}</i>丨<i>{{val.goods_spec_name}}</i></span>
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
			
			<v-pay v-if="payShow" @payClicked="payClick"></v-pay>
			<v-state  v-if="stateShow" @stateClicked="stateClick" :orderUserId="orderUserId"></v-state>
		</div>
	</transition>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Dialog } from 'vant';
	import Confirm from  "@/components/help/confirm";
	import State from "@/components/mine/state"
	import Pay from "@/common/_pay.vue"
	import CountDown from 'vue2-countdown'
	import BScroll from 'better-scroll';
	export default{
		components: {
			'v-confirm':Confirm,
			'v-state':State,
		    CountDown
		},
		data(){
			return {
				selected:'paying',
				orders:{},
				initiateDatas:{},
				payShow:false,
				showConfirm:false,
				stateShow:false,
				orderUserId :'',
				message:"https://www.baidu.com/",
				listHeight:[],  
                scrollY:0,
			};
	    },
	    methods:{
			getPaying() {
				this.$api({
					method:'post',
					url:'/order-help-pay/orders-user-initiate',
					data:{
						token:window.token,
						page:2,
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
					url:'/order-help-pay/orders-user-initiate',
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
					console.log(this.initiateDatas);
				}).catch((error)=>{
					console.log(error);
				})
			},
			getFail() {
				this.$api({
					method:'post',
					url:'/order-help-pay/orders-user-initiate',
					data:{
						token:window.token,
						order_type:'fail'
					}
				}).then((res)=>{
					this.initiateDatas = res.data;
					this.orders =  this.initiateDatas.data.orders;
					this.orderId = this.initiateDatas.data.orders.order_id;
					this.$nextTick(() => {
						this._initScroll();
					})
					console.log(this.initiateDatas);
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
			payClick () {
                this.payShow = !this.payShow
			},
			confirmClick() {
				this.showConfirm = !this.showConfirm;
			},
			stateClick(f){
				this.stateShow = !this.stateShow;
				this.orderUserId = f.order_user_id
			},
			deleteOrder(val,index) {
				Dialog.confirm({
					message:'确认删除'
				}).then(() => {
					this.$api({
						method:'post',
						url:'/order-help-pay/delete-user-order',
						data:{
							token:window.token,
							order_user_id:val.order_user_id
						}
					}).then(() => {
						this.orders.splice(index,1);
					})
							
				}).catch(() => {
					return
				});
				
			},
			
			_initScroll() {
					this.meunScroll = new BScroll(this.$refs.menuwrapper, {
					click: true
				})
			}		
		},
		created() {
			this.$api({
				method:'post',
				url:'/order-help-pay/orders-user-initiate',
				data:{
					token:window.token,
					page:2,
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
						.fz(font-size,28);	
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
							span,button {
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