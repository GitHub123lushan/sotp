<template>
  <div class="register">
    <van-nav-bar title="注册中心" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
    <van-field
      v-model="username"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="nickname"
      label="昵称"
      placeholder="请输入昵称"
    />
    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
    <van-field v-model="phone" label="手机号" placeholder="请输入手机号"/>
    <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
      <van-button slot="button" size="small" type="primary" @click="getVcode">发送验证码</van-button>
    </van-field>
    <div v-html="svg"></div>
    <van-button size="large" type="danger" @click="register">立即注册</van-button>
  </div>
</template>

<script>
import {getVCode,register} from '@/api'
export default {
    data(){
        return{
            username:"",
            nickname:"",
            password:"",
            phone:"",
            sms:"",
            svg:"",
        }
    },
    methods:{
        getVcode(){
            getVCode().then((result) => {
                console.log(result)
                this.svg = result.data
            }).catch((err) => {
                
            });
        },
        register(){
            var params={
                username:this.username,
                nickname:this.nickname,
                password:this.password,
                vCode:this.sms,
                mobile:this.phone
            }
            register(params).then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(1)
                console.dir(err)
            })
        }
    }
};
</script>

<style lang="less">
</style>
