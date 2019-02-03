<template>
  <div class="news">
    <van-tabs @click="geiListClick">
      <van-tab :title="item.name" v-for="item in ClassListData" :key="item.id" :index="item.id"/>
    </van-tabs>
    <scroll class="wrapper"
          :data="newList"
          :pullup="pullup"
          @scrollToEnd="getAddData">
    <div>
    <ul class="content">
        <li class="content-list" v-for="item in newList" :key="item.id" @click="$router.push('/newsInfo/'+item.id)">
            <img :src="item.icon" alt="">
            <div class="information">
                <h3 class="title" v-cloak>{{item.title}}</h3>
                <p>
                    <span v-cloak>发表时间:{{item.ctime}}</span>
                    <span v-cloak>点击次数:{{item.views}}</span>
                </p>
            </div>
        </li>
    </ul>
    <div class="scrollBottom" v-show="bottomShow">
        <van-loading type="spinner" />
        加载中...
    </div>
    <div class="scrollBottom" v-show="Period">
        -已经到底线了-
    </div>
    </div>
    </scroll>
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
import { getNewsCategories,getNewsList } from "@/api";
import scroll from '@/scroll'
export default {
  data() {
    return {
      ClassListData: [],
      newList:[],
      page:1,
      pageSize:10,
      bottomShow:false,
        Period:false,
        pullup:true,
        totalCount:0,
        id:0,
        title:"",
        active: 2
    };
  },
  methods: {
    getNewsClassList() {
      getNewsCategories()
        .then(result => {
            if(result.data.status===200){
                this.ClassListData=result.data.data
                return result.data.data
            }
          
        }).then(res=>{
            this.id=res[0].id
            this.title=res[0].name
            this.geiList()
        })
    },
    geiList(){
        let params={
            cate:this.id,
            keys:this.title,
            page:this.page,
            pageSize:this.pageSize
        }
        getNewsList(params).then(res=>{
            if(res.data.status===200){
                this.bottomShow=false
                this.totalCount=res.data.data.totalCount
                this.newList=this.newList.concat(res.data.data.news)
            }
        })
    },
    geiListClick(index,title){
        this.page=1
        this.newList=[]
        this.Period=false
        this.id=this.ClassListData[index].id,
        this.title=title
        this.geiList()
    },
    getAddData(){
        this.page++
        if(this.page<this.totalCount/this.pageSize){
             this.bottomShow=true
            this.geiList()
        }else{
            this.Period=true
        }
       
    }

  },
  created() {
    this.getNewsClassList();
  },
  components: {
    scroll
  }
};
</script>

<style lang="less">
.news{
    .van-tabs__wrap {
        position: fixed;
    }
    .wrapper{
           overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 46px;
    bottom: 50px;
    z-index: 99;
    left: 0;
    right: 0;
    .content{
        padding-bottom: 50px;
        .content-list{
            height: 100px;
            padding: 10px;
            display: flex;
            img{
                width: 100px;
                height: 100%;
            }
            .information{
                flex: 1;
                padding: 10px;
                font-size: 14px;
                display: flex;
                flex-flow: column;
                justify-content:space-between;
                p{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
    }
    
}
</style>
