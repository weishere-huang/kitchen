<template>
	<div class="order_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_case">
				<div class="top_title">
					<h4>订单列表</h4>
					<div class="top_search">
						<el-col :span="10">
							<span>日期：</span>
							<el-date-picker
								v-model="searchDate1"
								type="date"
								placeholder="起始日期"
								size="small"
								style="width:40%;"
								value-format="yyyy/MM/dd"
							></el-date-picker>&nbsp;至
							<el-date-picker
								v-model="searchDate2"
								type="date"
								placeholder="结束日期"
								size="small"
								style="width:40%;"
								value-format="yyyy/MM/dd"
							></el-date-picker>
						</el-col>
						<el-col :span="5" style="padding:0 4px;">
							<span>订单状态：</span>
							<el-select v-model="platformState" placeholder="请选择" size="small" style="width:94px;">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="7" style="padding:0 4px;">
							<el-input
								size="small"
								style="width:100%;"
								clearable
								placeholder="订单编号/用户/代理商"
								v-model="keyWord"
							></el-input>
						</el-col>
						<el-col :span="2" style="padding:0 5px;">
							<el-button size="small" style="width:100%" @click="compareDate" plain>搜索</el-button>
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
						:cellStyle="cellStyle"
						:permissionDetails="permissionDetails"
					></table-list>
					<div style="margin-top:20px;float:left;padding-left:10px;padding-bottom:10px;">
						<el-button size="small" type="primary" @click="toPrintOrder">打印订单</el-button>
						<!-- <el-button size="small" type="primary" @click="shipments">发货</el-button> -->
					</div>
					<div class="block" style="margin-top:20px;float:right;padding-bottom:10px;">
						<el-pagination
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page.sync="pageIndex"
							:page-sizes="[10, 20,40, 100]"
							:page-size="pageSize"
							layout="sizes, prev, pager, next"
							:total="total"
						></el-pagination>
					</div>
				</div>
			</div>
		</div>
		<el-dialog
			title="发货提示"
			:visible.sync="dialogSend"
			width="300px"
			:close-on-click-modal="false"
			top="30vh"
		>
			<span style="line-height:40px;">
				<i class="el-icon-warning" style="color:#FF6600;font-size:18px;"></i>
				发货后不能撤销，您要继续吗？
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogSend = false" plain>取 消</el-button>
				<el-button size="small" type="primary" @click="sendOrder">确 定</el-button>
			</span>
		</el-dialog>
		<router-view></router-view>
	</div>
</template>
<script>
import tableList from "../public/table";

export default {
	inject: ["reload"],
	data() {
		return {
			permissionDetails: "manu_list_lookup.menu_list_update",
			dialogSend: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
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
					label: "待发货",
					value: 2
				},
				{
					label: "已完成",
					value: 3
				},
				{
					label: "已关闭",
					value: 9
				}
			],
			tableData: [],
			items: [
				{
					label: "订单编号",
					prop: "orderNo",
					width: 100
				},
				{
					label: "用户",
					prop: "phone",
					width: 90
				},
				{
					label: "下单时间",
					prop: "gmtCreate",
					width: 140
				},
				{
					label: "收货人/手机号",
					prop: "address",
					width: 120,
					formatter: function(row, column) {
						let str = row.address.consignee + " " + row.address.phone;
						return str;
					}
				},
				{
					label: "总金额",
					prop: "orderMoney",
					width: 70,
					formatter: function(row, column) {
						return "￥" + row.orderMoney / 100;
					}
				},
				{
					label: "支付方式",
					prop: "payType",
					width: 80
				},
				{
					label: "订单状态",
					prop: "platformState",
					width: 80,
					formatter: function(row, column) {
						return row.platformState == 0
							? "待付款"
							: row.platformState == 1
							? "待收货"
							: row.platformState == 2
							? "待发货"
							: row.platformState == 3
							? "已完成"
							: row.platformState == 9
							? "已关闭"
							: "";
					}
				},
				{
					label: "代理商名称",
					prop: "supplierName",
					width: 100
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
		cellStyle(row, column) {
			if (row.row.platformState == 0 && row.column.label == "订单状态") {
				return "color:#FF6600";
			} else if (row.row.platformState == 1 && row.column.label == "订单状态") {
				return "color:#3399FF";
			} else if (row.row.platformState == 2 && row.column.label == "订单状态") {
				return "color:#008000";
			} else if (row.row.platformState == 3 && row.column.label == "订单状态") {
				return "color:#333333";
			} else if (row.row.platformState == 9 && row.column.label == "订单状态") {
				return "color:#999999";
			}
		},
		compareDate() {
			if (this.searchDate2 != null || "") {
				if (new Date(this.searchDate1) > new Date(this.searchDate2)) {
					this.$message.error("结束日期必须大于起始日期，请重新选择");
				} else {
				  this.pageIndex = 1;
					this.listOrder();
				}
			} else {
			  this.pageIndex=1;
				this.listOrder();
			}
		},
		sendOrder() {
			let qs = require("qs");
			let data = qs.stringify({
				orderId: this.orderIds.join(",")
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "发货成功"
					},
					type: "post",
					url: "/api-order/order/sendGood"
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.listOrder();
						this.dialogSend = false;
					}
				},
				({ type, info }) => {}
			);
		},
		shipments() {
			if (this.orderIds.length < 1) {
				this.$message.error("请勾选要发货的订单");
			} else {
				for (let i = 0; i < this.orderIds.length; i++) {
					if (
						this.tableData
							.filter(item => {
								return item.id === this.orderIds[i];
							})
							.find(item => {
								return item.platformState == 2;
							})
					) {
						this.dialogSend = true;
					} else {
						this.$message.error("只能为待发货状态订单发货");
					}
				}
			}
		},
		toPrintOrder() {
			console.log(this.orderIds);
			if (this.orderIds == "") {
				this.$message.error("请勾选要打印的订单！");
			} else {
				sessionStorage.setItem("orderIds", this.orderIds.join(","));
				window.open("/printorder.html", "_blank");
			}
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
				this.$router.push("/AdminOrder/AdminDetails/" + params.rowData.id);
				// this.$router.push({ path: "/Order/Details/" + this.userIds });
			}
		},
		handleSelectionChange(selection) {
			console.log(selection);
			this.orderIds = selection.map(item => {
				return item.id;
			});
			console.log(this.orderIds.join(","));
		},
		getRow(row, event) {
			console.log(row);
		},
		listOrder() {
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
					console.log(result.data.data.content);
					for (let i = 0; i < result.data.data.content.length; i++) {
						result.data.data.content[i].address = JSON.parse(
							result.data.data.content[i].address
						);
					}
					this.tableData = result.data.data.content;
					this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.listOrder();
		let a = this.$route.matched.find(item => item.name === "Details")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	components: {
		tableList
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "Details")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
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
				width: 850px;
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
