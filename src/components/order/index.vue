<template>
  <div class="order_list">
    <div class="top_case">
      <div class="top_title">
        <h4>订单列表</h4>
        <div class="top_search">
          <el-col :span="11">
            <span>日期：</span>
            <el-date-picker
              v-model="searchDate1"
              type="date"
              placeholder="起始日期"
              size="small"
              style="width:39%;"
            >
            </el-date-picker>
            至
            <el-date-picker
              v-model="searchDate2"
              type="date"
              placeholder="结束日期"
              size="small"
              style="width:39%;"
            >
            </el-date-picker>
          </el-col>
          <el-col
            :span="6"
            style="padding:0 5px;"
          >
            <span>订单状态：</span>
            <el-select
              v-model="value"
              placeholder="请选择"
              size="small"
              style="width:114px;"
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
            :span="5"
            style="padding:0 5px;"
          >
            <el-input
              size="small"
              style="width:100%;"
              placeholder="收货人、订单号"
            ></el-input>
          </el-col>
          <el-col
            :span="2"
            style="padding:0 5px;"
          >
            <el-button
              size="small"
              @click="listOrder"
              plain
            >搜索</el-button>
          </el-col>
        </div>
      </div>
    </div>
    <div class="bottom_list">
      <div style="padding:10px;">
        <table-list
          :selectShow="true"
          :handleSelectionChange="handleSelectionChange"
          :column="items"
          v-on:handlechange="handlechange"
          :data="tableData"
          :rowDblclick="getRow"
          :handle="100"
          :detalisShow="true"
          :handleShow="true"
        ></table-list>
        <div style="margin-top:20px;float:left;padding-left:10px;">
          <el-button
            size="small"
            type="primary"
            @click="toPrintOrder"
          >打印订单</el-button>
        </div>
        <div
          class="block"
          style="margin-top:20px;float:right"
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
  </div>
</template>
<script>
import tableList from "../public/table";

export default {
  inject: ["reload"],
  data() {
    return {
      currentPage: 3,
      selectShow: true,
      value: "",
      options: [
        {
          label: "全部",
          value: "全部"
        },
        {
          label: "待付款",
          value: "待付款"
        },
        {
          label: "已付款",
          value: "已付款"
        },
        {
          label: "待发货",
          value: "待发货"
        },
        {
          label: "已发货",
          value: "已发货"
        },
        {
          label: "关闭",
          value: "关闭"
        }
      ],
      tableData: [
        {
          orderNo: "111"
        }
      ],
      items: [
        {
          label: "订单编号",
          prop: "orderNo",
          width: 100
        },
        {
          label: "用户",
          prop: "userId",
          width: 90
        },
        {
          label: "下单时间",
          prop: "time",
          width: 140
        },
        {
          label: "收货人/手机号",
          prop: "phone",
          width: 120
        },
        {
          label: "总金额",
          prop: "orderMoney",
          width: 70
        },
        {
          label: "支付方式",
          prop: "paly",
          width: 80
        },
        {
          label: "订单状态",
          prop: "state",
          width: 100,
          formatter: function(row, column) {
            return row.state == 0
              ? "待付款"
              : row.state == 1
              ? "待发货"
              : row.state == 2
              ? "待收货"
              : row.state == 3
              ? "已完成"
              : row.state == 3
              ? "已取消"
              : "";
          }
        }
      ],

      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchDate1: "",
      searchDate2: ""
    };
  },
  methods: {
    toPrintOrder() {
      window.open("printorder.html", "_blank");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
      this.listOrder();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.listOrder();
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
    handleSelectionChange(selection) {
      console.log(selection);
    },
    getRow(row, event) {
      console.log(row);
    },
    listOrder() {
      //
      this.Axios(
        {
          params: {
            userId: 1,
            page: this.pageIndex,
            size: this.pageSize
          },
          option: {},
          type: "get",
          url: "/api-order/order/list"
        },
        this
      ).then(
        result => {
          console.log(result.data);
          this.tableData = result.data.data.content;
          this.total = result.data.data.totalElement;
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    // this.listOrder();
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
.order_list {
  width: 100%;
  background-color: white;
  padding-bottom: 10px;
  .top_case {
    border-bottom: @border;
    .top_title {
      padding: 0 10px;
      line-height: 60px;
      overflow: hidden;
      h4 {
        float: left;
      }
      .top_search {
        width: 800px;
        float: right;
      }
    }
  }
  .bottom_list {
    margin-top: 10px;
    overflow: hidden;
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #1cc09f;
      color: #fff;
    }
  }
  .red {
    color: #ff6600;
  }
  .green {
    color: #008000;
  }
  .blue {
    color: #3399ff;
  }
  .normal {
    color: #333333;
  }
  .subsidiary {
    color: #999999;
  }
}
</style>
