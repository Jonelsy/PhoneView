<template>
  <div id="SelectPeople">
    <van-cell-group>
      <van-cell title="请选择查询报告的患者" style="color: #39a9ed" />
    </van-cell-group>
    <van-contact-list
        v-model="chosenContactId"
        :list="list"
        default-tag-text="默认"
        @select="onSelect"
    />
    <van-popup v-model="show" style="width: 60%;height: 20vh;display: flex;flex-direction:column;justify-content: center;align-items: center;border-radius: 10px">
      <van-cell-group>
        <van-field v-model="helpcode" label="助记码" placeholder="请输入助记码" />
      </van-cell-group>
      <van-button plain hairline round type="info" style="margin-top: 15px;width: 50%" @click="serchPort">确定</van-button>
    </van-popup>
  </div>
</template>

<script>

import {Toast} from "vant";

export default {
  name: "SelectPeople",
  data(){
    return{
      id:'',
      Fulm:{},
      chosenContactId:'95',
      list: [],
      show:false,
      helpcode:'',
    }
  },
  methods:{
    onSelect(contact) {
      this.show=true
      this.id = contact.id
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
    },
    //获取报告
    serchPort(){
      this.show=false
      this.$router.push({ name: 'reports', params: { id: this.id,helpCode:this.helpcode } })
    }
  },
  created() {
    this.getPeople()
    this.getCard()
  }
}
</script>

<style scoped>
.van-contact-list__bottom{
  display: none;
}
</style>