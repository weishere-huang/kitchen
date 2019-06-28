<template>
	<div class="admin_dataAnalysis_list">
		<div class="bottom_list">
			<div class="top_title">
				<h4>数据分析</h4>
			</div>
			<div class="table_list">
				<div style="height:120px;">
					<ul class="statistics_case">
						<li>
							<div>产品总数</div>
							<div>{{deviceCount.deviceCount}}</div>
						</li>
						<li>
							<div>设备总数</div>
							<div>{{deviceCount.allcount}}</div>
						</li>
						<li>
							<div>今日绑定设备</div>
							<div>{{deviceCount.todayCount}}</div>
						</li>
					</ul>
				</div>
				<div id="adminDataAnalysis" style="width:100%;height:300px;"></div>
			</div>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<div class="top_title">
				<h4>全国设备分布</h4>
			</div>
			<el-col :span="18" style="margin-top:20px;padding:0 12px 20px;">
				<distribute style="width:100%;height:600px;"></distribute>
			</el-col>
			<el-col :span="6" style="margin-top:20px;padding:0 12px 20px;">
				<el-table
					:data="tableData"
					style="width: 100%"
					size="mini"
					stripe
					tooltip-effect="light"
					:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
				>
					<el-table-column label="排序" type="index" width="50" show-overflow-tooltip></el-table-column>
					<el-table-column label="城市" min-width="50" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.cityName==""||scope.row.cityName==null?'未知':scope.row.cityName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="设备数" min-width="50">
						<template slot-scope="scope">
							<span>{{ scope.row.deviceCount }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="block" style="margin-top:10px;float:right">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="pageIndex"
						:page-sizes="[14, 28,50, 100]"
						:page-size="pageSize"
						layout="sizes, prev, pager, next"
						:total="total"
					></el-pagination>
				</div>
			</el-col>
		</div>
	</div>
</template>
<script>
var echarts = require("echarts");
import distribute from "./Distribute";
import china from "../../../../static/china.js";
export default {
	inject: ["reload"],
	data() {
		return {
			total: 0,
			pageIndex: 1,
			pageSize: 10,
			tableData: [
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				},
				{
					phone: "上海",
					order: "22"
				}
			],
			deviceCount: {}
		};
	},
	mounted() {},
	methods: {
		getTopList() {
			this.Axios(
				{
					params: {},
					url: "/api-enterprise/deviceuser/findDeviceCount",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.deviceCount = result.data.data;
				}
			});
		},
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
			this.getTableList();
		},
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.getTableList();
		},

		getBar() {
			this.Axios(
				{
					params: {},
					url: "/api-enterprise/deviceuser/findBindDistributed",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				let dateVal = JSON.parse(JSON.stringify(result.data.data.date));
				let bindCount = JSON.parse(JSON.stringify(result.data.data.bindCount));
				if (result.data.code === 200) {
					let myChart = echarts.init(
						document.getElementById("adminDataAnalysis")
					);
					let option = {
						color: ["#3398DB"],
						tooltip: {
							trigger: "axis",
							axisPointer: {
								// 坐标轴指示器，坐标轴触发有效
								type: "line" // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
						},
						xAxis: [
							{
								type: "category",
								data: dateVal,
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis: [
							{
								type: "value"
							}
						],
						series: [
							{
								name: "绑定数量",
								type: "bar",
								data: bindCount,
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
			});
		},
		getTableList() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize
					},
					url: "/api-enterprise/deviceuser/cityDevice",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.tableData = result.data.data.content;
					this.total = result.data.data.totalElement;
				}
			});
		}
	},
	created() {
		this.getTableList();
		this.getBar();
		this.getTopList();
	},
	watch: {},
	components: {
		distribute
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
.admin_dataAnalysis_list {
	font-size: 14px;
	color: @font-normal;
	padding-bottom: 10px;
	overflow: hidden;
	.bottom_list {
		margin-top: 10px;
		background-color: white;
		overflow: hidden;
	}
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
		overflow: hidden;
		padding: 10px;
		.statistics_case {
			padding: 12px 0;
			li {
				list-style-type: none;
				float: left;
				padding: 0 40px;
				border-right: @border;
				div {
					text-align: center;
				}
				div:nth-child(2) {
					font-size: 24px;
					font-family: "Roboto";
					padding: 8px 0;
				}
				div:nth-child(1) {
					color: @font-subsidiary;
				}
			}
		}
	}
}
</style>
