<template lang="html">
    <div class="index">
        <!-- header -->
        <header class="header">
            <div class="back" @click="backClick(),iosBackClick()">			
            </div>
            <h1>发起</h1>		
        </header>
        <!-- 类容部分better-scroll -->
        <div class="wrapper" ref="wrapper" >
            <div>
                <!-- 首页banner轮播组件 -->
                <v-banner :banner="banner"></v-banner>
                <!-- 额度说明 -->
                <div class="quota">
                    <span>帮TA付额度：<i>¥{{quota}}</i></span>
                    <span class="explain" @click="explainClick"></span>
                </div>
                <!-- 首页内容   -->
                <v-main :main="main"></v-main>     
            </div>
        </div>
        <!-- 额度说明组件 -->
        <v-explain @explainClicked="explainClick" v-show="explainShow"></v-explain>
        <!-- 底部导航组件 -->
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Banner from '@/components/home/banner.vue'
    import Main   from '@/components/home/main.vue'
    import Footer from '@/common/_footer.vue'
    import Explain   from '@/components/home/explain.vue'
    import BScroll from 'better-scroll'
   
    export default {
        components: {
            'v-banner': Banner,
            'v-main': Main,
            'v-explain': Explain,
            'v-footer': Footer
        },
        data() {
            return { 
                indexData: {}, //帮付大厅首页数据
                main:{},       //首页商品列表数据    
                banner:[],     //轮播数据
                quota:'',      //额度数据
                explainShow:false,
                listHeight:[],  
                scrollY:0
            }
        },
        created() {
            
            // 请求后端接口调取首页的数据 
            this.$api({
                    method: 'post',
                    url: '/index/help-pay-hall',
                    data:{
                        token:window.token,   //参数token
                        key_word: 'recommend',//关键词
                    }
                }).then((response) => {
                    this.indexData = response.data;
                    this.banner = this.indexData.data.banner;
                    this.quota = this.indexData.data.amount_credit;
                    this.main = this.indexData.data.goods;
                    this.$nextTick(() => {
                        this._initScroll();  
                    })  
                }).catch(function(error) {
                    alert(error)
                })           
        },
        methods: {
            // better-scroll
            _initScroll() {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true
                })        
            },
            // 帮他付额度说明的显隐
            explainClick() {
                this.explainShow = !this.explainShow
            },
            // 帮他付首页头部点击返回按钮回到原生
            backClick() {
                // vue调用安卓原生方法
                window.android.andBack();   
            }, 
            
        }                 
    }
</script>

<style lang="less" scoped>
    @import '../assets/fz.less';
    .index {
        width: 100vw;
        height: 100vh;
        background: #fafafa;
        header {
            .flex();
            padding-top: 5vw;
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
				margin: 0 auto;
                font-weight: 600;
                .fz(font-size,34);
                letter-spacing: .2vw;
			}	
		} 
        .wrapper{
            height: 84vh;
            overflow: hidden;
            .quota {
                .bd();
                .flex();
                width: 100%;
                height: 50px;
                padding: 0 10px;
                background: #fff;   
                .explain {
                    width: 25px;
                    height: 25px;
                    font-size: 14px;
                    background: url("../assets/images/bangtafu/icon_bangzhu.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
          
    }
</style>
