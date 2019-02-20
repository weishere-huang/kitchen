<template>
  <div class="print_order">
    <div
      class="print_content"
      v-for="(item, index) in 3"
      :key="index"
    >
      <h2>订单信息</h2>
      <el-col :span="24">
        <el-col :span="7">
          <el-col :span="24"><span>订单用户：roulen</span></el-col>
          <el-col :span="24"><span>付款时间：2019-01-23 15:47:29</span></el-col>
        </el-col>
        <el-col :span="7">
          <el-col :span="24"><span>下单时间：2019-01-23 15:47:29</span></el-col>
          <el-col :span="24"><span>发货时间：2019-01-23 15:47:29</span></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24"><span>支付方式：在线支付</span></el-col>
          <el-col :span="24"><span>配送要求：</span></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="24"><span>订单编号：20190328429374</span></el-col>
          <el-col :span="24"><span>发货单号：</span></el-col>
        </el-col>
        <el-col
          :span="24"
          class="consignee_case"
        >
          <span>收货地址：[成都市 武侯区 ] 天府四街吉泰路长虹科技大厦 33楼</span>
          <span>收货人：卢先生</span>
          <span>电话：13590990811</span>
        </el-col>
      </el-col>
      <el-col
        :span="24"
        style="margin-top:10px;"
      >
        <table class="table_style">
          <tr style="background-color:#f1f1f1;color:#333333 ;font-weight:normal;">
            <td>商品名称</td>
            <td>价格</td>
            <td>数量</td>
            <td>小计</td>
          </tr>
          <tr>
            <td>炒花菜</td>
            <td>￥8.8元</td>
            <td>1</td>
            <td>￥8.8元</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24">
        <span style="float:right;">
          <h5 style="display:inline-block;font-size:14px;">合计：¥ 64.70</h5>（含运费¥ 5.00元）
        </span>
      </el-col>
      <el-col :span="24">
        <span style="float:right;">
          <span style="margin-right:20px">打印时间：2019-01-23 12:32:41</span>
          <span>打印人：roulen</span>
        </span>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "素炒花菜",
          price: "¥ 8.80元 ",
          quantity: "1",
          subtotal: "¥ 8.80元 "
        }
      ]
    };
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
.print_order {
  font-size: 12px;
  color: @font-normal;
  background-color: @bgColor;
  padding: 8px;
  .print_content {
    background-color: white;
    padding: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    page-break-after: always;
    .el-col {
      span {
        line-height: 32px;
      }
    }
    h2 {
      text-align: center;
      line-height: 40px;
    }
    .consignee_case {
      span {
        margin-right: 20px;
      }
    }
  }
  .table_style {
    width: 100%;
    border: @border;
    border-collapse: collapse;
    tr {
      width: 100%;
      td {
        width: 25%;
        text-align: center;
        border: @border;
        line-height: 28px;
      }
    }
  }
}
</style>