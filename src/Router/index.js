//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'


// 使用插件
Vue.use(VueRouter)

//引入路由组件
// import HomeCom from '../pages/Home'
// import LoginCom from '../pages/Login'
// import RegisterCom from '../pages/Register'
// import SearchCom from '../pages/Search'
// import DetailCom from '../pages/Detail'

//重写push和replace
//先把VueRouter原型对象的push replace，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//第一个参数：告诉原来的push方法，你要往哪里跳转（传递哪些参数）

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}



import routes from './routes.js'
//配置路由
let router = new VueRouter({
  routes,
  //滚动行为
  scrollBehavior() {
    return { y: 0 }
  }

})



//配置全局导航守卫
//前置守卫

//引入store来判断是否有token
import store from '@/store';

router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let userName = store.state.user.userData.name
  if (token) {
    //用户已经登陆了 
 
    if (to.path == '/login'||to.path == '/register') {
      next('/home')
    } else {
      // 其他路径一律放行
      if(userName){
         next()
      }else{
        //store里没有用户信息 可能刷新页面了，重新拿token去服务器拿user info
          try{
             await store.dispatch('getUserInfo')
             next()
          }catch(err){
            //token失效了
            await store.dispatch('userLogout')
            next('/login')
          //  alert(err.message);
          }
      }
    }
  } else {
    // 用户没登陆
    let toPath = to.path;
    if (toPath.indexOf('/trade')!=-1||
        toPath.indexOf('/shopcart')!=-1||
        toPath.indexOf('/center')!=-1||
        toPath.indexOf('/pay')!=-1
    ) {
      // console.log('login');
      //把未登录的时候想去而没能去的路径放入url
      next('/login?redirect='+toPath)
    } else {
      // console.log("next");
      next()
    }
  }

})


export default router