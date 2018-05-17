import Util from '../../util/common'
import * as types from '../types'
import Vue from 'vue'

// 容器
const state = {
  fetchLoading:false,     //全局加载状态的Loading

}

const mutations = {

  // 筛选信息

  // loading开关
  [types.SET_LOADING] (state,res) {
    state.fetchLoading = res
  },


}

let vm = new Vue({});

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {


}

// 如同计算属性,处理state的某个状态
const getters = {
   

}




export default {
  state,
  actions,
  getters,
  mutations
}
