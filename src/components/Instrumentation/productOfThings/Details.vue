<template>
	<div class="product_things_details">
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
					<el-form-item label="审核状态：" prop>
						<span>{{oneProductMsg.state==0?'待审核':oneProductMsg.state==1?'已通过':'已驳回'}}</span>
					</el-form-item>
					<el-form-item label="审核时间：" prop>
						<span>{{oneProductMsg.auditCreate}}</span>
					</el-form-item>
					<el-form-item label="ProductKey：" prop>
						<span>{{oneProductMsg.deviceKey}}</span>
					</el-form-item>
					<el-form-item label="连网类型：" prop>
						<span>{{oneProductMsg.networkType==0?'WIFI':oneProductMsg.networkType==1?'4G':oneProductMsg.networkType==2?'NB-loT':oneProductMsg.networkType==3?'LoRa':oneProductMsg.networkType==4?'ZigBee':oneProductMsg.networkType==5?'以太网':'其他'}}</span>
					</el-form-item>
					<el-form-item label="接入设备数量：" prop>
						<span>{{oneProductMsg.userCount}}</span>
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
		<el-dialog :visible.sync="dialogVisible" class="showPic">
			<img width="100%" :src="dialogImageUrl" alt>
		</el-dialog>
		<el-dialog width="900px" :visible.sync="dialogVisiblePdf">
			<pdf :src="dialogImageUrl"></pdf>
		</el-dialog>
	</div>
</template>
<script>
import pdf from "../../public/pdf";
export default {
	data() {
		return {
			dialogVisiblePdf: false,
			dialogVisible: false,
			dialogImageUrl: "",
			oneProductMsg: {}
		};
	},
	methods: {
		look(a) {
			this.dialogImageUrl = a;
			if (a.substring(a.lastIndexOf(".") + 1) == "pdf") {
				this.dialogVisiblePdf = true;
			} else {
				this.dialogVisible = true;
			}
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
				if (result.data.code === 200) {
					console.log(result.data.data);
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
		}
	},
	components: {
		pdf
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
.product_things_details {
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