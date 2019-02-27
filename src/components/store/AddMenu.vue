<template>
  <div class="add_menu">
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
      <el-form
        label-width="200px"
        size="small"
        :model="addMenu"
      >
        <el-form-item
          label="商品名称："
          prop="itemName"
        >
          <el-input
            type="text"
            size="small"
            style="width:300px;"
            v-model="addMenu.itemName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品分类："
          prop="itemCate"
        >
          <el-select
            v-model="addMenu.itemCate"
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
        <el-form-item label="绑定菜谱：">
          <el-input
            type="text"
            size="small"
            style="width:192px;"
            v-model="cookbook"
            @focus="dialogCoobook=true"
            placeholder="请选择"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格："
          prop="itemPrice"
        >
          <el-input
            v-model="addMenu.itemPrice"
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
        <el-form-item
          label="烹饪时长："
          prop="cookingTime"
        >
          <el-input
            v-model="addMenu.cookingTime"
            type="text"
            size="small"
            style="width:192px;"
            placeholder="单位：分钟"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="参考辣度："
          class="hot_case"
          prop="spicy"
        >
          <el-radio-group
            v-model="addMenu.spicy"
            size="small"
            style="width:192px;"
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
        <el-form-item
          label="净含量："
          prop="itemWeight"
        >
          <el-input
            v-model="addMenu.itemWeight"
            type="text"
            size="small"
            style="width:192px;"
            placeholder="单位：克"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="食材搭配："
          prop="itemSpec"
        >
          <el-input
            v-model="addMenu.itemSpec"
            type="text"
            size="small"
            style="width:300px;"
            placeholder=" 如：精选五花肉，青椒，蒜片，姜片"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品图片："
          prop="itemSpec"
        >
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
        <el-form-item
          label="是否上架："
          prop="state"
        >
          <el-radio
            v-model="addMenu.state"
            label="1"
          >是</el-radio>
          <el-radio
            v-model="addMenu.state"
            label="2"
          >否</el-radio>
        </el-form-item>
        <el-form-item
          label="加入推荐："
          prop="recommendType"
        >
          <el-checkbox v-model="addMenu.recommendType.hotMenu">热销</el-checkbox>
          <el-checkbox v-model="addMenu.recommendType.newMenu">新品</el-checkbox>
        </el-form-item>
        <el-form-item
          label="详细内容："
          prop="des"
        >
          <el-input
            v-model="addMenu.des"
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
    <el-dialog
      title="绑定菜谱"
      :visible.sync="dialogCoobook"
      width="600px"
      :close-on-click-modal="false"
    >
      <div style="overflow:hidden;margin-top:16px;">
        <dialog-coobook v-on:dialogCoobookHide="dialogCoobookHide"></dialog-coobook>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ueditor from "../public/Ue";
import areaList from "../public/Area";
import dialogCoobook from "./addCookbook/addCookbook";
export default {
  data() {
    return {
      addMenu: {
        itemName: "",
        itemCate: "",
        itemImg: "123",
        itemPrice: "",
        itemWeight: "",
        itemSpec: "",
        cookingTime: "",
        spicy: "",
        des: "",
        state: "1",
        recommendType: {
          newMenu: false,
          hotMenu: false
        }
      },
      cookbook: "",
      dialogCoobook: false,
      areaShow: false,
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      classify: [
        {
          value: "炒菜",
          label: "炒菜"
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    dialogCoobookHide(params) {
      this.dialogCoobook = params.ishide;
      this.cookbook = params.value;
    },
    getUEContent() {
    
      this.savespu();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submits() {
      this.uedata.push(UE.getEditor("editor").getContent());
      console.log(this.uedata);
    },
    savespu() {
      let qs = require("qs");
      let data = qs.stringify({
        itemName: this.addMenu.itemName,
        itemCate: this.addMenu.itemCate,
        itemImg: "123",
        itemPrice: this.addMenu.itemPrice,
        itemWeight: this.addMenu.itemWeight,
        itemSpec: this.addMenu.itemSpec,
        cookingTime: this.addMenu.cookingTime,
        spicy: this.addMenu.spicy,
        des: this.addMenu.des,
        state: this.addMenu.state,
        recommendType:JSON.stringify(this.addMenu.recommendType)
      });
      this.Axios(
        {
          params: data,
          url: "/api-mall/mallManage/addItem",
          type: "post",
          option: {
            successMsg: "保存成功"
          },
          loadingConfig: {
            target: document.querySelector(".add_menu")
          }
        },
        this
      ).then(result => {
        console.log(result.data);
        if (result.data.code === 200) {
          this.$router.push("/store");
        } else {
          this.$message.error("出库失败,请重新尝试");
        }
      });
    }
  },

  mounted() {},
  components: {
    ueditor,
    areaList,
    dialogCoobook
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
.add_menu {
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
      .ue_box {
        .el-form-item__content {
          line-height: 20px;
        }
      }
      .hot_case {
        .el-radio-button__inner:hover {
          background-color: #ff9200;
          border-color: #ff9200;
        }
        .el-radio-button__inner:focus {
          background-color: #ff9200;
          border-color: #ff9200;
        }
        .el-radio-button__inner:active {
          background-color: #ff9200;
          border-color: #ff9200;
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background-color: #ff9200;
          border-color: #ff9200;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #ff9200;
          border-color: #ff9200;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #ff9200;
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          -webkit-box-shadow: -1px 0 0 0 #ff9200;
          box-shadow: -1px 0 0 0 #ff9200;
        }
      }
    }
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
