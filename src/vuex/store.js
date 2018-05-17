//store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// 头部分类
import index from './modules/index'
import login from './modules/login'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  modules: {
    index,
    login,
    strict: debug,
  	plugins: debug ? [createLogger()] : []
  }
})
