//引入api
import {reqGoodInfo, reqAddOrUpdateCart} from '@/api'
//封装游客身份模块
import {getUUID} from '@/utils/uuid_token'
const actions={
  //获取产品信息
  async getGoodInfo(context,skuid){
  
    let res = await reqGoodInfo(skuid)
    if(res.code === 200){
      context.commit('GETGOODINFO',res.data)
    }
  },
  //将产品添加到购物车
  async addOrUpdateCart(context,{skuId,skuNum}){
    //加入购物车返回的结果
    let res = await reqAddOrUpdateCart(skuId,skuNum)
    //当前函数返回promise
    if(res.code === 200){
      // context.commit('GETGOODINFO',res.data)
      return "Ok"
    }else{
      return Promise.reject(new Error('Failed'))
    }
  }
}
const mutations={
  GETGOODINFO(state,val){
    state.goodInfo = val
  }
}
const state={
  goodInfo: {},
  uuid_token:getUUID()
}
const getters={
  //路径导航简化数据
   categoryView(state){
    return state.goodInfo.categoryView||{}
   },
   //简化产品信息的数据
   skuInfo(state){
    return state.goodInfo.skuInfo||{}
   },
   //产品售卖属性的简化
   spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList||[]
   }

}

export default {
  actions,
  mutations,
  state,
  getters
}