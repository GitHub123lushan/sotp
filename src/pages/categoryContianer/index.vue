<template>
  <div class="category">
    <van-tabs sticky @click="getLevelList">
      <van-tab v-for="item in firsrList" :key="item.id" :title="item.name">
      </van-tab>
      <ul class="tab-content">
            <router-link tag="li" v-for="item in LevelList" :key="item.id" :to="'/goodsList/'+item.id+'/'+item.name">
                <img :src="item.img" alt="">
                <span v-cloak>{{item.name}}</span>
            </router-link>
        </ul>
    </van-tabs>
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
      firsrList: [],
      LevelList: [],
      active: 0
    };
  },
  methods: {
    //获取一级分类
    getDataList() {
      this.$ajax({
        url: "goods/getGoodsCategories"
      })
        .then(res => {
          this.firsrList = res.data.data;
          return res.data.data;
        })
        .then(res => {
            this.getLevelList(0)
        });
    },
    getLevelList(index,title) {
        let id = this.firsrList[index].id
      this.$ajax(`goods/getGoodsSubCategories/${id}`).then(res => {
        this.LevelList=res.data.data
       
      });
    },
    aa(index,title){
        console.log(index,title)
    }
  },
  created() {
    this.getDataList();
  },
  computed:{
      //获取二级分类数据
    
  }
};
</script>

<style lang="less">
    .category{
        .van-tabs{
            .tab-content{
                display: flex;
                flex-flow: wrap;
                padding: .1rem;
                li{
                    width: 50%;
                    font-size: 14px;
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    align-items: center;
                    padding: .1rem 0;
                    img{
                        width: 50%;
                    }
                }
            }
        }
    }


</style>
