<template>
<div>
  <template v-for="(item,index) in reports">
    <van-card
        :desc="item.viewReportDate"
        title="您有一份体检报告"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    >
      <template #footer>
        <van-button size="large" plain hairline type="info" @click="downReport(item)">下载体检报告</van-button>
      </template>
    </van-card>
  </template>
</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "reports",
  data(){
    return{
      id:'',
      helpcode:'',
      reports:[],
    }
  },
  methods:{
    getreports(){
      this.id = this.$route.params.id
      this.helpcode = this.$route.params.helpCode
      this.$axios.get('/member/viewReport',{
        params:{
          memberId : this.id,
          password : this.helpcode,
        }
      }).then(res=>{
        this.reports = res.data.data
        this.reports.forEach((item,index)=>{
          item.viewReportDate=this.$formatDate(new Date(item.viewReportDate),'yyyy-MM-dd')
        })
      })
    },
    //下载当前行数的文件
    downReport(row){
      let a = document.createElement("a"); //创建一个<a></a>标签
      a.href = 'http://imnu.congmingdemofeitegjj.shop/'+row.fileUpload; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
      a.download = "体检报告.doc"+row.viewReportDate; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
      a.style.display = "none"; // 障眼法藏起来a标签
      document.body.appendChild(a); // 将a标签追加到文档对象中
      a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
      a.remove(); // 一次性的，用完就删除a标签
      Toast('查询成功,正在下载报告，如未下载请重试');
      this.$router.push('/selectReports')
    }
  },
  created() {
    this.getreports()
  }
}
</script>

<style scoped>

</style>