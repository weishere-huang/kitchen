<template>
  <div class="cookbook_classify">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        v-if="btnShow==0"
      >添加分类</el-button>
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        v-if="btnShow==1"
      >添加工艺</el-button>
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        v-if="btnShow==2"
      >添加口味</el-button>
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        v-if="btnShow==3"
      >添加人群</el-button>
    </div>
    <div class="bottom_list">
      <el-tabs
        tab-position="left"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="分类"
          name="0"
        >
          <h2>分类</h2>
          <div class="tree_title">
            <span style="padding-left:8px;">分类名称</span>
            <span style="display:inline-block;width:400px;">
              <span style="display:inline-block;width:200px;">排序</span>
              <span style="display:inline-block;width:190px;">操作</span>
            </span>
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
              <span style="display:inline-block;width:400px;">
                <span style="display:inline-block;width:200px;">
                  <el-input
                    type="number"
                    size="small"
                    style="width:100px;"
                    @change="changeSort(data)"
                  ></el-input>
                </span>
                <span style="display:inline-block;width:200px;">
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
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane
          label="工艺"
          name="1"
        >
          <h2>工艺</h2>
          <div class="tree_title">
            <span style="padding-left:8px;">分类名称</span>
            <span style="display:inline-block;width:400px;">
              <span style="display:inline-block;width:200px;">排序</span>
              <span style="display:inline-block;width:190px;">操作</span>
            </span>
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
              <span style="display:inline-block;width:400px;">
                <span style="display:inline-block;width:200px;">
                  <el-input
                    type="number"
                    size="small"
                    style="width:100px;"
                    @change="changeSort(data)"
                  ></el-input>
                </span>
                <span style="display:inline-block;width:200px;">
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
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane
          label="口味"
          name="2"
        >
          <h2>口味</h2>
          <div class="tree_title">
            <span style="padding-left:8px;">分类名称</span>
            <span style="display:inline-block;width:400px;">
              <span style="display:inline-block;width:200px;">排序</span>
              <span style="display:inline-block;width:190px;">操作</span>
            </span>
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
              <span style="display:inline-block;width:400px;">
                <span style="display:inline-block;width:200px;">
                  <el-input
                    type="number"
                    size="small"
                    style="width:100px;"
                    @change="changeSort(data)"
                  ></el-input>
                </span>
                <span style="display:inline-block;width:200px;">
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
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane
          label="人群"
          name="3"
        >
          <h2>人群</h2>
          <div class="tree_title">
            <span style="padding-left:8px;">分类名称</span>
            <span style="display:inline-block;width:400px;">
              <span style="display:inline-block;width:200px;">排序</span>
              <span style="display:inline-block;width:190px;">操作</span>
            </span>
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
              <span style="display:inline-block;width:400px;">
                <span style="display:inline-block;width:200px;">
                  <el-input
                    type="number"
                    size="small"
                    style="width:100px;"
                    @change="changeSort(data)"
                  ></el-input>
                </span>
                <span style="display:inline-block;width:200px;">
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
            </span>
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnShow: 0,
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
    },
    remove(node, data) {
      console.log(data);
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
    .el-tabs__item {
      width: 180px;
      text-align: left !important;
      &:hover {
        background-color: #cdfcf5;
      }
      &:active {
        background-color: #cdfcf5;
      }
    }
    .el-tabs__item.is-active {
      background-color: #cdfcf5;
    }
    .el-tabs--left .el-tabs__active-bar.is-left,
    .el-tabs--left .el-tabs__active-bar.is-right,
    .el-tabs--right .el-tabs__active-bar.is-left,
    .el-tabs--right .el-tabs__active-bar.is-right {
      width: 4px;
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
</style>
