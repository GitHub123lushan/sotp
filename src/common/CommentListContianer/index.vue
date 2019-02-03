<template>
    <div class="commentList">
         <van-field
    v-model="message"
    label="留言"
    type="textarea"
    placeholder="请输入留言"
    rows="1"
    autosize
  />
  <van-button size="large" type="danger">发表评论</van-button>
   <ul>
       <li class="list" v-for="item in comments" :key="item.id">
           <div class="title">
               <span v-cloak>{{item.nickname}}</span>
               <span v-cloak>{{item.ctime}}</span>
           </div>
           <div class="content" v-cloak>{{item.comment}}</div>
       </li>
   </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            message:"",
            
        }
    },
    props:["comments"],
    methods:{
        
    },
    created(){
      
    }

}
</script>

<style lang="less">
.commentList{
    padding: 10px;
    .van-cell__value{
        height: 100px;
        border: 1px solid #eee;
    }
    .list{
        margin-top: 10px;
       box-shadow: 0 0 10px #eee;
        .title{
            display: flex;
            justify-content: space-between;
            padding: 10px;
        }
    }
}
</style>
