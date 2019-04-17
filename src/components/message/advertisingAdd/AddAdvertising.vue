<template>
  <div class="add_advertising">
    <el-form
      label-width="110px"
      size="small"
      :model="addMsg"
      ref="addAdvertising"
      :rules="advertisingRules"
    >
      <el-form-item label="广告名称：" prop="title">
        <el-input v-model="addMsg.title" size="small" style="width:99%" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="广告缩略图：" prop="mainPic">
        <el-upload
          :action="imgApi()"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload1"
          :class="{disable:uploadShow1==2}"
          class="upload_style"
          v-model="addMsg.mainPic"
          :file-list="mainPic"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="el-upload__tip tip_style">宽高750 × 290像素，＜500KB的jpg图片</div>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt class="showPic">
        </el-dialog>
      </el-form-item>

      <el-form-item label="广告内容图：" prop="content">
        <el-upload
          :action="imgApi()"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview1"
          :on-remove="handleRemove1"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload2"
          :class="{disable:uploadShow2==2}"
          class="upload_style"
          v-model="addMsg.content"
          :file-list="content"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="el-upload__tip tip_style">宽高1000 × 不限，＜2MB的jpg图片</div>
        <!-- <el-dialog :visible.sync="dialogVisible" append-to-body class="showPic">
                    <img width="100%" :src="dialogImageUrl1" alt>
                </el-dialog>-->
      </el-form-item>
      <el-form-item label="广告链接地址：" prop="linkUrl">
        <el-input
          size="small"
          placeholder="http或https开头(内容图与链接2选1)"
          style="width:99%"
          v-model="addMsg.linkUrl"
          maxlength="200"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否显示：" prop="state">
        <el-radio-group v-model="addMsg.state">
          <el-radio :label="0" name="state">是</el-radio>
          <el-radio :label="1" name="state">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
          v-model="addMsg.startTime"
          type="datetime"
          placeholder="选择日期"
          size="small"
          style="width:250px"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="yyyy/MM/dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-date-picker
          v-model="addMsg.endTime"
          type="datetime"
          placeholder="选择日期"
          size="small"
          style="width:250px"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="yyyy/MM/dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div style="text-align: right;width:99%;padding:10px 0 20px 0;">
      <el-button @click="handleCancel" size="small" plain>取 消</el-button>
      <el-button type="primary" @click="handleAffirm('addAdvertising')" size="small">确 定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uploadShow1: 0,
        uploadShow2: 0,
        dialogImageUrl: null,
        dialogImageUrl1: null,
        dialogVisible: false,
        startTime: null,
        endTime: null,
        mainPic: [],
        content: [],
        advertisingRules: {
          title: [{required: true, message: "请填写广告标题", trigger: "blur"}],
          mainPic: [{required: true, message: "请添加图片", trigger: "change"}],
          content: [
            {
              validator: (rule, value, callback) => {
                if (
                  (this.addMsg.content == "" || this.addMsg.content == null) &&
                  (this.addMsg.linkUrl == "" || this.addMsg.linkUrl == null)
                ) {
                  callback(new Error("内容图和跳转链接必须填写一项!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          startTime: [
            {
              type: "string",
              required: true,
              message: "请添加开始日期",
              trigger: "change"
            }
          ],
          state: [
            {required: true, message: "请选择是否显示", trigger: "change"}
          ],
          endTime: [
            {
              type: "string",
              required: true,
              message: "请填写结束日期",
              trigger: "change"
            },
            {
              validator: (rule, value, callback) => {
                if (
                  this.addMsg.startTime == null ||
                  this.addMsg.startTime === "" ||
                  (this.addMsg.endTime == null || this.addMsg.endTime === "")
                ) {
                  callback();
                } else {
                  let beginTimes = this.addMsg.startTime
                  let endTimes = this.addMsg.endTime
                  let a = (Date.parse(endTimes) - Date.parse(beginTimes)) / 3600 / 1000;
                  if (a <= 0) {
                    callback(new Error("结束时间必须大于开始时间"));
                  } else {
                    callback();
                  }
                }
              },
              trigger: "change"
            }
          ]
        },
        addMsg: {
          title: "",
          mainPic: "",
          content: "",
          state: "",
          startTime: null,
          endTime: null,
          linkUrl: ""
        }
      };
    },
    props: {
      editMsg: {
        title: {},
        mainPic: {},
        content: {},
        state: {},
        startTime: {},
        endTime: {},
        linkUrl: {}
      }
    },
    methods: {
      imgApi() {
        let url = this.global.apiImg + "/api-upload/upload";
        return url;
      },
      beforeAvatarUpload1(file) {
        const isPicSize = file.size / 1024 / 1024 <= 2;
        if (isPicSize == false) {
          this.$message.error("上传图片不能大于2M");
          return false;
        } else {
          const isSize = new Promise(function (resolve, reject) {
            let width = 7500000;
            let height = 2900000;
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = function () {
              let valid = img.width <= width && img.height <= height;
              valid ? resolve() : reject();
            };
            img.src = _URL.createObjectURL(file);
          }).then(
            () => {
              return file;
            },
            () => {
              this.$message.error("上传的图片必须是等于或小于750*290!");
              return Promise.reject();
            }
          );
          return isSize;
        }
      },
      beforeAvatarUpload2(file) {
        const isPicSize = file.size / 1024 / 1024 <= 2;
        if (isPicSize == false) {
          this.$message.error("上传图片不能大于2MB");
          return false;
        } else {
          const isSize = new Promise(function (resolve, reject) {
            let width = 1000000;
            let height = 50000000;
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = function () {
              let valid = img.width <= width && img.height <= height;
              valid ? resolve() : reject();
            };
            img.src = _URL.createObjectURL(file);
          }).then(
            () => {
              return file;
            },
            () => {
              this.$message.error("上传的图片宽必须是1000像素以内!");
              return Promise.reject();
            }
          );
          return isSize;
        }
      },
      handleCancel(value) {
        let params = {type: "cancel", isHide: false};
        this.$emit("beforeadd", params);
      },
      handleAffirm(formName) {
        let params = {type: "affirm", value: this.addMsg, isHide: false};
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$emit("beforeadd", params);
          } else {
            return false;
          }
        });
      },
      edittime() {
        this.addMsg.startTime = this.startTime;
      },
      edittime1() {
        this.addMsg.endTime = this.endTime;
      },
      handleRemove(file, fileList) {
        this.addMsg.mainPic = null;
        this.uploadShow1 = 0;
        console.log(file, fileList);
      },
      handleRemove1(file, fileList) {
        this.addMsg.content = null;
        this.uploadShow2 = 0;
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureCardPreview1(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        if (res.code === 200) {
          this.addMsg.mainPic = res.data;
          this.uploadShow1 = 2;
        } else {
          this.$message.error("上传图片失败,请再次尝试");
        }
        console.log(res);
        console.log(file);
      },
      handleAvatarSuccess1(res, file) {
        if (res.code === 200) {
          this.addMsg.content = res.data;
          this.uploadShow2 = 2;
        } else {
          this.$message.error("上传图片失败,请再次尝试");
        }
        console.log(res);
        console.log(file);
      }
    },
    mounted() {
    },
    created() {
      if (this.editMsg != null) {
        Object.assign(this.addMsg, this.editMsg);
        // this.addMsg = this.editMsg;
        if (this.editMsg.mainPic !== null && this.editMsg.mainPic !== "") {
          this.mainPic = [
            {
              name: "mainpic.jpg",
              url: this.global.imgPath + this.editMsg.mainPic.replace("img:", "")
            }
          ];
        }
        if (this.editMsg.content !== null && this.editMsg.content !== "") {
          this.content = [
            {
              name: "content.jpg",
              url: this.global.imgPath + this.editMsg.content.replace("img:", "")
            }
          ];
        }
      }
    },
    watch: {
      editMsg() {
        if (this.editMsg != null) {
          Object.assign(this.addMsg, this.editMsg);
          // this.addMsg = this.editMsg;
          this.mainPic = [
            {
              name: "mainpic.jpg",
              url: this.global.imgPath + this.editMsg.mainPic.replace("img:", "")
            }
          ];
          if (this.editMsg.content !== null && this.editMsg.content !== "") {
            this.content = [
              {
                name: "content.jpg",
                url:
                this.global.imgPath + this.editMsg.content.replace("img:", "")
              }
            ];
          }
        }
        if (this.editMsg.mainPic != "" && this.editMsg.mainPic != null) {
          this.uploadShow1 = 2;
        }
        if (this.editMsg.content != "" && this.editMsg.content != null) {
          this.uploadShow2 = 2;
        }
      },
      mainPic() {
        if (this.mainPic.url != "") {
          this.uploadShow1 = 2;
        }
      },
      content() {
        if (this.content.url != "") {
          this.uploadShow2 = 2;
        }
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

    .el-upload__tip {
      font-size: 12px;
      color: #606266;
      margin-top: 7px;
      display: inline-block;
      vertical-align: bottom;
      padding-left: 8px;
      line-height: 40px;
    }
    .disable {
      .el-upload--picture-card {
        display: none;
      }
    }
    .upload_style {
      display: inline-block;
    }
  }
</style>
