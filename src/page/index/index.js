require('./index.less')
import ElementUI from 'element-ui';
import App from './app.vue';
import 'element-ui/lib/theme-chalk/index.css';
// require('../../imgs/1.png');
Vue.use(ElementUI);
new Vue({
  el: '#main',
  data: {},
  render: h => h(App)
})
