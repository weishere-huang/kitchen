<template>
	<div class="product_things_audit">
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
						<span></span>
					</el-form-item>
					<el-form-item label="产品类型：" prop>
						<span></span>
					</el-form-item>
					<el-form-item label="连网类型：" prop>
						<span></span>
					</el-form-item>
					<el-form-item label="产品描述：" prop>
						<span></span>
					</el-form-item>
					<el-form-item label="产品协议：" prop>
						<span></span>
					</el-form-item>
					<el-form-item label="产品连接示意图：" prop>
						<span></span>
					</el-form-item>
					<el-form-item label="申请时间：" prop>
						<span></span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<div class="top_title">
				<h4>审核</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="审核类型：" prop>
						<el-radio v-model="radio" label="1">通过</el-radio>
						<el-radio v-model="radio" label="2">驳回</el-radio>
					</el-form-item>
					<el-form-item label="审核说明：" prop>
						<el-input type="textarea" rows="4" resize="none" style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label prop>
						<el-button type="primary" size="small">提交审核</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			radio: "1"
		};
	},
	methods: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.product_things_audit {
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
}
</style>