//导入axios 
import {reqCategoryList,resGetBannerList,resGetFloorList} from '@/api'
// import {resGetBannerList} from '@/api'

//home模块的小仓库
const actions = {
  //通过api里面的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList(context){
    let res = await reqCategoryList()
    // console.log(res.data);
    if(res.code === 200) {
      context.commit("CATEGORYLIST",res.data.slice(1,16))
    }

  },
    async getBannerList(context){
    
      let res = await resGetBannerList()
      if(res.code===200){
        context.commit('BANNERLIST',res.data)
      }
    },
    async getFloorList(context){
      let res = await resGetFloorList()
      if(res.code === 200) {
        context.commit('FLOORLIST',res.data)
      }
    }
}
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  BANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  FLOORLIST(state,floorList){
    state.floorList = floorList
  }
}
const state = {
  categoryList:[],
  bannerList:[],
  floorList:[]

}
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}