<template>
	<div class="admin_home">
		<el-col :span="18" style="padding:12px;">
			<el-col :span="24" class="user_msg">
				<el-col :span="3" style="line-height: 114px;padding:23px 0">
					<img src="../../assets/image/user.png" alt>
				</el-col>
				<el-col :span="14">
					<p class="content_style">Hi,Roulen,祝你开心每一天！</p>
					<p style="color:#999999">超级管理员</p>
				</el-col>
				<el-col :span="7">
					<div class="recommend">
						<span style="margin-right:8px;" class="case">
							<p>发布菜谱</p>
							<p>73</p>
						</span>
						<span style class="case">
							<p>累计销售菜谱</p>
							<p>
								1233
								<span style="font-size:14px;color:#999999;">次</span>
							</p>
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
							<i class="iconfont" style="color:white;">&#xe653;</i>
						</span>
						<span>
							<p>17
								<!-- <i style="color:#999999;font-style:normal;">3</i> -->
							</p>
							<p>今日注册用户</p>
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
							<p>￥36</p>
							<p>销售总额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #22CE9C;">
							<i class="iconfont" style="color:white;">&#xe684;</i>
						</span>
						<span>
							<p>36</p>
							<p>用户总数</p>
						</span>
					</li>
				</ul>
			</el-col>
			<el-col :span="24" class="sales_amount">
				<div class="top_style">
					<h4>销售额</h4>
					<el-date-picker
						class="data_style"
						v-model="searchValue"
						size="small"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="~"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions2"
                        value-format="yyyy/MM/dd"
					></el-date-picker>
				</div>
				<div class="histogram_style">
					<h4 style="text-align: center;line-height:52px;">销售额趋势</h4>
					<div id="sale_money" style="width:100%;height:284px;"></div>
				</div>
			</el-col>
			<el-col :span="24" class="feedback">
				<div class="top_style">
					<h4>意见反馈</h4>
				</div>
				<el-col :span="24" class="content_case">
					<el-col :span="6" class="left_case">
						<el-col
							:span="24"
							class="item_case"
							:class="index==activeStyle?'is_active':''"
							v-for="(item, index) in 8"
							:key="index"
							@click.native="handleStyle(index)"
						>
							<el-col :span="1" class="style_case">&nbsp;</el-col>
							<el-col :span="4" class="img_case">
								<img width="100%" src="../../assets/image/3DFP}_WV6YO1WREA42ZKC7M.png" alt>
							</el-col>
							<el-col :span="18" class="msg_case">
								<el-col :span="24">会飞的蜗牛</el-col>
								<el-col :span="24" style="color:#999999;font-size:12px;margin-top:4px;">12-08 13:00:24</el-col>
							</el-col>
						</el-col>
					</el-col>
					<el-col :span="18" class="right_case">
						<el-col
							:span="24"
							style="line-height:100px;height:100px;width:95%;border-bottom: 1px solid #dde2eb;"
						>
							<span class="head_portrait">
								<img width="100%" src="../../assets/image/3DFP}_WV6YO1WREA42ZKC7M.png" alt>
							</span>
							<div class="answer">你好</div>
						</el-col>
						<el-col :span="24" style="width:95%;padding:8px 0;">
							<textarea class="border_style" maxlength="200" cols="81" rows="3" placeholder="请输入回复内容..."></textarea>
						</el-col>
						<el-col :span="24" style="width:95%;text-align: right;">
							<el-button size="small" type="primary">快速回复</el-button>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
		</el-col>
		<el-col :span="6" style="padding:0 0 0 8px;">
			<el-col :span="24" style="background-color: white;margin-top: 12px;">
				<el-col :span="24" class="top_lists">
					<h4>本月销售TOP榜</h4>
					<span>
						<i class="iconfont" @click="showTop5(1)">&#xe6b6;</i>
						<i class="iconfont" @click="showTop10(1)">&#xe6b7;</i>
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
			<el-col :span="24" style="background-color: white;margin-top: 17px;">
				<el-col :span="24" class="top_lists">
					<h4>本月热销商品</h4>
					<span>
						<i class="iconfont" @click="showTop5(2)">&#xe6b6;</i>
						<i class="iconfont" @click="showTop10(2)">&#xe6b7;</i>
					</span>
				</el-col>
				<el-col :span="24" class="table_case">
					<el-col :span="24" class="table_title">
						<el-col :span="5" style="text-align:center;">排名</el-col>
						<el-col :span="12">商品</el-col>
						<el-col :span="7">销量</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col :span="24" v-for="(item, index) in items" :key="index" v-show="hotMenutop5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.name}}</el-col>
							<el-col :span="7">{{item.money}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in item1" :key="item.index" v-show="hotMenutop10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.name}}</el-col>
							<el-col :span="7">{{item.money}}</el-col>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" style="background-color: white;margin-top: 18px;">
				<el-col :span="24" class="top_lists">
					<h4>本月热销菜谱</h4>
					<span>
						<i class="iconfont" @click="showTop5(3)">&#xe6b6;</i>
						<i class="iconfont" @click="showTop10(3)">&#xe6b7;</i>
					</span>
				</el-col>
				<el-col :span="24" class="table_case">
					<el-col :span="24" class="table_title">
						<el-col :span="5" style="text-align:center;">排名</el-col>
						<el-col :span="12">商品</el-col>
						<el-col :span="7">销量</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col :span="24" v-for="(item, index) in items" :key="index" v-show="cookbooktop5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.name}}</el-col>
							<el-col :span="7">{{item.money}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in item1" :key="item.index" v-show="cookbooktop10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.name}}</el-col>
							<el-col :span="7">{{item.money}}</el-col>
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
			activeStyle: 0,
			top5: true,
			top10: false,
			hotMenutop5: true,
			hotMenutop10: false,
			cookbooktop5: true,
			cookbooktop10: false,
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
			],
			pickerOptions2: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit("pick", [start, end]);
						}
					}
				]
			},
			searchValue: []
		};
	},
	mounted() {
		let myChart = echarts.init(document.getElementById("sale_money"));
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
		myChart.setOption(option);
	},
	methods: {
		handleStyle(index) {
			this.activeStyle = index;
		},
		showTop5(index) {
			if (index == 1) {
				this.top5 = true;
				this.top10 = false;
			}
			if (index == 2) {
				this.hotMenutop5 = true;
				this.hotMenutop10 = false;
			}
			if (index == 3) {
				this.cookbooktop5 = true;
				this.cookbooktop10 = false;
			}
		},
		showTop10(index) {
			if (index == 1) {
				this.top5 = false;
				this.top10 = true;
			}
			if (index == 2) {
				this.hotMenutop5 = false;
				this.hotMenutop10 = true;
			}
			if (index == 3) {
				this.cookbooktop5 = false;
				this.cookbooktop10 = true;
			}
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
.admin_home {
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
			// line-height: 114px;
			// height: 100%;
			text-align: center;
			.case {
				display: inline-block;
				width: 40%;
				height: 100%;
				text-align: center;
				margin-top: 40px;
				// background: #1cc09f;
				// line-height: 30px;
				// color: white;
				p:nth-child(1) {
					color: #999999;
				}
				p:nth-child(2) {
					font-size: 20px;
					margin-top: 4px;
				}
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
			}
		}
		.histogram_style {
		}
	}
	.feedback {
		margin-top: 16px;
		background-color: white;
		.top_style {
			padding: 0 20px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
		}
		.content_case {
			margin: 8px 12px;
			.left_case {
				border-right: @border;
				height: 210px;
				overflow: scroll;
				.item_case {
					height: 50px;
					cursor: pointer;
					.img_case {
						margin-top: 8px;
						border-radius: 50%;
						font-size: 0;
						overflow: hidden;
					}
					.msg_case {
						margin-top: 8px;
						padding: 0 12px;
					}
					&:hover {
						.style_case {
							height: 100%;
							background-color: #1cc09f;
							width: 4px;
						}
						background-color: #f1f1f1;
					}
					.style_case {
						width: 4px;
						margin-right: 4px;
					}
				}
			}
			.right_case {
				height: 210px;
				.head_portrait {
					position: relative;
					display: inline-block;
					width: 40px;
					height: 40px;
					border-radius: 50px;
					overflow: hidden;
					line-height: 40px;
					top: 13px;
					left: 18px;
				}
				.answer {
					position: relative;
					display: inline-block;
					height: 40px;
					border: 1px solid #dde2eb;
					background: #f1f1f1;
					line-height: 40px;
					padding: 0 12px;
					left: 30px;
					border-radius: 5px;
				}
				.answer::after {
					position: absolute;
					bottom: 12px;
					left: -7px;
					padding: 6px;
					border: inherit;
					border-right: none;
					border-top: none;
					content: "";
					background: inherit;
					-webkit-transform: rotate(45deg);
					-moz-transform: rotate(45deg);
					transform: rotate(45deg);
				}
			}
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
	.is_active {
		background-color: #f1f1f1;
		.style_case {
			height: 100%;
			background-color: #1cc09f;
			width: 4px;
		}
	}
	.border_style {
		border: none;
		resize: none;
		padding: 4px;
		outline: none;
	}
}
</style>
