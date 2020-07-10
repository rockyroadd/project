// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(VueToast);
import { store } from '@/vuex/store';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store: store,
  template: '<App/>'
})
