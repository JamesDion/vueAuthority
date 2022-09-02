// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import UUID from "vue-uuid";
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import { post, get } from "./http/axiosConfig";

// 使用uuid
Vue.use(UUID);
//使用elementUI
Vue.use(ElementUI);
//将封装后的请求方法注入至Vue实例原型
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
