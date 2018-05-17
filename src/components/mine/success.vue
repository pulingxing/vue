<template lang="html">
	<div class="check">
		<v-header><h1 slot="title">订单详情</h1></v-header>
		<section>		    
	    	<div class="state">
	    		<img src="../../assets/images/bangtafu/icon_clock.png" alt="">
	    		<span>订单已完成 等待发货</span>
	    	</div>
	    	<div class="userInfo">
		    	<span  class="username">{{address.consignee}}({{address.telephone}})</span>
		    	<span class="address">地址:{{address.detail_address}}</span>
		    	<span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span> 
		    </div>
		    <div class="goodsInfo">
		    	<div class="imgBox">
		    		<img :src="orders.goods_picture" alt="">
		    	</div>
		    	<div class="info">
		    		<img :src="orders.goods_picture" alt="">
			    	<span class="title">{{orders.goods_name}}</span>
			    	<span class="style">{{orders.goods_spec_name}}</span>
			    	<span class="money">¥{{orders.price_total}}</span>
			    	<span class="income">赠110%抵付金</span>
		    	</div>
		    </div>
	    	<div class="obtain">
	    		<div class="total">
	    			<span>订单合计(含运费)</span><i>¥{{orders.price_total}}</i>
	    		</div>
	    		<div class="paid">
	    			<span>已帮付:</span><i>-&nbsp;¥{{orders.has_paid}}</i>
	    		</div>
	    		<div>
	    			<span class="surplus">成单还需&nbsp;：&nbsp;<i>¥{{orders.price_total-orders.has_paid}}</i></span>
	    		</div>
	    	</div>
	    	<div class="boss">
              
			<div class="personNumber" @click="nameClick">           
				<span>{{orders.paid_user_word}}</span>
				<span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
			</div>
           
              <ul>
                <li class="bossInfo" v-for="u in orders.users" :key="u.id">
                    <img :src="u.portrait" alt="">
                    <span class="phoneNumber">{{u.user_name}}<br>{{u.create_time_format}}</span>
                    <span>{{u.help_money_format}}</span>
                </li>
              </ul>
          	</div>
			<div class="orderDetial">
				<span v-for="l in orders.logs" :key="l.id">{{l}}</span>
			</div>	  
		</section>
		<v-name @nameClicked="nameClick" v-show="showName" :name="orderDetailData.data"></v-name>
	</div>
</template>

<script>
	import Header from  '@/common/_header.vue'
	import Name from '@/common/_name.vue';
    export default {
		components:{
			'v-header':Header,
			'v-name':Name
		},
    	data(){
            return{
				showName:false,
				orderDetailData:{},
				orders:{},
				address:{}
				 
            };
        },
        methods:{
			nameClick() {
            	this.showName = !this.showName;
        	}
		},
		mounted() {
            this.$api({
                method: 'post',
                url: 'order-help-pay/order-detail-own',
                data: {
					token:window.token,
                    order_id: this.$route.params.orderId
                }
            }).then((response) => {
				this.orderDetailData = response.data;
				this.orders = this.orderDetailData.data;
				this.address =  this.orderDetailData.data.address;
            }).catch(function(error) {
                alert(error)
            })  
        }
    }
</script>

<style lang="less" scoped>
	@import '../../assets/fz.less';	
	.check {
		background: #fafafa;
		header {
			position: relative;
			height: 14vw;
			color:#333;
			background-color: #fff;
			padding: 0 3vw;
			display: flex;
			align-items: center;
			.back {
				position: absolute;
				width: 3vw;
				height: 6vw;
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
			.obtain {
				background: #fff;
				text-align: right;
				padding: 3vw;
				.fz(font-size,28);
			}
			.boss {
		        width: 100%;
		        background: #fff;
		        margin: 3vw 0;
		        .personNumber {
		            .bd();
					.flex();
					padding: 3vw;
					
		          }
		        .bossInfo {
					.bd();
		        	.flex();
		            padding: 3vw;
					.fz(font-size,28);
					.phoneNumber {
						display: inline-block;
					margin-right:15vw;
					}
		            img{
			            width: 10vw;
			            height: 10vw;
			            border-radius: 50%;
		            }
		            
		        }
		    }		
		    .orderDetial {
		    	background: #fff;
		    	padding: 3vw;
		    	.fz(font-size,28);
		    	span {
		    		display: block;
		    		margin:2vw 0;
		    	}
		    }	
		}		
	}  
</style>
