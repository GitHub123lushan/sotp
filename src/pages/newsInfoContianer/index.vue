<template>
  <div class="newsInfo">
    <van-nav-bar :title="data.title" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
    <scroll class="wrapper"
          :data="comments"
          :pullup="pullup"
          @scrollToEnd="getAddData">
      <div>
        <div v-html="data.content" class="content"></div>
    <commentList :comments="comments"></commentList>
        <div v-if="dh" class="dh">
          没有更多了...
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getNewsInfo, getCommentList  } from "@/api";
import commentList from "@/common/CommentListContianer";
import scroll from '@/scroll'
export default {
  data() {
    return {
      id: this.$route.params.id,
      data: "",
      page: 1,
      pageSize: 10,
      comments: [],
      totalCount: "",
      pullup:true,
      dh:false
    };
  },
  methods: {
    getNewsInfo() {
      getNewsInfo({ id: this.id }).then(res => {
        console.log(res.data.data);
        this.data = res.data.data;
      });
    },
    getCommentList() {
      getCommentList({
        id: this.id,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res.data.data.comments);
        if (res.data.status === 200) {
          this.comments =this.comments.concat(res.data.data.comments)
          this.totalCount = res.data.data.totalCount;
        }
      });
    },
    getAddData(){
        if(this.comments.length<this.totalCount){
            this.page++
            this.getCommentList()
        }else{
           this.dh=true
        } 
     
    }
  },
  created() {
    this.getNewsInfo()
      this.getCommentList()
  },
  components: {
    commentList,
    scroll
  }
};
</script>

<style lang="less">
.newsInfo {
  font-size: 14px;
  .wrapper{
    position: absolute;
    top: 46px;
    bottom: 0;
     .content {
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .dh{
    text-align: center;
    line-height: 30px;
  }
  }
 
}
</style>
