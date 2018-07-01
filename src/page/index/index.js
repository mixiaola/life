require('./index.less')
import ElementUI from 'element-ui';
import App from './app.vue';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
// require('../../imgs/1.png');
Vue.use(ElementUI)
   .use(VueResource);
new Vue({
  el: '#main',
  data: {},
  render: h => h(App)
})
