<template>
	<section class="frozen">
		<v-header><h1 slot="title">我的帮付</h1></v-header>
		<div>
			<div class="box">
				<img src="../../assets/images/bangtafu/icon_frozen.png" alt="">
				<span>帮付冻结：<i>¥199.00</i></span>
			</div>
			<mt-navbar class="page-part" v-model="selected"> 
                <mt-tab-item id="1">冻结中</mt-tab-item>
                <mt-tab-item id="2">已到账</mt-tab-item>
                <mt-tab-item id="3">已失效</mt-tab-item>
            </mt-navbar>
	        <mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<ul>
						<li >
							<div class="goodsInfo">
								<img src="" alt="">
								<div class="container">
									<div class="money">
										<h1>抵付金</h1>
										<span class="num">¥24.00</span>
									</div>
									<span class="number">订单编号：</span>
									<span>支付时间：</span>
								</div>
							</div>
							<router-link :to="{name:'状态页'}">
								<div class="check">
									<span>查看详情</span>
									<img src="../../assets/images/bangtafu/icon_arrow.png" alt="">
								</div>
							</router-link>
						</li>
					</ul>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<ul>
						<li >
							<div class="goodsInfo">
								<img src="" alt="">
								<div class="container">
									<div class="money">
										<h1>抵付金</h1>
										<span class="num">¥24.00</span>
									</div>
									<span class="number">订单编号：</span>
									<span>支付时间：</span>
								</div>
							</div>
							<router-link :to="{name:'查看详情'}">
								<div class="check">
									<span>查看详情</span>
									<img src="../../assets/images/bangtafu/icon_arrow.png" alt="">
								</div>
							</router-link>
						</li>
					</ul>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<ul>
						<li >
							<div class="goodsInfo">
								<img src="" alt="">
								<div class="container">
									<div class="money">
										<h1>抵付金</h1>
										<span class="num">¥24.00</span>
									</div>
									<span class="number">订单编号：</span>
									<span>支付时间：</span>
								</div>
							</div>
							<router-link :to="{name:'查看详情'}">
								<div class="check">
									<span>查看详情</span>
									<img src="../../assets/images/bangtafu/icon_arrow.png" alt="">
								</div>
							</router-link>
						</li>
					</ul>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</section>
</template>

<script>
	import Header from  '@/common/_header.vue'
	export default{
		components:{
			'v-header':Header
		},
		data(){
			return {
				selected:'1',
				helpList:[]
			}
		},
	    created(){
	        this.$api({
	            method:'get',
	            url:'http://192.168.3.15/index/help-pay-hall'
	        }).then((res)=>{
	            this.helpList = res.data;
	            console.log(this.helpList);
	        }).catch((error)=>{
	            console.log(error);
	        })
    	}

	}
</script>

<style lang="less" scoped>
	@import "../../assets/fz.less";
	.frozen {
		background: #fafafa;
		height: 100%;
		.box {
			.fx();
			.bd();
			padding: 3vw;
			margin: 3vw 0;
			background: #fff;
			img {
				width: 7vw;
				height: 7vw;
				margin-right: 2vw;
			}
		}
		ul {
			width: 95%;
			margin: 3vw auto;
			background: #fff;
			li {
				width: 100%;
				.fz(font-size,28);
				.goodsInfo {
					padding: 3vw;
					position: relative;
					display: flex;
					justify-content: flex-start;				
					img {
						width: 15vw;
						height: 15vw;
						margin-right: 3vw;
					}
					.money {
						.fz(font-size,34);
						font-weight: 600;
						h1 {
							.fz(font-size,34);
							font-weight: 600;
						}
						.num {
							position: absolute;
							top: 3vw;
							right:3vw;
						}						
					}
					.number {
						display: block;
						margin: 2vw 0;
					}
				}
				.check {
					.bt();
					.flex();
					padding: 3vw;
					img {
						width: 3vw;
						height: 5vw;
					}
				}
			}
		}
	}
</style>