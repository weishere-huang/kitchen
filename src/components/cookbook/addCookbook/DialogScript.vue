<template>
  <div class="dialog_script">
    <el-col
      :span="24"
      class="serach_case"
    >
      <el-input
        size="small"
        style="width:80%;"
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
        <span>最近所搜：</span>
        <span>搜索结果：</span>
      </el-col>
      <el-col
        :span="24"
        class="results"
      >
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
        <span class="content_item">红烧肉</span>
      </el-col>
    </el-col>
  </div>
</template>
<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.dialog_script {
  font-size: 14px;
  color: @font-normal;
  .serach_case {
    //   margin-bottom: 10px;
  }
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
    width: 110px;
    color: @main-color;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      background-color: @main-color;
      color: white;
    }
  }
  .content_item:not(:nth-child(5n)){
      margin-right: 4px;
  }
}
</style>
