<template>
	<div class="dialog_script">
		<el-col :span="24" class="serach_case">
			<el-input size="small" style="width:617px;" clearable></el-input>
			<el-button type="primary" size="small" @click="searchItem">搜索</el-button>
		</el-col>
		<el-col :span="24" class="content_case">
			<el-col :span="24" style="padding:12px 0;">
				<span v-if="recentSearch==2">搜索结果：</span>
				<span v-if="recentSearch==1">全部：</span>
			</el-col>
			<el-col :span="24" class="results" style="padding-bottom:16px;height:200px;overflow:scroll;">
				<span
					class="content_item"
					@click="getValue(item)"
					v-for="(item, index) in scriptData"
					:key="index"
				>{{item}}</span>
			</el-col>
			<div class="block" style="margin-top:10px;float:right;margin-bottom:12px;">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-sizes="[15, 30, 100]"
					:page-size="15"
					layout="sizes, prev, pager, next"
					:total="total"
				></el-pagination>
			</div>
		</el-col>
	</div>
</template>
<script>
export default {
	data() {
		return {
			scriptData: [
				"红烧肉",
				"鱼香肉丝",
				"酸菜鱼",
				"鸡公煲",
				"酸辣土豆丝",
				"糖醋里脊",
				"锅包肉",
				"老鸭汤",
				"鱼香茄子"
			],
			recentSearch: 1,
			pageIndex: 1,
			pageSize: 15,
			total: 15
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getServiceList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getServiceList();
		},
		getValue(val) {
			let params = { value: val, isHide: false };
			this.$emit("dialogScriptHide", params);
		},
		searchItem() {
			this.recentSearch = 2;
		}
	},
	created() {
		// this.scriptData = this.recentSearch;
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
.dialog_script {
	font-size: 14px;
	color: @font-normal;
	.results {
		// display: flex;
		// flex-wrap: wrap;
		// align-content: center;
		// justify-content: space-between;
	}
	.content_item {
		border: 1px solid @main-color;
		display: inline-block;
		line-height: 28px;
		height: 30px;
		width: 102px;
		color: @main-color;
		border-radius: 20px;
		text-align: center;
		margin-bottom: 12px;
		cursor: pointer;
		&:hover {
			background-color: @main-color;
			color: white;
		}
	}
	.content_item:not(:nth-child(6n)) {
		margin-right: 12px;
	}
}
</style>
