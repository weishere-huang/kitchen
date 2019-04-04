<template>
	<div class="admin_home">
		<el-col :span="18" style="padding:12px;">
			<el-col :span="24" class="user_msg">
				<el-col :span="3" style="line-height: 114px;padding:23px 0">
					<img src="../../assets/image/user.png" alt>
				</el-col>
				<el-col :span="14">
					<p class="content_style">Hi,{{supplierName}},祝你开心每一天！</p>
					<p style="color:#999999">{{roleName}}</p>
				</el-col>
				<el-col :span="7">
					<div class="recommend">
						<span style="margin-right:8px;" class="case">
							<p>发布菜谱</p>
							<p>{{allMsg.recipeCountAndSellSum.recipeSum}}</p>
						</span>
						<span style class="case">
							<p>累计销售菜谱</p>
							<p>
								{{allMsg.recipeCountAndSellSum.sellNum}}
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
							<p>{{allMsg.orderDaySum.orderSum>0?allMsg.orderDaySum.orderSum:'0'}}</p>
							<p>今日订单</p>
						</span>
					</li>
					<li>
						<span style="background-color: #80D6AC;">
							<i class="iconfont" style="color:white;">&#xe666;</i>
						</span>
						<span>
							<p>{{allMsg.orderDaySum.orderMoney>0?allMsg.orderDaySum.orderMoney:'0'}}</p>
							<p>今日销售额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #FF834D;">
							<i class="iconfont" style="color:white;">&#xe653;</i>
						</span>
						<span>
							<p>{{allMsg.userNum.sumDay>0?allMsg.userNum.sumDay:'0'}}</p>
							<p>今日注册用户</p>
						</span>
					</li>
					<li>
						<span style="background-color: #A72F95;">
							<i class="iconfont" style="color:white;">&#xe8d7;</i>
						</span>
						<span>
							<p>{{allMsg.orderSum.orderSum>0?allMsg.orderSum.orderSum:'0'}}</p>
							<p>订单总数</p>
						</span>
					</li>
					<li>
						<span style="background-color: #6366CB;">
							<i class="iconfont" style="color:white;">&#xe69f;</i>
						</span>
						<span>
							<p>￥{{allMsg.orderSum.orderMoney>0?allMsg.orderSum.orderMoney:'0'}}</p>
							<p>销售总额</p>
						</span>
					</li>
					<li>
						<span style="background-color: #22CE9C;">
							<i class="iconfont" style="color:white;">&#xe684;</i>
						</span>
						<span>
							<p>{{allMsg.userNum.countUser>0?allMsg.userNum.countUser:'0'}}</p>
							<p>用户总数</p>
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
							:class="btnStyleShow==0?'btn_style':''"
							@click="getSaleMoney(0)"
						>最近7天</el-button>
						<el-button
							plain
							size="small"
							:class="btnStyleShow==1?'btn_style':''"
							@click="getSaleMoney(1)"
						>最近30天</el-button>
						<!-- <el-button plain size="small" @click="getSaleMoney(2)">最近一年</el-button> -->
					</el-button-group>
				</div>
				<div class="histogram_style">
					<h4 style="text-align: center;line-height:52px;">
						<span style="font-size:12px;color:#999999;" v-if="searchValue!=''">（{{searchValue}}）</span>
					</h4>
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
							v-for="(item, index) in userLeaveMessage"
							:key="index"
							@click.native="handleStyle(index,item)"
						>
							<el-col :span="1" class="style_case">&nbsp;</el-col>
							<el-col :span="4" class="img_case">
								<img :src="item.img" alt>
							</el-col>
							<el-col :span="18" class="msg_case">
								<el-col :span="24">{{item.userName}}</el-col>
								<el-col :span="24" style="color:#999999;font-size:12px;margin-top:4px;">{{item.gmtCreate}}</el-col>
							</el-col>
						</el-col>
					</el-col>
					<el-col :span="18" class="right_case">
						<el-col
							:span="24"
							style="line-height:100px;height:100px;width:95%;border-bottom: 1px solid #dde2eb;overflow: scroll;"
						>
							<span class="head_portrait" v-if="messageReply!=''">
								<img width="100%" :src="messageReply.img" alt>
							</span>
							<div class="answer" v-if="messageReply!=''">{{messageReply.opinion}}</div>
						</el-col>
						<el-col :span="24" style="width:95%;padding:8px 0;">
							<textarea
								v-model="reply"
								class="border_style"
								maxlength="200"
								cols="81"
								rows="3"
								placeholder="请输入回复内容..."
							></textarea>
						</el-col>
						<el-col :span="24" style="width:95%;text-align: right;">
							<el-button
								size="small"
								type="primary"
								@click="replyMessage"
								:disabled="reply!=''?false:true"
							>快速回复</el-button>
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
						<el-col :span="12">供应商</el-col>
						<el-col :span="7">销售额</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col :span="24" v-for="(item, index) in saleTOP5" :key="index" v-show="top5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.supplierName}}</el-col>
							<el-col :span="7">{{item.orderMoney}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in saleTOP10" :key="item.index" v-show="top10">
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
						<el-col :span="24" v-for="(item, index) in menuTop5" :key="index" v-show="hotMenutop5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.itemName}}</el-col>
							<el-col :span="7">{{item.sellNum}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in menuTop10" :key="item.index" v-show="hotMenutop10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.itemName}}</el-col>
							<el-col :span="7">{{item.sellNum}}</el-col>
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
						<el-col :span="12">菜谱</el-col>
						<el-col :span="7">销量</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col
							:span="24"
							v-for="(item, index) in saleCookbooktop5"
							:key="index"
							v-show="cookbookTop5"
						>
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.recipeName}}</el-col>
							<el-col :span="7">{{item.recipeSum}}</el-col>
						</el-col>
						<el-col
							:span="24"
							v-for="(item, index) in saleCookbooktop10"
							:key="item.index"
							v-show="cookbookTop10"
						>
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.recipeName}}</el-col>
							<el-col :span="7">{{item.recipeSum}}</el-col>
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
			supplierName: JSON.parse(sessionStorage.getItem("user")).account,
			roleName: JSON.parse(sessionStorage.getItem("user")).roleName,
			btnStyleShow: 0,
			saleTOP5: [],
			saleTOP10: [],
			menuTop5: [],
			menuTop10: [],
			saleCookbooktop5: [],
			saleCookbooktop10: [],
			allMsg: {
				itemSellNum: [],
				orderDaySum: {},
				orderSum: {},
				supperSaleSum: [],
				userNum: {},
				itemSellNum: [],
				recipeMonthSell: [],
				recipeCountAndSellSum: {}
			},
			activeStyle: 0,
			top5: true,
			top10: false,
			hotMenutop5: true,
			hotMenutop10: false,
			cookbookTop5: true,
			cookbookTop10: false,
			test: 4,
			searchValue: "",
			userLeaveMessage: [],
			messageReply: "",
			reply: ""
		};
	},
	mounted() {},
	methods: {
		getLeaveMessage() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-user/userInfo/adviseIfUserInfo",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.userLeaveMessage = JSON.parse(
							JSON.stringify(result.data.data)
						);
						for (let i = 0; i < this.userLeaveMessage.length; i++) {
							this.userLeaveMessage[i].img =
								this.global.imgPath +
								this.userLeaveMessage[i].img.replace("img:", "");
						}
					}

					// console.log(this.orderDetails);
				},
				({ type, info }) => {}
			);
		},
		getMsg() {
			// let me = this;
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/order/getOrderMoneyAndSum",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					console.log(result.data.data);
					if (result.data.code === 200) {
						this.allMsg = JSON.parse(JSON.stringify(result.data.data));
						this.saleTOP5 = this.allMsg.supperSellSum.slice(0, 5);
						this.saleTOP10 = this.allMsg.supperSellSum.slice(5);
						this.menuTop5 = this.allMsg.itemSellNum.slice(0, 5);
						this.menuTop10 = this.allMsg.itemSellNum.slice(5);
						this.saleCookbooktop5 = this.allMsg.recipeMonthSell.slice(0, 5);
						this.saleCookbooktop10 = this.allMsg.recipeMonthSell.slice(5);
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
						state: i
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/order/getOrderPrice",
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
						let myChart = echarts.init(document.getElementById("sale_money"));
						let a;
						if (i == 0 || i == 1) {
							a = "日";
						} else {
							a = "月";
						}
						let option = {
							title: {
								text: ""
							},
							tooltip: {
								trigger: "axis",
								formatter: ""
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
		},
		handleStyle(index, item) {
			this.activeStyle = index;
			this.messageReply = item;
			console.log(this.messageReply);
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
				this.cookbookTop5 = true;
				this.cookbookTop10 = false;
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
				this.cookbookTop5 = false;
				this.cookbookTop10 = true;
			}
		},
		replyMessage() {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.messageReply.id,
				reply: this.reply
			});
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/advise/reply",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.reply = "";
						this.messageReply = "";
						this.$message.success("回复成功！");
						this.getLeaveMessage();
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
		this.getLeaveMessage();
	},
	mounted() {}
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
				padding: 0 16px;
				p:nth-child(1) {
					margin-top: 28px;
					font-size: 20px;
					text-align: right;
				}
				p:nth-child(2) {
					color: #999999;
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
						img {
							height: 33px;
							width: 33px;
						}
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
					img {
						height: 40px;
					}
				}
				.answer {
					position: relative;
					display: inline-block;
					// min-height: px;
					border: 1px solid #dde2eb;
					background: #f1f1f1;
					line-height: 28px;
					padding: 0 12px;
					left: 30px;
					border-radius: 5px;
					max-width: 80%;
					word-wrap: break-word;
					// vertical-align: top;
				}
				.answer::after {
					position: absolute;
					bottom: 9px;
					left: -6px;
					padding: 4px;
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
	.btn_style {
		background-color: #1cc09f;
		color: white;
	}
}
</style>
