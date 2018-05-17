<template>
	<transition name="slide">
		<section class="state">
			<header class="header">
				<div class="back" @click="stateClick">			
				</div>
				<h1>确认订单</h1>		
			</header>
			<div class="goodsInfo">
				<img :src="datas.goods_picture" alt="">
				<div class="container">
					<div class="money">
						<h1>{{datas.credit_name}}</h1>
						<span class="num">¥{{datas.gold_money}}</span>
					</div>
					<span class="number" v-for="g in datas.logs" :key="g.id">{{g}}</span>
				</div>
			</div>
			<van-steps direction="vertical" :active="0" active-color="#f60">
				<van-step v-for="h in datas.contents" :key="h.id">
					<h3>{{h.content}}</h3>
					<p>{{h.time}}</p>
				</van-step>	
			</van-steps>
		</section>
	</transition>
</template>

<script>
	import Header from  '@/common/_header.vue'
	export default{
		props:['orderUserId'],
		components:{
			'v-header':Header
		},
		data(){
			return {
				orderDetailData:{},
				datas:{}
			}
		},
		created() {
			console.log(this.orderUserId)
            this.$api({
                method: 'post',
                url: 'order-help-pay/user-order-detail',
                data: {
					token:window.token,
                    order_user_id: this.orderUserId
                }
            }).then((response) => {
				this.orderDetailData = response.data;
				this.datas = this.orderDetailData.data; 
                console.log(this.orderDetailData); 
            }).catch(function(error) {
                alert(error)
            })  
		},
		methods:{
			stateClick() {
            	this.$emit('stateClicked')
			},
		}

	}
</script>

<style lang="less" scoped>
	@import "../../assets/fz.less";
	.state {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top:0;
		left: 0;
		z-index:600;
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
		.goodsInfo {
			padding: 3vw;
			position: relative;
			background: #fff;
			display: flex;
			justify-content: flex-start;
			margin:3vw 0;				
			img {
				width: 15vw;
				height: 15vw;
				margin-right: 3vw;
			}
			.money {
				font-weight: 600;
				h1 {
					.fz(font-size,26);
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
				.fz(font-size,26);
				color:#999999;
			}
		}
		
	}
</style>