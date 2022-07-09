//对于axios进行二次封装
import axios from 'axios'

//引用nprogress
import nprogress from 'nprogress'
//nprogress.start()进度条开始
//nprogress.done()进度条结束

//引入nprogress样式
import 'nprogress/nprogress.css'


//引入detail仓库来获取uuid——token
import storeDetail from '@/store/detail'
import store from '@/store';

//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下

const requests = axios.create({
  //配置对象
  //基础路径，发请求时回 带上api这几个字
  baseURL: '/api',
  //代表请求超时的事件 5s
  timeout: 5000,

});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些事情

requests.interceptors.request.use((config) => {
  //config: 配置对象，对象里有个属性很重要，header请求头
  //进度条开始
  nprogress.start()

  if(storeDetail.state.uuid_token){
    //添加一个请求头 和后端人员商量好
    config.headers.userTempId = storeDetail.state.uuid_token
  }

  //携带token
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  // if(localStorage.getItem("TOKEN")){
  //   config.headers.token = localStorage.getItem("TOKEN")
  // }

  return config;

})
//响应拦截器：当数据从服务器返回时，响应拦截器可以检测到，可以做一些事情

requests.interceptors.response.use(
  (res) => {
    //成功的回调，响应拦截器可以检测到 可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调
    return Promise.reject(error)

  }

)

export default requests