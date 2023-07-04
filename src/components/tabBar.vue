<template>
  <div class="tabBar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="plus" to="/SelectPeople">添加患者</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/user">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      active: 0,
    };
  },
}
</script>

<style scoped>

</style>