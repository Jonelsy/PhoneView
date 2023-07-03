<template>
<div id="Appointment">
    <van-card
        v-for="(datas) in data"
        :price="datas.price"
        :title="datas.name"
        origin-price="10000.00"
        :thumb="'http://imnu.congmingdemofeitegjj.shop/'+datas.img"
        :key="datas.id"
        @click="InCard(datas)"
    />
</div>
</template>

<script>
import axios from "axios";
import {Toast} from "vant";

export default {
  name: "Appointment",
  data(){
    return{
      data:{}
    }
  },
  methods:{
    //获取列表
    getItem(){
      this.$axios.get("/tsetmeal/mobile/setmealList")
          .then(res =>{
            this.data = res.data.data
      })
          .catch(reason => {
            Toast('数据加载失败，请刷新');
          })
    },
    //点击获取详情
    InCard(row){
      localStorage.removeItem("card")
      localStorage.setItem("card",JSON.stringify(row))
      this.$router.push("/InnerCard")
    }
  },
  created() {
    this.getItem()
  }
}
</script>

<style scoped>
#Appointment{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.van-card{
  background-color: white;
  width: 95%;
}
.van-card__content{
  text-align: left;
}
</style>