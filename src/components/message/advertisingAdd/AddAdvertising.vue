<template>
  <div class="add_advertising">
    <el-form label-width="100px">
      <el-form-item label="广告名称：">
        <el-input
          v-model="addMsg.title"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
      <el-form-item label="广告缩略图：">
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
          >宽高750 × 290像素，＜500KB的jpg图片</div>
        </el-upload>
        <el-dialog
          :visible.sync="dialogVisible"
          append-to-body
        >
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </el-form-item>

      <el-form-item label="广告内容图：">
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
          >宽高1000 × 不限，＜2MB的jpg图片</div>
        </el-upload>
        <el-dialog
          :visible.sync="dialogVisible"
          append-to-body
        >
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="addMsg.isShow">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker
          v-model="addMsg.startTime"
          type="datetime"
          placeholder="选择日期"
          size="small"
          style="width:250px"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="yyyy/MM/dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：">
        <el-date-picker
          v-model="addMsg.endTime"
          type="datetime"
          placeholder="选择日期"
          size="small"
          style="width:250px"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="yyyy/MM/dd HH:mm:ss"
        >
        </el-date-picker>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  props: {
    addMsg: {
      title: {},
      pic: {},
      picContent: {},
      isShow: {},
      startTime: {
      },
      endTime: {
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
.add_advertising {
  font-size: 14px;
  color: @font-normal;
  .el-form {
    padding-top: 16px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    display: inline-block;
    vertical-align: bottom;
    padding-left: 8px;
    line-height: 40px;
  }
}
</style>
