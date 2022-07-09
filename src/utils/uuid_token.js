import {v4 as uuidv4} from 'uuid'

//要生成一个随机字符串，且每次执行不能发生改变，游客身份持久化储存

export const getUUID =()=>{
  //先看看本地存储有没有uuid
let uuid_token = localStorage.getItem("UUIDTOKEN")
if(!uuid_token){
  uuid_token = uuidv4()
  localStorage.setItem("UUIDTOKEN",uuid_token)
}
//如果不带参数 则返回undefined
return uuid_token
}