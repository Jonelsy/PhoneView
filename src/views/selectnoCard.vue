<template>
  <div id="SelectPeople">
      <van-contact-list
          v-model="chosenContactId"
          :list="list"
          default-tag-text="默认"
          add-text="新增就诊人"
          @add="onAdd"
          @edit="onEdit"
          @select="onEdit"
      />
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