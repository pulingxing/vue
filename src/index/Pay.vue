<template lang="html">
    <section class="pay">
        <header class="header">
            <router-link class="back" :to="{name:'发起订单'}">			
            </router-link>
            <h1>确认订单</h1>		
        </header>
        <div class="top">需支付:{{this.$route.params.payId}}<i></i></div>
        <h2>支付方式</h2>
        
        <div class="wrap">   
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell>
                        <div class="payWay">
                            <div>
                                <img src="../assets/images/bangtafu/icon_wallet.png" alt="">
                                钱包支付
                            </div>
                            <van-radio name="1"></van-radio>
                        </div>
                    </van-cell>
                     <van-cell>
                        <div class="payWay">
                            <div>
                                <img src="../assets/images/bangtafu/icon_alipay_big.png" alt="">
                                支付宝支付
                            </div>
                            <van-radio name="2"></van-radio>
                        </div>
                    </van-cell>
                    <van-cell>
                        <div class="payWay">
                            <div>
                                <img src="../assets/images/bangtafu/icon_WeChat_big.png" alt="">
                                微信支付
                            </div>
                            <van-radio name="3"></van-radio>
                        </div>
                    </van-cell>
                    <van-cell>
                        <div class="payWay">
                            <div>
                                <img src="../assets/images/bangtafu/icon_ynionPay_big.png" alt="">
                                银联支付
                            </div>
                            <van-radio name="4"></van-radio>
                        </div>
                    </van-cell>
                   
                    
                </van-cell-group>
            </van-radio-group>
        </div>
        
        <footer>
            <router-link :to="{name:'成功帮付'}">
                <div class="payBtn">立即支付</div>
            </router-link>
        </footer>
    </section>
</template>

<script>
    import { Checklist } from 'mint-ui';
    // import Header from '@/common/_header.vue'
    export default {
        components:{
            // 'v-header':Header
        },
        data(){
            return{
                //存放所选选项  
                // value:[],  
                //checklist设置 
                radio: '1' 
               
            }     
        },
        created() {
            // console.log(this.$route.params.payId)
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/fz.less';
    .pay {
        width: 100vw;
        height: 100vw;
        position: fixed;
        top: 0;
        left: 0;
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
				background: url("../assets/images/bangtafu/icon_nav_back.png") no-repeat;
				background-size: 100% 100%; 
			}
			h1 {
				width:100%;
				text-align: center;
			}	
        }
        
        .top {
            padding: 3vw;
            margin: 3vw 0;
            background: #fff;
            text-align: center;
        }

        h2 {
            padding: 0 3vw;
            line-height: 8vw;
        }

        .wrap {
            width:100vw;
            .payWay{
                .flex();
                img {
                    width: 11vw;
                    height: 11vw;
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
                background: #f03d37;
            }
        }

        
    }
</style>
