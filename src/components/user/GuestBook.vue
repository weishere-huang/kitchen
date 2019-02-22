<template>
  <div class="guest_book">
    <div class="top_title">
      <h4>用户留言</h4>
      <!--<div class="top_search">-->
        <!--<el-col-->
          <!--:span="9"-->
          <!--style="padding:0 5px;"-->
        <!--&gt;-->
          <!--<el-select-->
            <!--v-model="value"-->
            <!--placeholder="请选择"-->
            <!--size="small"-->
          <!--&gt;-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value"-->
            <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-col>-->
        <!--<el-col-->
          <!--:span="11"-->
          <!--style="padding:0 5px;"-->
        <!--&gt;-->
          <!--<el-input-->
            <!--size="small"-->
            <!--style="width:100%;"-->
            <!--placeholder=""-->
          <!--&gt;</el-input>-->
        <!--</el-col>-->
        <!--<el-col-->
          <!--:span="4"-->
          <!--style="padding:0 5px;"-->
        <!--&gt;-->
          <!--<el-button-->
            <!--size="small"-->
            <!--plain-->
          <!--&gt;搜索</el-button>-->
        <!--</el-col>-->
      <!--</div>-->
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
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          min-width="260"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.opinion }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系电话"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="留言时间"
          min-width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.gmtCreate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="80"
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
        :current-page.sync="pageIndex"
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
          <span>{{replayContent.opinion}}</span>
        </el-form-item>
        <el-form-item label="回复内容：">
          <el-input
            type="textarea"
            rows="4"
            style="width:90%;"
            v-model="replayContent.reply"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span
            style="color:#999999"
            v-if="replayContent.state==1"
          >提示: 此条留言已有回复, 如果继续回复将更新原来回复的内容!</span>
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
          @click="beforeupdate"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      replayContent: {
        feedback: "",
        replyContent: ""
      },
      dialogReplay: false,
      total: 0,
      pageIndex: 1,
      pageSize:10,
      value: "",
      options: [],
      tableData: [],
    };
  },
  methods: {
    reply(index, rowData) {
      let params = { type: "edit", index: index, rowData: rowData };
      console.log(params);
      this.replayContent = params.rowData;
      this.dialogReplay = true;
    },
    handleDelete(index, rowData) {
      let params = { type: "delete", index: index, rowData: rowData };
      console.log(params);
      this.beforedelete(params.rowData.id);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getlist();
    },
    getlist(){
      this.Axios(
        {
          params: {
            page:this.pageIndex,
            size:this.pageSize,
          },
          option: {},
          type: "get",
          url: "/api-platform/advise/list"

        },
        this
      ).then(
        result => {
          console.log(result.data);
          this.tableData = result.data.data.content;
          this.total = result.data.data.totalElement;
        },
        ({type, info}) => {
        }
      );
    },
    beforedelete(id){
      this.deleteAdvise(id);
    },
    deleteAdvise(id){
      let qs = require("qs");
      let data = qs.stringify({
        ids:id
      });
      this.Axios({
        params:data,
        url:"/api-platform/advise/updateState",
        type:"post",
        option:{
        }
      },this).then(result=>{
        if(result.data.code===200){
          this.reload();
        }
      })
    },
    beforeupdate(){
      this.updateAdvise();
    },
    updateAdvise(){
      let qs = require("qs");
      let data = qs.stringify({
        id:this.replayContent.id,
        reply:this.replayContent.reply
      });
      this.Axios({
        params:data,
        url:"/api-platform/advise/reply",
        type:"post",
        option:{
        }
      },this).then(result=>{
        if(result.data.code===200){
          this.reload();
        }
      })
    }
  },
  created(){
    this.getlist();
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
