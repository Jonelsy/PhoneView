<template>
  <div>
    <van-cell-group>
      <van-cell title="账号信息" is-link style="display: flex;align-items: center" @click="showchangeIMG">
        <van-image
            round
            width="3rem"
            height="3rem"
            :src="'http://imnu.congmingdemofeitegjj.shop/'+img"
        />
      </van-cell>
      <van-cell title="用户名" :value="username" />
      <van-cell title="手机号" :value="telephone" />
      <van-cell title="身份" :value="roleName" />
      <van-cell is-link>用户协议</van-cell>
      <van-cell is-link>隐私协议</van-cell>
      <van-cell is-link>用户注销</van-cell>
      <van-cell is-link @click="showUS">关于我们</van-cell>
      <div style="margin: 16px;">
        <van-button round block type="danger" @click="logout">退出登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  data() {
    return {
      id:'',
      username:'',
      password:'',
      telephone:'',
      roleName:'',
      img:'',
      repwd:'',
      newpwd:'',
      renewpwd:'',
      fileList: [],
    };
  },
  methods: {
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
    showchangeIMG(){
      this.$router.push('/userChange')
    },
    showUS(){
      this.$router.push('/showUS')
    },
    onSubmit(){

    },
    changepwd(){

    },
    changeIMG(){

    },
    //推出登录
    logout(){
      this.$axios.post("/logout").then(res => {
        localStorage.clear()
        this.$router.push("/")
        Toast('退出成功');
      }).catch(res=>{
        Toast(res);
      })
    }
  },
  created() {
    this.getuser()
  }
};
</script>

<style scoped>

</style>