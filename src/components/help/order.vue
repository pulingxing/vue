<template>
    <transition name="slide">
        <div class="order">
            <!-- 头部 -->
            <v-header class="header"><h1 slot="title">帮付订单</h1></v-header>
            <!-- 内容部分 -->
            <div class="menu-wrapper" ref="menuwrapper">
				<div>
                    <section class="container">
                        <div class="bannerImg">
                            <img :src="orderDatas.goods_url" alt="">
                        </div>
                        <div class="orderInfo">
                            <div class="top">
                                <div class="content">
                                    <img :src="orderDatas.user_portrait">
                                    <span>{{orderDatas.user_name}}&nbsp;&nbsp;发起的订单</span>
                                </div>
                                <v-countdown
                                :startTime="startTime" 
                                :endTime="endTime" 
                                :tipText="'距离开始'" :tipTextEnd="'距离结束'" 
                                :endText="'订单已过期'" :dayTxt="'：'" :hourTxt="'：'" :minutesTxt="'：'" :secondsTxt="''">
                                </v-countdown> 
                            </div>
                            <div class="bottom">
                                <p class="goodsName">{{orderDatas.goods_name}}</p>
                                <p class="total">共需支付:<i>¥{{orderDatas.price_total}}</i></p>
                                <mt-progress :value="orderDatas.has_paid_scale*100" :bar-height="10"></mt-progress>
                                <div>
                                    <span class="count">{{orderDatas.paid_user_word}}<i>{{orderDatas.paid_user_money}}</i></span>
                                    <span class="helpBtn">帮他付</span>
                                </div>
                            </div>
                        </div>
                        <div class="rules">
                            <div class="title" @click="handleClick">
                                <span>帮付规则</span>
                                <span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
                            </div>
                            <div class="steps">                
                                <div class="item">
                                    <i>1</i>
                                    <div>选择帮付订单</div>
                                </div>
                                <div class="item">
                                    <i>2</i>
                                    <div>帮TA支付</div>
                                </div>
                                <div class="item">
                                    <i>3</i>
                                    <div>帮付成功完成订单</div>
                                </div>
                                <div class="item">
                                    <i>4</i>
                                    <div>发起人收货</div>
                                </div>
                                <div class="item">
                                    <i>5</i>
                                    <div>按比例发抵付金</div>
                                </div>
                            </div> 
                        </div>
                        <div class="boss">
                            <div class="number" @click.stop.prevent="nameClick">           
                                <span>{{orderDatas.paid_user_word}}</span>
                                <span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
                            </div>
                            <ul>
                                <li class="bossInfo" v-for="u in orderDatas.users" :key="u.id">
                                    <div class="phoneNumber">
                                        <img :src="u.portrait" alt="">
                                        <span>{{u.user_name}}<br>{{u.create_time_format}}</span>
                                    </div>
                                    <span>已支付  ¥{{u.help_money}}</span>
                                </li>
                            </ul>
                        </div>
                        
                    </section>
                </div>
            </div>
            
            <footer>
                <div class="box">
                    <router-link class="metoo footer" :to="{name:'发起订单'}">
                    我也发起
                    </router-link>
                    <div class="payBtn footer" @click="confirmClick">
                    帮他付
                    </div> 
                </div> 
            </footer>

            <mt-popup v-model="popupVisible">
                <h2>帮TA付的玩法及规则</h2>
                <span class="rules" v-for="r in orderDatas.help_rules" :key="r.id">
                    {{r}}
                </span>
            </mt-popup>
            <v-name @nameClicked="nameClick" v-show="showName" :name="orderDatas"></v-name>
            <v-confirm @confirmClicked="confirmClick" v-if="showConfirm" :preview="orderDatas.order_id"></v-confirm>
        </div>
        
    </transition>
</template>

<script>
import Header from '@/common/_header.vue';
import Name from '@/common/_name.vue';
import Confirm from  "@/components/help/confirm";
import CountDown from '@/common/_countdown.vue';
import BScroll from 'better-scroll';
export default {
    name:"order",
    components:{
        'v-header':Header,
        'v-name':Name,
        'v-confirm':Confirm,
        'v-countdown':CountDown
    },
    data(){
        return {
            popupVisible:false,
            showName:false,
            showConfirm:false,
            orderDatas:{},
            startTime:0,
            endTime:0,
            listHeight:[],  
            scrollY:0  
        }
    },
    methods:{
        _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menuwrapper, {
                click: true
            })
        },
        handleClick() {
            this.popupVisible = !this.popupVisible;
        },
        nameClick() {
            this.showName = !this.showName;
        },
        confirmClick() {
            this.showConfirm = !this.showConfirm;
        }
    },
   
    created(){
        this.$api({
            method:'post',
            url:'/order-help-pay/order-detail',
            params:{
                token: window.token,
                order_id: this.$route.params.orderId     
            }   
        }).then((res)=>{
            this.orders = res.data;
            this.orderDatas = this.orders.data;
            this.startTime = this.orderDatas.remaining_begin_time;
            this.endTime = this.orderDatas.remaining_end_time;
            this.$nextTick(() => {
                this._initScroll();
            })
            console.log(this.orderDatas);
        }).catch((error)=>{
            console.log(error);
        })
        
    }
}

</script>

<style lang="less" scoped>
    @import '../../assets/fz.less';
    .order {
        width: 100vw;
        background: #fafafa;
        header {
            width: 100vw;
            height: @vh;
            .wrap {
                .bt();
                .flex();
                width: 100%;
                height: @vh;   
                z-index: 100;
                padding: 0 3vw;
                position: fixed;
                top: 0; 
                color:#333;
                text-align: center;
                background-color: #fff;
                .back {
                    width: 3vw;
                    height: 6vw;
                    background: url("../../assets/images/bangtafu/icon_nav_back.png") no-repeat;
                    background-size: 100% 100%; 
                }
                h1 {
                    .fz(font-size,40);
                    letter-spacing: .2vw;
                    font-weight: 500;
                } 
                span{
                    width: 7vw;
                    height: 7vw;
                    &.share {
                        margin-right: 1vw;
                        background: url("../../assets/images/bangtafu/icon_nav_share.png") no-repeat;
                        background-size: 100% 100%;
                    }
                    &.message {
                        background: url("../../assets/images/bangtafu/icon_nav_more.png") no-repeat;
                        background-size: 100% 100%; 
                    }
                }
            }
        }
        .menu-wrapper{
			height: 84vh;
			overflow: hidden;
            section {
                width: 100%;
                .bannerImg {
                    width: 100%;
                    height: 50vh;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                // 商品详情
                .orderInfo {
                    width: 90%;
                    margin: 0 auto;
                    position: relative;
                    top: -10vw;
                    background: #fff;
                    height: 50vw;
                    border-radius: 3vw;
                    .fz(font-size,28);
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
                    .top {
                        .flex();
                        height: 12vw;
                        padding: 0 3vw;
                        background: #e7d1a2;
                        border-top-right-radius:3vw;
                        border-top-left-radius:3vw; 
                        .content {
                            .flex();  
                            img {
                                width: 10vw;
                                height: 10vw;
                                border-radius: 50%;
                                margin-right: 2vw;
                            }
                            span {
                                width: 30vw;
                                overflow:hidden; 
                                white-space:nowrap; 
                                text-overflow:ellipsis;
                            }

                        }
                        .countDown {
                            .flex();    
                            span {
                                width: 5vw;
                                color:#fff;
                                background:#333;
                                text-align: center;
                            }
                        }
                    }
                    .bottom {
                        padding: 3vw;
                        .goodsName {
                            .fz(font-size,30);
                            font-weight: 600;
                        }
                        .total {
                            margin: 3vw 0;
                            display: block;
                            i {
                                color:@cl;
                                .fz(font-size,34);
                                font-weight: 600;
                            }
                        }
                    }
                }
                // 帮付规则
                .rules {
                    background: #fff;
                    position: relative;
                    top:-6vw;
                    .title {
                        .bd();
                        .flex();
                        padding: 3vw;
                        
                    }
                    .steps {
                         
                        display: flex;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                        .fz(font-size,26);
                        border-top: 1px solid #999999;
                        margin:6vw 3vw 3vw 3vw; 
                        .item {
                        width: 16vw; 
                        background: #fff;
                        position: relative;
                        top: -3vw;
                        text-align: center;
                            i  {
                            width: 5vw;
                            height: 5vw;
                            color: #fff;
                            line-height: 5vw;
                            background: #333;
                            text-align: center;
                            display: inline-block;
                            border-radius: 50%;
                            margin-bottom: 2vw;
                            }
                        }
                    }
                   
                } 
                // 帮付名单
                .boss {
                    width: 100%;
                    background: #fff;
                    position: relative;
                    top:-6vw;
                    .number {
                        .bd();
                        .flex();
                        padding: 3vw;
                    }
                    .bossInfo {
                        .bd();
                        .flex();
                        .fz(font-size,24);
                        padding: 3vw;
                        .phoneNumber{
                            .flex();
                            img{
                                width: 10vw;
                                height: 10vw;
                                border-radius: 50%;
                                margin-right: 2vw;
                            } 
                        }      
                    }
                }
            }
        }
        .mint-popup {
            width: 80%;
            border-radius: 12px;
            h2 {
                padding-top: 2vw;
                text-align: center;
            }
            .rules{
                margin:3vw;
                .fz(font-size,28);
            }
        }
        footer {
            height: @vh;
            .box {
                .flex();
                width: 100%;
                height: @vh;
                position: fixed;
                bottom: 0;
                left: 0;
                background-color: #ffffff; 
                .footer{
                    width: 50%;
                    height: 100%;  
                    border: none;
                    text-align: center;
                    line-height: @vh;
                    color: #fff;   
                    &.metoo {
                        background:#ccac68;   
                    }
                    &.payBtn {
                        background:@cl;
                    }
                }
            }
        } 
    }
</style>
