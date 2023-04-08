<template>
<div id="InnerCard">

</div>
</template>

<script>
export default {
  name: "InnerCard",
  data(){
    return{

    }
  },
  methods:{
    //获取卡片内容
    getCard(){
      const CardId = localStorage.getItem('cardID')
      console.log(CardId)
      // localStorage.removeItem('cardID')
    }
  },
  created() {
    this.getCard();
  }
}
</script>

<style scoped>

</style>