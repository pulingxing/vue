<template lang="html">
    <transition name="slide">
        <section class="pay">
            <header class="header">
                <div class="back" @click="payClick">			
                </div>
                <h1>支付</h1>		
            </header>
            <div class="top">需支付：<i>¥{{pay}}</i></div>
            <h2>支付方式</h2>
            
            <div class="wrap">
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell>
                            <div class="payWay">
                                <div>
                                    <img src="../assets/images/bangtafu/icon_wallet.png" alt="">
                                    我的钱包
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
                <div class="payBtn">立即支付</div>
            </footer>
        </section>
    </transition>
</template>

<script>
    import { Checklist } from 'mint-ui';
    export default {
        props:['pay'],
        data(){
            return{ 
                radio: '1' 
            }     
        },
        methods: {
            payClick() {
                this.$emit('payClicked')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/fz.less';
    .pay {
        width: 100vw;
        height: 100vh;
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
            i {
                color: @cl;
                font-weight: 600;
            }
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
