<template>
  <div class="add_cookbook">
    <el-col
      :span="24"
      class="serach_case"
    >
      <el-input
        size="small"
        style="width:500px;"
      ></el-input>
      <el-button
        type="primary"
        size="small"
      >搜索</el-button>
    </el-col>
    <el-col
      :span="24"
      class="content_case"
    >
      <el-col
        :span="24"
        style="padding:12px 0;"
      >
        <span v-if="recentSearch!=''">搜索结果：</span>
        <span v-else>最近所搜：</span>
      </el-col>
      <el-col
        :span="24"
        class="results"
        style="padding-bottom:16px;height:200px;overflow:scroll;"
      >
        <span
          class="content_item"
          @click="getValue(item)"
          v-for="(item, index) in scriptData"
          :key="index"
        >{{item}}</span>
      </el-col>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scriptData: ["红烧肉", "鱼香肉丝", "酸菜鱼", "鸡公煲", "酸辣土豆丝"],
      recentSearch: ["糖醋里脊", "锅包肉", "老鸭汤", "鱼香茄子"]
    };
  },
  methods: {
    getValue(val) {
      let params = { value: val, isHide: false };
      this.$emit("dialogCoobookHide", params);
    }
  },created () {
    this.scriptData=this.recentSearch
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
.add_cookbook {
  font-size: 14px;
  color: @font-normal;
  .results {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    // justify-content: space-between;
  }
  .content_item {
    border: 1px solid @main-color;
    display: inline-block;
    line-height: 28px;
    height: 30px;
    width: 102px;
    color: @main-color;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 12px;
    cursor: pointer;
    &:hover {
      background-color: @main-color;
      color: white;
    }
  }
  .content_item:not(:nth-child(5n)) {
    margin-right: 12px;
  }
}
</style>
