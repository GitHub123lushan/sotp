import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/homeContianer'
import category from '@/pages/categoryContianer'
import goodsList from '@/pages/goodsListContianer'
import news from '@/pages/newsContianer'
import { resolve } from 'path';
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'home'},
    {path:'/home',component:home},
    {path:'/category',component:category},
    {path:'/goodsList/:id/:name', component:goodsList},
    {path:'/news',component:news},
    {path:'/goodsInfo/:id',component:resolve=>require(['@/pages/goodsInfoContianer'],resolve)},
    {path:'/login',component:res=>require(['@/pages/loginContianer'],res)},
    {path:'/newsInfo/:id',component:res=>require(['@/pages/newsInfoContianer'],res)},
    {path:'/register',component:res=>require(['@/pages/registerContianer'],res)}
  ]
})
