<template>
  <div class="goodsInfo">
    <van-nav-bar :title="data.name" left-text="返回" @click-left="$router.go(-1)"/>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in data.big_img" :key="index">
        <img :src="item" alt>
      </van-swipe-item>
    </van-swipe>
    <div class="info">
      <div class="name">
        商品名称:
        <span v-cloak>{{data.name}}</span>
      </div>
      <div class="price">
        商品价格:
        <span v-cloak>{{data.price}}</span>
      </div>
      <div class="count">商品数量:
        <van-stepper v-model="value" integer :min="1" :max="data.sale_count" :step="1"/>
      </div>
      <div class="description">
        商品描述:
        <span v-cloak>{{data.description}}</span>
      </div>
      <div class="content">商品详情:
        <div v-html="data.content"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat-o" text="客服"/>
      <van-goods-action-mini-btn icon="cart-o" text="购物车"/>
      <van-goods-action-big-btn text="加入购物车" @click="getAdd"/>
      <van-goods-action-big-btn primary text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
import { getGoodsInfo} from "@/api";
export default {
  data() {
    return {
      data: {},
      id: this.$route.params.id,
      value: 1,
    };
  },
  methods: {
    getDataInfo() {
      getGoodsInfo({ id: this.id }).then(res => {
        if (res.status == 200) {
          console.log(res.data.data);
          this.data = res.data.data;
        }
      });
    },

    getAdd() {}
  },
  created() {
    this.getDataInfo();
  }
};
</script>

<style lang="less">
.goodsInfo {
  padding-top: 46px;
  padding-bottom: 50px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .van-swipe {
    img {
      width: 100%;
      height: 300px;
      display: block;
    }
  }
  .info {
    padding: 10px;
    font-size: 14px;
    .name,
    .price {
      span {
        font-weight: 700;
        color: red;
      }
    }
    .count {
      display: flex;
      align-items: center;
      .van-stepper {
        margin-left: 10px;
      }
    }
    .content {
      img {
        width: 100%;
      }
    }
  }
}
</style>
