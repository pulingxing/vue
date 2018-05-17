<template lang="html">
  <div class="main">
    <mt-navbar class="page-part" v-model="selected"> 

        <div class="navbar"  @click="getNewest"><mt-tab-item id="newest">最新帮付</mt-tab-item></div>  
        <div class="navbar"  @click="getOrdered"><mt-tab-item id="ordered">马上成单</mt-tab-item></div>  
        <div class="navbar"  @click="getSort"><mt-tab-item id="down">反比数</mt-tab-item></div>  
        <div class="navbar screen"  @click="handleClick">
            <mt-tab-item id="screen">筛选
                <i class="iconfont">&#xe6a6;</i>
                
            </mt-tab-item>
        </div>  
    </mt-navbar>

    <div class="menu-wrapper" ref="menuwrapper">
		<div>
            <mt-tab-container v-model="selected">
                <!-- 最新帮付   -->
                <mt-tab-container-item id="newest">
                    <div class="notFind" v-if="!newestList.length">
                        <img src="../../assets/images/bangtafu/icon_finish.png" alt="">
                        <span class="try">没有找到相关商品,重新试一试吧~</span>
                    </div> 
                    <ul v-else>
                        <router-link 
                        v-for="m in newestList" :key="m.id"
                        :to="{name:'帮付订单',params:{orderId:m.order_id}}">
                            <li class="contentBox" > 
                                <div class="imgBox">
                                    <img :src="m.goods_picture_url">
                                </div>
                                <div class="goodsInfo">
                                    <p class="intro">{{m.goods_name}}</p>
                                    <div class="price-income">
                                    <span class="price">￥{{m.price_total}}</span>
                                    <span class="income">{{m.amount_payment_name}}</span>
                                    </div>
                                    <mt-progress :value="m.paid_percent*100" :bar-height="10"></mt-progress>
                                    <span class="count">已有{{m.paid_user}}人帮付¥{{m.has_paid}}</span>
                                    <span class="helpBtn">帮他付</span>
                                </div> 
                            </li>
                        </router-link>
                    </ul>    
                </mt-tab-container-item>  
                <!-- 马上成单 -->
                <mt-tab-container-item id="ordered">  
                    <div class="notFind"  v-if="!orderList.length">
                        <img src="../../assets/images/bangtafu/icon_finish.png" alt="">
                        <span class="try">没有找到相关商品,重新试一试吧~</span>
                    </div> 

                    <ul v-else>
                        <router-link
                        v-for="m in orderList" :key="m.id" 
                        :to="{name:'帮付订单',params:{orderId:m.order_id}}"> 
                            <li class="contentBox"> 
                                <div class="imgBox">
                                    <img :src="m.goods_picture_url">
                                </div>
                                <div class="goodsInfo">
                                    <p class="intro">{{m.goods_name}}</p>
                                    <div class="price-income">
                                    <span class="price">￥{{m.price_total}}</span>
                                    <span class="income">{{m.amount_payment_name}}</span>
                                    </div>
                                    <mt-progress :value="m.paid_percent*100" :bar-height="10"></mt-progress>
                                    <span class="count">已有{{m.paid_user}}人帮付¥{{m.has_paid}}</span>
                                    <span class="helpBtn">帮他付</span>
                                </div>
                            </li>
                        </router-link>
                    </ul> 
                </mt-tab-container-item>
                <!-- 反比数 -->
                <mt-tab-container-item id="down">
                    <div class="notFind" v-if="!downList.length">
                        <img src="../../assets/images/bangtafu/icon_finish.png" alt="">
                        <span class="try">没有找到相关商品,重新试一试吧~</span>
                    </div>   
                    <ul v-else>
                        <router-link 
                        v-for="m in downList" :key="m.id"
                        :to="{name:'帮付订单',params:{orderId:m.order_id}}"> 
                            <li class="contentBox"> 
                                <div class="imgBox">
                                    <img :src="m.goods_picture_url">
                                </div>
                                <div class="goodsInfo">
                                    <p class="intro">
                                    {{m.goods_name}}
                                    </p>
                                    <div class="price-income">
                                        <span class="price">￥{{m.price_total}}</span>
                                        <span class="income">{{m.amount_payment_name}}</span>
                                    </div>
                                    <mt-progress :value="m.paid_percent*100" :bar-height="10"></mt-progress>
                                    <span class="count">已有{{m.paid_user}}人帮付¥{{m.has_paid}}</span>
                                    <span class="helpBtn">帮他付</span>
                                </div>
                            </li>
                        </router-link>
                    </ul> 
                </mt-tab-container-item>
                <!-- 筛选 -->
                <mt-tab-container-item id="screen">
                    <div class="notFind" v-if="!screenList.length">
                        <img src="../../assets/images/bangtafu/icon_finish.png" alt="">
                        <span class="try">没有符合您要求的用户,看看其他它的吧~</span>
                    </div> 
                    <ul v-else>
                        <router-link 
                        v-for="m in screenList" :key="m.id"
                        :to="{name:'帮付订单',params:{orderId:m.order_id}}"> 
                            <li class="contentBox"> 
                                <div class="imgBox">
                                    <img :src="m.goods_picture_url">
                                </div>
                                <div class="goodsInfo">
                                    <p class="intro">
                                    {{m.goods_name}}
                                    </p>
                                    <div class="price-income">
                                        <span class="price">￥{{m.price_total}}</span>
                                        <span class="income">{{m.amount_payment_name}}</span>
                                    </div>
                                    <mt-progress :value="m.paid_percent*100" :bar-height="10"></mt-progress>
                                    <span class="count">已有{{m.paid_user}}人帮付¥{{m.has_paid}}</span>
                                    <span class="helpBtn">帮他付</span>
                                </div>
                            </li>
                        </router-link>
                    </ul> 
                </mt-tab-container-item>  
            </mt-tab-container>
        </div>
    </div> 

    <mt-popup v-model="screenVisible" position="right" :closeOnClickModal=false>
        <div class="wrap">
            <div class="sex">
                <p>最想帮付的发起人性别</p>
                <div class="choseSex">
                  <span v-for="(item,index) in sex" 
                  :class="{active:index==sexSpan}"
                  @click="sexChose(item,index)">{{item}}</span>
                </div>
            </div>
            <div class="age">
                <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="1"
                    :itemHeight="55" :showToolbar="true" >
                <div class="ageBox">年龄段: {{min}}~{{max}}</div>
                </mt-picker>   
            </div>
            <div class="city">
                <div class="more">
                  <p class="hotCity">热门城市</p>
                  <p class="look" @click="lookClick">查看全部<img class="sort" src="../../assets/images/bangtafu/icon_arrow.png"></p>
                </div>
                <div class="choseCity" v-model="checked">
                  <span v-for="(item,index) in hotCity"
                  :class="{active:index==citySpan}"
                  @click="cityChose(item,index)"
                  >{{item.region_name}}</span>    
                </div>
            </div>
            <footer class="popupFoot">
                <div class="replace" @click="resetClick">重置</div>
                <div class="makeSure" @click="screenClick">确定</div>
            </footer>
        </div>
    </mt-popup>

    <mt-popup v-model="cityVisible" position="right">
        <div class="cityBox">
            <div class="top">
                <img @click="cityVisible=false" src="../../assets/images/bangtafu/icon_nav_back.png" alt="">
                <div class="whiceCity">所在城市</div>
                <div @click="cityVisible=false" class="sure">确认</div>
            </div>
            <mt-index-list>
                <div v-for="k in cityList" :key="k.id">
                    <mt-index-section v-for="i in k.index" :key="i.id" :index="i"> 
                        <div class="cityList" v-for="(item,idx) in k.cities" :key="idx" 
                        :class="{active:item==listSpan}"
                        @click="choseCityList(item,idx)">{{item.region_name}}</div>     
                    </mt-index-section>
                </div>   
            </mt-index-list>
        </div>
    </mt-popup>

  </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        // props:['helpList'],
        data() {
            return {
                selected:'newest',
                screenVisible: false,
                cityVisible: false,
                sexSpan:"-1",
                citySpan:"-1",
                listSpan:'-1',
                sexSelected:'',
                citySelected:'',
                listSelected:'',
                checked:'',
                min:'',
                max:'',
                cityDatas: {},
                cityList: {},
                newestList:{},
                orderList: {},
                downList:{},
                screenList:{},
                sex:['不限','男','女'],

                hotCity: [
                    {
                        "region_id": "5132",
                        "region_name": "不限"
                    },
                    {
                        "region_id": "5132",
                        "region_name": "成都"
                    },
                    {
                        "region_id": "6529",
                        "region_name": "北京"
                    },
                    {
                        "region_id": "6592",
                        "region_name": "上海"
                    },
                    {
                        "region_id": "1529",
                        "region_name": "深圳"
                    },
                    {
                        "region_id": "1529",
                        "region_name": "武汉"
                    },
                    {
                        "region_id": "1529",
                        "region_name": "香港"
                    },
                    {
                        "region_id": "1529",
                        "region_name": "杭州"
                    },
                    {
                        "region_id": "1529",
                        "region_name": "西安"
                    },
                ],
                  
                slots: [
                    {
                        flex: 1,
                        values: ['0', '1', '2', '3', '4', '5','6','7','8','9','10','11','12'
                        ,'13','14','15'],
                        className: 'slot1',
                        textAlign: 'center',
                        itemHeight: '20vw'
                    }, {
                        divider: true,
                        content: '~',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: ['0', '1', '2', '3', '4', '5','6','7','8','9','10','11','12'
                        ,'13','14','15'],
                        className: 'slot3',
                        textAlign: 'center'
                    }
                ]
            };
        },

        methods: {
            // 最新帮付
            getNewest() {
                let  cityId = this.citySelected.region_id;
                this.$api({
                    method:'post',
                    url:'/order-help-pay/user-help-pay-hall',
                    data:{
                        token:window.token,
                        key_word:'newest'
                    }	
                }).then((res)=>{
                    this.helpDatas = res.data;
                    this.newestList = this.helpDatas.data.orders;
                    this.$nextTick(() => {
                        this._initScroll();
                    })
                }).catch((error)=>{
                    console.log(error);
                })
            },
            // 马上成单
            getOrdered() {
                let  cityId = this.citySelected.region_id;
                this.$api({
                    method:'post',
                    url:'/order-help-pay/user-help-pay-hall',
                    data:{
                        token:window.token,
                        key_word:'ordered'
                    }	
                }).then((res)=>{
                    this.helpDatas = res.data;
                    this.orderList = this.helpDatas.data.orders;
                    this.$nextTick(() => {
                        this._initScroll();
                    })
                }).catch((error)=>{
                    console.log(error);
                })
            },
            // 反比数
            getSort() {
                let  cityId = this.citySelected.region_id;
                this.$api({
                    method:'post',
                    url:'/order-help-pay/user-help-pay-hall',
                    data:{
                        token:window.token,
                        key_word:'down',
                    }	
                }).then((res)=>{
                    this.helpDatas = res.data;
                    this.downList = this.helpDatas.data.orders;
                    this.$nextTick(() => {
                        this._initScroll();
                    })
                }).catch((error)=>{
                    console.log(error);
                })
            },
            // 筛选
            screenClick(){
                let  cityId = this.citySelected.region_id;
                this.screenVisible = !this.screenVisible;
                this.$api({
                    method:'post',
                    url:'/order-help-pay/user-help-pay-hall',
                    data:{
                        token:window.token,
                        key_word:'newest',
                        page:1,
                        gender:1,
                        ages_min:this.min,
                        ages_max:this.max,
                        city_id:cityId
                    }	
                }).then((res)=>{
                    this.helpDatas = res.data;
                    this.screenList = this.helpDatas.data.orders;
                    this.$nextTick(() => {
                        this._initScroll();
                    })
                }).catch((error)=>{
                    console.log(error);
                });
                this.selected = 'screen';
            },
            handleClick() {
                this.screenVisible = !this.screenVisible;
            },
            lookClick() {
                this.cityVisible = true;
            },
            getCity() {
                this.$api
                .post(
                    "/region/cities-all"
                )
                .then(res => {
                    this.cityDatas = res.data;
                    this.cityList = this.cityDatas.data.allCities;
                })
                .catch(err => {
                    console.log(err);
                });

            },
            onValuesChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(values[0]);
                }
                this.min=values[0];
                this.max=values[1];
            },
            sexChose(item,index) {
                this.sexSpan = index;
                this.sexSelected =item; 
            },
            cityChose(item,index) {
                this.citySpan = index;
                this.citySelected =item;
            },
            choseCityList(item) {
                this.listSpan = item;
                this.listSelected = item;
            },
            // 重置
            resetClick() {
                this.sexSpan = -1;
                this.citySpan = -1;
            },
            // 滚动
            _initScroll() {
					this.meunScroll = new BScroll(this.$refs.menuwrapper, {
					click: true
				})
			},
            
        },
        mounted() {
            this.getCity();
        },
        created() {
            this.getNewest();	
            
		}

        
    }
</script>

<style lang="less" scoped>
    @import '../../assets/fz.less';
    @import '../../assets/font/iconfont.css';   
    .main {
        width: 100vw;
        .mint-navbar {
            .bd();
            .flex();
            height: @vh;
            .is-selected {
                color:@cl; 
                margin-bottom: 0;
                border-bottom: none;
            }
            .navbar {
                width: 20vw;
            }
            .screen {
                img{
                    width: 4vw;
                    height: 3vw;
                }
            }
            
        }

        .menu-wrapper{
			height: 56vh;
			overflow: hidden;
            .mint-tab-container{
                width: 100vw;
                ul {
                    width: 100%;
                    .contentBox {
                        .bd();
                        .flex();
                        width:100%;
                        padding:3vw;
                        .imgBox {
                            width: 30vw;
                            height: 30vw; 
                            img {
                            width: 100%;
                            height: 100%; 
                            }
                        }
                        .goodsInfo {
                            width: 65%;
                            height: 30vw;
                            position: relative;
                            .intro {
                                .fz(font-size, 26);
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .price-income {
                                margin:2vw 0;
                                .price {
                                    color: #b4282d;
                                    font-weight:600;
                                    
                                    .fz(font-size, 34);
                                }
                                .income {              
                                    color: #ffffff;
                                    .fz(font-size, 26);
                                    border-radius: 4px;
                                    padding: 0 2px;
                                    background-color: #ccac68;
                                }
                            }
                            .mt-progress {
                                width: 35vw;
                                height: 5vw;   
                            }
                            .count {
                                color:#666666;
                                .fz(font-size,26);
                            }
                            .helpBtn {
                                width: 18vw;
                                height: 8vw;
                                bottom: 3vw;
                                color: #fff;
                                right:0;
                                line-height: 8vw;
                                position: absolute;
                                text-align: center; 
                                border-radius: 8vw;
                                background: @cl;
                            }
                        }
                    }
                }

                .notFind {
                    width: 100vw;
                    height: 51vh;
                    text-align: center; 
                    
                    // display: none;
                    img {
                        width: 30vw;
                        margin-top: 25vw;
                    }
                    .try {
                        margin:6vw 0;
                        display: block;
                        font-weight: bold;
                        .fz(font-size,36);
                    }
                }
            }
        }

        .mint-popup {
            width: 75%;
            height: 100vh;
            padding-bottom: 12vw;
            
            .wrap {
                height: 100%;
                background: #fff;
                .sex{ 
                    width: 100%;
                    height: 30vw;
                    p {
                        display: block;
                        padding: 3vw;
                    }
                    .choseSex{
                        .flex();
                        padding: 3vw;
                        span {
                            width: 20vw;
                            height: 10vw;
                            line-height: 10vw;
                            text-align: center;
                            border:1px solid #ccc;
                            border-radius: 8vw;
                            &.active,
                            &:active {
                                color: @cl;
                                border-color: @cl;
                                
                            } 
                        }
                    }
                }
                .age{
                    border-bottom:1px solid #e7e7e7;
                    // padding: 3vw;
                    .ageBox{
                        margin-left: 3vw;
                    }
                    .mt-range{
                        padding: 3vw  0;
                    }
                }
                .city{ 
                    width: 100%;
                    height: 30vw;
                    .more {
                        .flex();
                        padding: 3vw;
                        p {
                            height: 6vw;
                            line-height: 6vw;
                            &.look{
                                color: #999999;
                            }
                        }
                        img{
                            width: 2vw;
                            height: 4vw;
                            margin-left: 2vw; 
                        }
                    }
                    .choseCity {
                        .flex();
                        padding: 3vw;
                        span {
                            width: 20vw;
                            height: 10vw;
                            line-height: 10vw;
                            text-align: center;
                            border:1px solid #ccc;
                            border-radius: 8vw;
                            margin:1vw;
                            &.active,
                            &:active {
                                color: @cl;
                                border-color: @cl;
                                
                            } 
                           
                        }
                    }
                }
                .popupFoot {
                    .bt();
                    .flex();
                    width: 100%;   
                    height: 12vw;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background: #ffffff;
                    div {
                        width: 50%;
                        height: 14vw;
                        text-align: center;
                         line-height: 12vw;
                        &.replace {
                            background: #fafafa;
                        }
                        &.makeSure {
                            background: @cl;
                            color: #fff;
                        }
                    }
                }
            }
            .cityBox {
                .top {
                    .bd();
                    .flex();
                    height: 12vw;
                    padding: 0 3vw;
                    img {
                        width: 3vw;
                        height: 6vw;
                    }
                    .whiceCity {
                        .fz(font-size,36);
                        font-weight: bold;
                    }
                    .sure {
                        .fz(font-size,34);
                    }
                }
                .cityList {
                    padding: 3vw;
                    .bd();
                    &.active,
                    &:active {
                        color: @cl; 
                    } 
                }
            }
        }
        
    }
</style>
