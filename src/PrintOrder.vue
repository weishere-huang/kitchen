<template>
	<div class="print_order">
		<!--startprint-->
		<div class="print_content" v-for="(item, index) in printData" :key="index">
			<h2>订单信息</h2>
			<el-col :span="24">
				<el-col :span="7">
					<el-col :span="24">
						<span>购买用户：{{item.phone}}</span>
					</el-col>
					<el-col :span="24">
						<span>付款时间：{{item.payTime}}</span>
					</el-col>
				</el-col>
				<el-col :span="7">
					<el-col :span="24">
						<span>下单时间：{{item.gmtCreate}}</span>
					</el-col>
					<el-col :span="24">
						<span>发货时间：{{item.sendGoodTime}}</span>
					</el-col>
				</el-col>
				<el-col :span="4">
					<el-col :span="24">
						<span>支付方式：{{item.payType}}</span>
					</el-col>
					<el-col :span="24">
						<span>配送时间：</span>
					</el-col>
				</el-col>
				<el-col :span="6">
					<el-col :span="24">
						<span>订单编号：{{item.orderNo}}</span>
					</el-col>
					<el-col :span="24">
						<span>发货单号：</span>
					</el-col>
				</el-col>
				<el-col :span="24" class="consignee_case">
					<span>收货地址：{{item.address.address}}</span>
					<span>收货人：{{item.address.consignee}}</span>
					<span>电话：{{item.address.phone}}</span>
				</el-col>
			</el-col>
			<el-col :span="24" style="margin-top:10px;">
				<table class="table_style">
					<tr style="background-color:#f1f1f1;color:#333333 ;font-weight:normal;">
						<td>商品名称</td>
						<td>价格</td>
						<td>数量</td>
						<td>小计</td>
					</tr>
					<tr v-for="(item1, index) in item.items" :key="index">
						<td>{{item1.itemName}}</td>
						<td>￥{{item1.itemPrice}}元</td>
						<td>{{item1.number}}</td>
						<td>￥{{item1.itemPrice*item1.number}}元</td>
					</tr>
				</table>
			</el-col>
			<el-col :span="24">
				<span style="float:right;">
					<h5 style="display:inline-block;font-size:14px;">合计：¥ {{item.orderMoney+item.postFee}}</h5>
					（含运费{{item.postFee}}元）
				</span>
			</el-col>
			<el-col :span="24">
				<span style="float:right;">
					<span style="margin-right:20px">打印时间：{{knowDate}}</span>
					<span>打印人：{{user}}</span>
				</span>
			</el-col>
		</div>
		<!--endprint-->
	</div>
</template>
<script>
function getCurrentDate(format) {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth(); //得到月份
	var date = now.getDate(); //得到日期
	var day = now.getDay(); //得到周几
	var hour = now.getHours(); //得到小时
	var minu = now.getMinutes(); //得到分钟
	var sec = now.getSeconds(); //得到秒
	month = month + 1;
	if (month < 10) month = "0" + month;
	if (date < 10) date = "0" + date;
	if (hour < 10) hour = "0" + hour;
	if (minu < 10) minu = "0" + minu;
	if (sec < 10) sec = "0" + sec;
	var time = "";
	//精确到天
	if (format == 1) {
		time = year + "-" + month + "-" + date;
	}
	//精确到分
	else if (format == 2) {
		time =
			year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
	}
	return time;
}
export default {
	data() {
		return {
			printData: [],
			knowDate: getCurrentDate(2),
			tableData: [
				{
					name: "素炒花菜",
					price: "¥ 8.80元 ",
					quantity: "1",
					subtotal: "¥ 8.80元 "
				}
			],
			user:""
		};
	},
	methods: {
		preview: function preview(fang) {
			if (fang < 10) {
				let bdhtml = window.document.body.innerHTML; //获取当前页的html代码
				let sprnstr = "<!--startprint" + fang + "-->"; //设置打印开始区域
				let eprnstr = "<!--endprint" + fang + "-->"; //设置打印结束区域
				let prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html
				prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html
				window.document.body.innerHTML = prnhtml;
				window.print();
				window.document.body.innerHTML = bdhtml;
			} else {
				window.print();
			}
		}
	},
	created() {
		this.Axios(
			{
				params: {
					orderIds: sessionStorage.getItem("orderIds")
				},
				option: {
					enableMsg: false
				},
				type: "get",
				url: "/api-order/order/printOrder"
			},
			this
		).then(
			result => {
				if (result.data.code === 200) {
					for (let i = 0; i < result.data.data.length; i++) {
						result.data.data[i].address = JSON.parse(
							result.data.data[i].address
						);
					}
					this.printData = Object.assign([], result.data.data);
				}
			},
			({ type, info }) => {}
		);
		this.user=JSON.parse(sessionStorage.getItem('user')).name
	},
	updated() {
		this.preview(1);
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