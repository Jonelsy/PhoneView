<template>
  <div id="app">
      <div class="header">
        <Headers></Headers>
        <van-notice-bar
            left-icon="volume-o"
            text="我们希望每一位老人都将健康长寿，为此我们将不懈努力，健康之约，呵护您的健康。"
        />
      </div>
    <div style="min-height: 90vh">
      <router-view/>
    </div>
    <div id="tabBar" v-if="this.$route.path!=='/'">
        <tabBar></tabBar>
    </div>
  </div>
</template>
<script>
import Headers from './components/Headers';
import tabBar from "@/components/tabBar";
export default {
  components:{Headers,tabBar},
  data(){
    return{

    }
  },
  created() {

  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
}

</style>
