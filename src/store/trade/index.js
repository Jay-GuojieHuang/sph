import { reqAddressInfo, reqOrderInfo } from '@/api'

const actions = {
  async getAddressInfo({ commit }) {
    let res = await reqAddressInfo()
    if (res.code === 200) {
      commit("GETUSERADDRESSLISTS", res.data)
      // console.log(res.data,commit);
      return "ok"
    } else {
      return Promise.reject(new Error("get user address list failed"))
    }
  },

  async getOrderInfo({ commit }) {
    let res = await reqOrderInfo()
    if (res.code === 200) {
      commit("GETORDERINFO", res.data)
      // console.log(res.data,commit);
      return "ok"
    } else {
      return Promise.reject(new Error("get user address list failed"))
    }
  },

}
const mutations =
{
  GETUSERADDRESSLISTS(state, data) {
    state.userAddressLists = data
  },
  GETORDERINFO(state,data){
    state.orderInfo = data
  }
}
const state = {
  userAddressLists: [],
  orderInfo:{}
}
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}