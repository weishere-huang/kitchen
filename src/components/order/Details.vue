<template>
  <div class="details">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-arrow-left"
      >返回</el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>商品信息</h4>
      </div>
      <div class="table_list">
        <table-list
          :selectShow="false"
          :column="items"
          :data="tableData"
          :rowDblclick="getRow"
          :handleSelectionChange="handleSelectionChange"
        ></table-list>
        <div class="total">
          <span style=" font-weight: 700;font-size:16px;">合计：￥999.44<span style=" font-weight:0;font-size:14px;">（含运费5.5元）</span></span>
        </div>
      </div>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>订单信息</h4>
      </div>
      <div class="table_list">
        <el-col
          :span="12"
          class="form_case"
        >
          <el-form label-width="30%">
            <el-form-item label="订单编号：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="下单用户：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="商品总金额：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="- 优惠：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="实付：">
              <span>22222</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
          :span="12"
          class="form_case"
        >
          <el-form label-width="30%">
            <el-form-item label="订单状态：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="支付方式：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="下单时间：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="付款时间：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="发货时间：">
              <span>22222</span>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>收货人信息</h4>
      </div>
      <div class="table_list">
        <el-col
          :span="12"
          class="form_case"
        >
          <el-form label-width="30%">
            <el-form-item label="收货人：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="收货地址：">
              <span>22222</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
          :span="12"
          class="form_case"
        >
          <el-form label-width="30%">
            <el-form-item label="手机号：">
              <span>22222</span>
            </el-form-item>
            <el-form-item label="配送时间：">
              <span>22222</span>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>操作信息</h4>
      </div>
      <div class="table_list">
        <el-col :span="12">
          <el-form label-width="30%">
            <el-form-item label="当前可执行操作：">
              <el-button
                size="small"
                type="primary"
              >付款</el-button>
              <el-button
                size="small"
                type="primary"
              >发货</el-button>
              <el-button
                size="small"
                type="primary"
              >关闭</el-button>
              <el-button
                size="small"
                type="primary"
              >打印订单</el-button>
            </el-form-item>
            <el-form-item label="备注信息：">
              <el-input type="textarea" rows="6"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button
                size="small"
                type="primary"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <div class="table_list">
            <table-list
              :selectShow="false"
              :column="column"
              :data="tableData1"
              :rowDblclick="getRow"
              :handleSelectionChange="handleSelectionChange"
            ></table-list>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import tableList from "../public/table";
export default {
  data() {
    return {
      items: [
        {
          label: "商品名称",
          prop: "name",
          width: 100
        },
        {
          label: "价格",
          prop: "price",
          width: 90
        },
        {
          label: "数量",
          prop: "number",
          width: 140
        },
        {
          label: "小计",
          prop: "subtotal",
          width: 120
        }
      ],
      tableData: [
        {
          name: "素炒花菜",
          price: "¥ 8.80元 ",
          number: "1",
          subtotal: "¥8.8元 "
        }
      ],
      column: [
        {
          label: "操作时间",
          prop: "time",
          width: 140
        },
        {
          label: "操作者",
          prop: "person",
          width: 100
        },
        {
          label: "事件",
          prop: "things",
          width: 100
        },
        {
          label: "内容",
          prop: "content",
          width: 100
        },
        {
          label: "原因",
          prop: "cause",
          width: 220
        }
      ],
      tableData1: [
        {
          time:"2018-01-01 12:38:38",
          person:"roulen",
          things:"设置订单状态",
          content:"已发货",
          cause:"付款超时，系统自动关闭",
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(select) {},
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
.details {
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
    }
    .table_list {
      padding: 10px;
      overflow: hidden;
      .total {
        float: right;
        margin-top: 20px;
      }
      .form_case {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label,
          .el-form-item__content {
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
