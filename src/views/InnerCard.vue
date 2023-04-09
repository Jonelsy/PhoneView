<template>
<div id="InnerCard">
  <div>
    <van-grid :border="false" :column-num="1">
      <van-grid-item style="height: 30vh">
        <van-image :src="'http://imnu.congmingdemofeitegjj.shop/'+Fulm.img" style="height: 100%;width: 100%;"/>
      </van-grid-item>
    </van-grid>
  </div>
  <div style="width: 100%;height: 20vh;background-color: #ffffff;">
    <h4 style="margin-left: 10px">{{Fulm.name}}</h4>
    <p style="margin-left: 10px">适用年龄：{{Fulm.age}}</p>
    <van-tag type="success" style="margin-left: 10px">高级</van-tag>
    <van-tag type="success" style="margin-left: 10px">无敌</van-tag>
    <p style="margin-left: 10px">￥{{Fulm.price}}</p>
  </div>
  <div>
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" @click="ReservationNotice()">
      体检预约须知。
    </van-notice-bar>
  </div>
  <div style="height: 60vh">
    <el-table
        :data="FulmCheck"
        stripe
        style="width: 100%">
      <el-table-column
          prop="name"
          label="项目名称"
          width="180">
      </el-table-column>
    </el-table>
    <div>
      <van-button type="info" style="width: 100%" @click="changePeople()">立即预约</van-button>
    </div>
  </div>

</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "InnerCard",
  data(){
    return{
      Fulm:{},
      FulmCheck:[],
      Fulmcheckitems:[],
    }
  },
  methods:{
    //获取卡片内容
    getCard(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const CardId = localStorage.getItem('cardID')
      // localStorage.removeItem('cardID')
      this.$axios.get('/tsetmeal/mobile/setmealDetail?id='+CardId)
          .then(res=>{
            this.Fulm = res.data.data
            this.FulmCheck = res.data.data.checkgroups
            this.Fulmcheckitems = res.data.data.checkitems
          })
    },
    //跳转预约须知
    ReservationNotice(){
      this.$router.push("/")
    },
    //跳转选择就诊人
    changePeople(){
      this.$router.push("/SelectPeople")
    },
  },
  created() {
    this.getCard();
  }
}
</script>

<style scoped>
#InnerCard{
  background-color: white;
}


</style>