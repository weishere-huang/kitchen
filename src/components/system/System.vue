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
								maxlength="20"
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
					<el-form-item label="用户积分：" prop="scoreopen">
						<el-radio-group v-model="systemMsg.scoreopen">
							<el-radio label="0">开启</el-radio>
							<el-radio label="1">关闭</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="积分比例：" prop="score">
						1元=
						<el-input
							type="number"
							oninput="if(value.length>5)value=value.slice(0,5)"
							style="width:60px;"
							v-model.number="systemMsg.score"
						></el-input>&nbsp;积分&nbsp;&nbsp;&nbsp;&nbsp;签到赠送
						<el-input
							type="number"
							step="0.01"
							oninput="if(value.length>5)value=value.slice(0,5)"
							style="width:60px;"
							v-model.number="systemMsg.register"
						></el-input>&nbsp;积分
					</el-form-item>
					<el-form-item label="评论功能：" prop="comment">
						<el-radio-group v-model="systemMsg.comment">
							<el-radio label="0">开启</el-radio>
							<el-radio label="1">关闭</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="评论审核：" prop="commentaudit">
						<el-radio-group v-model="systemMsg.commentaudit">
							<el-radio label="0">需要</el-radio>
							<el-radio label="1">不需要</el-radio>
						</el-radio-group>
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
				commentaudit: 1,
				comment: 1,
				register: "",
				scoreopen: 1,
				score: "",
				payTimeout: null,
				phone: null,
				moneyOff: false,
				payType: {
					wechat: true,
					alipay: true
				}
			},
			systemRules: {
				commentaudit: [
					{
						required: true,
						message: "请选择评论审核开启或关闭",
						trigger: "change"
					}
				],
				comment: [
					{
						required: true,
						message: "请选择评论功能开启或关闭",
						trigger: "change"
					}
				],
				scoreopen: [
					{
						required: true,
						message: "请选择用户积分开启或关闭",
						trigger: "change"
					}
				],
				score: [
					{
						required: true,
						message: "请输入积分比例",
						trigger: ["blur", "change"]
					},
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(this.systemMsg.score) == false) {
								callback(new Error("积分比例必须是整数"));
							} else if (
								/^\d*(\.?\d{0,0})$/g.test(this.systemMsg.register) == false
							) {
								callback(new Error("签到赠送积分必须是整数"));
							} else {
								callback();
							}
						},
						trigger: ["blur", "change"]
					}
				],
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
				]
			}
		};
	},
	methods: {
		checkTime(date1, date2) {
			date1 = date1.replace(/-/g, "/");
			date2 = date2.replace(/-/g, "/");
			var time1 = new Date(date1).getTime();
			var time2 = new Date(date2).getTime();
			if (time1 > time2) {
				return 1;
			} else if (time1 == time2) {
				return 2;
			} else {
				return 3;
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.save();
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

					if (result.data.code === 200) {
						// this.systemMsg = result.data.data;
						Object.assign(this.systemMsg, result.data.data);
						// if (
						// 	result.data.data.allMoney != null &&
						// 	result.data.data.allMoney != ""
						// ) {
						// 	this.systemMsg.moneyOff = true;
						// 	if (
						// 		result.data.data.allMoney != null &&
						// 		result.data.data.allMoney != ""
						// 	) {
						// 		this.systemMsg.allMoney = result.data.data.allMoney / 100;
						// 	}
						// } else {
						// 	this.systemMsg.allMoney = result.data.data.allMoney / 100;
						// }
						// this.systemMsg.phone = result.data.data.phone;
						// this.systemMsg.shippingFee = result.data.data.shippingFee / 100;
						// this.systemMsg.receiveTimeout = result.data.data.receiveTimeout;
						// this.systemMsg.payTimeout = result.data.data.payTimeout;
						// this.systemMsg.carLimit = result.data.data.carLimit;
						// this.systemMsg.itemLimit = result.data.data.itemLimit;
						// this.systemMsg.sendMoney = result.data.data.sendMoney / 100;
						this.systemMsg.payType = JSON.parse(result.data.data.payType);
						// this.systemMsg.sendTime = result.data.data.sendTime;
						// this.systemMsg.timeFrame1 = JSON.parse(result.data.data.timeFrame1);
						// this.systemMsg.timeFrame2 = JSON.parse(result.data.data.timeFrame2);
						// this.systemMsg.timeFrame3 = JSON.parse(result.data.data.timeFrame3);
						// this.systemMsg.timeFrame4 = JSON.parse(result.data.data.timeFrame4);
						// this.systemMsg.retentionTime = result.data.data.retentionTime;
					}
				},
				({ type, info }) => {}
			);
		},
		save() {
			if (this.systemMsg.moneyOff == false) {
				this.systemMsg.allMoney = null;
			}
			let qs = require("qs");
			let data = qs.stringify({
				phone: this.systemMsg.phone,
				payType: JSON.stringify(this.systemMsg.payType),
				score: this.systemMsg.score,
				register: this.systemMsg.register,
				comment: this.systemMsg.comment,
				commentAudit: this.systemMsg.commentaudit,
				scoreopen: this.systemMsg.scoreopen
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
			handler(newValue, oldValue) {},
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
