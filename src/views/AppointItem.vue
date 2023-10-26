<template>
    <div>
      <div :key="item.id" v-for="item in tableData">
        <van-swipe-cell  :before-close="beforeClose" :name="item.id" v-if="item.sex==='女'">
          <van-card
              :desc="item.setmealName"
              :title="item.memberName"
              class="goods-card"
              thumb="http://imnu.congmingdemofeitegjj.shop/1a18b5b6-418e-462b-b302-82a381574af2v.png"
          >
            <template #tags>
              <div>
                <span>{{item.orderdate}}</span>
                <van-tag type="danger" style="float: right" v-if="item.orderstatus==='已取消'">{{item.orderstatus}}</van-tag>
                <van-tag type="success" style="float: right" v-else>{{item.orderstatus}}</van-tag>
              </div>
            </template>

          </van-card>
          <template #right v-if="item.orderstatus!=='已结束'&&item.orderstatus!=='已取消'">
            <van-button text="取消预约" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
        <van-swipe-cell  :before-close="beforeClose" :name="item.id" v-else="item.sex==='男'">
          <van-card
              :desc="item.setmealName "
              :title="item.memberName"
              class="goods-card"
              thumb="http://imnu.congmingdemofeitegjj.shop/768cf5b5-de4f-4d05-95d5-4abb17c3ac4cn.png"
          >
            <template #tags>
              <div>
                <span>{{item.orderdate}}</span>
                <van-tag type="danger" style="float: right" v-if="item.orderstatus==='已取消'">{{item.orderstatus}}</van-tag>
                <van-tag type="success" style="float: right" v-else>{{item.orderstatus}}</van-tag>
              </div>
            </template>

          </van-card>
          <template #right v-if="item.orderstatus!=='已结束'&&item.orderstatus!=='已取消'">
            <van-button text="取消预约" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>

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
      this.$axios.get('/member/viewOrderList/'+localStorage.getItem('userID')).then(res=>{
        this.tableData = res.data.data
        console.log(res)
        this.tableData.forEach(item=>{
          item.orderdate=this.$formatDate(new Date(item.orderdate),'yyyy-MM-dd')
        })
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