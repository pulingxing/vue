<template lang="html">
  <div class="mine">
    <v-header>
        <div slot="title" class="box">
            <h1 slot="title" class="launchOrder" :class="{'select':select}" @click="launchClick">发起订单</h1>
            <h1 slot="title" class="helpOrder"  :class="{'checked':check}" @click="helpClick">帮付订单</h1>
        </div>
    </v-header>
    <v-launch v-show="launchVisible"></v-launch>
    <v-help v-show="helpVisible"></v-help>
    <v-footer></v-footer>
  </div>
</template>

<script>
    import Header from '@/common/header.vue'
    import Launch from '@/components/mine/launcher.vue'
    import Help from '@/components/mine/helper.vue'
    import Footer from '@/common/_footer.vue'

export default {
    components:{
        'v-header':Header,
        'v-launch':Launch,
        'v-help':Help,
        'v-footer':Footer
    },

    data(){
        return{
            launchVisible:true,
            helpVisible:false,
            select:true,
            check:false
        }
    },

    methods:{
        launchClick(){
            this.launchVisible = true;
            this.helpVisible = false;
            this.select = true;
            this.check = false;
        },
        helpClick(){
            this.helpVisible = true;
            this.launchVisible = false;
            this.select = false;
            this.check = true
        }
    },
    

}
</script>

<style lang="less" scoped>
@import '../assets/fz.less';
.mine {
    width: 100vw;
    // height: 100%;
    background: #fafafa;
    border-bottom: @vh solid #fff; 
    header{
        .bd();
        .select,.checked{
            background: #666;
            color: #fff;
        }
        .box {
        margin:0 auto;
        font-size: 0;
            h1{ 
                height: 100%;
                padding: 1vw;
                text-align: center;
                display: inline-block;
                border:1px solid #666;
                .fz(font-size,30);
                &.launchOrder {
                    border-right: 1px solid #666;
                }
            }
        }
    }
}
</style>
