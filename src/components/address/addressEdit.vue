<template>
    <transition name="slide">
        <div class="addressEdit">
            <header class="header">
                <div class="back" @click="addressClick"></div>
                <h1>收货地址</h1>		
            </header>
            <van-address-edit
            :area-list="areaList"
            address-info
            show-set-default
            @save="onSave"
            @change-detail="onChangeDetail"
            />
        </div>
    </transition>
</template>
<script>
export default {
    props:['addressInfo'],
    data() {
        return {
            areaList,
            userAddress:{},
            content:this.addressInfo 
        }
    },
    methods: {
        onSave(content) {
            this.userAddress = content;
            console.log(content)
            let addressId = this.addressInfo.address_id;
            this.$api({
				method: 'post',
				url: '/address/add-edit-address',
				data:{
					token:window.token,
					address_id:addressId,
                    consignee:0,
                    telephone:0,
                    region_id:0,
                    detail_address:0,
                    is_default:1,
				}
			}).then((response) => {
				
			}).catch(function(error) {
				alert(error)
			})
            this.$emit('addressEditClicked')
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [{
                name: '黄龙万科中心',
                address: '杭州市西湖区'
                }];
            } else {
                this.searchResult = [];
            }
        },
        addressClick() {
            this.$emit('addressEditClicked')
        }
    },
    created() {
        console.log(this.addressInfo);
        this.$api({
            method: 'post',
            url: '/region/region-three',
        
        }).then((response) => {
            this.address = response.data;
            this.areaList = this.address.data;
        
            // console.log(this.areaList);
        }).catch(function(error) {
            alert(error)
        })	
} 

}
</script>
<style lang="less" scoped>
@import '../../assets/fz.less';
    .addressEdit{
        position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
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
    }
</style>



