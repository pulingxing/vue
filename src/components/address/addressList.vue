<template>
    <transition name="slide">
        <div class="addressList">
            <header class="header">
                <div class="back" @click="addressClick"></div>
                <h1>地址列表</h1>		
            </header>
            <ul>
                <li v-for=" (item,index) in address" :key="index">
                    <div class="defaultAddress">
                        <div class="userInfo">{{item.consignee}}({{item.telephone}})</div>
                        <div class="userAddress">{{item.detail_address}}</div>
                    </div>
                    
                    <div class="addressEdit">
                        <div>
                        
                        <van-radio v-model="radio">设为默认地址</van-radio>
                       
                        </div>
                        <div class="delete-modify">
                            <div @click="onEdit(item, index)">
                                <img src="../../assets/images/bangtafu/icon_close_dd.png" alt="">
                                <span class="modify" >修改</span>
                            </div>
                            <div @click="onDelete(item, index)">
                                <img src="../../assets/images/bangtafu/icon_close_dd.png" alt="">
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                    
                </li>
            </ul>
            <footer @click="onAdd">
                新增地址
            </footer>
            <v-address @addressEditClicked="onAdd" v-if="addressShow" :addressInfo="addressInfo"></v-address>
        </div>
    </transition>
</template>
<script>
import Address from "@/components/address/addressEdit.vue";
export default {
    components: {
		'v-address':Address
	},
    data() {
        return {
        addressShow:false,
        // radio:'1',
        address:{},
        addressInfo:{}
        }
    },
    methods: {
        onAdd() { 
            this.addressShow = !this.addressShow
        },
        onEdit(item, index) {
            // console.log(item.address_id)
            this.$api({
				method: 'post',
				url: '/address/add-edit-address',
				data:{
					token:window.token,
					address_id:item.address_id
				}
			}).then((response) => {
                this.add = response.data;
                this.addressInfo = this.add.data;
                console.log(this.addressInfo);
				this.addressShow = !this.addressShow
			}).catch(function(error) {
				alert(error)
			})
            
            
        },
        onDelete(item, index) {
            Dialog.confirm({
					message:'确认删除'
				}).then(() => {
					this.$api({
						method:'post',
						url:'/address/delete-address',
						data:{
							token:window.token,
							address_id:val.address_id
						}
					}).then(() => {
						this.address.splice(index,1);
					})
							
				}).catch(() => {
					return
				});
        },
        addressClick() {
            this.$emit('addressListClicked')
        },
        
    },
    created() {
        this.$api({
				method: 'post',
				url: '/address/index',
				data:{
					token:window.token,
					
				}
			}).then((response) => {
				this.addressData = response.data;
				this.address = this.addressData.data;
				
				console.log(this.address);
			}).catch(function(error) {
				alert(error)
			})
    }
    

}
</script>
<style lang="less" scoped>
@import '../../assets/fz.less';
    .addressList{
        position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 600;
		background: #fafafa;
        header {
            .bd();
			.flex();
			height: 14vw;
			color:#333;
			padding: 0 3vw;
			position: relative;
            background-color: #fff;
            margin-bottom: 3vw;
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
        ul{
            background: #fafafa;
            li {
            margin-bottom: 3vw;
            padding: 3vw;
            .defaultAddress {  
                
                
                .userAddress {
                    .fz(font-size,26);
                    margin: 2vw 0;
                    color: #999999;
                }
            }  
            .addressEdit {
                .bt();
                .flex();
                padding-top: 3vw;
                .fz(font-size,28);
                .delete-modify {
                    .flex();
                    img {
                        width: 4vw;
                        height: 4vw;;
                    }
                    .modify {
                        margin-right: 4vw;
                    }
                }
                
            }
        
        }
        }
        
        footer {
            .bt();
            width: 100vw;
            position: fixed;
            bottom: 0;
            left: 0;
            height: @vh;
            line-height: @vh;
            text-align: center;
            color: #f03d37;
        }
    }
</style>



