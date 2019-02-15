<template>
  <div class="add_service">
    <el-form label-width="90px">
      <el-form-item label="地区：">
        <el-select
          v-model="addMsg.province"
          placeholder="请选择"
          style="width:49%"
          size="small"
        >
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="addMsg.city"
          placeholder="请选择"
          style="width:49%"
          size="small"
        >
          <el-option
            v-for="item in citys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="网点名称：">
        <el-input
          v-model="addMsg.name"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input
          v-model="addMsg.address"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
      <el-form-item label="服务热线：">
        <el-input
          v-model="addMsg.tel"
          size="small"
          style="width:200px"
          placeholder="如：028-12345678"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作时间：">
        <el-input
          v-model="addMsg.time"
          size="small"
          style="width:200px"
          placeholder="如：09:00-18:00"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="服务范围："
        style="margin-bottom: 0px;"
      >
        <el-checkbox-group v-model="addMsg.range">
          <el-checkbox label="送修"></el-checkbox>
          <el-checkbox label="寄修"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      provinces: [],
      citys: []
    };
  },
  props: {
    addMsg: {
      province: {},
      city: {},
      name: {},
      address: {},
      tel: {},
      time: {},
      range: {}
    }
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
.add_service {
  font-size: 14px;
  color: @font-normal;
  .el-form {
    padding-top: 20px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
}
</style>
