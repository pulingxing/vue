<!-- 详情页 -->
<template lang="html">
    <transition name="slide">
        <div class="detail"> 
            <header class="header">
                <div class="wrap">  
                    <router-link class="back" :to="{ name: '发起订单'}">    
                    </router-link>
                    <mt-navbar class="page-part" v-model="selected"> 
                        <mt-tab-item id="goods">商品</mt-tab-item>
                        <mt-tab-item id="comment">评价</mt-tab-item>
                        <mt-tab-item id="details">详情</mt-tab-item>
                    </mt-navbar>
                    <div>
                        <span class="share" @click="shareClick(),IosShareClick()"></span>
                    </div>
                </div> 
            </header>

            <!-- <div class="nothing" v-if="length=null">
                <div class="prompt">
                    <img src="../../assets/images/bangtafu/icon_blank.png" alt="">
                    <div>您查看的商品已售罄，看看别的吧~</div>
                </div>
                <div class="goods-recommend">
                    <h1>精/品/推/荐</h1>
                    <div class="list">
                        <div class="list-item">
                            <img src="../../assets/images/bangtafu/touxiang2.jpg">
                            <span class="intro">养成茶叶</span>
                            <span class="price">¥66</span>
                            <span class="income">赠230%抵付金</span>                           
                        </div>
                        <div class="list-item">
                            <img src="../../assets/images/bangtafu/banner.jpg">
                            <span class="intro">床上四件套</span>
                            <span class="price">¥66</span>
                            <span class="income">赠230%抵付金</span>                           
                        </div>
                    </div>
                </div>    
            </div>  -->

            <div>
                <main class="main menu-wrapper" ref="menuwrapper">
                    <mt-tab-container v-model="selected">
                        <!-- 商品 -->
                        <mt-tab-container-item id="goods">
                            <div class="swiper">
                                <mt-swipe :auto="4000">
                                    <mt-swipe-item v-for="banner in pictures" :key="banner.id">
                                        <img v-lazy="banner"> 
                                    </mt-swipe-item>
                                </mt-swipe>
                            </div>

                            <div class="container">
                                <div class="information">
                                    <h1>{{goods.goods_name}}</h1>
                                    <div class="price-stock">
                                        <span class="price">{{symbol}}{{goods.price_coupon}}
                                            <!-- <i class="original-price">¥{{goods.price}}</i> -->
                                        </span>
                                        
                                        <span  class="stock">{{text}}{{goods.goods_inventory}}{{unit}}</span>
                                    </div>  
                                </div>

                                <ul>
                                    <li class="service" @click="handleClick">
                                        <div class="icon" v-for="s in goods.sales_services" :key="s.id">
                                            <img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
                                            <span >{{s.services_name}}</span>
                                        </div>
                                        <span><img class="serviceArrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span> 
                                    </li>
                                    <!-- 邮费 -->
                                    <li @click="expressClick">
                                        <span>{{fare.fare_name}}</span>
                                        <span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
                                    </li>
                                    <!-- 发起规则 -->
                                    <li>
                                        <span>{{codex}}</span>
                                        <span><img class="arrow" src="../../assets/images/bangtafu/icon_arrow.png" alt=""></span>
                                    </li>
                                    <li class="rules">
                                        <div v-for="r in goods.help_pay_initiate_rules">{{r}}</div>
                                    </li>
                                </ul>
                                <!-- 商品评论 -->
                                <div class="commentBox">

                                    <h2>商品评价({{comment.comment_count}})</h2>
                                    <div class="comment" v-for="(c,index) in comment.comment_content" :key="index" v-if="index < 1">
                                        <div class="userinfo">
                                            <div>
                                                <img class="userhead" :src="c.user_portrait" height="44" width="44" alt="">
                                                <span class="username">{{c.user_name}}</span>
                                            </div>
                                            <span class="time">{{c.comment_time}}</span>
                                        </div>
                                        <p>{{c.comment_contents}}</p>
                                        <div class="comment-picture">
                                            <img v-for="p in c.pictures" :key="p.id" :src="p">
                                        </div>
                                    </div>
                                </div>
                                <!-- 商品详情 -->
                                <div class="detailBox">
                                    <h2>商品详情</h2>
                                    <div class="img-wrap">
                                        <img src="">
                                    </div>
                                </div> 
                            </div>
                        </mt-tab-container-item>

                        <!-- 评论 -->
                        <mt-tab-container-item id="comment">
                            <div class="commentBox">    
                                <h2>商品评价({{comment.comment_count}})</h2>
                                <div class="comment" v-for="(c,index) in comment.comment_content" :key="index">
                                    <div class="userinfo">
                                        <div>
                                            <img class="userhead" :src="c.user_portrait" height="44" width="44" alt="">
                                            <span class="username">{{c.user_name}}</span>
                                        </div>
                                        <span class="time">{{c.comment_time}}</span>
                                    </div>
                                    <p>{{c.comment_contents}}</p>
                                    <div class="comment-picture">
                                        <img v-for="p in c.pictures" :key="p.id" :src="p">
                                    </div>
                                </div>
                            </div>  
                        </mt-tab-container-item>

                        <!-- 详情  -->
                        <mt-tab-container-item id="details">
                            <div class="detailBox">
                                <div class="img-wrap">
                                    <img src="">
                                </div>
                            </div> 
                        </mt-tab-container-item>
                    </mt-tab-container>
                </main>
                
                <footer class="footer">
                    <div class="buy pay" @click="payClick()">
                        单独购买<i>(￥{{goods.price_coupon}})</i>
                    </div>
                    <div class="help pay" @click="replaceClick">找人代付</div>
                </footer>
            </div>
            <!-- 退换弹窗 -->
            <mt-popup class="one" v-model="popupVisible" position="bottom">
                <div class="servicePopup">
                    <h1>服务说明<div class="close" @click="handleClick"></div></h1>
                    
                    <div class="list" v-for="k in goods.sales_services_explain" :key="k.id">
                        <img src="../../assets/images/bangtafu/icon_percentage.png" alt="">
                        <h2>{{k.title}}</h2>
                        <p v-for="f in k.content">{{f}}</p>
                    </div>  
                </div>
            </mt-popup>
            <!-- 邮费说明弹窗 -->
            <mt-popup class="one" v-model="expressVisible" position="bottom">
                <div class="postage">  
                    <h1><div class="close" @click="expressClick"></div></h1> 
                    <div class="text" v-for="p in goods.fare_explain">{{p}}</div>  
                </div>
            </mt-popup>
            <!-- 规格弹窗 -->
            <van-sku
                v-model="showSku"
                :sku="sku"
                :goods="good"
                :goods-id="id"
                :quota="quota"
                :hide-stock="hide_stock"
                @buy-clicked="onBuyClicked"
                >
                <template slot="sku-actions" slot-scope="props">
                    <div class="van-sku-actions">
                        <van-button type="primary" bottom-action 
                        @click="props.skuEventBus.$emit('sku:buy')">找人代付</van-button>
                    </div>
                </template>
            </van-sku>
            <!-- 单独购买 -->
            <van-sku
                v-model="showSpec"
                :sku="sku"
                :goods="good"
                :goods-id="id"
                reset-selected-sku-on-hide
                :hide-stock="hide_stock"
                @buy-clicked="buyOwnClicked"
                >
                <template slot="sku-actions" slot-scope="props">
                    <div class="van-sku-actions">
                        <van-button type="primary" bottom-action 
                        @click="props.skuEventBus.$emit('sku:buy')">单独购买</van-button>
                    </div>
                </template>
            </van-sku>
 
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import { Sku } from 'vant';
    import { Dialog } from 'vant';
    export default {
        data() {
            return{
                detailData:{}, 
                selected: 'goods',
                goods:{},
                comment:{},
                fare:{},
                pictures:[],
                popupVisible: false,
                expressVisible: false,
                showSku:false,
                showSpec:false,
                listHeight:[],  
                scrollY:0,
                id:'',
                goodsSku:'skuJson',
                good:{},
                sku:{},
                hide_stock: true,
                quota:1,
                goodsId:"",
                specId:"",
                num:"",
                symbol:"¥",
                text:"库存:",
                unit:"件",
                codex:"发起规则"

            };
        },
        methods: {
            // better-scroll
            _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menuwrapper, {
                    click: true
                })        
            },
            // 服务说明弹窗
            handleClick() {
                this.popupVisible = !this.popupVisible;
            },
            // 邮费说明弹窗
            expressClick() {
                this.expressVisible = !this.expressVisible;
            },
            // 单独购买
            payClick() {
                let inventory = this.goods.goods_inventory;
                let gid = this.goods.goods_id;
                let specId = 0;

                if(!window.token){
                    Dialog.confirm({
                        message: '您还没登录,请登录',
                        confirmButtonText:'去登陆'
                    }).then(() => { 
                        //这里调用原生方法   
                    }).catch(() => {
                    });
                }else if(inventory== 0){ 
                    Dialog.alert({
                        message: '该商品库存不足'
                        }).then(() => {
                        return
                    });
                }else {
                    this.showSpec = true;
                }                 
            },
            // 找人代付
            replaceClick() {
                let inventory = this.goods.goods_inventory;
                let gid = this.goods.goods_id;
                if(!window.token){
                    Dialog.confirm({
                        message: '您还没登录,请登录',
                        confirmButtonText:'登陆'
                    }).then(() => { 
                        //这里调用原生方法   
                    }).catch(() => {
                    });
                }else if(inventory== 0){ 
                    Dialog.alert({
                        message: '该商品库存不足'
                        }).then(() => {
                        return
                    });
                }else if(this.goods.spec_deep == 0){
                    this.showSku = false;
                    this.$api({
                        method: 'post',
                        url:  '/order-help-pay/pre-confer-order',  
                        data:{
                            token:window.token,
                            goods_spec_id: 0,
                            goods_id: gid
                        }
                    }).then((response) => {
                        this.confirmData = response.data;
                        // console.log(this.confirmData);
                        if(this.confirmData.code == 0){
                            this.$router.push({name:'确认订单',params:{goodsId:gid,goodsSpecId:'0'}});
                        }else {
                            Dialog.alert({
                                message: this.confirmData.message
                                }).then(() => {
                                return
                            });
                        }
                    }).catch(function(error) {
                        alert(error)
                    })  
                }else {
                    this.showSku = true
                }
            },
            // 获取找人代付skuData
            onBuyClicked(skuData) {
                if(this.goods.spec_deep == 0){
                    var  specId = 0;
                }else {
                    var  specId = skuData.selectedSkuComb.id;
                }
                let  gid  = skuData.goodsId;
                let  num = skuData.selectedNum;
                this.$api({
                        method: 'post',
                        url: '/order-help-pay/pre-confer-order',
                        data:{
                            token:window.token,
                            goods_spec_id: specId,
                            goods_id: gid
                        }
                    }).then((response) => {
                        this.confirmData = response.data;
                        if(this.confirmData.code == 0){
                            this.$router.push({name:'确认订单',params:{goodsId:gid,goodsSpecId:specId,number:num}});
                        }else {
                            Dialog.alert({
                                message: this.confirmData.message
                                }).then(() => {
                                return
                            });
                        }
                    }).catch(function(error) {
                        alert(error)
                    })
                
            },
            // 一下方法调用原生的方法
            buyOwnClicked(skuData) {
                if(this.goods.spec_deep == 0){
                    var  specId = 0;
                }else {
                    var  specId = skuData.selectedSkuComb.id;
                }
                var  gid  = skuData.goodsId;        
                var  num = skuData.selectedNum;
                this.$api({
                        method: 'post',
                        url: '/order-help-pay/pre-confer-order',
                        data:{
                            token:window.token,
                            goods_spec_id: specId,
                            goods_id: gid
                        }
                    }).then((response) => {
                        this.confirmData = response.data;
                        if(this.confirmData.code == 0){
                            if(this.GLOBAL.isAndroid){
                                // 如果是Android，点击单独购买进入原生商品预览页
                                this.preOrder(gid,specId,num);
                                
                            }else {
                                this.IosPreOrder();
                            }
                        }else {
                            Dialog.confirm({
                                message: this.confirmData.message,
                                confirmButtonText:'确认'
                            }).then(() => { 
                                  
                            }).catch(() => {
                            });
                        }
                    }).catch(function(error) {
                        alert(error)
                    })
                
            },
            //Android
            preOrder(gid,specId,num) {
                var SkU = {
                    'goods_id':gid,
                    'goods_spec_id':specId,
                    'goods_number':num
                }
                var goodsSku = JSON.stringify(SkU)
                console.log(goodsSku)
                window.android.andPreOrder(goodsSku);
            },
            shareClick: function() {  
                var params = {
                    "title":this.goods.goods_name,
                    "goodsId": this.goods.goods_id,
                    "href" :'http://www.youhulianchuang.com/',
                    "picture" :'http://app.youhulianchuang.com//data/uploads/image/20180515/thumb-1526374092120631.png',
                }
                var share = JSON.stringify(params);
                // console.log(share);
                window.android.andShareClick(share); 
                
            },
            //Ios
            IosPreOrder:function() {
               
            },

            IosShareClick:function() {
                
            }
        },
       
        created() {
            this.goodsId = this.$route.params.goodsId;
            this.$api({
                    method: 'post',
                    url: '/goods/goods-detail',
                    data: {
                        goods_id: this.$route.params.goodsId,
                        sku: this.goodsSku
                    }
                }).then((response) => {
                    this.detailData = response.data; 
                    this.goods = this.detailData.data;
                    this.pictures = this.detailData.data.pictures;
                    this.comment = this.detailData.data.comment;
                    this.fare = this.detailData.data.fare_info;
                    this.length = this.detailData.data.length;
                    this.id = this.detailData.data.goods_id;
                    this.sku = this.detailData.data.spec_info;
                    this.good = this.detailData.data.spec_info.goods;
                    this.$nextTick(() => {
                        this._initScroll();
                    })
                    console.log(this.detailData)
                }).catch(function(error) {
                    alert(error)
                });
           
              
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/fz.less';
    .detail {
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fafafa;
        header {
            width: 100%;
            height: @vh;
            .wrap{
                .bd();
                .flex();
                width: 100%;
                height: @vh;
                color:#333;
                padding: 0 3vw;
                position: fixed;
                top: 0;
                left:0;
                text-align: center;
                z-index: 100;
                background-color: #fff;
                .back {
                    width: 3vw;
                    height: 6vw;
                    background: url("../../assets/images/bangtafu/icon_nav_back.png") no-repeat;
                    background-size: 100% 100%; 
                }
                .mint-navbar {
                    width: 60%;
                    height: 100%;
                    margin-left: 5vw;
                    .is-selected {
                        border-bottom: none;
                        color:@cl; 
                        margin-bottom: 0;
                    }
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

        main {
            width: 100%;
            height: 84vh;
            overflow: hidden;
            .swiper {
                .bd();
                width: 100%;
                position: relative;
                .mint-swipe {
                    width: 100%;
                    height:100vw;
                    img {
                        width: 100%;
                        height:100%;
                    }
                }
            }
            // 选项
            .container {
                // 商品信息
                .information {
                    padding: 3vw;
                    background: #fff;
                    h1 {
                        color: #2c3e50; 
                        .fz(font-size,36);
                        overflow:hidden; 
                        white-space:nowrap; 
                        text-overflow:ellipsis;
                    }
                    .price-stock {
                        .flex();
                        span {
                            margin-top:1vw;
                            &.price {
                                color: @cl;
                                .fz(font-size,34);
                                font-weight: 600;
                                .original-price {
                                    text-decoration: line-through;
                                    color: #999999;
                                    .fz(font-size,18);
                                    color: #999999;
                                }
                            }
                           
                            &.stock {
                                color: #ccc;
                                .fz(font-size,24);
                                font-weight: 400;
                            }
                        }
                    }
                }

                ul {
                    margin-bottom: 3vw;
                    background: #fafafa;
                    li {
                        .bt();
                        .flex();
                        
                        .fz(font-size,28);
                        padding: 3vw;
                        &.service {
                            .bd();
                            padding: 3vw;
                            height: 7vh;
                            margin-bottom: 3vw;
                            position: relative;
                            .icon{
                                .flex();
                                .fz(font-size,18);
                                img {
                                    width: 4vw;
                                    height: 4vw; 
                                }
                            }
                            .serviceArrow {
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                right: 3vw;;
                                width: 3vw;
                                height: 5vw;
                            }
                        }
                        &.rules {
                            margin-bottom: 3vw; 
                        }
                    }
                }
            }
            // 评论 
            .commentBox {
                margin-bottom: 3vw;
                background: #fff; 
                .fz(font-size,28);  
                h2 {
                  padding: 3vw; 
                }
                .comment {
                    margin-bottom:2vw;
                    .userinfo{
                        .flex();
                        .fz(font-size,28);
                        padding: 3vw;
                        img.userhead {
                            width: 10vw;
                            height: 10vw;
                            margin-right: 2vw;
                            border-radius: 50%;
                        }
                    }
                    p {
                        padding: 3vw 6vw;
                        .fz(font-size,24);
                    }
                    .comment-picture{
                        .fx();
                        padding: 0 3vw;
                        img{
                            width: 30vw;
                            height: 30vw;
                            padding: 3vw;
                        }
                    
                    }  
                }
            }
            // 商品详情
            .detailBox {
                .bt();
                width: 100%; 
                background: #fff;
                h2{
                    .fz(font-size,28);
                    padding: 3vw;
                }
                .img-wrap {
                    width: 100%;
                    height: 120vw;
                        img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }      
        }

        .footer {
            // .bt();
            .flex();
            width: 100%;
            height: @vh;
            left: 0;
            bottom: 0;
            position: fixed;
            z-index: 100;
            .pay {
                width: 50%;
                height: @vh;
                border: none;
                color:#fff;
                line-height: @vh;
                text-align: center;
                background-color: @cl;
                letter-spacing: .2vw;
                &.buy {
                    i{
                        .fz(font-size,26);
                    }
                }
                &.help {
                    background-color: #ccac68;
                } 
            }
             
        }

        .one {
            width: 100vw;
            height: 100vw;
           .fz(font-size,28);
            font-family: "PingFang-SC-Medium";
            .close{
                width: 5vw;
                height: 5vw;
                background: url("../../assets/images/bangtafu/icon_close.png") no-repeat;
                background-size: 100% 100%; 
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 3vw;
            }
            .servicePopup {
                width: 100%;
                 h1 {
                    .fz(font-size,32);
                    font-weight: bold;
                    text-align: center;
                    line-height: 50px;
                    position: relative;
                    background: #f5f5f5;
                }   
                .list {
                    .bt();
                    padding: 3vw;
                    
                    line-height: 40px;
                    img {
                        width: 4vw;
                        height: 4vw;
                        }
                    h2 {
                        
                        display: inline-block;
                    }
                    p {
                        display: block;
                        color: #999999;
                        margin-left: 4vw;
                        line-height: 20px;
                        
                    }
                }
                
            }
            .postage  {
                h1 {
                    .fz(font-size,32);
                    font-weight: bold;
                    text-align: center;
                    height: 50px;
                    position: relative;
                    background: #f5f5f5;
                }
                .text {
                    padding: 3vw;
                    margin:2vw 0;
                } 
            }
            
        }

        .sku {
            width:100vw;
            .btn  {
                width: 100vw;
                height: @vh;
                left: 0;
                bottom: 0;
                position: fixed;
                z-index: 100;
                text-align: center;
                color:#fff;
                line-height: @vh;
                background-color: #ccac68;      
            }
            .skuTop {
                .bd();
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 3vw 3vw 0 3vw;
                position: relative;
                img {
                    position: relative;
                    top:-8vw;
                    margin-right: 3vw;
                    z-index: 100;
                    width:25vw;
                    height: 25vw;
                }

                .title {
                    display: block;
                    margin-bottom: 2vw;

                }
                .price {
                    display: block;
                    color: #f03d37;
                    font-weight: 600;
                }
                
            }
            .close{
                width: 5vw;
                height: 5vw;
                background: url("../../assets/images/bangtafu/icon_close.png") no-repeat;
                background-size: 100% 100%; 
                position: absolute;
                top: 3vw;
                right: 3vw;
            } 
        }   
    }

    .nothing {
        width: 100vw;
        height: 100vh;
        text-align: center;
        .prompt {
            height: 40vh;

        }
        .goods-recommend {
            background: #fff;
            height: 52vh;
            h1 {
                padding:3vw 0;
                font-weight: bold;
                letter-spacing: 2vw;
            }
            .list {
                display: flex;
                flex-wrap: wrap;
                align-content:space-between;
                width:100vw;
                text-align: left;
                // background: #fafafa;
                .list-item {
                    width: 46vw;
                    border: none;
                    margin-top:3vw;
                    margin-right: 2vw;
                    margin-left: 2vw;
                    // box-shadow:0px 0px 7px #333333;
                    
                    img {
                        width: 46vw;
                        height: 46vw;
                        border-radius: 1vw;
                    }
                    span {
                        overflow:hidden; 
                        white-space:nowrap; 
                        text-overflow:ellipsis;
                        &.intro {
                        width: 100%;
                        color: #333333;
                        padding-top: 1vw;
                        display: block;
                        .fz(font-size, 28);  
                        }
                        &.price {
                        padding: 1vw 0;
                        color: @cl;
                        display: block;
                        .fz(font-size, 34);
                        font-weight: 600;
                        }
                        &.income {
                        color: #ffffff;
                        .fz(font-size, 26);
                        border-radius: 4px;
                        padding: 0 2px;
                        background-color: #ccac68;
                        }
                    }       
                }
            }

        }
    }
</style>
