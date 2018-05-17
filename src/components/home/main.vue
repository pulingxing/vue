<template>
    <div class="goodsList">
        <mt-navbar class="page-part" v-model="selected">  
            <div class="navbar" @click="recommend"><mt-tab-item id="recommend">推荐商品</mt-tab-item></div>
            <div class="navbar" @click="hotClick"><mt-tab-item id="hot">热门</mt-tab-item></div> 
            <div class="navbar" @click="meClick"><mt-tab-item id="me">看我能买</mt-tab-item></div>      
        </mt-navbar>

        <mt-tab-container v-model="selected">  
            <mt-tab-container-item id="recommend">
               <div class="prompt" v-if="!main.length">
                    <img src="../../assets/images/bangtafu/icon_blank.png" alt="">
                    <div>没有找到相关商品，重新试试吧~</div>
                </div>
                <ul class="list" v-else>
                    <router-link 
                    v-for="item in main" :key="item.id"
                    :to="{name:'详情页', params:{goodsId:item.goods_id}}">
                        <li >
                            <img v-lazy="item.goods_url" onerror="this.src='../../assets/images/bangtafu/default.png'" alt="">
                            <div class="box">
                            <span class="intro">{{item.goods_name}}</span>
                            <span class="price">¥{{item.price}}</span>
                            <span class="income">{{item.amount_payment_scale}}</span>
                            </div>

                        </li>
                    </router-link>
                </ul> 
                
            </mt-tab-container-item>  

            <mt-tab-container-item id="hot">
                <div class="prompt" v-if="!hot.length">
                    <img src="../../assets/images/bangtafu/icon_blank.png" alt="">
                    <div>没有找到相关商品，重新试试吧~</div>
                </div>  
                <ul class="list" v-else>
                    <router-link 
                    v-for="item in hot" :key="item.id"
                    :to="{name:'详情页', params:{goodsId:item.goods_id}}">
                        <li>
                            <img v-lazy="item.goods_url" onerror="this.src='../../assets/images/bangtafu/default.png'">
                            <div class="box">
                            <span class="intro">{{item.goods_name}}</span>
                            <span class="price">¥{{item.price}}</span>
                            <span class="income">{{item.amount_payment_scale}}</span>
                            </div>                           
                        </li>
                    </router-link>
                </ul>     
            </mt-tab-container-item> 

            <mt-tab-container-item id="me">  
                <div class="prompt" v-if="!me.length">
                    <img src="../../assets/images/bangtafu/icon_blank.png" alt="">
                    <div>没有找到相关商品，重新试试吧~</div>
                </div>
                <ul class="list" v-else>
                    <router-link 
                    v-for="item in me" :key="item.id"
                    :to="{name:'详情页', params:{goodsId:item.goods_id}}">
                        <li>
                            <img v-lazy="item.goods_url" onerror="this.src='../../assets/images/bangtafu/default.png'">
                            <div class="box">
                            <span class="intro">{{item.goods_name}}</span>
                            <span class="price">¥{{item.price}}</span>
                            <span class="income">{{item.amount_payment_scale}}</span> 
                            </div>                          
                        </li>
                    </router-link>
                </ul> 
                
            </mt-tab-container-item>       
        </mt-tab-container>

    </div>  
</template>

<script> 
    import { Dialog } from 'vant';
    import { hybrid } from '../../app/app.js';
    export default {
        props:['main'],
        data() {
            return {
                selected: 'recommend',
                hot:{},
                me:{}
            }
        },
        methods:{
            recommend() {
                this.$api({
                    method: 'post',
                    url: '/index/help-pay-hall',
                    data: {
                        token:window.token,
                        key_word: 'recommend',
                        page:1 
                    }
                }).then((response) => {
                    this.indexData = response.data;
                    this.hot = this.indexData.data.goods; 
                }).catch(function(error) {
                    alert(error)
                })
            },

            hotClick() { 
                this.$api({
                    method: 'post',
                    url: '/index/help-pay-hall',
                    data: {
                        token:window.token,
                        key_word: 'hot',
                        page:1 
                    }
                }).then((response) => {
                    this.indexData = response.data;
                    this.hot = this.indexData.data.goods; 
                }).catch(function(error) {
                    alert(error)
                })
            },
           
            meClick() {
                if(!window.token){
                    Dialog.confirm({
                        message: '您还没登录,请登录',
                        confirmButtonText:'去登陆'
                    }).then(() => {
                        this.loginClick();
                    }).catch(() => {
                        this.selected='recommend'
                    });
                }else{
                    this.$api({
                        method: 'post',
                        url: '/index/help-pay-hall',
                        data: {
                            token:window.token,
                            key_word: 'me', 
                            page:1 
                        }
                    }).then((response) => {
                        this.indexData = response.data;
                        this.me = this.indexData.data.goods;
                    }).catch(function(error) {
                        alert(error)
                    })
                }
            },
            
            loginClick() {
                window.webkit.messageHandlers.LGclick.postMessage()
            },
        },

        
        created() {
            hybrid.loginClick = this.loginClick  
        }

        
    }
</script>

<style lang="less" scoped>
    @import '../../assets/fz.less';
    .goodsList {
        width: 100%;
        .page-part{
            .bd();
            .flex();
            .is-selected {
                border-bottom: none;
                color:@cl; 
            }
            .navbar {
                width: 20vw;
            }
        }
        .mint-tab-container {
            .list {
                display: flex;
                flex-wrap: wrap;
                align-content:space-between;
                width:100vw;
                background: #fafafa;
                li {
                    width: 46vw;
                    border: none;
                    margin-top:3vw;
                    margin-right: 2vw;
                    margin-left: 2vw;
                    img {
                        width: 46vw;
                        height: 46vw;
                        border-radius: 1vw;
                    }
                    .box{
                        padding: 2vw;
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
            // 提示
            .prompt {
                background: #fafafa;
                text-align: center;
                .fz(font-size,40);
                padding-bottom: 12vw;
            }    
        }
    

    } 
</style>


