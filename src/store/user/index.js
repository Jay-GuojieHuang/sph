import { reqGetCode, reqUserRegiser, reqUserLogin, reqUserInfo, reqLogout } from '@/api'


const actions = {
  //获取验证码

  async getCode({ commit }, phone) {

    let res = await reqGetCode(phone)
    if (res.code === 200) {
      commit("GETCODE", res.data)
      return "ok"
    } else {
      return Promise.reject(new Error('get code failed'))
    }
  },

  //用户注册
  async userRegister(_,user) {
    // console.log(user);
    let res = await reqUserRegiser(user)
    //  console.log(res);
    if (res.code === 200) {
     
      return "ok"
      
    } else {
      return Promise.reject(new Error('register failed'))
    }
  },

  //登陆
  async userLogin({commit},data) {
    let res = await reqUserLogin(data)
    if (res.code === 200) {
    commit("USERLOGIN",res.data.token)
    localStorage.setItem("TOKEN",res.data.token)
      return "ok"
    } else {
      return Promise.reject(new Error('register failed'))
    }
  },

  //获取用户信息
  async getUserInfo({commit}){
    let res = await reqUserInfo()
    if(res.code ===200){
      commit("GETUSERINFO",res.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('Failed to get User Info'))
    }
  },

  //退出登陆
  async userLogout({commit}){
   let res =  await reqLogout()
     if(res.code === 200) {
      commit("CLEARUSER")
      return "ok"
   }else{
    return Promise.reject(new Error('Failed to get User Info'))
  }
  }



}
const mutations = {
  GETCODE(state, data) {
    state.code = data
  },
  USERLOGIN(state,data) {
    state.token = data
  },
  GETUSERINFO(state,data){
    state.userData = data
  },
  CLEARUSER(state){
    state.userData='',
    state.token='',
    localStorage.removeItem('TOKEN')
  }
}
const state = {
  code: '',
  token:localStorage.getItem("TOKEN"),
  userData:{}
}
const getters = {}


export default {
  actions,
  mutations,
  state,
  getters
}