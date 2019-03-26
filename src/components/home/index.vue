<template>
	<div class="home">
		<el-col :span="18" style="padding:12px;">
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
						<span style="background-color: #00BDF1;">
							<i class="iconfont" style="color:white;">&#xe63b;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span style="background-color: #80D6AC;">
							<i class="iconfont" style="color:white;">&#xe666;</i>
						</span>
						<span>
							<p>36</p>
							<p>今日销售额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #FF834D;">
							<i class="iconfont" style="color:white;">&#xe66a;</i>
						</span>
						<span>
							<p>
								17/
								<i style="color:#999999;font-style:normal;">3</i>
							</p>
							<p>上/下架商品数</p>
						</span>
					</li>
					<li>
						<span style="background-color: #A72F95;">
							<i class="iconfont" style="color:white;">&#xe8d7;</i>
						</span>
						<span>
							<p>36</p>
							<p>订单总数</p>
						</span>
					</li>
					<li>
						<span style="background-color: #6366CB;">
							<i class="iconfont" style="color:white;">&#xe69f;</i>
						</span>
						<span>
							<p>36</p>
							<p>销售总额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #22CE9C;">
							<i class="iconfont" style="color:white;">&#xe696;</i>
						</span>
						<span>
							<p>36</p>
							<p>商品总数</p>
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
						<el-col :span="24" v-for="(item, index) in items" :key="index" v-show="top5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.name}}</el-col>
							<el-col :span="7">{{item.money}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in item1" :key="item.index" v-show="top10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.name}}</el-col>
							<el-col :span="7">{{item.money}}</el-col>
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
							<el-col :span="24">17</el-col>
						</el-col>
						<el-col :span="8" class="list_case">
							<el-col :span="24">
								<i class="iconfont" style="color:#FFDA5B;">&#xec1e;</i>待发货
							</el-col>
							<el-col :span="24">17</el-col>
						</el-col>
						<el-col :span="8" class="list_case">
							<el-col :span="24">
								<i class="iconfont" style="color:#72D273;">&#xec1e;</i>待收货
							</el-col>
							<el-col :span="24">17</el-col>
						</el-col>
						<el-col :span="24" style>
							<el-col :span="24" class="echarts_case" id="order_pie"></el-col>
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
			top5: true,
			top10: false,
			test: 4,
			items: [
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				}
			],
			item1: [
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				},
				{
					name: "回锅肉",
					money: "44444"
				}
			]
		};
	},
	mounted() {
		let myChart = echarts.init(document.getElementById("main"));
		let option = {
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
		echarts.init(document.getElementById("order_pie")).setOption({
			series: {
				type: "pie",
				data: [
					{
						name: "待收货",
						value: 1212,
						itemStyle: {
							color: "#72D273"
						}
					},
					{
						name: "待付款",
						value: 2323,
						itemStyle: {
							color: "#00A4DB"
						}
					},
					{
						name: "待发货",
						value: 1919,
						itemStyle: {
							color: "#FFDA5B"
						}
					}
				]
			}
		});
		myChart.setOption(option);
	},
	methods: {
		showTop5() {
			this.top5 = true;
			this.top10 = false;
		},
		showTop10() {
			this.top5 = false;
			this.top10 = true;
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
}
</style>
