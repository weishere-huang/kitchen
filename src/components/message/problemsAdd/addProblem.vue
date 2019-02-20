<template>
  <div class="add_problem">
    <el-form label-width="90px">
      <el-form-item label="标题：">
        <el-input
          v-model="addMsg.title"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select
          v-model="addMsg.faqType"
          placeholder="请选择"
          style="width:49%"
          size="small"
          @change="editchange"
        >
          <el-option
            v-for="item in classify"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容：">
        <el-input
          v-model="addMsg.content"
          type="textarea"
          rows="6"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classify: [
        { label: "订单问题", value: 1 },
        { label: "支付问题", value: 2 },
        { label: "其他问题", value: 3 }
      ]
    };
  },
  props: {
    addMsg: {
      title: {},
      faqType: {},
      content: {},
    }
  },
  methods:{
    editchange(){

    },
  }
};
</script>
<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.add_problem {
  font-size: 14px;
  color: @font-normal;
  .el-form {
    padding-top: 16px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
}
</style>
