import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'   //vuex  
import api from '@/http/api.js'       //http请求
import less from 'less'
import Mint from 'mint-ui'   //移动端UI
import Vant from 'vant'
import VueClipboard from 'vue-clipboard2'
import { hybrid } from './app/app.js'
import 'mint-ui/lib/style.css'
import 'vant/lib/vant-css/index.css'
import './assets/my-mint.less'
import vConsole from 'vconsole'


Vue.use(Mint);
Vue.use(Vant);
Vue.use(VueClipboard);
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$hybrid = hybrid;


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	data: {
		eventHub: new Vue()
	},
	components: { App },
	methods:{
		
	}
})
