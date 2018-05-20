<template>
    <footer @click='gotoRouter'> 
        <m-tabbar v-model="select">
            <m-tabbar-item id='发起订单'>
                <img src="../assets/images/bangtafu/icon_tap_launch.png" alt="" slot="icon-normal"> 
                <img src="../assets/images/bangtafu/icon_tap_launch_red.png" alt="" slot="icon-active"> 
                发起订单
            </m-tabbar-item>
            <m-tabbar-item id='帮TA付'>
                <img src="../assets/images/bangtafu/icon_tap_help.png" alt="" slot="icon-normal"> 
                <img src="../assets/images/bangtafu/icon_tap_help_red.png" alt="" slot="icon-active"> 
                帮TA付
            </m-tabbar-item>
            <m-tabbar-item id='我的帮付' @click="mineClick()">
                <img src="../assets/images/bangtafu/icon_tab_mine.png" alt="" slot="icon-normal"> 
                <img src="../assets/images/bangtafu/icon_tab_mine_red.png" alt="" slot="icon-active"> 
                我的帮付
            </m-tabbar-item>
        </m-tabbar>
    </footer>
</template>

<script>
import mTabbar from '../components/foot/tabbar'
import mTabbarItem from '../components/foot/tabbar-item'
import { Dialog } from 'vant';
import { hybrid } from '../app/app.js';
export default {
    name: 'foot',
    components: {
      mTabbar,
      mTabbarItem
    },
    data() {
      return {
        select:"发起订单"
      }
    },
    methods: {
        gotoRouter() {
            this.$router.push({ 
                name: this.select
            })
        },
        loginClick() {
            window.webkit.messageHandlers.closeWindow.postMessage()
        },
        mineClick() {
            if(window.token) {  
                this.$router.push({name:"我的帮付"})      
            }else{
                Dialog.confirm({
                    message: '您还没登录,请登录',
                    confirmButtonText:'登陆'
                }).then(() => { 
                    //这里调用原生方法   
                }).catch(() => {
                    this.$router.push({name:"发起订单"})
                    select:"发起订单"
                });
            }
        }
    },
    mounted() {
        //获取当前路由名称，根据该名称给当前footer添加is-selected
        
        let Rname = this.$route.name;
        switch (Rname) {
            case '发起订单':
                this.select = '发起订单';
                break;
            case '帮TA付':
                this.select = '帮TA付';
                break;
            case '我的帮付':
                this.mineClick();
                this.select = '我的帮付';
                break;
           
        }
    },
    created() {
        hybrid.loginClick = this.loginClick 
    }
}
</script>
<style lang="less" scoped>
  
    .m-tabbar {
        height: 8vh;
        font-size:16px;
    }
</style>