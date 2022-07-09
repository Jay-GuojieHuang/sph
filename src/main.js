import Vue from 'vue'
import { MessageBox } from 'element-ui';
import App from './App.vue'

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);


import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
loading: require("./assets/lazyload.gif"), // 懒加载默认图片
});

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//注册三级联动组件为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

//引入vuex仓库
import store from '@/store'

//引入路由
import router from '@/Router'
//测试axios
// import {reqCategoryList} from '@/api'
// reqCategoryList()

//引入mockServer.js
import '@/mock/mockServer';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

// Import Swiper styles
import 'swiper/css/swiper.css'

Vue.component("SwiperCom",Swiper)
Vue.component("SwiperSlide",SwiperSlide)

// import {resGetSearchInfo} from '@/api'
// console.log(resGetSearchInfo({}));
//引入所有请求接口
import * as API from '@/api'

import Pagination from '@/components/Pagination'
Vue.component('PaginationCom',Pagination)

//引入表单校验插件
import '@/plugins/validate.js'



new Vue({
  render: h => h(App),

//全局事件总线$bus
beforeCreate(){
  //this是VM
  Vue.prototype.$bus = this;
  Vue.prototype.$API = API
},

  //注册路由信息：当这里书写router的时候，组件身上都拥有$router和$route属性
  router,
  //注册仓库：组件实例的身上会多了个属性$store
  store,

}).$mount('#app')
