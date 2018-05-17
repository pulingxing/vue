<template lang="html">
    <transition name="slide">
    <div class="name">
        <header class="header">
            <div class="back" @click="nameClick">			
            </div>
            <h1>帮付名单</h1>		
        </header>
        <div class="title">{{name.paid_user_word}}</div>
        <ul>
            <li class="bossInfo" v-for="t in name.users" :key="t.id">
                <div class="phoneNumber">
                    <img :src="t.portrait" alt="">
                    <span>{{t.user_name}}<br>2{{t.create_time_format}}</span>
                </div>
                <span>已支付  ¥{{t.help_money}}</span>
            </li>
        </ul>
    </div>
    </transition>
</template>

<script>
    import Header from '@/common/_header.vue'
    export default {
        props:['name'],
        components:{
            'v-header':Header
        },
        methods: {
            nameClick() {
				this.$emit('nameClicked');
			},
        },
        
    }
</script>

<style lang="less" scoped>
@import '../assets/fz.less';

    .name {
        position:fixed;
        top:0;
        width: 100vw;
        height: 100vh;
        z-index:600;
        background: #fafafa;
        .title {
            height: 15vw;
            margin: 3vw 0;
            line-height: 15vw;
            background: #fff;
            text-align: center;
        }
        header {
			.flex();
			height: 14vw;
			color:#333;
			padding: 0 3vw;
			position: relative;
			background-color: #fff;
			.back {
				width: 3vw;
				height: 6vw;
				position: absolute;
				background: url("../assets/images/bangtafu/icon_nav_back.png") no-repeat;
				background-size: 100% 100%; 
			}
			h1 {
				width:100%;
				text-align: center;
			}	
		} 
        .bossInfo {
            .bd();
            .flex();
            .fz(font-size,24);
            padding: 3vw;
            .phoneNumber{
                .flex();
                img{
                    width: 10vw;
                    height: 10vw;
                    border-radius: 50%;
                    margin-right: 2vw;
                } 
            }      
        }
    }     
</style>
