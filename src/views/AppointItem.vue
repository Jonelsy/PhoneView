<template>
    <div>
        <van-swipe-cell :key="item.id" v-for="item in tableData" :before-close="beforeClose" :name="item.id">
            <van-card
                :desc="item.setmealName"
                :title="item.memberName"
                class="goods-card"
                thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
            >
              <template #tags>
                <span>{{item.orderstatus}}</span>
              </template>
            </van-card>
          <template #right v-if="item.orderstatus!=='已结束'&&item.orderstatus!=='已取消'">
            <van-button text="取消预约" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
    </div>

</template>




<script>
import qs from "qs";
import {Toast} from "vant";

export default {
  name: "AppointItem",
  data(){
    return{
      tableData:[],
      total:'',
    }
  },
  methods:{
    getitem(){
      this.$axios.get('/order/page',{
        params:{

          page:1,
          pageSize:10,

        }
      }).then(res=>{
        this.total = res.data.data.total
        this.tableData = res.data.data.records
      })
    },
    beforeClose({ position, instance }){
      switch (position) {

        case 'right':
          instance.close();
      }
      let id = instance.name;
      this.$axios.post('/order/status',qs.stringify({
        id:id,
        status:0
      })).then(res=>{
        instance.close();
        Toast('修改成功');
        this.getitem()

      })
    }
  },
  created() {
    this.getitem()
  }
}
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>