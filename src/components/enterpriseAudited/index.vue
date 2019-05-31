<template>
	<div class="enterprise_audited">
		<div class="bottom_list" :class="[{hide:isHideList}]">
			<div class="top_title">
				<h4>入驻申请</h4>
			</div>
			<div class="table_list">
				<div class="audit_case" v-if="this.userMsg==1">
					<p style="text-align:center;padding-top:90px;">
						<i class="iconfont" style="color:#999;font-size:60px;">&#xe64c;</i>
					</p>
					<p style="text-align:center;font-weight: 600;font-size:16px;">等待审核中...</p>
					<p style="text-align:center;padding-top:8px;">您的资料已成功提交，我们将尽快为您审核，</p>
					<p style="text-align:center;padding-top:8px;">审核结果我们将以短信形式通知您，请注意查收。</p>
				</div>
				<div class="audit_case" v-if="this.userMsg==3">
					<p style="text-align:center;padding-top:90px;">
						<i class="iconfont" style="color:#999;font-size:60px;">&#xe656;</i>
					</p>
					<p style="text-align:center;font-weight: 600;font-size:16px;">抱歉，您的申请已被驳回！</p>
					<el-form label-width="200px">
						<el-form-item label="驳回原因：" style="margin-bottom: 0px;">
							<div style="width:300px;">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
						</el-form-item>
					</el-form>
					<p style="text-align:center;">
						<!-- <el-button type="primary" size="small" style="margin-top:20px;" @click="toEdit">立即修改</el-button> -->
					</p>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isHideList: this.$route.params.id !== undefined ? true : false,
			userMsg: ""
		};
	},
	methods: {
		toEdit() {
			this.$router.push({
				path: "/EnterpriseAuditedIndex/EnterpriseAuditedEdit/" + 121
			});
		}
	},
	created() {
		this.userMsg = JSON.parse(sessionStorage.getItem("user")).state;
		let a = this.$route.matched.find(item => item.name === "AddCookbook")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddCookbook")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
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
.enterprise_audited {
	font-size: 14px;
	color: @font-normal;
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
			overflow: hidden;
			padding: 10px;
			.audit_case {
				width: 600px;
				// border: @border;
				height: 400px;
				margin: auto;
			}
		}
	}
}
</style>