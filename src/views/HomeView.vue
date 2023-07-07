
<template>
  <div class="home">
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-grid gutter="10" :column-num="2" direction="horizontal"  style="margin-top: 20px">
        <van-grid-item class="iconfont" icon-prefix="icon" icon="yiliaofuwu"  text="体检预约" to="/Appointment" dot style="height: 80px"/>
        <van-grid-item class="iconfont" icon-prefix="icon" icon="baogaochaxun"  text="报告查询" to="/selectReports" style="height: 80px"/>
        <van-grid-item class="iconfont" icon-prefix="icon" icon="navicon-jkpg"  text="健康评估" to="/" style="height: 80px"/>
        <van-grid-item class="iconfont" icon-prefix="icon" icon="jiankang"  text="健康干预" to="/" style="height: 80px"/>
        <van-grid-item class="iconfont" icon-prefix="icon" icon="jiankangdangan"  text="健康档案" to="/" style="height: 80px"/>
        <van-grid-item class="iconfont" icon-prefix="icon" icon="jiankangzixun"  text="健康咨询" to="/" style="height: 80px"/>
      </van-grid>
    </div>
    <div>
      <van-grid :border="false" :column-num="1" style="margin-top: 20px;">
        <van-grid-item>
          <van-image :src="require('../image/asset-ad.png')"/>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  data(){
    return{
      images:['https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
    'https://img01.yzcdn.cn/vant/apple-2.jpg',],
    }
  },
  methods:{
    //获取用户id
    getuser(){
      this.$axios.get('/auth/userInfo').then((res)=>{
        let userID = res.data.data.id
        localStorage.removeItem('userID')
        localStorage.setItem('userID',userID)
      })
    },
  },
  created(){
    this.getuser()
  },
}
</script>
<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 230px;
  text-align: center;
  background-color: #39a9ed;
}
img{
  width: 100%;
  height: 100%;
}
/*解决图标错位问题*/
.van-grid-item__icon{
  position: relative;
}
/*深层更改组件样式*/
.van-grid-item__content.van-grid-item__content--center{
  padding: 0 0 0 0;
}
</style>
