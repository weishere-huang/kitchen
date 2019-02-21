<template>
  <div class="cookbook_classify">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="dialogAdd=true"
      >添加分类</el-button>
      <el-dialog
        title="添加分类"
        :visible.sync="dialogAdd"
        width="500px"
      >
        <el-form
          label-width="90px"
          style="margin-top:16px;"
        >
          <el-form-item label="上级分类：">
            <el-input
              size="small"
              style="width:99%;"
              suffix-icon="el-icon-caret-bottom"
              @focus="selectShow=true"
              v-model="classify.label"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类名称：">
            <el-input
              size="small"
              style="width:99%;"
            ></el-input>
          </el-form-item>
          <div
            class="select_case"
            v-show="selectShow"
          >
            <select-list v-on:handlechange="handlechange"></select-list>
          </div>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="dialogAdd = false"
            plain
            size="small"
          >取 消</el-button>
          <el-button
            type="primary"
            @click="dialogAdd = false"
            size="small"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="bottom_list">
      <div class="top_list">
        <h2>菜谱分类</h2>
      </div>
      <div style="padding:10px;overflow:hidden">
        <div class="tree_title">
          <span style="padding-left:8px;">分类名称</span>
          <span style="display:inline-block;width:190px;">操作</span>
        </div>
        <el-tree
          :data="classifyData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span>{{ node.label }}</span>
            <span style="display:inline-block;width:190px;">
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)"
              >
                修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>

    </div>
    <el-dialog
      title="修改分类"
      :visible.sync="dialogEdit"
      width="500px"
    >
      <el-form
        label-width="90px"
        style="margin-top:16px;"
      >
        <el-form-item label="上级分类：">
          <el-input
            size="small"
            style="width:99%;"
            suffix-icon="el-icon-caret-bottom"
            @focus="selectShow=true"
            v-model="classify.label"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-input
            size="small"
            style="width:99%;"
          ></el-input>
        </el-form-item>
        <div
          class="select_case"
          v-show="selectShow"
        >
          <select-list v-on:handlechange="handlechange"></select-list>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogEdit = false"
          plain
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="dialogEdit = false"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import selectList from "../public/select";
export default {
  data() {
    return {
      classify: {
        label: "",
        code: ""
      },
      selectShow: false,
      dialogAdd: false,
      dialogEdit: false,
      classifyData: [
        {
          label: "第一级",
          children: [
            {
              id: 7,
              label: "二级 3-1",
              children: [
                {
                  id: 7,
                  label: "三级 3-1"
                }
              ]
            }
          ]
        },
        {
          label: "第一级"
        }
      ]
    };
  },
  methods: {
    changeSort(data) {
      console.log(data);
    },
    handleClick(tba, event) {
      this.btnShow = tba.name;
    },
    append(data) {
      console.log(data);
      this.dialogEdit = true;
      this.classify.label = data.label;
    },
    remove(node, data) {
      console.log(data);
    },
    handlechange(params) {
      this.selectShow = false;
      this.classify.label = params.label;
    }
  },
  components: {
    selectList
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
.cookbook_classify {
  font-size: 14px;
  color: @font-normal;
  .top_list {
    background-color: white;
    padding: 10px;
  }
  .bottom_list {
    background-color: white;
    margin-top: 10px;
    padding: 10px 0;
    .top_list {
      padding: 0 10px;
      line-height: 60px;
      overflow: hidden;
      border-bottom: @border;
    }
    .tree_title {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      line-height: 40px;
      background-color: #f1f1f1;
    }
    .el-tree-node__content {
      height: 40px;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  h2 {
    line-height: 40px;
  }
}
.select_case {
  background-color: white;
  height: 150px;
  width: 373px;
  overflow: scroll;
  border: @border;
  border-color: #1cc09f;
  position: absolute;
  top: 92px;
  left: 106px;
}
</style>
