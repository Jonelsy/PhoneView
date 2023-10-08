<template>
<div class="Headers">
  <van-nav-bar
      title="健康之约"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
</div>
</template>

<script>
import {Toast} from "vant";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Headers",
  methods:{
    onClickLeft() {
      // Toast('返回');
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.Headers{
  width: 100%;
}
</style>