<template>
  <div class="login">
    <van-nav-bar
      title="登录中心"
    />
    <van-field
      v-model="username"
      required
      clearable
      label="用户名"
      right-icon="question-o"
      placeholder="请输入用户名"
    />
    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
    <van-button size="large" type="danger">登录</van-button>
    <div class="register">
        未注册?
        <a href="#">去注册</a>
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
      username: "",
      password: "",
      active:4
    };
  }
};
</script>

<style lang="less">
    .login{
        padding: 10px;
        .register{
            display: flex;
            justify-content: flex-end;
            font-size: 14px;
        }
    }
</style>

