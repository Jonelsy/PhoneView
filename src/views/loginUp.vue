<template>
<div id="loginUp">
  <div>
    <van-image
        round
        width="10rem"
        height="10rem"
        :src="require('../image/page-topIco.png')"
    />
  </div>
  <div>
    <van-cell-group style="border-radius: 10px;background-color: #f7f8fa">
      <van-field
          v-model="loginForm.username"
          required
          label="用户名"
          placeholder="请输入用户名"
          style="border-radius: 10px"
      />
      <van-field
          v-model="loginForm.password"
          type="password"
          required
          label="密码"
          placeholder="请输入密码"
          style="border-radius: 10px;margin-top: 15px"
      />
      <van-field
          v-model="loginForm.code"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          style="border-radius: 10px;margin-top: 15px"
      >
        <template #button>
          <van-image
              width="100"
              :src=captchaImg
              @click="getcharm()"
          />
        </template>
      </van-field>
    </van-cell-group>
  </div>
  <div style="display: flex;flex-direction:column;align-items: center;justify-content: center">
    <van-button round type="info" style="width: 30vh;margin-top: 15px" color="linear-gradient(to right, #A4C9FF, #1223EB)" @click="loginweb()">登录</van-button>
    <van-button round type="info" style="width: 30vh;margin-top: 15px" color="linear-gradient(to right, #eba5a5, #ff0000)" @click="sinup()">注册</van-button>
  </div>
</div>
</template>

<script>
import qs from "qs";
import {Toast} from "vant";

export default {
  name: "loginUp",
  data(){
    return{
      loginForm:{
        username:'jonelsy',
        password:'jonelsy',
        key:'',
        code:'',
      },
      captchaImg:'',
    }
  },
  methods:{
    //登录
    loginweb(){
      localStorage.clear()
      this.$axios.post('/login?'+qs.stringify(this.loginForm))
          .then(res =>{
            const authorization = res.headers['authorization'];
            const User = authorization.split(",");
            const tokens = User[0];
            const UserStation = User[1];
            localStorage.removeItem("token");
            localStorage.setItem("token",tokens);
            localStorage.removeItem("UserStation");
            localStorage.setItem("UserStation",UserStation);
            Toast('登陆成功');
            this.$router.push('/home')
          })
          .catch((res)=>{
            Toast('登陆错误，请重试');
          })
    },
    //注册
    sinup(){
      this.$router.push('/sinUp')
    },
    //验证码
    getcharm(){
      localStorage.clear()
      this.$axios.get('/auth/captcha').then(res => {
        this.loginForm.key = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    }
  },
  created() {
    this.getcharm();
  }
}
</script>

<style scoped>
#loginUp{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>