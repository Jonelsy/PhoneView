<template>
<div>
  <van-cell title="头像" is-link style="display: flex;align-items: center" @click="showchangeIMG">
    <van-image
        round
        width="3rem"
        height="3rem"
        :src="'http://imnu.congmingdemofeitegjj.shop/'+img"
    />
  </van-cell>
  <van-popup v-model="showIMG" style="min-height: 200px;border-radius:15px;width: 300px;display: flex;flex-direction: column;justify-content: center;align-items: center">
    <van-cell-group>
      <van-uploader v-model="fileList" multiple :max-count="1" :afterRead="afterRead" ref="uploader" />
    </van-cell-group>
    <van-button plain round type="info" @click="changeIMG" style="margin-top: 15px;margin-bottom: 15px">上传头像</van-button>
  </van-popup>
  <!-- 输入任意文本 -->
  <van-field v-model="username" label="用户名" input-align="right"/>
  <!-- 输入手机号，调起手机号键盘 -->
  <van-field v-model="telephone" type="tel" label="绑定手机号" input-align="right"/>
  <!-- 输入密码 -->
  <van-cell is-link @click="showPopup">修改密码</van-cell>
  <van-popup v-model="show" style="width: 60%;height: 30vh;display: flex;flex-direction: column;justify-content: center;align-items: center;border-radius: 10px">
    <van-cell-group>
      <van-field
          v-model="oldPWD"
          required
          label="旧密码"
          placeholder="请输入旧密码"
      />
      <van-field
          v-model="newPWD"
          required
          label="新密码"
          placeholder="请输入新密码"
          style="margin-top: 15px"
      />
    </van-cell-group>
    <van-button plain round type="info" style="margin-top: 15px" @click="changePWD">修改密码</van-button>
  </van-popup>
  <div style="width:100%;display: flex;align-items: center;justify-content: center;margin-top: 15px">
    <van-button type="warning" size="large" @click="changeItem">确定修改</van-button>
  </div>
</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "userChange",
  data(){
    return{
      id:'',
      username:'',
      password:'',
      telephone:'',
      roleName:'',
      img:'',
      show:false,
      text:'',
      tel:'',
      digit:'',
      number:'',
      showIMG:false,
      fileList:[],
      result:'',
      oldPWD:'',
      newPWD:'',
    }
  },
  methods:{
    showPopup(){
      this.show = true
    },
    showchangeIMG(){
      this.showIMG=true
    },
    changeIMG(){
      this.$axios.post('/tsetmeal/upload',this.result,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res=>{
        Toast('上传成功');
        this.img = res.data.data
        this.$axios.post('/user/update',{
          birthday: "",
          gender: "",
          id: this.id,
          remark: this.img,
          station: "",
          telephone: this.telephone,
          username: this.username
        }).then(res=>{
          console.log(res)
          this.showIMG=false
          this.fileList=[]
        })
      })
    },
    afterRead(file) {
      // 处理上传后的图片数据
      const reader = new FormData();
      reader.append("file", file.file);
      this.result=reader
    },
    //获取用户信息
    getuser(){
      this.$axios.get('/auth/userInfo').then((res)=>{
        this.id = res.data.data.id
        this.username = res.data.data.username
        this.telephone = res.data.data.telephone
        this.roleName = res.data.data.roleName
        this.img = res.data.data.remark
        localStorage.removeItem('userID')
        localStorage.setItem('userID',this.id)
      })
    },
    //修改
    changeItem(){
      this.$axios.post('/user/update',{
        birthday: "",
        gender: "",
        id: this.id,
        remark: this.img,
        station: "2",
        telephone: this.telephone,
        username: this.username
      }).then(res=>{
        Toast('修改成功');
        this.getuser()
      })
    },
    //修改密码
    changePWD(){
      this.$axios.post('/user/updatePass',{
        currentPass: this.oldPWD,
        password: this.newPWD
      }).then(res=>{
        Toast('修改成功');
        this.show=false
      }).catch(res=>{
        Toast('修改失败请稍后再试');
      })
    },
  },
  created() {
    this.getuser()
  }
}
</script>

<style scoped>

</style>