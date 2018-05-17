<template lang="html">
    <div class="help"> 
        <v-header class="header"><h1 slot="title">帮TA付</h1></v-header>
        
        <v-banner :bannerList="bannerList"></v-banner>

        <v-main></v-main> 
           
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Header from '@/common/header.vue'
    import Banner from '@/components/help/swiper.vue'
    import Main from '@/components/help/main.vue'
    import Footer from '@/common/_footer.vue'
    export default {
        name:"help",
        components: {
            'v-header':Header,
            'v-banner': Banner,
            'v-main': Main,
            'v-footer': Footer  
        },
        data(){
            return {
                helpDatas: {},
                bannerList: {},
                orderList: {}

            }
        },     
        created() {
			this.$api({
				method:'post',
				url:'/order-help-pay/user-help-pay-hall',
                data:{
                    token:window.token,
                    key_word:'newest'  
                }	
			}).then((res)=>{
				this.helpDatas = res.data;
                this.bannerList = this.helpDatas.data.banner;
                this.orderList = this.helpDatas.data.orders;
			}).catch((error)=>{
				console.log(error);
			})
		}
    }
</script>

<style lang="less" scoped>
    @import '../assets/fz.less';
    .help {
        width: 100vw;
        background: #fafafa;
    }
</style>
