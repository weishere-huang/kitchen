<template>
	<div class="user_analysis">
		<div class="bottom_list">
			<div class="top_title">
				<h4>用户分析</h4>
			</div>
			<div class="table_list">
				<el-col :span="12" style="text-align:center;padding-top:80px;">
					<i class="iconfont" style="color:#00b2ff;font-size:100px;">&#xe72f;</i>
					<div class="person_case">
						<div class="man"></div>
						<div class="woman"></div>
					</div>
					<i class="iconfont" style="color:#f25dd0;font-size:100px;">&#xe793;</i>
					<div class="ratio_case">
						<span>{{gender.nan*100}}%</span>
						<span>{{gender.nv*100}}%</span>
					</div>
				</el-col>
				<el-col :span="12">
					<div id="userAnalysis" style="width:100%;height:460px;"></div>
				</el-col>
			</div>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<div class="top_title">
				<h4>用户分布情况</h4>
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
							<span>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column label="人数" min-width="50">
						<template slot-scope="scope">
							<span>{{ scope.row.cityCount }}</span>
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
		<div class="bottom_list">
			<div class="top_title">
				<h4>用户消费偏好</h4>
			</div>
			<div class="table_list">
				<el-col :span="24">
					<div id="consumption" style="width:100%;height:460px;"></div>
				</el-col>
			</div>
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
			deviceCount: {},
			gender: {}
		};
	},
	mounted() {
		let consumption = echarts.init(document.getElementById("consumption"));
		let consumption0ption = {
			color: ["#1cc09f"],
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
					type: "value"
				}
			],
			yAxis: [
				{
					type: "category",
					data: ["智能厨房电器", "蔬菜", "瓜果", "其他"],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			series: [
				{
					name: "销售数量",
					type: "bar",
					barMaxWidth: 50,
					data: [614, 520, 132, 143]
				}
			]
		};
		consumption.setOption(consumption0ption);
		window.onresize = function() {
			consumption.resize();
		};
	},
	methods: {
		getGenderList() {
			this.Axios(
				{
					params: {},
					url: "/api-user/userInfo/userGenderCounted",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				// console.log(result);
				if (result.data.code === 200) {
					this.gender = result.data.data;
					document.getElementsByClassName("man")[0].style.width =
						this.gender.nan * 100 + "%";
					document.getElementsByClassName("woman")[0].style.width =
						this.gender.nv * 100 + "%";
				}
			});
		},
		getPie() {
			this.Axios(
				{
					params: {},
					url: "/api-user/userInfo/userAgeCounted",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					let key = result.data.data.map(item => item.name);
					let value = result.data.data.map(item => item.value);
					let userAnalysis = echarts.init(
						document.getElementById("userAnalysis")
					);
					let option = {
						title: {
							text: "",
							subtext: "",
							x: ""
						},
						tooltip: {
							trigger: "item",
							formatter: "{a} <br/>{b} : {c} "
						},
						legend: {
							orient: "vertical",
							bottom: "bottom",
							data: key
						},
						series: [
							{
								name: "年龄范围",
								type: "pie",
								radius: "55%",
								center: ["50%", "50%"],
								data: result.data.data,
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: "rgba(0, 0, 0, 0.5)"
									}
								}
							}
						]
					};
					userAnalysis.setOption(option);
					window.onresize = function() {
						userAnalysis.resize();
					};
				}
			});
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getTableList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
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
				// console.log(result);

				if (result.data.code === 200) {
				}
			});
		},
		getTableList() {
			this.Axios(
				{
					params: {},
					url: "/api-user/address/cityAddress",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				// console.log(result);
				if (result.data.code === 200) {
					this.tableData = result.data.data.content;
					this.total = result.data.data.totalElement;
					// console.log(this.tableData);
				}
			});
		}
	},
	created() {
		this.getTableList();
		// this.getBar();
		this.getGenderList();
		this.getPie();
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
.user_analysis {
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
		.ratio_case {
			padding: 12px 0;
			span {
				padding: 0 40px;
				font-size: 24px;
				font-weight: 600;
			}
			span:nth-child(1) {
				color: #00b2ff;
			}
			span:nth-child(2) {
				color: #f25dd0;
			}
		}
		.person_case {
			display: inline-block;
			width: 200px;
			font-size: 0;
			.man {
				height: 60px;
				width: 40%;
				background-color: #00b2ff;
				display: inline-block;
			}
			.woman {
				height: 60px;
				width: 60%;
				background-color: #f25dd0;
				display: inline-block;
			}
		}
	}
}
</style>