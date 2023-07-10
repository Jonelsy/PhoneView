import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//引入icon
import "../src/fonts/iconfont.css"
Vue.config.productionTip = false
//引入axios
import axios from "axios";
Vue.prototype.$axios = axios //在Vue的原型上添加一个$axios属性，该属性保存了axios
axios.defaults.baseURL = 'http://43.143.189.51:9999'
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
//引入Element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入日期格式化
import formatDate from './DataChange/FormData'
Vue.prototype.$formatDate = formatDate

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
