//引入路由组件
// import HomeCom from '../pages/Home'
// import LoginCom from '../pages/Login'
// import RegisterCom from '../pages/Register'
// import SearchCom from '../pages/Search'
// import DetailCom from '../pages/Detail'
// import AddCartSuccessCom from '../pages/AddCartSuccess'
// import ShopCartCom from '../pages/ShopCart'
// import TradeCom from '../pages/Trade'
// import PayCom from '../pages/Pay'
// import PaySuccessCom from '../pages/PaySuccess'
// import CenterCom from '../pages/Center'
// import MyOrder from '../pages/Center/MyOrder'
// import GroupOrders from '../pages/Center/GroupOrders'


export default [
  {
    path: '/center',
    component: ()=>import('@/pages/Center'),
    meta: { showFooter: true },
    redirect:'/center/myorder',
    children: [
    {
      path: 'myorder',
      component: ()=>import('@/pages/Center/MyOrder'),
    },
    {
      path:'grouporders',
      component:()=>import('@/pages/Center/GroupOrders'),
    }

    ]
  },
  {
    path: '/paysuccess',
    component: ()=>import('@/pages/PaySuccess'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if(from.path == "/pay"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: ()=>import('@/pages/Pay'),
    meta: { showFooter: true }
  },
  {
    path: '/trade',
    component: ()=>import('@/pages/Trade'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if(from.path == "/shopcart"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/shopCart',
    component: ()=>import('@/pages/ShopCart'),
    meta: { showFooter: true }
  },
  {
    path: '/addcartsuccess',
    component: ()=>import('@/pages/AddCartSuccess'),
    meta: { showFooter: true }
  },
  {
    path: '/detail/:skuid',
    component: ()=>import('@/pages/Detail'),
    meta: { showFooter: true }
  },
  {
    path: '/home',
    component:()=>import('@/pages/Home'),
    meta: { showFooter: true }
  },
  {
    path: '/login',
    component:()=>import('@/pages/Login'),
    meta: { showFooter: false }

  },
  {
    path: '/register',
    component: ()=>import('@/pages/Register'),
    meta: { showFooter: false }

  },
  {
    path: '/search/:keyword?',
    // path: '/search',
    name: 'SearchCom',
    // component: SearchCom,
    component: ()=>import('@/pages/Search'),
    meta: { showFooter: true },
    // 路由组件能不能传递props数据？
    //布尔值写法:只有params参数可以作为组件参数传递
    // props:true
    //对象写法:额外的给路由参数传递一些props
    // props:{a:1,b:2},
    //函数写法：可以将params参数，query参数，通过props传递给路由组件
    // props:($route)=>{
    //   return {
    //     keyword:$route.params.keyword,
    //     k:$route.query.k
    //   }
    // }


  },
  //重定向，当项目打开时立马让他重定向到首页
  {
    path: '*',
    redirect: '/home'
  }

]