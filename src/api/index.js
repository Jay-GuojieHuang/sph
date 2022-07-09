//当前这个模块：API进行统一管理
import requests from './request.js';
import mockRequests from './mockAjax'
//三级联动接口
//api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () => {
  //发请求 --因为配置了baseURL所以不用写/api
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'

  })
}

//获取banner
export const resGetBannerList = () => {
  return mockRequests({
    url: '/banner',
    method: 'get'

  })
}


//获取floor数据
export const resGetFloorList = () => mockRequests.get('/floor')


//获取搜索模块数据 地址：api/list 请求方式post 参数需要携带
export const resGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})

//获取商品详情接口 URL： /api/item/{skuid}  请求方式 get

export const reqGoodInfo = (skuid) => requests({
  url: `/item/${skuid}`,
  method: "get",
})


//将产品添加或者更新购物车（获取某个产品的个数）
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})


//获取购物车里列表数据

export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

//删除购物产品的接口
export const reqDeteleCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

//修改视频选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})


//获取验证码
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

//用户注册接口
export const reqUserRegiser = (data) => requests({
  url: `/user/passport/register`,
  data,
  method: 'post'
})

//登陆接口
export const reqUserLogin = (data) => requests({
  url: `/user/passport/login`,
  data,
  method: 'post'
})

//获取用户信息 需要带着token给服务器
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

// 退出登陆
export const reqLogout = ()=> requests({
  url:'/user/passport/logout',
  method:'get'
})

//获取用户地址信息
export const reqAddressInfo = ()=>requests({
  url:'/user/userAddress/auth/findUserAddressList',
  method:'get'
})

//获取订单交易信息
export const reqOrderInfo =()=>requests({
  url:"/order/auth/trade",
  method:'get'
})

//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({
url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
data,
method:"post"
})

//根据订单号获取支付信息
export const reqPayInfo = (orderId)=> requests({
  url:`/payment/weixin/createNative/${orderId}`,
  method:'get'
})

//发请求来获取支付情况
export const reqPayStatus=(orderId)=>requests({
  url:`/payment/weixin/queryPayStatus/${orderId}`,
  method:'get'
})

//获取个人中心的数据
export const reqMyOrderList=(CurrPage,limit)=>requests({
  url:`/order/auth/${CurrPage}/${limit}`,
  method:'get'
})