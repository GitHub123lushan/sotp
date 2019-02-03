<template>
  <div class="goodsList">
    <van-nav-bar :title="$route.params.name" left-text="返回" left-arrow @click-left="onClickLeft"/>
      <div class="scrollop" v-show="topShow">
        <van-loading type="spinner" />
        刷新中
        </div>
     <scroll class="wrapper"
          :data="list"
          :pullup="pullup"
          :pulldown="pulldown"
          @pulldown="loadData"
          @scrollToEnd="getAddData">
    <div>
    <ul class="content">
        <li class="content_list" v-for="(item, index) in list" :key="index" @click="$router.push('/goodsInfo/'+item.id)">
            <img :src="item.cover_img" alt="">
            <div class="explain">
                <div>商品名称:{{item.name}}</div>
                <div>商品价格:{{item.price}}</div>
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
  </div>
</template>

<script>
import scroll from '@/scroll'
export default {
  data() {
    return {
        page:1,
        pageSize:10,
        list:[],
        pullup:true,
        pulldown:true,
        totalCount:0,
        topShow:false,
        bottomShow:false,
        Period:false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getDataList(){
        this.$ajax({
            url:"goods/getGoodsList",
            params:{
                cateId:this.$route.params.id,
                pageSize:this.pageSize,
                page:this.page
            }
        }).then(res=>{
            if(res.status==200){
               this.topShow=false
               this.bottomShow=false
                this.totalCount = res.data.data.totalCount
                this.list=this.list.concat(res.data.data.goods)
            }
            
        })
    },
    //下拉刷新
    loadData(){
         this.pullup=true
        this.Period=false
        this.topShow=true
        this.page=1
        this.list=[]
        this.getDataList()
    },
    //上拉加载
    getAddData(){
        if(this.page<this.totalCount/this.pageSize){
            this.bottomShow=true
            this.page++
            this.getDataList()
        }else{
            this.Period=true
            this.pullup=false
        }
    }
  },
  created(){
      this.getDataList()
  },
  components: {
    scroll
  }
};
</script>


<style lang="less">
.goodsList{
    .wrapper{
        overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 46px;
    bottom: 0px;
    z-index: 99;
    left: 0;
    right: 0;
        .content{
        .content_list{
            display: flex;
            margin: .1rem;
            box-shadow: 0 0 10px #eee;
            img{
                width: 100px;
                height: 100px;
            }
            .explain{
                display: flex;
                flex-flow: column;
                font-size: 14px;
                justify-content: center;
            }
        }
    }
    }
    
}

</style>
