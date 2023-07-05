<template>
<div id="SelectPeople">
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
  <div>
    <van-cell style="display: flex;flex-direction: row;justify-content: center;align-items: center">
      <div style="width: 10px;height: 25px;background-color: #39a9ed;background-color: #39a9ed;position: absolute;border-radius: 10px"></div>
      <span style="font-size: 15px;font-weight: bold;margin-left: 15px">请选择体检人信息</span>
    </van-cell>
    <van-contact-list
        v-model="chosenContactId"
        :list="list"
        default-tag-text="默认"
        add-text="新增就诊人"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
    />
  </div>

</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "SelectPeople",
  data(){
    return{
      Fulm:{},
      chosenContactId:'95',
      list: [

      ],
    }
  },
  methods:{
    onAdd() {
      Toast('新增');
      localStorage.removeItem('people')
      this.$router.push("/addPeople")
    },
    onEdit(contact) {
      const people = contact;
      Toast('编辑' );
      localStorage.removeItem('people')
      localStorage.setItem('people',JSON.stringify(people))
      this.$router.push("/addPeople")

    },
    onSelect(contact) {
      let that = this;
      Toast.loading('加载中');
      const people = contact;
      localStorage.removeItem('people')
      localStorage.setItem('people',JSON.stringify(people))
      //延迟跳转
      setTimeout(function (){
        that.$router.push("/order")
      },2000)
    },
    //获取本账号就诊人信息
    getPeople(){
      this.$axios.post('/member/getMemberByUserId?userId=' + localStorage.getItem('userID')
      ).then(res=>{
        this.list = res.data.data
        this.list.forEach((item,index,array)=>{
          item.tel = item.phonenumber
        })
      })
    },
    //获取卡片
    getCard(){
      this.Fulm = JSON.parse(localStorage.getItem('card'))
    }
  },
  created() {

    this.getPeople()
    this.getCard()
  }
}
</script>

<style scoped>

</style>