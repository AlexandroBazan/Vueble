// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueble from './components/Vueble'

Vue.config.productionTip = false;

Vue.component('vueble', require('./components/Vueble.vue'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
