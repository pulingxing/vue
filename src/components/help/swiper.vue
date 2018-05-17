<template lang="html">
    <mt-swipe :auto="4000" v-if="bannerList">
        <mt-swipe-item v-for="k in bannerList" :key="k.id">
            
                <img :src="k.banner_img">
            
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  props:['bannerList']
}
</script>

<style lang="less" scoped>
    .mint-swipe {
        width: 100%;
        height:20vh;
        a,img {
            display: block;
            width: 100%;
            height:100%;
        }
    }
</style>
