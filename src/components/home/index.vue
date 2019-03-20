<template>
	<div class="home">
		<!-- <el-col :span="18" style="padding:12px;">
			<el-col :span="24" class="user_msg">
				<el-col :span="3" style="line-height: 114px;padding:23px 0">
					<img src="../../assets/image/user.png" alt>
				</el-col>
				<el-col :span="16">
					<p class="content_style">Hi,agent0816,祝你开心每一天！</p>
					<p style="color:#999999">绵阳永辉超市（涪城店）</p>
				</el-col>
				<el-col :span="5">
					<div class="recommend">
						<span style="background-color:#FF0000;margin-right:8px;">热销6</span>
						<span style="background-color:#00CF47">新品4</span>
					</div>
				</el-col>
			</el-col>
			<el-col :span="24">
				<ul class="list_style">
					<li>
						<span>
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span>
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span>
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span>
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span>
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span>
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
				</ul>
			</el-col>
			<el-col :span="24" class="sales_amount">
				<div class="top_style">
					<h4>销售额</h4>
				</div>
				<div class="histogram_style">
					<h4 style="text-align: center;line-height:52px;">销售额趋势</h4>
					<div id="main" style="width:100%;height:300px;"></div>
				</div>
			</el-col>
		</el-col>
		<el-col :span="6">
			<el-col :span="24"></el-col>
			<el-col :span="24"></el-col>
		</el-col> -->
	</div>
</template>
<script>
var echarts = require("echarts");
export default {
	data() {
		return {};
	},
	mounted() {
		var myChart = echarts.init(document.getElementById("main"));
		var option = {
			title: {
				text: ""
			},
			tooltip: {},
			legend: {
				data: []
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [
				{
					name: "销量",
					type: "bar",
					data: [5, 20, 36, 10, 10, 20]
				}
			]
		};

		myChart.setOption(option);
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
				width: 40%;
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
				background-color: blue;
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
		}
		.histogram_style {
		}
	}
}
</style>
