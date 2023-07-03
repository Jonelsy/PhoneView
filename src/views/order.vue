<template>
<div id="order">
  <div>
    <van-card
        :price="this.card.price+'.00'"
        :desc="this.card.age"
        :title="this.card.name"
        :thumb="'http://imnu.congmingdemofeitegjj.shop/'+this.card.img"
    />
  </div>
  <div>
    <van-submit-bar :price="this.card.price*100" button-text="提交订单" @submit="onSubmit" />
  </div>
</div>
</template>

<script>
export default {
  name: "order",
  data(){
    return{
      card:{},
      people:{},
    }
  },
  methods:{
    //提交订单
    onSubmit(){
      this.$router.push("/")
    },
    //获取本地存储的订单信息与人员信息
    getorder(){
      this.card = JSON.parse(localStorage.getItem('card'));
      this.people = JSON.parse(localStorage.getItem('people'));
    }
  },
  created() {
    this.getorder();
  }
}
</script>

<style scoped>

</style>