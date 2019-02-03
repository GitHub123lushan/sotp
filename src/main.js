import Vue from 'vue'
import App from './App'
import router from './router'
//引入公共样式
import '@/lib/commonStyle/index.css'
import { Button,Tabbar, TabbarItem,Search,Icon,Swipe, SwipeItem,Lazyload,Tab, Tabs,NavBar,Loading,Stepper,GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Field,
  Panel,
  Cell, CellGroup,Toast } from 'vant'
Vue.use(Button).use(Tabbar).use(TabbarItem).use(Search).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(NavBar).use(Loading).use(Stepper).use(GoodsAction)
.use(GoodsActionBigBtn)
.use(GoodsActionMiniBtn)
.use(Field)
.use(Panel)
.use(Cell).use(CellGroup).use(Toast)
Vue.config.productionTip = false
import axios from 'axios'


axios.defaults.baseURL = 'http://litc.pro:9999/v1/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$ajax = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
