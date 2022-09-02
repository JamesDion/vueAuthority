import axios from 'axios';
import { Loading } from 'element-ui';
import common from '../common/common';

let loading;

// 创建axios实例
const service = axios.create({
  baseURL : common.baseURL,// 设置请求后端的URL地址 
  timeout : common.timeout,// axios请求超时时间 
  withCredentials : common.withCredentials,   //  允许跨域带token
  headers: {
    'Content-Type' : common.contentType,  // axios发送数 据时使用json格式 
  }
})

service.defaults.transformRequest = data => JSON.stringify(data);    // 发送数据前进 行json格式化

/**
 * 设置请求拦截器(当前端发送请求给后端前进行拦截) 
 */
 service.interceptors.request.use(config => {
  startLoading();
  debugger
  if("/api/login" != config.url){
    let token = sessionStorage.getItem('token');
     //设置请求头
    confing.headers.Authorization = token;
  }
  
  return config; 
}, error => {
return Promise.reject(error);
});


/**
 * 响应拦截器（当后端返回数据的时候进行拦截）
 */
 service.interceptors.response.use(response => {
  endLoading();
  debugger;
  let url = response.config.url;
  if(url == "/api/login"){
    let {code ,data,Authorization }  = response.data;
    if(code == 200){
      sessionStorage.setItem('token',Authorization);
    }
  }else{
    let {code ,data }  = response.data;
    console.log("响应拦截器（当后端返回数据的时候进行拦截）:"+code);
    console.log("响应拦截器（当后端返回数据的时候进行拦截）:"+data);
  }

  return response; 
}, error => {
  console.log(error.response)
  endLoading();
  // 获取状态码,进行相应的处理
  return Promise.reject(error)
});

function startLoading() {
  loading = Loading.service({
      lock: true,
      text: '加载中....',
      background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

/**
 * 封装get方法
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    service.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    service.post(url,data)
    .then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}