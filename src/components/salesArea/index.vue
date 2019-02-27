<template>
  <div class="store_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="areaShow=true"
      >添加区域
      </el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>销售区域</h4>
        <div class="top_search">
          <el-col
            :span="10"
            style="padding:0 5px;"
          >
            <!-- <el-input size="small"> -->
            <div style="width:100%; opacity: 0;">11</div>
            <!-- </el-input> -->
          </el-col>
          <el-col
            :span="10"
            style="padding:0 5px;"
          >
            <el-input
              placeholder="输入省、市、区"
              size="small"
            >

            </el-input>
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
      title="添加区域"
      :visible.sync="areaShow"
      width="600px"
      :close-on-click-modal="false"
    >
      <area-list :districtShow="true"></area-list>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="areaShow = false"
          size="small"
          plain
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="areaShow = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑区域"
      :visible.sync="editAreaShow"
      width="600px"
      :close-on-click-modal="false"
    >
      <area-list :districtShow="true"></area-list>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="editAreaShow = false"
          size="small"
          plain
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="editAreaShow = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import areaList from "../public/Area";
  import tableList from "../public/table";
  export default {
    inject: ["reload"],
    data() {
      return {
        editAreaShow: false,
        areaShow: false,
        province: [],
        cities: [],
        currentPage: 1,
        value: "",
        items: [
          {
            label: "省份",
            prop: "province",
            width: 80
          },
          {
            label: "城市",
            prop: "cities",
            width: 80
          },
          {
            label: "支持区域",
            prop: "district",
            width: 180
          }
        ],
        tableData: [
          {
            province: "四川省",
            cities: "成都市",
            district: "青羊区、锦江区、金牛区、武侯区、成华区"
          }
        ],
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageIndex = 1;
        this.pageSize = val;
        this.getarea();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getarea();
      },
      handlechange(params) {
        if (params.type === "edit") {
          console.log(params);
          this.editAreaShow = true
        }
        if (params.type === "delete") {
          console.log(params);
        }

      },
      handleSelectionChange(selection) {
        console.log(selection);
      },
      getRow(row, event) {
        console.log(row);
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
          ({type, info}) => {
          }
        );
      },
      savearea(){
        let qs = require("qs");
        let data = qs.stringify({
          codes:""
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
            if(result.data.code===200){
              this.reload();
            }
          },
          ({type, info}) => {
          }
        );
      }
    },
    created() {
      this.getarea();
    },
    components: {
      tableList,
      areaList
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
</style>

