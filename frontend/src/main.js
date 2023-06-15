import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import Element from "element-ui";
import axios from "./service/axios";
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/common.css";

import PageComponent from "@/components/PageComponent";
Vue.component("vue-pagination", PageComponent);

import { onResponse, notifyMessage } from "./utils/commonMethods";
Vue.prototype.$notifyMessage = notifyMessage;
Vue.prototype.$handleResponese = onResponse;

Vue.config.productionTip = false

Vue.use(Element);
Vue.use(axios);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
