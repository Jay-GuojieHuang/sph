import { reqCartList, reqDeteleCartById, reqUpdateCheckedById } from '@/api'

const actions = {
  //获取购物车列表
  async getCartList(context) {
    let res = await reqCartList()
    if (res.code === 200) {
      context.commit("GETCARTLIST", res.data)
    }
  },
  //删除购物车某一产品
  async deteleCartListBySkuId(context, skuId) {
    let res = await reqDeteleCartById(skuId)
    if (res.code === 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('Detele faild'))
    }
  },

  //修改购物车某一产品勾选状态
  async reqUpdateCheckedById(context, { skuId, isChecked }) {
    let res = await reqUpdateCheckedById(skuId, isChecked)
    if (res.code === 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('update failed'))
    }
  },
  //删除购物车选中产品
  deleteaAllChecked(context) {
    //用context调用actions中的方法、 
    let promiseAll = []
    context.getters.cartList.cartInfoList.forEach(item => {
      if (item.isChecked === 1) {
        let PromiseRes = context.dispatch('deteleCartListBySkuId', item.skuId)
        // console.log(PromiseRes);
        promiseAll.push(PromiseRes)
      }
    });
    //数组中有一个promise失败，则返回失败 
   return Promise.all(promiseAll)
  },

  updateAllChecked({dispatch,getters},checked){
    let promiseAll=[];
    getters.cartList.cartInfoList.forEach(item=>{
     if(item.isChecked !== checked){
      let PromiseRes = dispatch("reqUpdateCheckedById",{skuId:item.skuId,isChecked:checked})
      promiseAll.push(PromiseRes)
     }
    });
    return Promise.all(promiseAll)
  }

}
const mutations = {
  GETCARTLIST(state, data) {
    state.cartList = data
  }
}
const state = {
  cartList: []
}
const getters = {
  cartList(state) {
    return state.cartList[0] || []

  }
}


export default {
  actions,
  mutations,
  state,
  getters
}