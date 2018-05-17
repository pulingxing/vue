import Util from '../../util/common'
import * as types from '../types'
const state = {
  token: 0
}

const mutations = {
  [types.GET_TOKEN] (state,res) {
    state.token = res
  }
}

export default {
  state,
  mutations
}
