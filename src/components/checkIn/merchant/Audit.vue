<template>
	<div class="merchant_audit">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>申请详情</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="企业名称：" prop>
						<span>{{merchantMsg.name}}</span>
					</el-form-item>
					<el-form-item label="统一社会信用代码：" prop>
						<span>{{merchantMsg.creditCode}}</span>
					</el-form-item>
					<el-form-item label="法人：" prop>
						<span>{{merchantMsg.legalPerson}}</span>
					</el-form-item>
					<el-form-item label="注册地址：" prop>
						<span>{{merchantMsg.address}}</span>
					</el-form-item>
					<el-form-item label="营业范围：" prop>
						<span>{{merchantMsg.businessScope}}</span>
					</el-form-item>
					<el-form-item label="申请人姓名：" prop>
						<span>{{merchantMsg.applicant}}</span>
					</el-form-item>
					<el-form-item label="申请人手机号：" prop>
						<span>{{merchantMsg.phone}}</span>
					</el-form-item>
					<el-form-item label="营业执照：" prop>
						<span class="pic_case">
							<img
								@click="lookPic(merchantMsg.businessLicenseImg)"
								:src="merchantMsg.businessLicenseImg"
								alt
							>
						</span>
					</el-form-item>
					<el-form-item label="法人身份证：" prop>
						<span class="pic_case">
							<img :src="merchantMsg.applicantIDCard" @click="lookPic(merchantMsg.applicantIDCard)" alt>
						</span>
						<span class="pic_case">
							<img
								:src="merchantMsg.applicantIDCardNegative"
								@click="lookPic(merchantMsg.applicantIDCardNegative)"
								alt
							>
						</span>
					</el-form-item>
					<el-form-item label="申请人身份证：" prop>
						<span class="pic_case">
							<img
								:src="merchantMsg.legalPersonIdCard"
								@click="lookPic(merchantMsg.legalPersonIdCard)"
								alt
							>
						</span>
						<span class="pic_case">
							<img
								:src="merchantMsg.legalPersonIdCardNegative"
								@click="lookPic(merchantMsg.legalPersonIdCardNegative)"
								alt
							>
						</span>
					</el-form-item>
				</el-form>
			</div>
			<el-dialog :visible.sync="dialogVisible" class="showPic">
				<img width="100%" :src="dialogImageUrl" alt>
			</el-dialog>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<div class="top_title">
				<h4>审核</h4>
			</div>
			<div class="table_list">
				<el-form
					label-width="200px"
					size="small"
					:model="auditMerchantMsg"
					:rules="auditMerchantMsgRules"
					:inline-message="true"
					ref="auditMerchantMsg"
				>
					<el-form-item label="审核类型：" prop="radio">
						<el-radio v-model="auditMerchantMsg.radio" label="0">通过</el-radio>
						<el-radio v-model="auditMerchantMsg.radio" label="1">驳回</el-radio>
					</el-form-item>
					<el-form-item label="审核说明：" prop="auditOpinion">
						<el-input
							type="textarea"
							rows="4"
							v-model="auditMerchantMsg.auditOpinion"
							resize="none"
							style="width:400px;"
							maxlength="200"
						></el-input>
					</el-form-item>
					<el-form-item label prop>
						<el-button type="primary" size="small" @click="auditMerchant('auditMerchantMsg')">提交审核</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			auditMerchantMsg: {
				auditOpinion: "",
				radio: "0"
			},
			dialogVisible: false,
			dialogImageUrl: "",
			oneProductMsg: {},
			merchantMsg: {
				name: "",
				type: "",
				creditCode: "",
				legalPerson: "",
				address: "",
				businessScope: "",
				applicant: "",
				phone: "",
				businessLicenseImg: "",
				applicantIDCard: "",
				legalPersonIdCard: "",
				password: "",
				applicantIDCardNegative: "",
				legalPersonIdCardNegative: ""
			},
			auditMerchantMsgRules: {
				radio: [{ required: true, message: "请选择审核类型", trigger: "blur" }],
				auditOpinion: []
			}
		};
	},
	methods: {
		lookPic(value) {
			this.dialogVisible = true;
			this.dialogImageUrl = value;
		},
		findOne(id) {
			this.Axios(
				{
					params: { enterpriseId: id },
					url: "/api-enterprise/enterprise/findOneOnAudit",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.merchantMsg = result.data.data;
					this.merchantMsg.businessLicenseImg =
						this.global.imgPath +
						this.merchantMsg.businessLicenseImg.replace("img:", "");
					this.merchantMsg.applicantIDCard =
						this.global.imgPath +
						this.merchantMsg.applicantIDCard.replace("img:", "");
					this.merchantMsg.legalPersonIdCard =
						this.global.imgPath +
						this.merchantMsg.legalPersonIdCard.replace("img:", "");
					this.merchantMsg.applicantIDCardNegative =
						this.global.imgPath +
						this.merchantMsg.applicantIDCardNegative.replace("img:", "");
					this.merchantMsg.legalPersonIdCardNegative =
						this.global.imgPath +
						this.merchantMsg.legalPersonIdCardNegative.replace("img:", "");
				}
			});
		},
		auditMerchant(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let qs = require("qs");
					let data = qs.stringify({
						enterpriseId: this.merchantMsg.id,
						auditOpinion: this.auditMerchantMsg.auditOpinion,
						passOrTurn: this.auditMerchantMsg.radio
					});
					this.Axios(
						{
							params: data,
							url: "/api-enterprise/enterprise/audit",
							type: "post",
							option: {
								successMsg: "审核成功"
							}
						},
						this
					).then(result => {
						if (result.data.code === 200) {
							this.$router.back(-1);
						} else {
							this.$message.error("审核失败");
						}
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {
		this.findOne(this.$route.params.id);
	},
	watch: {
		auditMerchantMsg: {
			handler(newValue, oldValue) {
				if (this.auditMerchantMsg.radio == 1) {
					this.auditMerchantMsgRules.auditOpinion.push({
						required: true,
						message: "请填写审核说明",
						trigger: "blur"
					});
				} else {
					this.auditMerchantMsgRules.auditOpinion.splice(0, 1);
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
.merchant_audit {
	font-size: 14px;
	color: @font-normal;
	.top_list {
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
			.top_search {
				width: 400px;
				float: right;
			}
		}
		.table_list {
			overflow: hidden;
			padding: 10px;
			.pic_case {
				display: inline-block;
				width: 80px;
				height: 80px;
				font-size: 0px;
				cursor: pointer;
				img {
					width: 80px;
					height: 80px;
				}
			}
		}
	}
}
</style>