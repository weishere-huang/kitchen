<template>
  <div class="problems_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="dialogAdd=true"
      >添加信息</el-button>
      <el-dialog
        :close-on-click-modal="false"
        title="添加信息"
        :visible.sync="dialogAdd"
        width="800px"
      >
        <add-problem :addMsg="addMsg"></add-problem>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="dialogAdd = false"
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
      <div class="top_title">
        <h4>网点列表</h4>
        <div class="top_search">
          <el-col
            :span="10"
            style="padding:0 5px;"
          >
            <el-select
              v-model="value"
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
          </el-col>
          <el-col
            :span="10"
            style="padding:0 5px;"
          >
            <el-input size="small"></el-input>
          </el-col>
          <el-col
            :span="4"
            style="padding:0 5px;"
          >
            <el-button size="small">搜索</el-button>
          </el-col>
        </div>
      </div>
      <div class="table_list">
        <table-list
          :selectShow="false"
          :handleSelectionChange="handleSelectionChange"
          :column="items"
          v-on:handlechange="handlechange"
          :data="tableData"
          :rowDblclick="getRow"
          :handle="100"
          :editShow="true"
          :deleteShow="true"
          :handleShow="true"
        ></table-list>

      </div>
      <div
        class="block"
        style="margin-top:10px;float:right"
      >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[15, 30, 100]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="修改信息"
      :visible.sync="dialogEdit"
      width="800px"
    >
      <add-problem :addMsg="addMsg"></add-problem>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogEdit = false"
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
import tableList from "../public/table";
import addProblem from "./problemsAdd/addProblem";
export default {
  data() {
    return {
      addMsg: {
        title: "",
        calssify: "",
        content: ""
      },
      editMsg: {
        title: "",
        calssify: "",
        content: ""
      },
      dialogAdd: false,
      dialogEdit: false,
      classify: [
        { label: "订单问题", value: "订单问题" },
        { label: "支付问题", value: "支付问题" },
        { label: "其他问题", value: "其他问题" }
      ],
      cities: [],
      currentPage: 1,
      value: "",
      items: [
        {
          label: "标题",
          prop: "title",
          width: 400
        },
        {
          label: "分类",
          prop: "classify",
          width: 80
        },
        {
          label: "发布时间",
          prop: "time",
          width: 140
        }
      ],
      tableData: [
        {
          title: "在线支付的过程中，订单显示未支付成功，款项却被扣了，怎么办？",
          classify: "常见问题",
          time: "2018-12-01 13:32:48"
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      total: 10
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
      this.getServiceList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getServiceList();
    },
    handlechange(params) {
      if (params.type === "edit") {
        console.log(params);
        this.dialogEdit = true;
      }
      if (params.type === "delete") {
        console.log(params);
      }
      if (params.type === "detalis") {
        console.log(params);
        this.userIds = params.rowData.order;
        this.$router.push({ path: "/Order/Details/" + this.userIds });
      }
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    getRow(row, event) {
      console.log(row);
    }
  },
  created() {},
  components: {
    tableList,
    addProblem
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
.problems_list {
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
      .top_search {
        width: 400px;
        float: right;
      }
    }
    .table_list {
      overflow: hidden;
      padding: 10px;
      .el-input__inner {
        padding: 0;
        border: none;
        &:focus {
          border: 1px solid #1cc09f;
        }
      }
    }
  }
}
</style>