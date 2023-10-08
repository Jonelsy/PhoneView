<template>
<div id="order">
  <div>
    <div class="times">
      <span>请在&nbsp</span><van-count-down ref="countDown" @finish="finish" :time="time" class="times2"/><span>&nbsp内完成支付</span>
    </div>
    <van-card
        :price="this.card.price+'.00'"
        :desc="this.card.age"
        :title="this.card.name"
        :thumb="'http://imnu.congmingdemofeitegjj.shop/'+this.card.img"
    />
    <van-contact-card type="edit" :name="people.name" :tel="people.phonenumber" :editable="false" />
  </div>
  <div>
    <van-submit-bar :price="this.card.price*100" button-text="提交订单" @submit="onSubmit" />
  </div>
  <div>
    <van-cell title="选择预约日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm"/>
  </div>
</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "order",
  data(){
    return{
      card:{},
      people:{},
      ordertiome:'',
      time:1 * 3 * 60 * 1000,
      show:false,
      date:null,
    }
  },
  methods:{
    //日期选择
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatter(date);
    },
    formatter(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    //提交订单
    onSubmit(){
      this.$router.push('/orderWin')
      let people = JSON.parse(localStorage.getItem('people'))
      let card = JSON.parse(localStorage.getItem('card'))
      const params = new URLSearchParams();
      params.append('memberId', people.id);
      params.append('orderdate', this.date);
      params.append('ordertype', '微信预约');
      params.append('setmealId', card.id);
      this.$axios.post('/order/mobile/addOrderMobile',params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res=>{
        Toast('预约成功');
        window.open('http://43.143.189.51:9999/alipay/pay?traceNo='+this.card.id+"&totalAmount="+this.card.price+"&subject="+1111)
        //this.$router.push("/orderWin")
      }).catch(res=>{
        Toast('请选择预约日期，稍后再试');
      })
    },
    //获取本地存储的订单信息与人员信息
    getorder(){
      this.card = JSON.parse(localStorage.getItem('card'));
      this.people = JSON.parse(localStorage.getItem('people'));
    },
    //倒计时结束
    finish(){
      this.$router.go(-1)
      Toast('交易取消');
    }
  },
  created() {
    this.getorder();
  }
}
</script>

<style scoped>
.times{
  width: 60%;
  margin: 0 auto;
  padding: 10px 0;
  border-radius: 15px;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  background-color: #ee0a24;
}
.times2{
  color: #fff;
  font-size: 18px;
}
</style>