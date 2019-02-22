<template>
  <div class="add_cookbook">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-arrow-left"
      >返回</el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>添加菜谱</h4>
      </div>
      <div class="table_list">
        <el-form label-width="200px">
          <el-form-item label="菜谱名称：">
            <el-input
              size="small"
              style="width:400px;"
              v-model="cookbook.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜谱分类：">
            <el-select
              size="small"
              style="width:400px;"
              v-model="cookbook.classify"
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
          <el-form-item label="菜谱脚本：">
            <el-input
              size="small"
              style="width:400px;"
              v-model="cookbook.menuScript"
              @focus="dialogScript=true"
              placeholder="请选择"
            ></el-input>
          </el-form-item>
          <el-form-item label="烹饪时长：">
            <el-input
              size="small"
              style="width:400px;"
              placeholder="单位：分钟"
              v-model="cookbook.time"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜谱配图：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
              <div
                slot="tip"
                class="el-upload__tip"
              >600 × 600像素，≤80 KB的jpg图片</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </el-form-item>
          <el-form-item label="主料：">
            <el-input
              size="small"
              style="width:600px;"
              type="textarea"
              rows="6"
              placeholder="如：猪肉450克切片，青蒜苗3根切段，大葱2根切断。"
              v-model="cookbook.mainIngredient"
            ></el-input>
          </el-form-item>
          <el-form-item label="辅料：">
            <el-input
              size="small"
              style="width:600px;"
              type="textarea"
              rows="6"
              placeholder="如：生姜1块，大蒜2瓣，豆瓣酱1勺，花椒10粒，生抽2勺。"
              v-model="cookbook.ingredients"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜谱介绍：">
            <el-input
              size="small"
              style="width:600px;"
              type="textarea"
              rows="6"
              placeholder="（选填）"
              v-model="cookbook.introduce"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="绑定菜谱脚本"
      :visible.sync="dialogScript"
      width="600px"
      :close-on-click-modal="false"
    >
      <div style="overflow:hidden;margin-top:16px;">
        <dialog-script v-on:dialogScriptHide="dialogScriptHide"></dialog-script>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import DialogScript from "./DialogScript";
export default {
  data() {
    return {
      dialogScript: false,
      cookbook: {
        name: "",
        classify: "",
        menuScript: "",
        time: "",
        pic: "",
        mainIngredient: "",
        ingredients: "",
        introduce: ""
      },
      classify: [
        {
          label: "猪肉",
          value: "2213"
        }
      ],
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    dialogScriptHide(params) {
      this.dialogScript = params.isHide;
      this.cookbook.menuScript = params.value;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {},
  components: {
    DialogScript
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
  .top_list {
    background-color: white;
    padding: 10px;
  }
  .bottom_list {
    background-color: white;
    margin-top: 10px;
    padding-bottom: 10px;
    overflow: hidden;
    .top_title {
      padding: 0 10px;
      line-height: 60px;
      overflow: hidden;
      border-bottom: @border;
      h4 {
        float: left;
      }
      .top_search {
        width: 400px;
        float: right;
      }
    }
    .table_list {
      overflow: hidden;
      padding: 10px;
    }
    .el-form-item {
      margin-bottom: 12px;
    }
  }
  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    line-height: 20px;
    display: inline-block;
    vertical-align: bottom;
    padding-left: 8px;
    line-height: 40px;
  }
}
</style>