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
      this.$axios.get('/member/viewReport',{
        params:{
          memberId : this.id,
          password : this.helpcode,
        }
      }).then(res=>{
        console.log(res.data.data[0].fileUpload)
        let a = document.createElement("a"); //创建一个<a></a>标签
        a.href = 'http://imnu.congmingdemofeitegjj.shop/'+res.data.data[0].fileUpload; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
        a.download = "体检报告.doc"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
        a.style.display = "none"; // 障眼法藏起来a标签
        document.body.appendChild(a); // 将a标签追加到文档对象中
        a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
        a.remove(); // 一次性的，用完就删除a标签
        Toast('查询成功,正在下载报告，如未下载请重试');
        this.show=false
        this.helpcode=''
      })
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