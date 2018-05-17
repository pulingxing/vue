import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Home = resolve => require(['@/index/home.vue'], resolve)
const Help = resolve => require(['@/index/help.vue'], resolve)
const Mine = resolve => require(['@/index/Mine.vue'],resolve)

const Details = resolve => require(['@/components/goods/goods-detail.vue'], resolve)
const Sure = resolve => require(['@/components/goods/confirm.vue'], resolve)
const PayOwn = resolve => require(['@/components/goods/pay-own.vue'], resolve)
const Success = resolve => require(['@/components/goods/success.vue'], resolve)

const Order = resolve => require(['@/components/help/order.vue'], resolve)
const Confirm = resolve => require(['@/components/mine/confirm.vue'], resolve)
const Finish = resolve => require(['@/components/help/success.vue'], resolve)

const Check = resolve => require(['@/components/mine/check.vue'], resolve)
const FinishDetial = resolve => require(['@/components/mine/success.vue'], resolve)
const Frozen = resolve => require(['@/components/mine/frozen.vue'], resolve)
const State = resolve => require(['@/components/mine/state.vue'], resolve)



export default new Router({

routes: [{
        path: '/index/home',
        name: '发起订单',
        component: Home,
    },{
        path: '/index/help',
        name: '帮TA付',
        component: Help
    },{
        path: '/index/mine',
        name: '我的帮付',
        component: Mine  
    },{
        path: '/goods/goods-detail',
        name: '详情页',
        component: Details
    },{
        path: '/goods/confirm',
        name: '确认订单',
        component: Sure
       
    },{
        path: '/goods/pay-own',
        name: '单独购买',
        component: PayOwn, 
        
    },{
        path: '/goods/success',
        name: '成功发起',
        component: Success 
    },{
        path: '/help/order',
        name: '帮付订单',
        component: Order
    },{
        path: '/mine/confirm',
        name: '确认帮付',
        component: Confirm
    },{
        path: '/help/success',
        name: '成功帮付',
        component: Finish
    },{
        path: '/check',
        name: '查看详情',
        component: Check
    },{
        path: '/mine/success',
        name: '已完成订单',
        component: FinishDetial
    },{
        path: '/mine/frozen',
        name: '冻结页',
        component: Frozen
    },{
        path: '/mine/state',
        name: '状态页',
        component: State
    }
    ]
})
