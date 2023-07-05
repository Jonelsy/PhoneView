<template>
<div id="addPeople">
  <van-form>
    <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
    />
    <van-field
        v-model="idcard"
        type="number"
        name="身份证号"
        label="身份证号"
        placeholder="身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
    />
    <van-field
        v-model="phonenumber"
        type="number"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
    />
    <van-field name="sex" label="性别">
      <template #input>
        <van-radio-group v-model="sex" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="subPerson" v-if="show==false">提交</van-button>
      <van-button round block type="info" @click="changePerson" v-if="show==true">修改</van-button>
      <van-button round block type="danger" @click="deletePerson" v-if="show==true" style="margin-top: 10px">删除患者</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "addPeople",
  data(){
    return{
      editingContact: {},
      username:'',
      password:'',
      sex:'',
      idcard:'',
      phonenumber:'',
      show:false,
      id:'',
    }
  },
  methods:{
    subPerson(){
      this.$axios.post('/member/save',{
        birthday: "",
        email: "",
        idcard: this.idcard,
        name: this.username,
        password: "",
        phonenumber: this.phonenumber,
        remark: "",
        sex: this.sex,
        userId: localStorage.getItem('userID')
      })
      Toast('新增成功');
      this.$router.go(-1)
    },
    //获取修改患者名单
    getperson(){
      let person = JSON.parse( localStorage.getItem('people'))
      if (person){
        this.show = true
        this.username = person.name
        this.idcard = person.idcard
        this.phonenumber=person.phonenumber
        this.sex = person.sex
        this.id = person.id
      }
    },

    //修改患者
    changePerson(){
      this.$axios.post('/member/update',{
        birthday: "",
        email: "",
        idcard: this.idcard,
        name: this.username,
        password: "",
        phonenumber: this.phonenumber,
        remark: "",
        sex: this.sex,
        id: this.id,
      })
      Toast('新增成功');
      this.$router.go(-1)
    },
    deletePerson(){
      let person = JSON.parse( localStorage.getItem('people'))
      this.$axios.delete('/member/delete?ids='+person.id)
          .then(res=>{
            Toast('删除成功');
            localStorage.removeItem('people')
            this.$router.go(-1)
          })
    }
  },
  created() {

    this.getperson()
  }
}
</script>

<style scoped>

</style>