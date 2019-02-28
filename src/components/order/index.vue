<template>
  <div class="order_list">
    <div v-show="isHideList">
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
                value-format="yyyy/MM/dd"
              >
              </el-date-picker>
              至
              <el-date-picker
                v-model="searchDate2"
                type="date"
                placeholder="结束日期"
                size="small"
                style="width:39%;"
                value-format="yyyy/MM/dd"
              >
              </el-date-picker>
            </el-col>
            <el-col
              :span="6"
              style="padding:0 5px;"
            >
              <span>订单状态：</span>
              <el-select
                v-model="platformState"
                placeholder="请选择"
                size="small"
                style="width:114px;"
              >
                <el-option
                  v-for="item in stateOptions"
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
                v-model="keyWord"
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

    <router-view></router-view>
  </div>
</template>
<script>
import tableList from "../public/table";

export default {
  inject: ["reload"],
  data() {
    return {
      isHideList: true,
      currentPage: 3,
      selectShow: true,
      platformState: -2,
      stateOptions: [
        {
          label: "全部订单",
          value: -2
        },
        {
          label: "待付款",
          value: 0
        },
        {
          label: "待收货",
          value: 1
        },
        {
          label: "已发货",
          value: 2
        },
        {
          label: "已完成",
          value: 3
        },
        {
          label: "已取消",
          value: 9
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
          prop: "gmtCreate",
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
          prop: "payType",
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
      searchDate1: null,
      searchDate2: null,
      keyWord: "",
      orderIds: []
    };
  },
  methods: {
    toPrintOrder() {
     
      sessionStorage.setItem("orderIds",this.orderIds.join(','))
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
        this.$router.push("/Order/Details/" + params.rowData.id);
        // this.$router.push({ path: "/Order/Details/" + this.userIds });
      }
    },
    handleSelectionChange(selection) {
      console.log(selection);
      this.orderIds = selection.map(item => {
        return item.id;
      });
      console.log(this.orderIds.join(','));
    },
    getRow(row, event) {
      console.log(row);
    },
    listOrder() {
      //
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize,
            platformState: this.platformState,
            keyWord: this.keyWord,
            startTime: this.searchDate1,
            endTime: this.searchDate2
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/api-order/order/allOrder"
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
    this.listOrder();
    this.$route.params.id !== undefined
      ? (this.isHideList = false)
      : (this.isHideList = true);
  },
  components: {
    tableList
  },
  watch: {
    $route() {
      this.$route.matched.find(item => item.name === "Details") ||
      this.$route.params.id !== undefined
        ? (this.isHideList = false)
        : (this.isHideList = true);
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
.order_list {
  width: 100%;
  // background-color: white;
  padding-bottom: 10px;
  .top_case {
    background-color: white;
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
    background-color: white;
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
