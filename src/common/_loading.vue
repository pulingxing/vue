<template lang="html">
  <div class="wrap">
        <div class="loading">
            <img src="../assets/images/bangtafu/loading.gif" height="30" width="30" alt="">
            <p>请稍后...</p>
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
  background-color:rgba(0,0,0,0.5);
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
    width: 30vw;
    height: 30vw;
    border-radius: 4px;
    background-color: #fff;;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    p{
      width: 100%;
      display: block;
    }
  }
}
</style>
