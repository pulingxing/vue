<template lang="html">
    <transition name="slide">
        <div class="quota-explain">
            <header class="header">
                <div class="back" @click="explainClick"></div>
                <h1>额度说明</h1>		
            </header>
            <div class="text">
                <div class="text-box">
                <h1>额度的说明</h1>
                <p>这里是额度说明</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Header from '@/common/_header.vue'
    export default {
        components: {
                'v-header':Header
            },
        methods: {
            explainClick() {
				this.$emit('explainClicked');
			}
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/fz.less';
    .quota-explain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 600;
        background: #fafafa;
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
				background: url("../../assets/images/bangtafu/icon_nav_back.png") no-repeat;
				background-size: 100% 100%; 
			}
			h1 {
				width:100%;
				text-align: center;
			}	
		}
        .text {
            width: 100vw;
            height: 92vh;
            .text-box {
                position: absolute;
                top: 20vh;

                h1 {
                    text-align: center;
                }
                p {
                    padding: 3vw;
                }
            }
        }

    }
</style>

