<template>
	<div class="home">
		<el-col :span="18" style="padding:12px;">
			<el-col :span="24" class="user_msg">
				<el-col :span="3" style="line-height: 114px;padding:23px 0">
					<img src="../../assets/image/user.png" alt>
				</el-col>
				<el-col :span="12">
					<p class="content_style">Hi,{{supplierName}},祝你开心每一天！</p>
					<p style="color:#999999">{{storeName}}</p>
				</el-col>
				<el-col :span="9">
					<div class="recommend">
						<span style="background-color:#FF0000;margin-right:8px;padding:0 8px;">
							热销&nbsp;
							<span
								style="background-color:#FF0000;font-size:20px;"
							>{{allMsg.upperLowerShelfAndTotal.hotMenuTotal>0?allMsg.upperLowerShelfAndTotal.hotMenuTotal:"0"}}</span>
						</span>
						<span style="background-color:#00CF47;padding:0 8px;">
							新品&nbsp;
							<span
								style="background-color:#00CF47;font-size:20px;"
							>{{allMsg.upperLowerShelfAndTotal.newMenuTotal>0?allMsg.upperLowerShelfAndTotal.newMenuTotal:0}}</span>
						</span>
					</div>
				</el-col>
			</el-col>
			<el-col :span="24">
				<ul class="list_style">
					<li>
						<span style="background-color: #00BDF1;">
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>{{allMsg.supplierSellSum.todayOrderTotal>0?allMsg.supplierSellSum.todayOrderTotal:0}}</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span style="background-color: #80D6AC;">
							<i class="iconfont" style="color:white;">&#xe666;</i>
						</span>
						<span>
							<p>{{allMsg.supplierSellSum.todayOrderSellSum>0?allMsg.supplierSellSum.todayOrderSellSum:0}}</p>
							<p>今日销售额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #FF834D;">
							<i class="iconfont" style="color:white;">&#xe66a;</i>
						</span>
						<span>
							<p>
								{{allMsg.upperLowerShelfAndTotal.upperTotal>0?allMsg.upperLowerShelfAndTotal.upperTotal:0}}/
								<i
									style="color:#999999;font-style:normal;"
								>{{allMsg.upperLowerShelfAndTotal.lowerTotal>0?allMsg.upperLowerShelfAndTotal.lowerTotal:0}}</i>
							</p>
							<p>上/下架商品数</p>
						</span>
					</li>
					<li>
						<span style="background-color: #A72F95;">
							<i class="iconfont" style="color:white;">&#xe8d7;</i>
						</span>
						<span>
							<p>{{allMsg.supplierSellSum.orderTotal>0?allMsg.supplierSellSum.orderTotal:0}}</p>
							<p>订单总数</p>
						</span>
					</li>
					<li>
						<span style="background-color: #6366CB;">
							<i class="iconfont" style="color:white;">&#xe69f;</i>
						</span>
						<span>
							<p>￥{{allMsg.supplierSellSum.orderSellTotalSum>0?allMsg.supplierSellSum.orderSellTotalSum:0}}</p>
							<p>销售总额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #22CE9C;">
							<i class="iconfont" style="color:white;">&#xe696;</i>
						</span>
						<span>
							<p>{{allMsg.upperLowerShelfAndTotal.total>0?allMsg.upperLowerShelfAndTotal.total:0}}</p>
							<p>商品总数</p>
						</span>
					</li>
				</ul>
			</el-col>
			<el-col :span="24" class="sales_amount">
				<div class="top_style">
					<h4>销售额趋势</h4>
					<el-button-group class="data_style">
						<el-button
							plain
							size="small"
							@click="getSaleMoney(0)"
							:class="btnStyleShow==0?'btn_style':''"
						>最近7天</el-button>
						<el-button
							plain
							size="small"
							@click="getSaleMoney(1)"
							:class="btnStyleShow==1?'btn_style':''"
						>最近30天</el-button>
						<!-- <el-button plain size="small">最近一年</el-button> -->
					</el-button-group>
				</div>
				<div class="histogram_style">
					<h4 style="text-align: center;line-height:52px;">
						<span style="font-size:12px;color:#999999;" v-if="searchValue!=''">（{{searchValue}}）</span>
					</h4>
					<div id="main" style="width:100%;height:240px;"></div>
				</div>
			</el-col>
		</el-col>
		<el-col :span="6" style="padding:0 0 0 8px;">
			<el-col :span="24" style="background-color: white;margin-top: 12px;">
				<el-col :span="24" class="top_lists">
					<h4>热销TOP榜</h4>
					<span>
						<i class="iconfont" @click="showTop5">&#xe6b6;</i>
						<i class="iconfont" @click="showTop10">&#xe6b7;</i>
					</span>
				</el-col>
				<el-col :span="24" class="table_case">
					<el-col :span="24" class="table_title">
						<el-col :span="5" style="text-align:center;">排名</el-col>
						<el-col :span="12">商品</el-col>
						<el-col :span="7">销售额</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col :span="24" v-for="(item, index) in item1" :key="index" v-show="top5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.itemName}}</el-col>
							<el-col :span="7">{{item.orderMoney}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in item2" :key="item.index" v-show="top10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.itemName}}</el-col>
							<el-col :span="7">{{item.orderMoney}}</el-col>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" style="margin-top:18px;">
				<el-col :span="24" class="order_state">
					<el-col :span="24" class="top_lists">
						<h4>订单状态</h4>
					</el-col>
					<el-col :span="24" class="state_content">
						<el-col :span="8" class="list_case">
							<el-col :span="24">
								<i class="iconfont" style="color:#00A4DB;">&#xec1e;</i>待付款
							</el-col>
							<el-col :span="24">{{allMsg.supplierOrderInfo.unpaid>0?allMsg.supplierOrderInfo.unpaid:0}}</el-col>
						</el-col>
						<el-col :span="8" class="list_case">
							<el-col :span="24">
								<i class="iconfont" style="color:#FFDA5B;">&#xec1e;</i>待发货
							</el-col>
							<el-col
								:span="24"
							>{{allMsg.supplierOrderInfo.delivered>0?allMsg.supplierOrderInfo.delivered:0}}</el-col>
						</el-col>
						<el-col :span="8" class="list_case">
							<el-col :span="24">
								<i class="iconfont" style="color:#72D273;">&#xec1e;</i>待收货
							</el-col>
							<el-col
								:span="24"
							>{{allMsg.supplierOrderInfo.waitGood>0?allMsg.supplierOrderInfo.waitGood:0}}</el-col>
						</el-col>
						<el-col :span="24" style>
							<el-col :span="24" class="echarts_case" id="order_pie" ref="pie"></el-col>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
		</el-col>
	</div>
</template>
<script>
var echarts = require("echarts");
export default {
	data() {
		return {
			btnStyleShow: 0,
			top5: true,
			top10: false,
			test: 4,
			item1: [],
			item2: [],
			allMsg: {
				supplierSellSum: {},
				upperLowerShelfAndTotal: {},
				supplierOrderSell: [],
				supplierOrderInfo: {}
			},
			searchValue: "",
			supplierName: JSON.parse(sessionStorage.getItem("user")).account,
			storeName: JSON.parse(sessionStorage.getItem("user")).account
		};
	},
	mounted() {
		let me = this;
		echarts
			.init(document.getElementById("order_pie"))
			.on("click", function(params) {
				me.$router.push({ path: "/Order" });
			});
	},
	methods: {
		showTop5() {
			this.top5 = true;
			this.top10 = false;
		},
		showTop10() {
			this.top5 = false;
			this.top10 = true;
		},
		getMsg() {
			this.Axios(
				{
					params: {
						state: "0,1,2",
						supplierId: JSON.parse(sessionStorage.getItem("user"))
							.salesTerritoryId
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/order/getSupplierOrderInfo",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.allMsg = JSON.parse(JSON.stringify(result.data.data));
						this.item1 = this.allMsg.supplierOrderSell.slice(0, 5);
						this.item2 = this.allMsg.supplierOrderSell.slice(5);
						echarts.init(document.getElementById("order_pie")).setOption({
							tooltip: {
								trigger: "item",
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							series: {
								name: "订单状态",
								type: "pie",
								data: [
									{
										name: "待收货",
										value: this.allMsg.supplierOrderInfo.waitGood,
										itemStyle: {
											color: "#72D273"
										}
									},
									{
										name: "待付款",
										value: this.allMsg.supplierOrderInfo.unpaid,
										itemStyle: {
											color: "#00A4DB"
										}
									},
									{
										name: "待发货",
										value: this.allMsg.supplierOrderInfo.delivered,
										itemStyle: {
											color: "#FFDA5B"
										}
									}
								]
							}
						});
					}

					// console.log(this.orderDetails);
				},
				({ type, info }) => {}
			);
		},
		getSaleMoney(i) {
			this.btnStyleShow = i;
			this.Axios(
				{
					params: {
						state: i,
						supplierId: JSON.parse(sessionStorage.getItem("user"))
							.salesTerritoryId
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/order/getSupplierOrderPrice",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.searchValue =
							JSON.parse(JSON.stringify(result.data.data[0])).gmtCreate +
							"至" +
							JSON.parse(
								JSON.stringify(result.data.data[result.data.data.length - 1])
							).gmtCreate;
						let time = result.data.data.map(item => {
							return item.gmtCreate;
						});
						let value = result.data.data.map(item => {
							return item.orderMoney;
						});
						let data = result.data.data;
						let myChart = echarts.init(document.getElementById("main"));
						let a = "";
						// if (i == 0 || i == 1) {
						// 	a = "日";
						// } else {
						// 	a = "月";
						// }
						let option = {
							title: {
								text: ""
							},
							tooltip: {
								trigger: "axis",
								formatter: function(params) {
									let name = params[0].name.replace("日", "");
									let item = data
										.map(i => {
											return i.gmtCreate;
										})
										.map(j => {
											return j.slice(j.lastIndexOf("-") + 1);
										});
									let index;
									for (let i = 0; i < item.length; i++) {
										if (item[i] == name) {
											index = i;
										}
									}
									let topTip =
										"<div style='padding:0 8px;'>" +
										data[index].gmtCreate +
										"<br/>" +
										"订单数量：" +
										data[index].sellSum +
										"<br/>" +
										"销售额：" +
										data[index].orderMoney +
										"</div>";
									return topTip;
								}
							},
							legend: {
								data: []
							},
							xAxis: {
								data: time.map(item => {
									return item.slice(item.lastIndexOf("-") + 1) + a;
								})
							},
							yAxis: {},
							series: [
								{
									name: "销售额",
									type: "bar",
									data: value,
									barMaxWidth: 50,
									itemStyle: {
										normal: {
											color: "#1cc09f"
										}
									}
								}
							]
						};
						myChart.setOption(option);
						window.onresize = function() {
							myChart.resize();
						};
					}

					// console.log(this.orderDetails);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getMsg();
		this.getSaleMoney(0);
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
.home {
	font-size: 14px;
	color: @font-normal;
	.user_msg {
		background-color: white;
		height: 114px;
		img {
			display: block;
			width: 68px;
			height: 68px;
			margin: auto;
		}
		.content_style {
			font-size: 20px;
			margin-top: 32px;
			margin-bottom: 12px;
		}
		.recommend {
			line-height: 114px;
			text-align: center;
			span {
				display: inline-block;
				// width: 40%;
				height: 30px;
				text-align: center;
				background: #1cc09f;
				line-height: 30px;
				color: white;
			}
		}
	}
	.list_style {
		margin-top: 12px;
		height: 220px;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;

		li {
			list-style-type: none;
			display: inline-block;
			width: 32.5%;
			height: 100px;
			background-color: white;
			line-height: 100px;
			span {
				display: inline-block;
			}
			span:nth-child(1) {
				width: 32px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				border-radius: 5px;
				margin-left: 20px;
			}
			span:nth-child(2) {
				float: right;
				line-height: 20px;
				padding: 0 20px;
				p:nth-child(1) {
					margin-top: 28px;
					font-size: 20px;
					text-align: right;
				}
				p:nth-child(2) {
					color: #999999;
				}
			}
		}
	}
	.sales_amount {
		margin-top: 12px;
		background-color: white;
		.top_style {
			padding: 0 20px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
			h4 {
				display: inline-block;
			}
			.data_style {
				margin-top: 15px;
				float: right;
				.el-button.is-plain:focus,
				.el-button.is-plain:hover {
					background-color: @main-color;
					color: white;
				}
			}
		}

		.histogram_style {
		}
	}
	.top_lists {
		padding: 0 12px;
		border-bottom: @border;
		.title_case {
		}
		h4 {
			line-height: 60px;
			display: inline-block;
		}
		span {
			float: right;
			i {
				line-height: 60px;
				font-size: 24px;
				cursor: pointer;
				color: #999999;
			}
		}
	}
	.table_case {
		padding: 0 12px;
		.table_title {
			line-height: 32px;
			background-color: #f1f1f1;
			margin-top: 16px;
		}
		.table_content {
			line-height: 28px;
			height: 232px;
			.sort_style1 {
				border-radius: 50%;
				background-color: #f1f1f1;
				display: inline-block;
				width: 28px;
			}
			.sort_style2 {
				border-radius: 50%;
				background-color: #1cc09f;
				display: inline-block;
				width: 28px;
				color: white;
			}
			.el-col {
				padding: 4px 0;
			}
		}
	}
	.order_state {
		background-color: white;
	}
	.state_content {
		text-align: center;
		margin-top: 12px;
		.list_case {
			border-right: 1px solid #dde2eb;
			i {
				font-size: 18px;
			}
			.el-col:nth-child(1) {
				color: #999999;
			}
			.el-col:nth-child(2) {
				font-size: 20px;
				color: #333333;
				margin-top: 4px;
			}
		}
		.list_case:nth-child(3) {
			border-right: none;
		}
		.echarts_case {
			height: 232px;
		}
	}
	.btn_style {
		background-color: #1cc09f;
		color: white;
	}
}
</style>
