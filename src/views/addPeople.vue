<template>
<div id="addPeople">
  <van-contact-edit
      is-edit
      show-set-default
      :contact-info="editingContact"
      set-default-label="设为默认联系人"
      @save="onSave"
      @delete="onDelete"
  />
</div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "addPeople",
  data(){
    return{
      editingContact: {},
    }
  },
  methods:{
    onSave(contactInfo) {
      Toast('保存');
    },
    onDelete(contactInfo) {
      Toast('删除');
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>

</style>