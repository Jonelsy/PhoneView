<template>
<div id="SelectPeople">
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
</template>

<script>
import {Toast} from "vant";

export default {
  name: "SelectPeople",
  data(){
    return{
      chosenContactId:'1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
        },
      ],
    }
  },
  methods:{
    onAdd() {
      Toast('新增');
      this.$router.push("/addPeople")
    },
    onEdit(contact) {
      Toast('编辑' + contact.id);
      this.$router.push("/addPeople")
    },
    onSelect(contact) {
      let that = this;
      Toast.loading('加载中' + contact.id);
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

    },
  },
  created() {
    this.getPeople()
  }
}
</script>

<style scoped>

</style>