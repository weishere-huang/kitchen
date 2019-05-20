<template>
	<div class="monitoring_list">
		<div class="bottom_list">
			<div class="top_title">
				<h4>实时监控</h4>
			</div>
			<div class="table_list">
				<div style="height:120px;">
					<ul class="statistics_case">
						<li>
							<div>设备总数</div>
							<div>{{deviceCountMsg.sum!=""?deviceCountMsg.sum:0}}</div>
						</li>
						<li>
							<div>当前在线</div>
							<div>{{deviceCountMsg.on!=""?deviceCountMsg.on:0}}</div>
						</li>
						<li>
							<div>当前离线</div>
							<div>{{deviceCountMsg.off!=""?deviceCountMsg.off:0}}</div>
						</li>
					</ul>
				</div>
				<div id="monitoring" style="width:100%;height:600px;margin-top:20px;"></div>
			</div>
		</div>
	</div>
</template>
<script>
var echarts = require("echarts");
export default {
	inject: ["reload"],
	data() {
		return {
			deviceCountMsg: {
				sum: "",
				on: "",
				off: ""
			}
		};
	},
	mounted() {},
	methods: {
		getTopList() {
			this.Axios(
				{
					params: {},
					url: "/api-enterprise/deviceuser/findBindDeviceCount",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result);
				if (result.data.code === 200) {
					this.deviceCountMsg.sum = result.data.data.find(item => {
						return item.title == "设备总数";
					}).count;
					this.deviceCountMsg.on = result.data.data.find(item => {
						return item.title == "当前在线";
					}).count;
					this.deviceCountMsg.off = result.data.data.find(item => {
						return item.title == "当前离线";
					}).count;
				}
			});
		},
		getAxisMsg() {
			this.Axios(
				{
					params: {},
					url: "/api-enterprise/mock/listDeviceStateMonitor",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				// console.log(result);
				if (result.data.code === 200) {
					let date = result.data.data.date;
					let offline = result.data.data.offline;
					let online = result.data.data.online;
					let myChart = echarts.init(document.getElementById("monitoring"));
					date = date.map(item => {
						return item.split(" ")[1].substring(0, 5);
					});
					console.log(date);
					let Option = {
						title: {
							text: "设备运行折线图"
						},
						tooltip: {
							trigger: "axis"
						},
						legend: {
							data: ["在线", "离线"]
						},
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: "category",
							boundaryGap: false,
							data: date
						},
						yAxis: {
							type: "value"
						},
						series: [
							{
								name: "在线",
								type: "line",
								stack: "总量",
								data: online
							},
							{
								name: "离线",
								type: "line",
								stack: "总量",
								data: offline
							}
						]
					};
					myChart.setOption(Option);
					window.onresize = function() {
						myChart.resize();
					};
				}
			});
		}
	},
	created() {
		this.getAxisMsg();
		this.getTopList();
	},
	watch: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.monitoring_list {
	font-size: 14px;
	color: @font-normal;
	padding-bottom: 10px;
	overflow: hidden;
	.bottom_list {
		margin-top: 10px;
		background-color: white;
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
