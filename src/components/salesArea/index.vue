<template>
  <div class="store_list">

    <div class="bottom_list">
      <div class="top_title">
        <h4>销售区域</h4>
      </div>
      <div class="table_list">
        <el-col :span="8">
          <el-tree
            :data="data1"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            :highlight-current="true"
            show-checkbox
            :check-strictly="false"
          >
          </el-tree>
        </el-col>
        <el-col :span="8">
          <el-tree
            :data="data2"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            :highlight-current="true"
            show-checkbox
            :check-strictly="false"
          >
          </el-tree>
        </el-col>
        <el-col :span="8">
          <el-tree
            :data="data3"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            :highlight-current="true"
            show-checkbox
            :check-strictly="false"
          >
          </el-tree>
        </el-col>
      </div>
      <div class="top_list">
        <el-button
          size="small"
          type="primary"
        ><i class="el-icon-refresh"></i> 刷新
        </el-button>
        <el-button
          size="small"
          type="primary"
        ><i class="iconfont">&#xe62d;</i> 保存修改
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      data: [],
      data1: [],
      data2: [],
      data3: [],
      defaultProps: {
        children: "children",
        label: "areaName"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    getarea() {
      this.Axios(
        {
          params: {},
          option: {},
          type: "get",
          url: "/api-mall/area/list"
        },
        this
      ).then(
        result => {
          this.tableData = result.data.data;
        },
        ({ type, info }) => {}
      );
    },
    savearea() {
      let qs = require("qs");
      let data = qs.stringify({
        codes: ""
      });
      this.Axios(
        {
          params: {},
          option: {},
          type: "post",
          url: "/api-mall/area/save"
        },
        this
      ).then(
        result => {
          if (result.data.code === 200) {
            this.reload();
          }
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    // console.log(this.$store.state.getArea);
    this.data = JSON.parse(sessionStorage.getItem("area"))[0].children[0];
    this.data1 = this.data.slice(0, 12);
    this.data2 = this.data.slice(12, 24);
    this.data3 = this.data.slice(24, 34);
    console.log(this.data);
  },
  components: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.store_list {
  font-size: 14px;
  color: @font-normal;

  .top_list {
    // line-height: 60px;
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
    .table_list {
      overflow: hidden;
      padding: 10px;
      .el-col {
        max-height: 600px;
        overflow: scroll;
      }
    }
  }
}
</style>

