<template>
    <header>
        <div class="wrap">
        <router-link
         class="back"
         :to="{ name: '发起订单'}"
         v-if="$route.matched[0].path=='/index/help-pay-hall'">
        </router-link>
        <span class="back" @click="$router.go(-1)" v-else></span>
        <slot name="title"></slot>
        <slot name="message"></slot>
        <slot name="share"></slot>
        </div>
    </header>
</template>

<script>
    export default {}
</script>


<style lang="less" scoped>
    @import '../assets/fz.less';
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
            text-align: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            background-color: #fff;
            h1 {
                margin: 0 auto;
                font-weight: 500;
                .fz(font-size,40);
                letter-spacing: .2vw;
            }
            span{
                display: inline-block;
                position: absolute;
                &.back {
                    width: 3vw;
                    height: 6vw;
                    background: url("../assets/images/bangtafu/icon_nav_back.png") no-repeat;
                    background-size: 100% 100%; 
                }
               
            }
        }
    }
</style>


