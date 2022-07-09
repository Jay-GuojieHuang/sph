//引入mockjs模块
//Mock需要大写
import Mock from 'mockjs';
//把JSON数据格式引进来
//webpack默认对外暴露 图片、JSON数据格式，所以JSON文件内不用对外暴露
import banner from './banner.json';
import floor from './floor.json'

//mock数据：第一个参数请求地址，第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})