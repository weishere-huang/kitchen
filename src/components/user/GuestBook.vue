<template>
  <div class="guest_book">
    <div class="top_title">
      <h4>用户留言</h4>
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
          <el-button size="small" plain>搜索</el-button>
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
          label="用户名"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          min-width="300"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="留言时间"
          min-width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.state==0"
              style="color:red"
            >未回复</span>
            <span v-if="scope.row.state==1">已回复</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click.stop.prevent="reply(scope.$index, scope.row)"
            >回复</el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop.prevent="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
    <el-dialog
      :close-on-click-modal="false"
      title="回复留言"
      :visible.sync="dialogReplay"
      width="600px"
    >
      <el-form
        label-width="100px"
        class="dialog_form"
      >
        <el-form-item label="反馈内容：">
          <span>{{replayContent.content}}</span>
        </el-form-item>
        <el-form-item label="回复内容：">
          <el-input
            type="textarea"
            rows="4"
            style="width:90%;"
            v-model="replayContent.replayContent"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span style="color:#999999" v-if="replayContent.state==1">提示: 此条留言已有回复, 如果继续回复将更新原来回复的内容!</span>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogReplay = false"
          size="small"
          plain
        >取 消</el-button>
        <el-button
          type="primary"
          @click="dialogReplay = false"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      replayContent: {
        feedback: "",
        replyContent: ""
      },
      dialogReplay: false,
      total: 100,
      currentPage: 1,
      value: "",
      options: [],
      tableData: [
        {
          name: "13112388333",
          content: "我想吃咸菜回锅肉，什么时候有买的啊？",
          time: "2018-05-12 13:46:37",
          state: 0
        },
        {
          name: "13112388333",
          content: "我想吃咸菜回锅肉，什么时候有买的啊？",
          time: "2018-05-12 13:46:37",
          state: 1
        }
      ]
    };
  },
  methods: {
    reply(index, rowData) {
      let params = { type: "edit", index: index, rowData: rowData };
      console.log(params);
      this.replayContent=params.rowData
      this.dialogReplay = true;
    },
    handleDelete(index, rowData) {
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
.guest_book {
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
  .dialog_form {
    padding: 16px 0 0;
    .el-form-item {
      margin-bottom: 8px;
    }
    .el-form-item__content,
    .el-form-item__label {
      line-height: 32px;
    }
  }
}
</style>
