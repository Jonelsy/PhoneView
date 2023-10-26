<template>
  <div id="loginUp">
    <div>
      <van-image
          round
          width="8rem"
          height="8rem"
          :src="require('../image/logo.png')"
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
            v-model="passSecongword"
            type="password"
            required
            label="确认密码"
            placeholder="请再次输入密码"
            style="border-radius: 10px;margin-top: 15px"
        />
        <van-field
            v-model="loginForm.telephone"
            type="number"
            required
            label="电话号"
            placeholder="请输入电话号"
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
            <van-button plain hairline type="info" @click="getCharm()" :disabled = "disabled" :loading = "loading" :loading-text="loadtext">{{text}}</van-button>
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
        key:'',
        code:'',
        telephone:'',
      },
      text:'获取验证码',
      loadtext:'5s后重试',
      loading:false,
      time:5,
      passSecongword:'',
      captchaImg:'',
      disabled:false,
    }
  },
  methods:{
    //注册
    sinup(){
      if(this.loginForm.password===this.passSecongword){
        this.$axios.post("/auth/mobile/register",this.loginForm)
            .then((res)=>{
              if(res.data.code!==200){
                Toast(res.data.msg);
              }else{
                Toast('注册成功');
                this.$router.push('/')
              }
            })
      }else{
        Toast("两次密码不一致，请重试")
      }
    },
    //手机获取验证码
    getCharm(){
      this.$axios.post("/auth/mobile/sendMsg",this.loginForm.telephone,{
        headers:{
          'Content-Type': 'application/json'
        }
      })
          .then((res)=>{
            this.loginForm.key = res.data.data
            if (this.time!=0){
              this.loading = true
              this.disabled = true
              let timeout =  setInterval( ()=>{
                this.time = this.time-1
                this.loadtext = this.time+'s后重试'
                if (this.time==0){
                  this.disabled = false
                  this.loading = false
                  this.time = 5
                  clearInterval(timeout)
                }
              },1000)
            }
          }).catch(()=>{
        Toast('获取验证码错误，请稍后再试');
      })
    }
  },
  created() {

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