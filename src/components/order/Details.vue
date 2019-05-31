<template>
	<div class="details">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
			<div style="float:right;">
				<el-button
					permCode="supplierOrder_detail_lookup.supplierOrder_detai_send"
					banType="disable"
					size="small"
					type="primary"
					@click="dialogSend=true"
					v-if="orderDetails.platformState==2"
				>发货</el-button>
				<!-- <el-button
					permCode="supplierOrder_detail_lookup.supplierOrder_detai_pay"
					banType="disable"
					size="small"
					type="primary"
					@click="dialogPay=true"
					v-if="orderDetails.platformState==0"
				>付款</el-button>-->
				<el-button
					permCode="supplierOrder_detail_lookup.supplierOrder_detai_schedule"
					banType="disable"
					size="small"
					type="primary"
					@click="dialogClose=true"
					v-if="orderDetails.platformState==0"
				>关闭</el-button>
				<!-- <el-button size="small" type="primary" @click="dialogPlan=true">进度</el-button> -->
				<el-button size="small" type="primary" @click="toPrintOrder">打印订单</el-button>
			</div>
			<el-dialog
				title="发货提示"
				:visible.sync="dialogSend"
				width="500px"
				:close-on-click-modal="false"
				top="30vh"
			>
				<!-- <span style="line-height:40px;">
					<i class="el-icon-warning" style="color:#FF6600;font-size:18px;"></i>
					发货后不能撤销，您要继续吗？
				</span>-->
				<el-form label-width="85px" style="padding-top:16px;">
					<el-form-item label="快递公司：">
						<el-select type="text" style="width:99%" v-model="payOI" placeholder="请选择快递公司">
							<el-option v-for="(item, index) in 10" :key="index" :value="item" :label="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="运单号：">
						<el-input type="text" style="width:99%" v-model="payOI" placeholder="请输入快递运单号"></el-input>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input type="textarea" rows="3" style="width:99%" v-model="payOI" placeholder="请输入备注"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogSend = false" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="shipments">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="付款" :visible.sync="dialogPay" width="500px" :close-on-click-modal="false">
				<el-form label-width="85px" style="padding-top:16px;">
					<el-form-item label="操作说明：" style="margin-bottom:0px;">
						<el-input
							type="textarea"
							rows="5"
							style="width:99%"
							v-model="payOI"
							placeholder="请输入说明文字，不少于五个字"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogPay = false" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="payOrder">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="关闭" :visible.sync="dialogClose" width="500px" :close-on-click-modal="false">
				<el-form label-width="85px" style="padding-top:16px;">
					<el-form-item label="操作说明：" style="margin-bottom:0px;">
						<el-input
							type="textarea"
							rows="5"
							style="width:99%"
							v-model="closeOI"
							placeholder="请输入说明文字，不少于五个字"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogClose = false" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="closeOrder">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="进度" :visible.sync="dialogPlan" width="500px" :close-on-click-modal="false">
				<div style="margin-top:16px;height: 200px;overflow: scroll;">
					<ul class="plan_case">
						<li>
							<span>
								<i class="iconfont">&#xe758;</i>订单创建成功
							</span>
							<span style="float:right;padding-right:12px; ">{{orderDetails.gmtCreate}}</span>
						</li>
					</ul>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogPlan = false" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="dialogPlan = false">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>收货人信息</h4>
			</div>
			<div class="table_list">
				<el-col :span="8" class="form_case">
					<el-form label-width="200px">
						<el-form-item label="收货人：">
							<span>庄先生</span>
							<!-- <span>{{orderDetails.address.consignee+(orderDetails.address.gender==1?"先生":"女士")}}</span> -->
						</el-form-item>
						<el-form-item label="手机号：">
							<span>13608253396</span>
							<!-- <span>{{orderDetails.address.phone}}</span> -->
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16" class="form_case">
					<el-form label-width="30%">
						<el-form-item label="收货地址：">
							<span>四川省 遂宁市 大英县 蓬莱镇 蓬乐街246号</span>
							<!-- <span>{{orderDetails.address.area+orderDetails.address.address}}</span> -->
						</el-form-item>
						<el-form-item label="快递运单号：">
							<span>15553431289502</span>
							<!-- <span>{{sendTime}}</span> -->
							<!-- <span style="color:#1cc09f">状态跟踪</span> -->
						</el-form-item>
					</el-form>
				</el-col>
			</div>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>订单信息</h4>
			</div>
			<div class="table_list">
				<el-col :span="8" class="form_case">
					<el-form label-width="200px">
						<el-form-item label="订单编号：">
							<!-- <span>{{orderDetails.orderNo}}</span> -->
							<span>1888238410129</span>
						</el-form-item>
						<el-form-item label="下单用户：">
							<!-- <span>{{orderDetails.phone}}</span> -->
							<span>13608253396</span>
						</el-form-item>
						<el-form-item label="商品总金额：">
							<span style="font-weight: 600;">¥ 158</span>
							<span>（含配送费 12元）</span>
							<!-- <span style="font-weight: 600;">¥ {{orderDetails.orderMoney/100}}</span>
							<span>（含配送费 {{orderDetails.postFee/100}}元）</span>-->
						</el-form-item>
						<el-form-item label="- 优惠：">
							<span>¥ 28.00</span>(
							<span>
								<span>红包￥10.00</span>&nbsp;
								<span>优惠券￥18.00</span>)
							</span>
						</el-form-item>
						<el-form-item label="实付：">
							<span style="font-weight: 600;">¥ 130</span>
							<!-- <span style="font-weight: 600;">¥ {{orderDetails.orderMoney/100}}</span> -->
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16" class="form_case">
					<el-form label-width="30%">
						<el-form-item label="订单状态：">
							<span style="color:#FF6600" v-if="orderDetails.platformState==0">待付款</span>
							<span style="color:#008000" v-if="orderDetails.platformState==2">待发货</span>
							<span style="color:#3399FF" v-if="orderDetails.platformState==1">待收货</span>
							<span style="color:#333333" v-if="orderDetails.platformState==3">已完成</span>
							<span style="color:#999999" v-if="orderDetails.platformState==9">已关闭</span>
							<span style="color:#3399FF">待收货</span>
						</el-form-item>
						<el-form-item label="支付方式：">
							<!-- <span>{{orderDetails.payType}}</span> -->
							<span>支付宝</span>
						</el-form-item>
						<el-form-item label="下单时间：">
							<span>2019-5-20 16:30:45</span>
							<!-- <span>{{orderDetails.gmtCreate==null||""?'--':orderDetails.gmtCreate}}</span> -->
						</el-form-item>
						<el-form-item label="付款时间：">
							<span>2019-5-20 16:34:25</span>
							<!-- <span>{{orderDetails.payTime==null||""?"--":orderDetails.payTime}}</span> -->
						</el-form-item>
						<el-form-item label="发货时间：">
							<span>2019-5-20 17:23:20</span>
							<!-- <span>{{orderDetails.sendGoodTime==null||""?"--":orderDetails.sendGoodTime}}</span> -->
						</el-form-item>
					</el-form>
				</el-col>
			</div>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>商品信息</h4>
			</div>
			<div class="table_list">
				<table-list
					:selectShow="false"
					:column="items"
					:data="orderDetails.items"
					:rowDblclick="getRow"
					:handleSelectionChange="handleSelectionChange"
				></table-list>
				<div class="total">
					<span style=" font-weight: 700;font-size:16px;">
						合计：￥{{orderDetails.orderMoney/100}}
						<span
							style=" font-weight:0;font-size:14px;"
						>（含运费{{orderDetails.postFee/100}}元）</span>
					</span>
				</div>
			</div>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>操作记录</h4>
			</div>
			<div class="table_list">
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
	inject: ["reload"],
	data() {
		return {
			sendTime: "",
			payOI: "",
			closeOI: "",
			orderDetails: {
				orderMoney: 15800,
				postFee: 1200,
				address: {},
				items: [
					{
						itemName: "素炒花菜",
						itemPrice: "800",
						number: 1
					},
					{
						itemName: "思乡小炒肉",
						itemPrice: "1800",
						number: 2
					},
					{
						itemName: "三药排骨汤",
						itemPrice: "3200",
						number: 1
					},
					{
						itemName: "人参乌鸡汤",
						itemPrice: "7000",
						number: 1
					}
				]
			},
			state: 1,
			dialogSend: false,
			dialogPay: false,
			dialogClose: false,
			dialogPlan: false,
			items: [
				{
					label: "商品名称",
					prop: "itemName",
					width: 100
				},
				{
					label: "价格",
					prop: "itemPrice",
					width: 90,
					formatter: function(row, column) {
						return "￥" + row.itemPrice / 100;
					}
				},
				{
					label: "数量",
					prop: "number",
					width: 140
				},
				{
					label: "小计",
					prop: "subtotal",
					width: 120,
					formatter: function(row, column) {
						return (row.subtotal = (row.itemPrice / 100) * row.number);
					}
				}
			],
			tableData: [],
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
					time: "2019-05-20 17:00:20",
					person: "roulen",
					things: "设置订单状态",
					content: "已发货",
					cause: "支付问题，系统已到账"
				}
			]
		};
	},
	methods: {
		shipments() {
			let qs = require("qs");
			let data = qs.stringify({
				orderId: this.$route.params.id,
				operateReason: "订单发货"
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "发货成功"
					},
					type: "post",
					url: "/api-order/order/sendGood",
					loadingConfig: {
						target: document.querySelector(".details")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.reload();
						this.dialogSend = false;
					}
				},
				({ type, info }) => {}
			);
		},
		payOrder() {
			if (this.payOI == "") {
				this.$message.error("请填写操作说明");
			} else {
				let qs = require("qs");
				let data = qs.stringify({
					orderId: this.$route.params.id,
					operateReason: this.payOI
				});
				this.Axios(
					{
						params: data,
						option: {
							successMsg: "付款成功"
						},
						type: "post",
						url: "/api-order/order/payOrder",
						loadingConfig: {
							target: document.querySelector(".details")
						}
					},
					this
				).then(
					result => {
						console.log(result);
						if (result.data.code === 200) {
							this.reload();
							this.dialogPay = false;
						}
					},
					({ type, info }) => {}
				);
			}
		},
		closeOrder() {
			if (this.closeOI == "") {
				this.$message.error("请填写操作说明");
			} else {
				let qs = require("qs");
				let data = qs.stringify({
					orderId: this.$route.params.id,
					operateReason: this.closeOI
				});
				this.Axios(
					{
						params: data,
						option: {
							successMsg: "订单已关闭"
						},
						type: "post",
						url: "/api-order/order/closeOrder",
						loadingConfig: {
							target: document.querySelector(".details")
						}
					},
					this
				).then(
					result => {
						console.log(result);
						if (result.data.code === 200) {
							this.reload();
							this.dialogClose = false;
						}
					},
					({ type, info }) => {}
				);
			}
		},
		handleSelectionChange(select) {},
		getRow(row, event) {
			console.log(row);
		},
		toPrintOrder() {
			sessionStorage.setItem("orderIds", this.$route.params.id);
			window.open("/printorder.html", "_blank");
			// window.location.href="/printorder.html"
		},
		getDetails(id) {
			this.Axios(
				{
					params: {
						orderId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/order/getOneOrder",
					loadingConfig: {
						target: document.querySelector(".details")
					}
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						result.data.data.address = JSON.parse(result.data.data.address);
						this.orderDetails = result.data.data;
						this.sendTime =
							this.orderDetails.startTime.substring(
								0,
								this.orderDetails.startTime.lastIndexOf(":")
							) +
							"-" +
							this.orderDetails.endTime
								.substring(this.orderDetails.endTime.lastIndexOf(" ") + 1)
								.substring(0, 5);
					}

					// console.log(this.orderDetails);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// this.getDetails(this.$route.params.id);
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
	.plan_case {
		// height: 200px;
		// overflow: scroll;
		li {
			list-style-type: none;
			// background-color: red;
			height: 30px;
			line-height: 30px;
			i {
				color: @font-subsidiary;
				margin-right: 4px;
			}
		}
		li:nth-child(1) {
			i {
				color: rgb(240, 135, 16);
			}
		}
	}
}
</style>
