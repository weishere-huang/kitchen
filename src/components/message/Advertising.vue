<template>
  <div class="advertising_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="dialogAdd=true"
      >添加广告
      </el-button>
      <el-dialog
        :close-on-click-modal="false"
        title="添加广告"
        :visible.sync="dialogAdd"
        width="600px"
      >
        <add-advertising :addMsg="addMsg"></add-advertising>
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
            size="small"
            @click="beforeadd"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>广告列表</h4>
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
            label="广告名称"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="缩略图"
            min-width="200"
            show-overflow-tooltip
          >
            <template slot-scope="scope">

              <span><img
                :src="scope.row.mainPic"
                alt=""
                style="width:180px;height:60px;"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            label="内容图"
            min-width="200"
          >
            <template slot-scope="scope">
              <span><img
                :src="scope.row.content"
                alt=""
                style="width:180px;height:60px;"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            label="开始时间"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结束时间"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="点击次数"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.linkCount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click.stop.prevent="handleEdit(scope.$index, scope.row)"
              >修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop.prevent="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="hint">提示：最多可添加6条广告。</div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="修改广告"
      :visible.sync="dialogEdit"
      width="600px"
    >
      <add-advertising :addMsg="editMsg"></add-advertising>
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
          size="small"
          @click="beforeupdate"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import addAdvertising from "./advertisingAdd/AddAdvertising";

  export default {
    inject: ["reload"],
    data() {
      return {
        editMsg: {
          title: "",
          pic: "",
          picContent: "",
          isShow: 0,
          startTime: {
            date: "",
            time: ""
          },
          endTime: {
            date: "",
            time: ""
          }
        },
        addMsg: {
          title: "",
          pic: "",
          picContent: "",
          isShow: 0,
          startTime: {
            date: "",
            time: ""
          },
          endTime: {
            date: "",
            time: ""
          }
        },
        dialogEdit: false,
        dialogAdd: false,
        currentPage: 1,
        tableData: [
          {
            title: "满99减50",
            mainPic:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550220559773&di=d5539846e2a20bf9bff4187b1f2e4ea5&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131031%2F9612701_091323702350_2.jpg",
            picContent:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550220559773&di=d5539846e2a20bf9bff4187b1f2e4ea5&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131031%2F9612701_091323702350_2.jpg",
            startTime: "2018-09-01 00:00:00",
            endTime: "2018-10-09 00:00:00",
            linkCount: "88"
          }
        ],
        pageIndex: 1,
        pageSize: 10,
        total: 100
      };
    },
    methods: {
      handleEdit(index, rowData) {
        let params = {type: "edit", index: index, rowData: rowData};
        console.log(params);
        this.dialogEdit = true;
      },
      handleDelete(index, rowData) {
        let params = {type: "delete", index: index, rowData: rowData};
        this.beforeDelete(rowData.id);
        console.log(params);
      },
      getAdvertisingList() {
        this.Axios(
          {
            params: {},
            option: {},
            type: "get",
            url: "/api-platform/Advertisement/list"
          },
          this
        ).then(
          result => {
            console.log(result.data);
            this.tableData = result.data.data;

          },
          ({type, info}) => {
          }
        );
      },
      beforeDelete(id){
        this.deleteAdvertising(id)
      },
      deleteAdvertising(id){
        let qs = require("qs");
        let data = qs.stringify({
          id:id
        });
        this.Axios({
          params:data,
          url:"/api-platform/Advertisement/delete",
          type:"post",
          option:{
          }
        },this).then(result=>{
          console.log(result.data);
          if(result.data.code===200){
            this.reload();
          }
        })
      },
      //添加广告
      beforeadd(){
        this.addAdvertising();
      },
      addAdvertising(){
        let qs = require("qs");
        let data = qs.stringify({
          title:"",
          mainPic:"",
          content:"",
          advertTpye:0,
          advertContentType:0,
          startTime:"",
          endTime:"",
        });
        this.Axios({
          params:data,
          url:"/api-platform/Advertisement/delete",
          type:"post",
          option:{
          }
        },this).then(result=>{
          console.log(result.data);
          if(result.data.code===200){
            this.reload();
          }
        })
      },
      //修改广告
      beforeupdate(id){
        this.updateAdvertising(id);
      },
      updateAdvertising(id){
        let qs = require("qs");
        let data = qs.stringify({
          id:id,
          title:"",
          mainPic:"",
          content:"",
          advertTpye:0,
          advertContentType:0,
          startTime:"",
          endTime:"",
        });
        this.Axios({
          params:data,
          url:"/api-platform/Advertisement/delete",
          type:"post",
          option:{
          }
        },this).then(result=>{
          console.log(result.data);
          if(result.data.code===200){
            this.reload();
          }
        })
      },
    },
    created() {
      this.getAdvertisingList();
    },
    components: {
      addAdvertising
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
  .advertising_list {
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
      }
      .hint {
        line-height: 50px;
        padding-left: 20px;
        color: @font-subsidiary;
      }
    }
  }
</style>
