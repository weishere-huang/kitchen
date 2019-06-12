<template>
	<div class="details">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
			<div style="float:right;">
				<el-button
					permCode="supplierOrder_detail_lookup.supplierOrder_detai_send"
					banType="disable"
					size="small"
					type="primary"
					@click="dialogSend=true"
					v-if="orderDetails.state==1"
				>发货</el-button>
				<!-- <el-button
					permCode="supplierOrder_detail_lookup.supplierOrder_detai_pay"
					banType="disable"
					size="small"
					type="primary"
					@click="dialogPay=true"
					v-if="orderDetails.platformState==0"
				>付款</el-button>-->
				<el-button
					permCode="supplierOrder_detail_lookup.supplierOrder_detai_schedule"
					banType="disable"
					size="small"
					type="primary"
					@click="dialogClose=true"
					v-if="orderDetails.state==0"
				>关闭</el-button>
				<!-- <el-button size="small" type="primary" @click="dialogPlan=true">进度</el-button> -->
				<el-button size="small" type="primary" @click="toPrintOrder">打印订单</el-button>
			</div>
			<el-dialog
				title="发货提示"
				:visible.sync="dialogSend"
				width="600px"
				:close-on-click-modal="false"
				top="30vh"
			>
				<!-- <span style="line-height:40px;">
					<i class="el-icon-warning" style="color:#FF6600;font-size:18px;"></i>
					发货后不能撤销，您要继续吗？
				</span>-->
				<el-form
					label-width="120px"
					style="padding-top:16px;"
					:model="shipments"
					:rules="shipmentsRules"
					ref="shipments"
				>
					<el-form-item label="快递公司：" prop="name">
						<el-select
							type="text"
							style="width:99%"
							v-model="shipments.name"
							clearable
							filterable
							ref="shipmentsName"
							placeholder="请选择快递公司"
						>
							<el-option
								v-for="(item, index) in expressCompany"
								:key="index"
								:value="item.value"
								:label="item.label"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="运单号：" prop="number">
						<el-input
							type="text"
							style="width:99%"
							v-model.trim="shipments.number"
							placeholder="请输入快递运单号"
							maxlength="30"
						></el-input>
					</el-form-item>
					<el-form-item label="备注：" prop="comment">
						<el-input
							type="textarea"
							rows="3"
							resize="none"
							style="width:99%"
							v-model="shipments.comment"
							placeholder="请输入备注"
							maxlength="200"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="closeCancel(2)" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="sendShipments('shipments')">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="付款" :visible.sync="dialogPay" width="500px" :close-on-click-modal="false">
				<el-form label-width="85px" style="padding-top:16px;">
					<el-form-item label="操作说明：" style="margin-bottom:0px;">
						<el-input
							type="textarea"
							rows="5"
							style="width:99%"
							v-model="payOI"
							placeholder="请输入说明文字，不少于五个字"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogPay = false" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="payOrder">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="关闭" :visible.sync="dialogClose" width="500px" :close-on-click-modal="false">
				<el-form label-width="85px" style="padding-top:16px;">
					<el-form-item label="操作说明：" style="margin-bottom:0px;">
						<el-input
							type="textarea"
							rows="5"
							style="width:99%"
							v-model="closeOI"
							placeholder="请输入说明文字，不少于五个字"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="closeCancel(1)" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="closeOrder" :disabled="closeOI==''">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="进度" :visible.sync="dialogPlan" width="500px" :close-on-click-modal="false">
				<div style="margin-top:16px;height: 200px;overflow: scroll;">
					<ul class="plan_case">
						<li>
							<span>
								<i class="iconfont">&#xe758;</i>订单创建成功
							</span>
							<span style="float:right;padding-right:12px; ">{{orderDetails.gmtCreate}}</span>
						</li>
					</ul>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogPlan = false" plain>取 消</el-button>
					<el-button size="small" type="primary" @click="dialogPlan = false">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>收货人信息</h4>
			</div>
			<div class="table_list">
				<el-col :span="8" class="form_case">
					<el-form label-width="200px">
						<el-form-item label="收货人：">
							<!-- <span>庄先生</span> -->
							<span>{{orderDetails.address.consignee+(orderDetails.address.gender==1?"先生":"女士")}}</span>
						</el-form-item>
						<el-form-item label="手机号：">
							<!-- <span>13608253396</span> -->
							<span>{{orderDetails.address.phone}}</span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16" class="form_case">
					<el-form label-width="30%">
						<el-form-item label="收货地址：">
							<!-- <span>四川省 遂宁市 大英县 蓬莱镇 蓬乐街246号</span> -->
							<span>{{orderDetails.address.area+orderDetails.address.address}}</span>
						</el-form-item>
						<el-form-item label="快递运单号：">
							<span>{{orderDetails.waybillNo==''||orderDetails.waybillNo==null?'--':orderDetails.waybillNo}}</span>
							<a
								v-if="orderDetails.waybillNo!=''&&orderDetails.waybillNo!=null"
								:href="url()"
								style="color:#1cc09f;cursor: pointer;"
								target="_back"
							>状态跟踪></a>
							<!-- <span>{{sendTime}}</span> -->
							<!-- <span style="color:#1cc09f">状态跟踪</span> -->
						</el-form-item>
					</el-form>
				</el-col>
			</div>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>订单信息</h4>
			</div>
			<div class="table_list">
				<el-col :span="8" class="form_case">
					<el-form label-width="200px">
						<el-form-item label="订单编号：">
							<span>{{orderDetails.orderNo}}</span>
							<!-- <span>1888238410129</span> -->
						</el-form-item>
						<el-form-item label="下单用户：">
							<span>{{orderDetails.userPhone}}</span>
							<!-- <span>13608253396</span> -->
						</el-form-item>
						<el-form-item label="商品总金额：">
							<!-- <span style="font-weight: 600;">¥ 158</span> -->
							<!-- <span>（含配送费 12元）</span> -->
							<span style="font-weight: 600;">¥ {{orderDetails.itemAmount/100}}</span>
							<span>（含配送费 {{orderDetails.postFee/100}}元）</span>
						</el-form-item>
						<el-form-item label="- 优惠：">
							<span>¥ {{orderDetails.redPackageAmount/100+orderDetails.couponAmount/100==0?"--":orderDetails.redPackageAmount/100+orderDetails.couponAmount/100}}</span>

							<span
								v-if="(orderDetails.redPackageAmount!=null&&orderDetails.redPackageAmount!='')||(orderDetails.couponAmount!=null&&orderDetails.couponAmount!='')"
							>
								（
								<span
									v-if="orderDetails.redPackageAmount!=null&&orderDetails.redPackageAmount!=''"
								>红包￥{{orderDetails.redPackageAmount/100}}</span>
								<span
									v-if="orderDetails.couponAmount!=null&&orderDetails.couponAmount!=''"
								>优惠券￥{{orderDetails.couponAmount/100}}</span> ）
							</span>
						</el-form-item>
						<el-form-item label="实付：">
							<!-- <span style="font-weight: 600;">¥ 130</span> -->
							<span style="font-weight: 600;">¥ {{orderDetails.realAmount/100}}</span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16" class="form_case">
					<el-form label-width="30%">
						<el-form-item label="订单状态：">
							<span style="color:#FF6600" v-if="orderDetails.state==0">待付款</span>
							<span style="color:#008000" v-if="orderDetails.state==1">待发货</span>
							<span style="color:#3399FF" v-if="orderDetails.state==2">待收货</span>
							<span style="color:#333333" v-if="orderDetails.state==4">已完成</span>
							<span style="color:#999999" v-if="orderDetails.state==3">已关闭</span>
							<!-- <span style="color:#3399FF">待收货</span> -->
						</el-form-item>
						<el-form-item label="支付方式：">
							<span>{{orderDetails.payType==null||""?'--':orderDetails.payType}}</span>
							<!-- <span>支付宝</span> -->
						</el-form-item>
						<el-form-item label="下单时间：">
							<!-- <span>2019-5-20 16:30:45</span> -->
							<span>{{orderDetails.gmtCreate==null||""?'--':orderDetails.gmtCreate}}</span>
						</el-form-item>
						<el-form-item label="付款时间：">
							<!-- <span>2019-5-20 16:34:25</span> -->
							<span>{{orderDetails.payTime==null||""?"--":orderDetails.payTime}}</span>
						</el-form-item>
						<el-form-item label="发货时间：">
							<!-- <span>2019-5-20 17:23:20</span> -->
							<span>{{orderDetails.shipTime==null||""?"--":orderDetails.shipTime}}</span>
						</el-form-item>
					</el-form>
				</el-col>
			</div>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>商品信息</h4>
			</div>
			<div class="table_list">
				<table-list
					:selectShow="false"
					:column="items"
					:data="orderDetails.productDOS"
					:rowDblclick="getRow"
					:handleSelectionChange="handleSelectionChange"
				></table-list>
				<div class="total">
					<span style=" font-weight: 700;font-size:16px;">
						合计：￥{{orderDetails.itemAmount/100}}
						<span
							style=" font-weight:0;font-size:14px;"
						>（含运费{{orderDetails.postFee/100}}元）</span>
					</span>
				</div>
			</div>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>操作记录</h4>
			</div>
			<div class="table_list">
				<el-col :span="24">
					<div class="table_list">
						<table-list
							:selectShow="false"
							:column="column"
							:data="tableData1"
							:rowDblclick="getRow"
							:handleSelectionChange="handleSelectionChange"
						></table-list>
					</div>
				</el-col>
			</div>
		</div>
	</div>
</template>
<script>
import tableList from "../public/table";
let expressCompany = [
	{ value: "aae", label: "aae全球专递" },
	{ value: "anjie", label: "安捷快递" },
	{ value: "anxindakuaixi", label: "安信达快递" },
	{ value: "biaojikuaidi", label: "彪记快递" },
	{ value: "bht", label: "bht" },
	{ value: "baifudongfang", label: "百福东方国际物流" },
	{ value: "coe", label: "中国东方（COE）" },
	{ value: "changyuwuliu", label: "长宇物流" },
	{ value: "datianwuliu", label: "大田物流" },
	{ value: "debangwuliu", label: "德邦物流" },
	{ value: "dhl", label: "dhl" },
	{ value: "dpex", label: "dpex" },
	{ value: "dsukuaidi", label: "d速快递" },
	{ value: "disifang", label: "递四方" },
	{ value: "ems", label: "ems快递" },
	{ value: "fedex", label: "fedex（国外）" },
	{ value: "feikangda", label: "飞康达物流" },
	{ value: "fenghuangkuaidi", label: "凤凰快递" },
	{ value: "feikuaida", label: "飞快达" },
	{ value: "guotongkuaidi", label: "国通快递" },
	{ value: "ganzhongnengda", label: "港中能达物流" },
	{ value: "guangdongyouzhengwuliu", label: "广东邮政物流" },
	{ value: "gongsuda", label: "共速达" },
	{ value: "huitongkuaidi", label: "汇通快运" },
	{ value: "hengluwuliu", label: "恒路物流" },
	{ value: "huaxialongwuliu", label: "华夏龙物流" },
	{ value: "haihongwangsong", label: "海红" },
	{ value: "haiwaihuanqiu", label: "海外环球" },
	{ value: "jiayiwuliu", label: "佳怡物流" },
	{ value: "jinguangsudikuaijian", label: "京广速递" },
	{ value: "jixianda", label: "急先达" },
	{ value: "jjwl", label: "佳吉物流" },
	{ value: "jymwl", label: "加运美物流" },
	{ value: "jindawuliu", label: "金大物流" },
	{ value: "jialidatong", label: "嘉里大通" },
	{ value: "jykd", label: "晋越快递" },
	{ value: "kuaijiesudi", label: "快捷速递" },
	{ value: "lianb", label: "联邦快递（国内）" },
	{ value: "lianhaowuliu", label: "联昊通物流" },
	{ value: "longbanwuliu", label: "龙邦物流" },
	{ value: "lijisong", label: "立即送" },
	{ value: "lejiedi", label: "乐捷递" },
	{ value: "minghangkuaidi", label: "民航快递" },
	{ value: "meiguokuaidi", label: "美国快递" },
	{ value: "menduimen", label: "门对门" },
	{ value: "ocs", label: "OCS" },
	{ value: "peisihuoyunkuaidi", label: "配思货运" },
	{ value: "quanchenkuaidi", label: "全晨快递" },
	{ value: "quanfengkuaidi", label: "全峰快递" },
	{ value: "quanjitong", label: "全际通物流" },
	{ value: "quanritongkuaidi", label: "全日通快递" },
	{ value: "quanyikuaidi", label: "全一快递" },
	{ value: "rufengda", label: "如风达" },
	{ value: "santaisudi", label: "三态速递" },
	{ value: "shenghuiwuliu", label: "盛辉物流" },
	{ value: "shentong", label: "申通" },
	{ value: "shunfeng", label: "顺丰" },
	{ value: "sue", label: "速尔物流" },
	{ value: "shengfeng", label: "盛丰物流" },
	{ value: "saiaodi", label: "赛澳递" },
	{ value: "tiandihuayu", label: "天地华宇" },
	{ value: "tiantian", label: "天天快递" },
	{ value: "tnt", label: "tnt" },
	{ value: "ups", label: "ups" },
	{ value: "wanjiawuliu", label: "万家物流" },
	{ value: "wenjiesudi", label: "文捷航空速递" },
	{ value: "wuyuan", label: "伍圆" },
	{ value: "wxwl", label: "万象物流" },
	{ value: "xinbangwuliu", label: "新邦物流" },
	{ value: "xinfengwuliu", label: "信丰物流" },
	{ value: "yafengsudi", label: "亚风速递" },
	{ value: "yibangwuliu", label: "一邦速递" },
	{ value: "youshuwuliu", label: "优速物流" },
	{ value: "youzhengguonei", label: "邮政包裹挂号信" },
	{ value: "youzhengguoji", label: "邮政国际包裹挂号信" },
	{ value: "yuanchengwuliu", label: "远成物流" },
	{ value: "yuantong", label: "圆通速递" },
	{ value: "yuanweifeng", label: "源伟丰快递" },
	{ value: "yuanzhijiecheng", label: "元智捷诚快递" },
	{ value: "yunda", label: "韵达快运" },
	{ value: "yuntongkuaidi", label: "运通快递" },
	{ value: "yuefengwuliu", label: "越丰物流" },
	{ value: "yad", label: "源安达" },
	{ value: "yinjiesudi", label: "银捷速递" },
	{ value: "zhaijisong", label: "宅急送" },
	{ value: "zhongtiekuaiyun", label: "中铁快运" },
	{ value: "zhongtong", label: "中通速递" },
	{ value: "zhongyouwuliu", label: "中邮物流" },
	{ value: "zhongxinda", label: "忠信达" },
	{ value: "zhimakaimen", label: "芝麻开门" }
];
export default {
	inject: ["reload"],
	data() {
		return {
			shipments: {
				name: "",
				number: "",
				comment: ""
			},
			shipmentsRules: {
				name: [
					{ required: true, message: "请选择快递公司", trigger: "change" }
				],
				number: [{ required: true, message: "请填写运单号", trigger: "blur" }]
			},
			expressCompany,
			sendTime: "",
			payOI: "",
			closeOI: "",
			orderDetails: {
				orderMoney: 15800,
				postFee: 1200,
				address: {},
				items: [
					{
						itemName: "素炒花菜",
						itemPrice: "800",
						number: 1
					},
					{
						itemName: "思乡小炒肉",
						itemPrice: "1800",
						number: 2
					},
					{
						itemName: "三药排骨汤",
						itemPrice: "3200",
						number: 1
					},
					{
						itemName: "人参乌鸡汤",
						itemPrice: "7000",
						number: 1
					}
				]
			},
			state: 1,
			dialogSend: false,
			dialogPay: false,
			dialogClose: false,
			dialogPlan: false,
			items: [
				{
					label: "商品名称",
					prop: "productName",
					width: 100
				},
				{
					label: "价格",
					prop: "amount",
					width: 90,
					formatter: function(row, column) {
						return "￥" + row.amount / 100;
					}
				},
				{
					label: "数量",
					prop: "num",
					width: 140
				},
				{
					label: "小计",
					prop: "subtotal",
					width: 120,
					formatter: function(row, column) {
						return (row.subtotal = (row.amount / 100) * row.num);
					}
				}
			],
			tableData: [],
			column: [
				{
					label: "操作时间",
					prop: "gmtCreate",
					width: 140
				},
				{
					label: "操作者",
					prop: "employeeName",
					width: 100
				},
				{
					label: "事件",
					prop: "opera",
					width: 100
				},
				{
					label: "原因",
					prop: "reason",
					width: 220
				}
			],
			tableData1: [
				{
					time: "2019-05-20 17:00:20",
					person: "roulen",
					things: "设置订单状态",
					content: "已发货",
					cause: "支付问题，系统已到账"
				}
			]
		};
	},
	methods: {
		closeCancel(a) {
			if (a == 1) {
				this.closeOI = "";
				this.dialogClose = false;
			}
			if (a == 2) {
				this.dialogSend = false;
				this.$refs["shipments"].resetFields();
			}
		},
		url() {
			let url =
				"https://www.kuaidi100.com/chaxun?com=" +
				this.orderDetails.expressPinyin +
				"&nu=" +
				this.orderDetails.waybillNo;
			return url;
		},
		sendShipments(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let qs = require("qs");
					let data = qs.stringify({
						orderId: this.$route.params.id,
						expressPinyin: this.shipments.name,
						expressName: this.$refs.shipmentsName.selectedLabel,
						waybillNo: this.shipments.number,
						remarks: this.shipments.comment
					});
					this.Axios(
						{
							params: data,
							option: {
								successMsg: "发货成功"
							},
							type: "post",
							url: "/api-order/order/orderShip",
							loadingConfig: {
								target: document.querySelector(".details")
							}
						},
						this
					).then(
						result => {
							console.log(result);
							if (result.data.code === 200) {
								this.getDetails(this.$route.params.id);
								this.dialogSend = false;
							}
						},
						({ type, info }) => {}
					);
				} else {
					return false;
				}
			});
		},
		payOrder() {
			if (this.payOI == "") {
				this.$message.error("请填写操作说明");
			} else {
				let qs = require("qs");
				let data = qs.stringify({
					orderId: this.$route.params.id,
					operateReason: this.payOI
				});
				this.Axios(
					{
						params: data,
						option: {
							successMsg: "付款成功"
						},
						type: "post",
						url: "/api-order/order/payOrder",
						loadingConfig: {
							target: document.querySelector(".details")
						}
					},
					this
				).then(
					result => {
						console.log(result);
						if (result.data.code === 200) {
							this.reload();
							this.dialogPay = false;
						}
					},
					({ type, info }) => {}
				);
			}
		},
		closeOrder() {
			if (this.closeOI == "") {
				this.$message.error("请填写操作说明");
			} else {
				let qs = require("qs");
				let data = qs.stringify({
					orderId: this.$route.params.id,
					reason: this.closeOI
				});
				this.Axios(
					{
						params: data,
						option: {
							successMsg: "订单已关闭"
						},
						type: "post",
						url: "/api-order/order/orderClose",
						loadingConfig: {
							target: document.querySelector(".details")
						}
					},
					this
				).then(
					result => {
						console.log(result);
						if (result.data.code === 200) {
							this.reload();
							this.dialogClose = false;
						}
					},
					({ type, info }) => {}
				);
			}
		},
		handleSelectionChange(select) {},
		getRow(row, event) {
			console.log(row);
		},
		toPrintOrder() {
			sessionStorage.setItem("orderIds", this.$route.params.id);
			window.open("/printorder.html", "_blank");
			// window.location.href="/printorder.html"
		},
		getDetails(id) {
			this.Axios(
				{
					params: {
						orderId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-order/order/findOne",
					loadingConfig: {
						target: document.querySelector(".details")
					}
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						// result.data.data.address = JSON.parse(result.data.data.address);
						this.orderDetails = result.data.data;
						this.tableData1 = result.data.data.orderLogs;
						// this.sendTime =
						// 	this.orderDetails.startTime.substring(
						// 		0,
						// 		this.orderDetails.startTime.lastIndexOf(":")
						// 	) +
						// 	"-" +
						// 	this.orderDetails.endTime
						// 		.substring(this.orderDetails.endTime.lastIndexOf(" ") + 1)
						// 		.substring(0, 5);
					}

					// console.log(this.orderDetails);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getDetails(this.$route.params.id);
	},
	components: {
		tableList
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
.details {
	font-size: 14px;
	color: @font-normal;
	.top_list {
		// line-height: 60px;
		background-color: white;
		padding: 10px;
	}
	.bottom_list {
		background-color: white;
		margin-top: 10px;
		padding-bottom: 10px;
		overflow: hidden;
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
			padding: 10px;
			overflow: hidden;
			.total {
				float: right;
				margin-top: 20px;
			}
			.form_case {
				.el-form-item {
					margin-bottom: 0;
					.el-form-item__label,
					.el-form-item__content {
						line-height: 30px;
					}
				}
			}
		}
	}
	.plan_case {
		// height: 200px;
		// overflow: scroll;
		li {
			list-style-type: none;
			// background-color: red;
			height: 30px;
			line-height: 30px;
			i {
				color: @font-subsidiary;
				margin-right: 4px;
			}
		}
		li:nth-child(1) {
			i {
				color: rgb(240, 135, 16);
			}
		}
	}
}
</style>
