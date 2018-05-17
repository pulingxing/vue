<template lang="html">
    <div class="swiper">
        <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="item in banner" :key="item.id">

               
                <a :href="item.jumpurl" target="_blank">
                    <img :src="item.banner_img" :title="item.title"> 
                </a>   
            </mt-swipe-item>
        </mt-swipe>
         <van-notice-bar mode="closeable">
            132****0812  刚刚以0元抢到了一件商品。
        </van-notice-bar>
    </div>

</template>

<script>
    export default {
        props:['banner'],
        data() {
            return { 
                //  headImg:"../../assets/images/bangtafu/icon_tab_mine.png"
            }
        },   
    }
</script>
 
<style lang="less" scoped>
    @import '../../assets/fz.less';
    .swiper {
        width: 100%;
        position: relative;
        .mint-swipe {
            width: 100%;
            height:30vh;
            a,img {
                display: block;
                width: 100%;
                height:100%;
            }
        }
        .van-notice-bar {
            // z-index: 600;
            width: 50vw;
            background: #999999;
            border-radius: 20px;
            position: absolute;
            top: 2vw;
            left: 2vw;
            color: #333;
            padding: 9px 26px 9px 4px;
           
        }
    }      
</style>


