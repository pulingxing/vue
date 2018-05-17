<template lang="html">

    <div class="index">

        <!-- <v-header class="header"><h1 slot="title">发起</h1></v-header> -->
        <header class="header">
            <div class="back" @click="backClick">			
            </div>
            <h1>发起</h1>		
        </header>
        
        <div class="wrapper" ref="wrapper" >
            <div>
 
                <v-banner :banner="banner"></v-banner>
                
                <div class="quota">
                    <span>帮TA付额度：<i>¥{{quota}}</i></span>
                    <span class="explain" @click="explainClick"></span>
                </div> 
                
                <v-main :main="main"></v-main>

                <div class="loading-wrapper"></div>
            </div>
        </div>
      
        <v-explain @explainClicked="explainClick" v-show="explainShow"></v-explain>
        <v-footer></v-footer>

    </div>

</template>

<script>
    // import Header from '@/common/header.vue'
    import Footer from '@/common/_footer.vue'
    import Banner from '@/components/home/banner.vue'
    import Main   from '@/components/home/main.vue'
    import Explain   from '@/components/home/explain.vue'
    import BScroll from 'better-scroll'
    import { hybrid } from '../app/app.js';
   
    export default {
        components: {
            // 'v-header' :Header,
            'v-banner': Banner,
            'v-main': Main,
            'v-explain': Explain,
            'v-footer': Footer
        },

        data() {
            return { 
                indexData: {}, //帮付大厅首页数据
                main:{},
                banner:[],
                quota:'',
                explainShow:false,
                listHeight:[],  
                scrollY:0
            }
        },
        
        methods: {
            _initScroll() {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true
                })        
            },
            explainClick() {
                this.explainShow = !this.explainShow
            },
            backClick() {
                window.webkit.messageHandlers.Bkclick.postMessage()
            }  
        },

        created() { 
            this.$api({
                method: 'post',
                url: '/index/help-pay-hall',
                data:{
                    token:window.token
                }
            }).then((response) => {
                this.indexData = response.data;
                this.banner = this.indexData.data.banner;
                this.quota = this.indexData.data.amount_credit;
                this.main = this.indexData.data.goods;
                this.$nextTick(() => {
                    this._initScroll();  
                })
                // console.log(this.main)
            }).catch(function(error) {
                alert(error)
            })
            hybrid.backClick = this.backClick
            
        }              
    }
</script>

<style lang="less" scoped>
    @import '../assets/fz.less';
    .index {
        width: 100%;
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
