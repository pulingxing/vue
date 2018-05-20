<template lang="html">
    <div class="swiper">
        <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="item in banner" :key="item.id">

               
                <a :href="item.jumpurl" target="_blank">
                    <img :src="item.banner_img" :title="item.title"> 
                </a>   
            </mt-swipe-item>
        </mt-swipe>
        <!-- <van-notice-bar mode="closeable" v-for="item in barrage" :key="item.id">
            {{item.show_string}}
        </van-notice-bar> -->
    </div>

</template>

<script>
    export default {
        props:['banner'],
        data() {
            return { 
                baarrage:[],
                // headImg:"../../assets/images/bangtafu/icon_tab_mine.png"
            }
        }, 
        created() {
            this.$api({
                method:'post',
                url:'/barrage/get-barrages',
                data:{
                    barrage_location:'index'
                }
            }).then((response) => {
                this.barrageData = response.data;
                this.barrage = this.barrageData.data;
            }).catch(function(error) {
                alert(error)
            }) 
        }  
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
            width: 50vw;
            background: #e9e6e6;
            border-radius: 20px;
            position: absolute;
            top: 2vw;
            left: 2vw;
            color: #333;
            padding: 9px 26px 9px 4px;   
        }
    }      
</style>


