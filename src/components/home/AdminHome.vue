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
				<!-- <el-col :span="7">
					<div class="recommend">
						<span style="margin-right:8px;" class="case">
							<p>发布菜谱</p>
							<p
								style="font-family: Roboto;"
							>{{allMsg.recipeCountAndSellSum.recipeSum>0?allMsg.recipeCountAndSellSum.recipeSum:'0'}}</p>
						</span>
						<span style class="case">
							<p>累计销售菜谱</p>
							<p style="font-family: Roboto;">
								{{allMsg.recipeCountAndSellSum.sellNum>0?allMsg.recipeCountAndSellSum.sellNum:'0'}}
								<span
									style="font-size:14px;color:#999999;"
								>次</span>
							</p>
						</span>
					</div>
				</el-col>-->
			</el-col>
			<el-col :span="24">
				<ul class="list_style">
					<li>
						<div class="list_box">
							<span>
								<i class="iconfont" style="color:#00BDF1;font-size:32px">&#xe6db;</i>
							</span>
							<span>
								<p>{{allMsg.iotProductsNum>0?allMsg.iotProductsNum:'0'}}</p>
								<p>物联产品</p>
							</span>
						</div>
					</li>
					<li>
						<div class="list_box">
							<span style>
								<i class="iconfont" style="color:#B1B42D;font-size:32px">&#xe752;</i>
							</span>
							<span>
								<p>{{allMsg.merchantNum>0?allMsg.merchantNum:'0'}}</p>
								<p>设备厂商</p>
							</span>
						</div>
					</li>
					<li>
						<div class="list_box">
							<span>
								<i class="iconfont" style="color: #FF834D;font-size:28px">&#xe604;</i>
							</span>
							<span>
								<p>{{userCount>0?userCount:'0'}}</p>
								<p>注册用户</p>
							</span>
						</div>
					</li>
					<li>
						<div class="list_box">
							<span>
								<i class="iconfont" style="color:#648B99;font-size:32px">&#xe64d;</i>
							</span>
							<span>
								<p>{{allMsg.iotDeviceNum>0?allMsg.iotDeviceNum:'0'}}</p>
								<p>物联设备</p>
							</span>
						</div>
					</li>
					<li>
						<div class="list_box">
							<span>
								<i class="iconfont" style="color:#6666CA;font-size:32px">&#xe615;</i>
							</span>
							<span>
								<p>{{allMsg.vendorNum>0?allMsg.vendorNum:'0'}}</p>
								<p>入驻商家</p>
							</span>
						</div>
					</li>
					<li>
						<div class="list_box">
							<span>
								<i class="iconfont" style="color:#65CB99;font-size:32px">&#xe62e;</i>
							</span>
							<span>
								<p>{{countAdvice>0?countAdvice:'0'}}</p>
								<p>留言反馈</p>
							</span>
						</div>
					</li>
				</ul>
			</el-col>
			<el-col :span="24" class="sales_amount">
				<div class="top_style">
					<h4>设备接入</h4>
					<el-button-group class="data_style">
						<el-button
							plain
							size="small"
							:class="btnAccessDevice==0?'btn_style':''"
							@click="getAccessDevice(0)"
						>最近7天</el-button>
						<el-button
							plain
							size="small"
							:class="btnAccessDevice==1?'btn_style':''"
							@click="getAccessDevice(1)"
						>最近30天</el-button>
					</el-button-group>
				</div>
				<div class="histogram_style">
					<h4 style="text-align: center;line-height:52px;">
						<span style="font-size:12px;color:#999999;" v-if="searchValue!=''">（{{searchValue}}）</span>
					</h4>
					<div id="access_device" style="width:100%;height:284px;"></div>
				</div>
			</el-col>
			<el-col :span="24" class="sales_amount">
				<div class="top_style">
					<h4>销售额</h4>
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
					</el-button-group>
				</div>
				<div class="histogram_style">
					<h4 style="text-align: center;line-height:52px;">
						<span>销售额趋势</span>
					</h4>
					<div id="sale_money" style="width:100%;height:284px;"></div>
				</div>
			</el-col>
		</el-col>
		<el-col :span="6" style="padding:0 0 0 8px;">
			<el-col :span="24" style="background-color: white;margin-top: 12px;">
				<el-col :span="24" class="top_lists">
					<h4>热门物联产品</h4>
					<span>
						<i class="iconfont" @click="showTop5(1)">&#xe6b6;</i>
						<i class="iconfont" @click="showTop10(1)">&#xe6b7;</i>
					</span>
				</el-col>
				<el-col :span="24" class="table_case">
					<el-col :span="24" class="table_title">
						<el-col :span="5" style="text-align:center;">排名</el-col>
						<el-col :span="12">名称</el-col>
						<el-col :span="7">绑定数</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col :span="24" v-for="(item, index) in saleTOP5" :key="index" v-show="top5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col
								:span="12"
								style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;"
								:title="item.deviceName"
							>{{item.deviceName}}</el-col>
							<el-col :span="7" style="font-family: Roboto;">{{item.count}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in saleTOP10" :key="item.index" v-show="top10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col
								:span="12"
								style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;"
								:title="item.deviceName"
							>{{item.deviceName}}</el-col>
							<el-col :span="7" style="font-family: Roboto;">{{item.count}}</el-col>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" style="background-color: white;margin-top: 17px;">
				<el-col :span="24" class="top_lists">
					<h4>本月销售排行</h4>
					<span>
						<i class="iconfont" @click="showTop5(2)">&#xe6b6;</i>
						<i class="iconfont" @click="showTop10(2)">&#xe6b7;</i>
					</span>
				</el-col>
				<el-col :span="24" class="table_case">
					<el-col :span="24" class="table_title">
						<el-col :span="5" style="text-align:center;">排名</el-col>
						<el-col :span="12">商品</el-col>
						<el-col :span="7">销售额</el-col>
					</el-col>
					<el-col :span="24" class="table_content">
						<el-col :span="24" v-for="(item, index) in menuTop5" :key="index" v-show="hotMenutop5">
							<el-col :span="5" style="text-align:center;">
								<span :class="index<3?'sort_style2':'sort_style1'">{{index+1}}</span>
							</el-col>
							<el-col :span="12">{{item.enterpriseName}}</el-col>
							<el-col :span="7" style="font-family: Roboto;">{{item.sumAmount/100}}</el-col>
						</el-col>
						<el-col :span="24" v-for="(item, index) in menuTop10" :key="item.index" v-show="hotMenutop10">
							<el-col :span="5" style="text-align:center;">
								<span class="sort_style1">{{index+6}}</span>
							</el-col>
							<el-col :span="12">{{item.enterpriseName}}</el-col>
							<el-col :span="7" style="font-family: Roboto;">{{item.sumAmount/100}}</el-col>
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
							<el-col :span="7" style="font-family: Roboto;">{{item.num}}</el-col>
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
							<el-col :span="7" style="font-family: Roboto;">{{item.num}}</el-col>
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
			btnAccessDevice: 0,
			saleTOP5: [],
			saleTOP10: [],
			menuTop5: [],
			menuTop10: [],
			saleCookbooktop5: [],
			saleCookbooktop10: [],
			allMsg: {},
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
			reply: "",
			userCount: "",
			countAdvice: ""
		};
	},
	mounted() {},
	methods: {
		getMsg() {
			// let me = this;
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/workbench/getData",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.allMsg = result.data.data;
					}
				},
				({ type, info }) => {}
			);
		},
		getSaleMoney(i) {
			this.btnStyleShow = i;
			let condition = i == 0 ? "week" : "month";
			this.Axios(
				{
					params: {
						condition: condition
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/Workbench/productNumTrend",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						let time = result.data.data.map(item => {
							return item.time;
						});
						let count = result.data.data.map(item => {
							return item.count;
						});
						let todayAmount = result.data.data.map(item => {
							return item.todayAmount / 100;
						});

						let data = result.data.data;

						let myChart = echarts.init(document.getElementById("sale_money"));
						let a = "";
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
								formatter: function(params) {
									let name = params[0].name.replace("日", "");
									let item = data
										.map(i => {
											return i.time;
										})
										.map(j => {
											return j.slice(j.indexOf("-") + 1);
										});
									let index;
									for (let i = 0; i < item.length; i++) {
										if (item[i] == name) {
											index = i;
										}
									}
									let topTip =
										"<div style='padding:0 8px;'>" +
										data[index].time +
										"<br/>" +
										"订单数量：" +
										data[index].count +
										"<br/>" +
										"销售额：" +
										data[index].todayAmount / 100 +
										"</div>";
									return topTip;
								}
							},
							legend: {
								data: []
							},
							xAxis: {
								data: time.map(item => {
									return item.slice(item.indexOf("-") + 1);
								})
							},
							yAxis: {},
							series: [
								{
									name: "销售额",
									type: "bar",
									data: todayAmount,
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
				},
				({ type, info }) => {}
			);
		},
		handleStyle(index, item) {
			this.activeStyle = index;
			this.messageReply = item;
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
		//销售排行
		getSaleTrend() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/Workbench/enterpriseSalesTrend",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.menuTop5 = result.data.data.slice(0, 5);
						this.menuTop10 = result.data.data.slice(5);
					}
				},
				({ type, info }) => {}
			);
		},
		getHotDevice() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/workbench/hotDevice",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.saleTOP5 = result.data.data.slice(0, 5);
						this.saleTOP10 = result.data.data.slice(5);
					}
				},
				({ type, info }) => {}
			);
		},
		getAccessDevice(i) {
			this.btnAccessDevice = i;
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/workbench/deviceAccessTrend",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.searchValue =
							JSON.parse(JSON.stringify(result.data.data[0])).time +
							"至" +
							JSON.parse(
								JSON.stringify(result.data.data[result.data.data.length - 1])
							).time;
						let xAxisData = result.data.data.map(item => {
							return item.time;
						});
						let yAxisData = result.data.data.map(item => {
							return item.count;
						});
						let allData = result.data.data.map(item => {
							return item.countAll;
						});
						let myChart = echarts.init(
							document.getElementById("access_device")
						);
						let data = result.data.data;
						let option = {
							tooltip: {
								trigger: "axis",
								formatter: function(params) {
									let name = params[0].name;
									let item = data
										.map(i => {
											return i.time;
										})
										.map(j => {
											return j.slice(j.indexOf("-") + 1);
										});
									let index;
									for (let i = 0; i < item.length; i++) {
										if (item[i] == name) {
											index = i;
										}
									}
									let topTip =
										"<div style='padding:0 8px;'>" +
										data[index].time +
										"<br/>" +
										"今日接入数量：" +
										data[index].count +
										"<br/>" +
										"总接入数量：" +
										data[index].countAll +
										"</div>";
									return topTip;
								}
							},
							xAxis: {
								type: "category",
								data: xAxisData.map(item => {
									return item.slice(item.indexOf("-") + 1);
								})
							},
							yAxis: {
								type: "value",
								max:
									Math.max.apply(null, yAxisData) +
									Math.floor(Math.max.apply(null, yAxisData) / 4) +
									1
							},
							series: [
								{
									data: yAxisData,
									type: "line",
									smooth: true,
									label: {
										normal: {
											show: true,
											position: "top"
										}
									},
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
				},
				({ type, info }) => {}
			);
		},
		getMyRecipe() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/myRecipe/hotRecipe",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.saleCookbooktop5 = result.data.data.content.slice(0, 5);
						this.saleCookbooktop10 = result.data.data.content.slice(5);
					}
				},
				({ type, info }) => {}
			);
		},
		getCountAdvice() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/advise/countAdvise",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.countAdvice = result.data.data;
					}
				},
				({ type, info }) => {}
			);
		},
		getCountUser() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-user/userInfo/countUser",
					loadingConfig: {
						target: document.querySelector(".admin_home")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.userCount = result.data.data;
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getMsg();
		this.getSaleMoney(0);
		this.getSaleTrend();
		this.getHotDevice();
		this.getAccessDevice(0);
		this.getCountAdvice();
		this.getCountUser();
		this.getMyRecipe();
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
				text-align: right;
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
			width: 33.33%;
			height: 100px;
			line-height: 100px;
			padding-right: 8px;
			.list_box {
				background-color: white;
				overflow: hidden;
			}
			span {
				display: inline-block;
			}
			span:nth-child(1) {
				width: 36px;
				height: 36px;
				line-height: 36px;
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
					font-family: Roboto;
					cursor: pointer;
					&:hover {
						color: #1cc09f;
						text-decoration: underline;
					}
				}
				p:nth-child(2) {
					color: #999999;
					text-align: right;
				}
			}
		}
		li:nth-child(3n) {
			padding-right: 0px;
			padding-left: 8px;
		}
		li:nth-child(2) {
			padding-right: 4px;
			padding-left: 4px;
		}
		li:nth-child(5) {
			padding-right: 4px;
			padding-left: 4px;
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
						width: 33px;
						margin: auto;
						margin-top: 10px;
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
