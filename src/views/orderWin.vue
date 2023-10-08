<template>
<div id="orderWin">
  <div>
    <van-image
        round
        width="100%"
        height="12rem"
        :src="require('../image/orderWin.jpg')"
    />
  </div>
  <p>您已支付成功，感谢您的预约</p>
  <div>
    <van-button round type="info" style="width: 30vh;margin-top: 15px" color="linear-gradient(to right, #A4C9FF, #1223EB)" @click="goBack">返回主页</van-button>
  </div>
</div>
</template>

<script>
export default {
  name: "orderWin",
  methods:{
    goBack(){
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
#orderWin{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>