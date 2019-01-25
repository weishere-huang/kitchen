<template>
  <div  class="order_list">
    <div class="top_case">
      <div class="top_title">
        <h4>订单列表</h4>
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
              placeholder="收货人、订单号"
            ></el-input>
          </el-col>
          <el-col
            :span="4"
            style="padding:0 5px;"
          >
            <el-button size="small">搜索</el-button>
          </el-col>
        </div>
      </div>
    </div>
    <div class="bottom_list">
      <div style="padding:10px;">
        <!-- <el-table
          :data="tableData"
          style="width: 100%"
          @row-dblclick="aaa"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            v-if="selectShow"
          >
          </el-table-column>
          <el-table-column
            v-for="(item, index) in items"
            :key="index"
            :label="item.label"
            width="180"
            :prop="item.prop"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table> -->
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
          <el-button size="small">发货</el-button>
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
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"
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
      items: [
        {
          label: "订单编号",
          prop: "order",
          width: 100
        },
        {
          label: "用户",
          prop: "user",
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
          prop: "money",
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
          width: 100
        }
      ],
      tableData: [
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        },
        {
          order: "2019010973440",
          user: "13580001234",
          time: "2019-01-01 18:38:12",
          phone: "张三 15928121591",
          money: "￥26.88",
          paly: "支付宝",
          state: "待付款 | 待发货"
        }
      ]
      // userIds: ""
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
        // this.$router.push({ path: "/Order/Details/" + this.userIds });
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
        width: 400px;
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
}
</style>
