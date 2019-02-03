<template>
  <div class="home">
    <div class="header">
      <van-icon name="label-o" class="icon-label"/>
      <van-search placeholder="请输入搜索关键词" style="background:rgba(0,0,0,0)"/>
      <span class="entry">登录</span>
    </div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in images" :key="item.id">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <div class="content">
        <ul>
            <router-link v-for="item in contentList" :key="item.id" tag="li" :to="'/goodsList/'+item.id+'/'+item.name">
                <img :src="item.img" alt="">
                <span v-cloak>{{item.name}}</span>
            </router-link>
        </ul>
    </div>
    <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" @click="$router.push('/home')">首页</van-tabbar-item>
  <van-tabbar-item icon="label-o" dot @click="$router.push('/category')">分类</van-tabbar-item>
  <van-tabbar-item icon="search" @click="$router.push('/news')">新闻</van-tabbar-item>
  <van-tabbar-item icon="cart-o" info="20">购物车</van-tabbar-item>
  <van-tabbar-item icon="user-o" @click="$router.push('/login')">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      contentList:[],
      active: 1
    };
  },
  methods:{
      getSwipe(){
        this.$ajax({
            url:"home/getBanners",
            data:{},
        }).then(res=>{
            if(res.status==200){
                this.images = res.data.data
            }
        })
        this.$ajax({
            url:"goods/getGoodsSubCategories?page=1&pageSize=100"
        }).then(res=>{
            if(res.status==200){
                this.contentList = res.data.data.cates
            }
        })
      },
  },
  created(){
      this.getSwipe()
  }
};
</script>

<style lang="less">
.home {
  .header {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    display: flex;
    font-size: 0.16rem;
    .icon-label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.5rem;
    }
    .van-search {
      flex: 1;
      .van-cell {
        border: 0.01rem solid #ccc;
        border-radius: 0.15rem;
      }
    }
    .entry {
      display: flex;
      width: 0.5rem;
      justify-content: center;
      align-items: center;
      color: red;
    }
  }
  .van-swipe{
      img{
          display: block;
          width: 100vw;
      }
  }
  .content{
      padding: .1rem;
    ul{
        display: flex;
        flex-wrap: wrap;
        li{ 
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            text-align: center;
            width: 33.333%;
            padding:.1rem 0;
            img{
                width: 50%;
            }
            span{
                font-size: .16rem;
            }
        }
    }
  }
}
</style>
