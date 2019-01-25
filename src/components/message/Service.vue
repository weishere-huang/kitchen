<template>
  <div class="store_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
      >添加网点</el-button>
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
              placeholder="———省———"
              size="small"
            >
              <el-option
                v-for="item in province"
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
            <el-select
              v-model="value"
              placeholder="———市———"
              size="small"
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import tableList from "../public/table";
export default {
  data() {
    return {
      province: [],
      cities: [],
      currentPage: 1,
      value: "",
      items: [
        {
          label: "网点名称",
          prop: "name",
          width: 120
        },
        {
          label: "地区",
          prop: "area",
          width: 80
        },
        {
          label: "详细地址",
          prop: "address",
          width: 140
        },
        {
          label: "服务热线",
          prop: "service",
          width: 80
        },
        {
          label: "工作时间",
          prop: "workTime",
          width: 70
        },
        {
          label: "服务范围",
          prop: "range",
          width: 60
        }
      ],
      tableData: [
        {
          name: "成都金牛区售后服务中心（授权）",
          area: "四川省 - 成都市",
          address: "四川省成都市武侯区华兴街道一环路南二段X号营业楼",
          service: "028-12345678",
          workTime: "09:00 - 18:00",
          range: "送修、寄修",
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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

