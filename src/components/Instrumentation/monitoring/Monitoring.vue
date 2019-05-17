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
							<div>43233</div>
						</li>
						<li>
							<div>当前在线</div>
							<div>43233</div>
						</li>
						<li>
							<div>当前离线</div>
							<div>43233</div>
						</li>
						<li>
							<div>当前故障</div>
							<div>43233</div>
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
		return {};
	},
	mounted() {
		let myChart = echarts.init(document.getElementById("monitoring"));
		let Option = {
			title: {
				text: "设备运行折线图"
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["在线", "离线", "故障"]
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
				data: [
					"9:00",
					"9:30",
					"10:00",
					"10:30",
					"11:00",
					"11:30",
					"12:00",
					"12:30",
					"13:00",
					"13:30",
					"14:00",
					"14:30",
					"15:00",
					"15:30",
					"16:00",
					"16:30",
					"17:00",
					"17:30",
					"18:00",
					"18:30",
					"19:00",
					"19:30",
					"20:00",
					"20:30",
					"21:00",
					"21:30"
				]
			},
			yAxis: {
				type: "value"
			},
			series: [
				{
					name: "在线",
					type: "line",
					stack: "总量",
					data: [
						120,
						132,
						101,
						134,
						90,
						230,
						210,
						132,
						101,
						134,
						90,
						230,
						210,
						132,
						101,
						134,
						90,
						230,
						210,
						132,
						101,
						134,
						90,
						230,
						210
					]
				},
				{
					name: "离线",
					type: "line",
					stack: "总量",
					data: [
						220,
						182,
						191,
						234,
						290,
						330,
						310,
						182,
						191,
						234,
						290,
						330,
						310,
						182,
						191,
						234,
						290,
						330,
						310,
						182,
						191,
						234,
						290,
						330,
						310
					]
				},
				{
					name: "故障",
					type: "line",
					stack: "总量",
					data: [
						150,
						232,
						201,
						154,
						190,
						330,
						410,
						232,
						201,
						154,
						190,
						330,
						410,
						232,
						201,
						154,
						190,
						330,
						410,
						232,
						201,
						154,
						190,
						330,
						410
					]
				}
			]
		};
		myChart.setOption(Option);
		window.onresize = function() {
			myChart.resize();
		};
	},
	methods: {},
	created() {},
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
