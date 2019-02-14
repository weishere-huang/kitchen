<template>
  <div class="role_management">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
      >添加角色</el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>角色列表</h4>
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
          :deleteShow="true"
          :handleShow="true"
          :editShow="true"
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
  </div>
</template>
<script>
import tableList from "../public/table";
export default {
  inject: ["reload"],
  data() {
    return {
      items: [
        {
          label: "角色名",
          prop: "admin",
          width: 100
        },
        {
          label: "角色描述",
          prop: "phone",
          width: 90
        },
      
      ],
      tableData: [
        {
          admin: "商城管理员",
          phone: "张小红专用",
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      currentPage: 1,
      total: 100,
    };
  },
  methods: {
    handleSelectionChange(){},
    getRow(row, event) {
      console.log(row);
    },
    handlechange(params) {
      if (params.type === "edit") {
        console.log(params);
      }
      if (params.type === "delete") {
        console.log(params);
      }
      if (params.type === "detalis") {
        console.log(params);
        this.userIds = params.rowData.order;
        // this.$router.push({ path: "/Order/Details/" + this.userIds });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
    //   this.listOrder();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
    //   this.listOrder();
    }
  },
  components: {
    tableList
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
.role_management {
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
