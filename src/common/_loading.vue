<template lang="html">
  <div class="wrap">
        <div class="loading">
            <img src="../assets/images/bangtafu/loading.gif" height="24" width="24" alt="">
            <!-- <p>加载中.....</p> -->
        </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>

.wrap {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: 14px;
  }
}
</style>
