<template>
	<div class="system_list">
		<el-col :span="24" class="content_case">
			<el-col :span="24" class="top_title">
				<h4>系统设置</h4>
			</el-col>
			<el-col :span="24">
				<el-form
					size="small"
					label-width="200px"
					style="margin-top:20px;"
					:model="systemMsg"
					ref="systemMsg"
					:rules="systemRules"
					:inline-message="true"
				>
					<el-form-item label="客服热线：" prop="phone">
						<el-tooltip class="item" effect="light" content="作用于App端-意见反馈拨号" placement="right">
							<el-input
								type="text"
								size="small"
								v-model="systemMsg.phone"
								style="width:300px;"
								placeholder="如 0816-6666666"
							></el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="支付平台：" prop="payType">
						<el-checkbox v-model="systemMsg.payType.wechat">
							<img src="../../assets/image/u76.png" alt style="width:60px;">
						</el-checkbox>
						<el-checkbox v-model="systemMsg.payType.alipay">
							<img src="../../assets/image/u77.png" alt style="width:60px;">
						</el-checkbox>
					</el-form-item>
					<el-form-item label="单商品购买上限：" prop="itemLimit">
						<el-tooltip class="item" effect="light" content="单个商品最多能购买多少份，0为不限制" placement="right">
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.itemLimit"
								style="width:300px;"
								placeholder="如20"
							></el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="购物车总商品上限：" prop="carLimit">
						<el-tooltip class="item" effect="light" content="每个订单可购买商品的总数，0为不限制。" placement="right">
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.carLimit"
								style="width:300px;"
								placeholder="如99"
							></el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="支付超时：" prop="payTimeout">
						<el-tooltip
							class="item"
							effect="light"
							content="用户下单后需在设定时间内完成支付，超时后系统自动取消订单。建议15或30分钟。"
							placement="right"
						>
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.payTimeout"
								style="width:300px;"
								placeholder="分钟"
							>
								<template slot="append">分钟</template>
							</el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="用户收货时限：" prop="receiveTimeout">
						<el-tooltip
							class="item"
							effect="light"
							content="若用户未主动确认收货，系统将按设定时间自动收货。建议48小时。"
							placement="right"
						>
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.receiveTimeout"
								style="width:300px;"
								placeholder="小时"
							>
								<template slot="append">小时</template>
							</el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="配送费：" prop="shippingFee">
						<el-tooltip class="item" effect="light" content="需要 ≥ 0" placement="right">
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.shippingFee"
								style="width:100px;"
								placeholder="元"
								step="0.01"
							>
								<template slot="append">元</template>
							</el-input>
						</el-tooltip>
						<el-tooltip class="item" effect="light" content="满多少减免运费" placement="right">
							<el-checkbox v-model="systemMsg.moneyOff">满减运费</el-checkbox>
						</el-tooltip>
						<el-input
							title="满多少减免运费"
							size="small"
							type="number"
							style="width:112px;"
							v-model="systemMsg.allMoney"
							v-if="systemMsg.moneyOff===true"
						>
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="起送金额：" prop="sendMoney">
						<el-tooltip class="item" effect="light" content="当用户购买商品总价大于该设置，才允许下单。需要 ≥ 0" placement="right">
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.sendMoney"
								style="width:300px;"
								placeholder="元"
								step="0.01"
							>
								<template slot="append">元</template>
							</el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="配送日期：" prop="sendTime">
						<el-radio v-model="systemMsg.sendTime" label="1">仅次日</el-radio>
						<el-radio v-model="systemMsg.sendTime" label="2">自动分配</el-radio>
						<span v-if="systemMsg.sendTime==2">
							<el-input
								type="number"
								size="small"
								v-model="systemMsg.retentionTime"
								placeholder="保留时间：小时"
								style="width:116px;"
							>
								<template slot="append">小时</template>
							</el-input>
							<el-tooltip
								class="item"
								effect="light"
								content="商品结算时间+保留时间=用户可选时段范围。【设置保存后，建议到App中核对】"
								placement="right"
							>
								<i class="el-icon-warning" style="color:#1cc09f"></i>
							</el-tooltip>
						</span>
					</el-form-item>
					<el-form-item label="配送时段1：" prop="timeFrame1">
						<el-time-picker
							is-range
							v-model="systemMsg.timeFrame1"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围"
							value-format="HH-mm"
							format="HH:mm"
							size="small"
							style="width:300px;"
						></el-time-picker>
					</el-form-item>
					<el-form-item label="配送时段2：" prop="timeFrame2">
						<el-time-picker
							is-range
							v-model="systemMsg.timeFrame2"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围"
							value-format="HH-mm"
							format="HH:mm"
							size="small"
							style="width:300px;"
						></el-time-picker>
					</el-form-item>
					<el-form-item label="配送时段3：" prop="timeFrame3">
						<el-time-picker
							is-range
							v-model="systemMsg.timeFrame3"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围"
							value-format="HH-mm"
							format="HH:mm"
							size="small"
							style="width:300px;"
						></el-time-picker>
					</el-form-item>
					<el-form-item label="配送时段4：" prop="timeFrame4">
						<el-time-picker
							is-range
							v-model="systemMsg.timeFrame4"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围"
							value-format="HH-mm"
							format="HH:mm"
							size="small"
							style="width:300px;"
						></el-time-picker>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="submitForm('systemMsg')">保存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-col>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			systemMsg: {
				sendMoney: null,
				shippingFee: null,
				receiveTimeout: null,
				payTimeout: null,
				carLimit: null,
				itemLimit: null,
				phone: null,
				moneyOff: false,
				payType: {
					wechat: true,
					alipay: true
				},
				sendTime: "1",
				timeFrame1: ["09-00", "18-00"],
				timeFrame2: null,
				timeFrame3: null,
				timeFrame4: null,
				retentionTime: "",
				allMoney: ""
			},
			systemRules: {
				phone: [
					{ required: true, message: "请设置客服热线", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^0\d{2,3}-\d{7,8}$/.test(value) == false) {
								callback(new Error("电话格式不正确"));
							} else {
								callback();
							}
						},
						trigger: ["blur"]
					}
				],
				payType: [
					{ required: true, message: "请设置支付方式", trigger: "change" },
					{
						validator: (rule, value, callback) => {
							if (value.wechat === false && value.alipay === false) {
								callback(new Error("必须选择一种支付方式"));
							} else {
								callback();
							}
						},
						trigger: "change"
					}
				],
				itemLimit: [
					{ required: true, message: "请设置单商品购买上限", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(value) == false) {
								callback(new Error("只能是正整数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				carLimit: [
					{
						required: true,
						message: "请设置购物车总商品上限",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(value) == false) {
								callback(new Error("只能是正整数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				payTimeout: [
					{ required: true, message: "请设置支付超时时限", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/(^[1-9]{1}[0-9]*$)/g.test(value) == false) {
								callback(new Error("只能是正整数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				receiveTimeout: [
					{ required: true, message: "请设置用户收货时限", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(value) == false) {
								callback(new Error("只能是正整数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				shippingFee: [
					{ required: true, message: "请设置配送费", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,2})$/g.test(value) == false) {
								callback(new Error("只能大于或等于0，且只能保留两位小数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				sendMoney: [
					{ required: true, message: "请设置起送金额", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,2})$/g.test(value) == false) {
								callback(new Error("只能大于或等于0，且只能保留两位小数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				sendTime: [
					{ required: true, message: "请设置配送日期", trigger: "blur" }
				],
				timeFrame1: [
					{ required: true, message: "请设置配送时段", trigger: "blur" }
				]
			}
		};
	},
	methods: {
		submitForm(formName) {
			console.log("OK");
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (this.systemMsg.sendTime == 2) {
						if (this.systemMsg.retentionTime == "" || null) {
							this.$message.error("请填写保留时间！");
						} else if (this.systemMsg.moneyOff == true) {
							if (this.systemMsg.allMoney == "" || null) {
								this.$message.error("请填写满减条件！");
							} else {
								this.save();
							}
						} else if (this.systemMsg.moneyOff == false) {
							this.systemMsg.allMoney == "";
							this.save();
						}
					} else if (this.systemMsg.moneyOff == true) {
						if (this.systemMsg.allMoney == "" || null) {
							this.$message.error("请填写满减条件！");
						} else {
							this.save();
						}
					} else {
						this.save();
					}
				} else {
					return false;
				}
			});
		},
		getlist() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/systemconfig/list"
				},
				this
			).then(
				result => {
					// result.data.data.allMoney = JSON.parse(result.data.data.allMoney);
					console.log(result.data);
					if (result.data.code === 200) {
						if (result.data.data.allMoney != null && "") {
							this.systemMsg.moneyOff = true;
							if (result.data.data.allMoney != null && "") {
								this.systemMsg.allMoney = result.data.data.allMoney / 100;
							}
						} else {
							this.systemMsg.allMoney = result.data.data.allMoney / 100;
						}
						this.systemMsg.phone = result.data.data.phone;
						this.systemMsg.shippingFee = result.data.data.shippingFee / 100;
						this.systemMsg.receiveTimeout = result.data.data.receiveTimeout;
						this.systemMsg.payTimeout = result.data.data.payTimeout;
						this.systemMsg.carLimit = result.data.data.carLimit;
						this.systemMsg.itemLimit = result.data.data.itemLimit;
						this.systemMsg.sendMoney = result.data.data.sendMoney / 100;
						this.systemMsg.payType = JSON.parse(result.data.data.payType);
						this.systemMsg.sendTime = result.data.data.sendTime;
						this.systemMsg.timeFrame1 = JSON.parse(result.data.data.timeFrame1);
						this.systemMsg.timeFrame2 = JSON.parse(result.data.data.timeFrame2);
						this.systemMsg.timeFrame3 = JSON.parse(result.data.data.timeFrame3);
						this.systemMsg.timeFrame4 = JSON.parse(result.data.data.timeFrame4);
						this.systemMsg.retentionTime = result.data.data.retentionTime;
					}
				},
				({ type, info }) => {}
			);
		},
		save() {
			if (this.systemMsg.moneyOff == false) {
				this.systemMsg.allMoney = "";
			}
			let qs = require("qs");
			let data = qs.stringify({
				phone: this.systemMsg.phone,
				shippingFee: this.systemMsg.shippingFee,
				receiveTimeout: this.systemMsg.receiveTimeout,
				payTimeout: this.systemMsg.payTimeout,
				carLimit: this.systemMsg.carLimit,
				itemLimit: this.systemMsg.itemLimit,
				sendMoney: this.systemMsg.sendMoney,
				payType: JSON.stringify(this.systemMsg.payType),
				sendTime: this.systemMsg.sendTime,
				timeFrame1: JSON.stringify(this.systemMsg.timeFrame1),
				timeFrame2: JSON.stringify(this.systemMsg.timeFrame2),
				timeFrame3: JSON.stringify(this.systemMsg.timeFrame3),
				timeFrame4: JSON.stringify(this.systemMsg.timeFrame4),
				allMoney: this.systemMsg.allMoney,
				retentionTime: this.systemMsg.retentionTime
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/systemconfig/save",
					type: "post",
					option: {
						successMsg: "系统配置保存成功"
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.reload();
				}
			});
		}
	},
	created() {
		this.getlist();
	},
	watch: {
		systemMsg: {
			handler(newValue, oldValue) {
				if (newValue.sendTime == 1) {
					this.systemMsg.retentionTime = "";
				}
			},
			deep: true
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
.system_list {
	font-size: 14px;
	color: @font-normal;
	.content_case {
		background-color: white;
		// padding: 10px  0;
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
		}
		.el-date-editor .el-range-input {
			width: 35%;
		}
		.el-date-editor .el-range-separator {
			width: 15%;
		}
	}
}
</style>
