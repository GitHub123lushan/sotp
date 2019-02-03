import axios from 'axios'
axios.defaults.baseURL = 'http://litc.pro:9999/v1/'

//获取新闻分类列表
export function getNewsCategories(){
    return axios.get('news/getNewsCategories')
}
//获取新闻列表信息
export function getNewsList(params){
    return axios.get('news/getNewsList',{params})
}
//获取新闻详情信息
export function getNewsInfo (params){
    return axios.get('news/getNewsInfo/'+params.id)
}
//获取评论列表
export function getCommentList(params){
    return axios.get('news/getCommentList/'+params.id,{params:{page:params.page,pageSize:params.pageSize}})
}
//获取商品详情
export function getGoodsInfo(params){
    return axios.get('goods/getGoodsInfo/'+params.id)
}
//获取验证码
export function getVCode(){
    return axios.get('users/getVCode')
}
//用户注册
export function register(params){
    return axios.post('users/register',params)
}
