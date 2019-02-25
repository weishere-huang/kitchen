<template>
  <div class="user_list">
    <div class="top_title">
      <h4>用户列表</h4>
      <div class="top_search">
        <el-col
          :span="9"
          style="padding:0 5px;"
        >
          <el-select
            v-model="value"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col
          :span="11"
          style="padding:0 5px;"
        >
          <el-input
            size="small"
            style="width:100%;"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col
          :span="4"
          style="padding:0 5px;"
        >
          <el-button
            size="small"
            plain
          >搜索</el-button>
        </el-col>
      </div>
    </div>
    <div class="table_list">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="small"
        stripe
        tooltip-effect="light"
        :header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
      >
        <el-table-column
          label="昵称"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单"
          min-width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.createdTime}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="180"
              v-model="scope.row.resetvisible"
            >
              <p style="line-height:32px;text-align:center;"> <i
                  class="el-icon-warning"
                  style="color:#e6a23c;font-size:18px;margin-right:8px;"
                ></i>确定重置吗？</p>
              <div style="text-align: center; margin: 0">
                <el-button
                  size="mini"
                  plain
                  @click="scope.row.resetvisible = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="resetPasswords(scope.$index, scope.row)"
                >确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="text"
                size="mini"
              >重置密码</el-button>
            </el-popover>
            <el-popover
              placement="top"
              width="180"
              v-model="scope.row.visible"
            >
              <p style="line-height:32px;text-align:center;"> <i
                  class="el-icon-warning"
                  style="color:#e6a23c;font-size:18px;margin-right:8px;"
                ></i>确定删除吗？</p>
              <div style="text-align: center; margin: 0">
                <el-button
                  size="mini"
                  plain
                  @click="scope.row.visible = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                >确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="text"
              >删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
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
</template>
<script>
export default {
  data() {
    return {
      total: 100,
      currentPage: 1,
      value: "",
      options: [],
      tableData: [
        {
          name: "可爱的蓝朋友",
          phone: "13580001234",
          order: "21",
          state: "正常",
          createdTime: "2019-01-01 18:38:12"
        }
      ]
    };
  },
  methods: {
    resetPasswords(index, rowData) {
      rowData.resetvisible = false;
      let params = { type: "edit", index: index, rowData: rowData };
      console.log(params);
    },
    handleDelete(index, rowData) {
      rowData.visible = false;
      let params = { type: "delete", index: index, rowData: rowData };
      console.log(params);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
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
.user_list {
  font-size: 14px;
  color: @font-normal;
  background-color: white;
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
}
</style>
