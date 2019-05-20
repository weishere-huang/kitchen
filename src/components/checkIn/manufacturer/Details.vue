<template>
	<div class="manufacturer_details">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>申请详情</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="审核状态：" prop>
						<span>{{ manufacturerMsg.auditState==1?'待审核':manufacturerMsg.auditState==2?"已通过":"已驳回" }}</span>
						<span
							:style="{color:manufacturerMsg.auditState==3?'red':''}"
							v-if="manufacturerMsg.enterpriseAuditRecordDOS.auditOpinion!=''||null"
						>（{{manufacturerMsg.enterpriseAuditRecordDOS.auditOpinion}}）</span>
					</el-form-item>
					<el-form-item label="企业名称：" prop>
						<span>{{manufacturerMsg.name}}</span>
					</el-form-item>
					<el-form-item label="统一社会信用代码：" prop>
						<span>{{manufacturerMsg.creditCode}}</span>
					</el-form-item>
					<el-form-item label="法人：" prop>
						<span>{{manufacturerMsg.legalPerson}}</span>
					</el-form-item>
					<el-form-item label="注册地址：" prop>
						<span>{{manufacturerMsg.address}}</span>
					</el-form-item>
					<el-form-item label="营业范围：" prop>
						<span>{{manufacturerMsg.businessScope}}</span>
					</el-form-item>
					<el-form-item label="申请人姓名：" prop>
						<span>{{manufacturerMsg.applicant}}</span>
					</el-form-item>
					<el-form-item label="申请人手机号：" prop>
						<span>{{manufacturerMsg.phone}}</span>
					</el-form-item>
					<el-form-item label="营业执照：" prop>
						<span class="pic_case">
							<img
								@click="lookPic(manufacturerMsg.businessLicenseImg)"
								:src="manufacturerMsg.businessLicenseImg"
								alt
							>
						</span>
					</el-form-item>
					<el-form-item label="法人身份证：" prop>
						<span class="pic_case">
							<img
								:src="manufacturerMsg.applicantIDCard"
								@click="lookPic(manufacturerMsg.applicantIDCard)"
								alt
							>
						</span>
						<span class="pic_case">
							<img
								:src="manufacturerMsg.applicantIDCardNegative"
								@click="lookPic(manufacturerMsg.applicantIDCardNegative)"
								alt
							>
						</span>
					</el-form-item>
					<el-form-item label="申请人身份证：" prop>
						<span class="pic_case">
							<img
								:src="manufacturerMsg.legalPersonIdCard"
								@click="lookPic(manufacturerMsg.legalPersonIdCard)"
								alt
							>
						</span>
						<span class="pic_case">
							<img
								:src="manufacturerMsg.legalPersonIdCardNegative"
								@click="lookPic(manufacturerMsg.legalPersonIdCardNegative)"
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
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			dialogVisible: false,
			dialogImageUrl: "",
			auditOpinion: "",
			radio: "1",
			manufacturerMsg: {
				enterpriseAuditRecordDOS: []
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
					url: "/api-enterprise/enterprise/findOne",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result);
				if (result.data.code === 200) {
					this.manufacturerMsg = result.data.data;
					this.manufacturerMsg.enterpriseAuditRecordDOS =
						result.data.data.enterpriseAuditRecordDOS[
							result.data.data.enterpriseAuditRecordDOS.length - 1
						];
					this.manufacturerMsg.businessLicenseImg =
						this.global.imgPath +
						this.manufacturerMsg.businessLicenseImg.replace("img:", "");
					this.manufacturerMsg.applicantIDCard =
						this.global.imgPath +
						this.manufacturerMsg.applicantIDCard.replace("img:", "");
					this.manufacturerMsg.legalPersonIdCard =
						this.global.imgPath +
						this.manufacturerMsg.legalPersonIdCard.replace("img:", "");
					this.manufacturerMsg.applicantIDCardNegative =
						this.global.imgPath +
						this.manufacturerMsg.applicantIDCardNegative.replace("img:", "");
					this.manufacturerMsg.legalPersonIdCardNegative =
						this.global.imgPath +
						this.manufacturerMsg.legalPersonIdCardNegative.replace("img:", "");
				}
			});
		}
	},
	created() {
		this.findOne(this.$route.params.id);
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
.manufacturer_details {
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
