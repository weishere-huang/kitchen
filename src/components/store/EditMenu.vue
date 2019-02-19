<template>
  <div class="edit_menu">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-arrow-left"
        @click="$router.back(-1)"
      >返回</el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>添加商品</h4>
      </div>
      <el-form label-width="200px">
        <el-form-item label="商品名称：">
          <el-input
            type="text"
            size="small"
            style="width:300px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品分类：">
          <el-select
            v-model="classifyValue"
            placeholder="请选择"
            size="small"
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
        <el-form-item label="商品价格：">
          <el-input
            type="text"
            size="small"
            style="width:192px;"
            placeholder="单位：元"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品库存：">
          <el-input
            type="text"
            size="small"
            style="width:192px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="烹饪时长：">
          <el-input
            type="text"
            size="small"
            style="width:192px;"
            placeholder="单位：分钟"
          ></el-input>
        </el-form-item>
        <el-form-item label="参考辣度：">
          <el-radio-group
            v-model="radio5"
            size="small"
          >
            <el-radio-button label="0"><i
                class="iconfont"
                style="color:#999999;"
              >&#xe612;</i></el-radio-button>
            <el-radio-button label="1"><i
                class="iconfont"
                style="color:red;"
              >&#xe612;</i></el-radio-button>
            <el-radio-button label="2"><i
                class="iconfont"
                style="color:red;"
              >&#xe613;</i></el-radio-button>
            <el-radio-button label="3"><i
                class="iconfont"
                style="color:red;"
              >&#xe614;</i></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="净含量：">
          <el-input
            type="text"
            size="small"
            style="width:192px;"
            placeholder="单位：克"
          ></el-input>
        </el-form-item>
        <el-form-item label="食材搭配：">
          <el-input
            type="text"
            size="small"
            style="width:300px;"
            placeholder=" 如：精选五花肉，青椒，蒜片，姜片"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片：">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              width="100%"
              :src="dialogImageUrl"
              alt=""
            >
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否上架：">
          <el-radio
            v-model="up"
            label="1"
          >是</el-radio>
          <el-radio
            v-model="up"
            label="2"
          >否</el-radio>
        </el-form-item>
        <el-form-item label="加入推荐：">
          <el-checkbox v-model="hotMenu">热销</el-checkbox>
          <el-checkbox v-model="newMeny">新品</el-checkbox>
        </el-form-item>
        <el-form-item label="详细内容：">
          <el-input
            type="textarea"
            rows="5"
            style="width:600px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            size="small"
            type="primary"
          >预览</el-button>
          <el-button
            size="small"
            type="primary"
            @click="getUEContent"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ueditor from "../public/Ue";
import areaList from "../public/Area";
export default {
  data() {
    return {
      areaShow: false,
      radio5: "",
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      newMeny: "",
      hotMenu: "",
      up: "",
      classifyValue: "",
      classify: [
        {
          value: "1",
          label: "炒菜"
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    getUEContent() {
      this.editfood();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    editfood() {
      let qs = require("qs");
      let data = qs.stringify({});
      this.Axios(
        {
          params: data,
          url: "",
          type: "post",
          option: {
            successMsg: "编辑成功"
          }
        },
        this
      ).then(result => {
        console.log(result.data);
        if (result.data.code === 200) {
          this.$router.push("/store");
        } else {
          this.$message.error("编辑失败,请重新尝试");
        }
      });
    }
  },

  mounted() {},
  components: {
    ueditor,
    areaList
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
.edit_menu {
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
    }
    .el-form {
      margin-top: 20px;
      .el-dialog__body {
        padding: 0;
        font-size: 0;
        line-height: 0;
      }
      .area_case {
        width: 600px;
        border: @border;
        border-radius: 5px;
        .top_case {
          line-height: 40px;
          padding: 0 15px;
          border-bottom: @border;
          span {
            font-size: 16px;
            float: right;
            line-height: 40px;
            color: #333333;
            i {
              cursor: pointer;
              color: #333333;
              &:hover {
                color: #1cc09f;
              }
            }
          }
        }
        .content_case {
          padding: 0px 15px;
          li {
            list-style-type: none;
            line-height: 30px;
          }
        }
      }
      .el-radio-button__inner:hover {
        background-color: #1cc09f;
        border-color: #1cc09f;
      }
      .el-radio-button__inner:focus {
        background-color: #1cc09f;
        border-color: #1cc09f;
      }
      .el-radio-button__inner:active {
        background-color: #1cc09f;
        border-color: #1cc09f;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #1cc09f;
        border-color: #1cc09f;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #1cc09f;
        border-color: #1cc09f;
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #1cc09f;
      }
    }
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    -webkit-box-shadow: -1px 0 0 0 #1cc09f;
    box-shadow: -1px 0 0 0 #1cc09f;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
}
</style>
