<template lang="html">
    <!-- 额度 -->
    <div class="quota">
        <div class="limit">
            <span>帮TA付额度：<i>¥{{quota}}</i></span>
            <span class="money"></span>
            <router-link :to="{name:'额度说明'}">
                <span class="explain" ></span>
            </router-link>
        </div> 

    </div>
    
</template>

<script>

    export default {
        props:['quota'],
        
    }
</script>

<style lang="less" scoped>
    @import '../../assets/fz.less';
    .quota {
        .limit {
            .bd();
            .flex();
            width: 100%;
            height: 50px;
            padding: 0 10px;
            background: #fff;
            span {
                font-size: 14px;
                display: inline-block;
                &.money {
                width: 100px;
                height: 30px;
                position: relative;
                left: -50px;  
                }
                &.explain {
                width: 25px;
                height: 25px;
                background: url("../../assets/images/bangtafu/icon_bangzhu.png") no-repeat;
                background-size: 100% 100%;
                }
            }    
        }
        .mint-popup {
            position: absolute;
        }
    }
    
</style>


