//search模块的小仓库

import { resGetSearchInfo } from '@/api'
const actions = {
  async getSearchInfo(context, params = {}) {
    //params行参是当用户派发action的时候 第二个参数传递过来的，至少是一个空对象
    let res = await resGetSearchInfo(params)
    if (res.code === 200) {
      context.commit('GETSEARCHINFO', res.data)
    }
  }

}
const mutations = {
  GETSEARCHINFO(state, searchInfo) {
    state.SearchInfo = searchInfo
  }
}
const state = {
  SearchInfo: {}
}
//项目中getters主要用于简化数据
const getters = {

  goodsList(state) {
    return state.SearchInfo.goodsList||[];
  },
  trademarkList(state) {
    return state.SearchInfo.trademarkList||[];
  },
  attrsList(state) {
    return state.SearchInfo.attrsList||[];

  }
}

export default {
  actions,
  mutations,
  state,
  getters
}