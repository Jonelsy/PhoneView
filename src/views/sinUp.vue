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
            v-model="loginForm.passSecongword"
            type="password"
            required
            label="确认密码"
            placeholder="请再次输入密码"
            style="border-radius: 10px;margin-top: 15px"
        />
        <van-field
            v-model="sms"
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
    <div>
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
        username:'',
        password:'',
        passSecongword:'',
        key:'',
        // code:'',
      },
      sms:'',
      captchaImg:'',
    }
  },
  methods:{
    //注册
    sinup(){

    },
    //验证码
    getcharm(){
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