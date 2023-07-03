<template>
  <div>
    <van-cell-group>
      <van-cell title="头像" is-link style="display: flex;align-items: center" @click="showchangeIMG">
        <van-image
            round
            width="3rem"
            height="3rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-popup v-model="showIMG" style="min-height: 200px;border-radius:15px;width: 300px;display: flex;flex-direction: column;justify-content: center;align-items: center">
        <van-cell-group>
          <van-uploader v-model="fileList" multiple :max-count="1" />
        </van-cell-group>
        <van-button plain round type="info" @click="changeIMG" style="margin-top: 15px;margin-bottom: 15px">上传头像</van-button>
      </van-popup>
      <van-cell title="用户名" value="admin" />
      <van-cell title="手机号" value="15004758866" />
      <van-cell is-link @click="showchangePWD">修改密码</van-cell>
      <van-popup v-model="showPWD" style="min-height: 200px;border-radius:15px;width: 300px;">
        <van-cell-group style="display: flex;flex-direction: column;justify-content: center;align-items: center">
          <van-field v-model="repwd" label="旧密码" placeholder="请输入旧密码" style="margin-top: 15px"/>
          <van-field v-model="newpwd" label="新密码" placeholder="请输入新密码" />
          <van-field v-model="renewpwd" label="再次确认密码" placeholder="请再次输入新密码" />
          <van-button plain type="info" @click="changepwd" style="margin-top: 15px;margin-bottom: 15px">确认修改</van-button>
        </van-cell-group>
      </van-popup>
      <van-cell is-link>用户协议</van-cell>
      <van-cell is-link>隐私协议</van-cell>
      <van-cell is-link>用户注销</van-cell>
      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit">退出登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password:'',
      showPWD: false,
      showIMG: false,
      repwd:'',
      newpwd:'',
      renewpwd:'',
      fileList: [],
    };
  },
  methods: {
    showchangePWD() {
      this.showPWD = true;
    },
    showchangeIMG(){
      this.showIMG = true;
    },
    onSubmit(){

    },
    changepwd(){

    },
    changeIMG(){

    }
  },
};
</script>

<style scoped>

</style>