<template>
	<div class="admin_product_things_audit">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>产品详情</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="产品名称：" prop>
						<span>{{oneProductMsg.deviceName}}</span>
					</el-form-item>
					<el-form-item label="产品类型：" prop>
						<span>{{oneProductMsg.deviceCateName}}</span>
					</el-form-item>
					<el-form-item label="申请设备厂商：" prop>
						<span>{{oneProductMsg.enterpriseName}}</span>
					</el-form-item>
					<el-form-item label="连网类型：" prop>
						<span>{{oneProductMsg.networkType==0?'WIFI':oneProductMsg.networkType==1?'4G':oneProductMsg.networkType==2?'NB-loT':oneProductMsg.networkType==3?'LoRa':oneProductMsg.networkType==4?'ZigBee':oneProductMsg.networkType==5?'以太网':'其他'}}</span>
					</el-form-item>
					<el-form-item label="产品描述：" prop>
						<span>{{oneProductMsg.introduce}}</span>
					</el-form-item>
					<el-form-item label="产品协议：" prop>
						<span
							class="pic_style"
							v-for="(item, index) in oneProductMsg.agreement"
							:key="index"
							@click="look(global.imgPath + item.url.replace('img:', ''))"
						>{{item.name}}</span>
					</el-form-item>
					<el-form-item label="产品连接示意图：" prop>
						<span class="pic_style" @click="look(oneProductMsg.linkImg)">{{oneProductMsg.linkName}}</span>
					</el-form-item>
					<el-form-item label="申请时间：" prop>
						<span>{{oneProductMsg.gmtCreate}}</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<div class="top_title">
				<h4>审核</h4>
			</div>
			<div class="table_list">
				<el-form
					label-width="200px"
					size="small"
					:model="auditProduct"
					:rules="auditProductRules"
					ref="auditProduct"
					:inline-message="true"
				>
					<el-form-item
						label="上次驳回原因："
						prop
						v-if="oneProductMsg.auditOpinion!=''&&oneProductMsg.auditOpinion!=null"
					>
						<span style="color:red">{{oneProductMsg.auditOpinion}}</span>
					</el-form-item>
					<el-form-item label="审核类型：" prop="radio">
						<el-radio v-model="auditProduct.radio" :label="1">通过</el-radio>
						<el-radio v-model="auditProduct.radio" :label="2">驳回</el-radio>
					</el-form-item>
					<el-form-item label="审核说明：" prop="auditOpinion">
						<el-input
							type="textarea"
							rows="4"
							v-model="auditProduct.auditOpinion"
							resize="none"
							style="width:400px;"
							maxlength="200"
						></el-input>
					</el-form-item>
					<el-form-item label prop>
						<el-button type="primary" size="small" @click="setAuditProduct('auditProduct')">提交审核</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" class="showPic">
			<img width="100%" :src="dialogImageUrl" alt>
		</el-dialog>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			dialogVisible: false,
			dialogImageUrl: "",
			oneProductMsg: {},
			auditProduct: {
				auditOpinion: "",
				radio: 1
			},
			auditProductRules: {
				radio: [{ required: true, message: "请选审核类型", trigger: "blur" }],
				auditOpinion: []
			}
		};
	},
	methods: {
		look(a) {
			this.dialogImageUrl = a;
			this.dialogVisible = true;
		},
		findOne(id) {
			this.Axios(
				{
					params: { id: id },
					url: "/api-enterprise/device/auditone",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result);
				if (result.data.code === 200) {
					this.oneProductMsg = result.data.data;
					// this.oneProductMsg.deviceCateName = JSON.parse(
					// 	this.oneProductMsg.deviceCateName
					// ).join("--");
					this.oneProductMsg.agreement = JSON.parse(
						this.oneProductMsg.agreement
					);
					this.oneProductMsg.linkName = this.oneProductMsg.linkImg.substring(
						this.oneProductMsg.linkImg.lastIndexOf("/") + 1
					);
					this.oneProductMsg.linkImg =
						this.global.imgPath +
						this.oneProductMsg.linkImg.replace("img:", "");
				}
			});
		},
		setAuditProduct(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let qs = require("qs");
					let data = qs.stringify({
						auditObjectId: this.oneProductMsg.id,
						auditorId: JSON.parse(sessionStorage.getItem("user")).employeeId,
						auditObjectName: this.oneProductMsg.deviceName,
						auditOpinion: this.auditProduct.auditOpinion,
						state: this.auditProduct.radio
					});
					this.Axios(
						{
							params: data,
							url: "/api-enterprise/device/audit",
							type: "post",
							option: {
								successMsg: "审核成功"
							}
						},
						this
					).then(result => {
						console.log(result);
						if (result.data.code === 200) {
							this.$router.back(-1);
							this.reload();
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
		auditProduct: {
			handler(newValue, oldValue) {
				if (this.auditProduct.radio == 2) {
					this.auditProductRules.auditOpinion.push({
						required: true,
						message: "请填写审核说明",
						trigger: "blur"
					});
				} else {
					this.auditProductRules.auditOpinion.splice(0, 1);
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
.admin_product_things_audit {
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
		}
	}
	.pic_style {
		color: #1cc09f;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
}
</style>