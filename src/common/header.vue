<template>
    <header>
        <div class="wrap">
            <slot name="title"></slot>
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
                font-weight: 600;
                .fz(font-size,34);
                letter-spacing: .2vw;
            }
        }
    }
</style>


