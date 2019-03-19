<template>
	<div class="add_cookbook">
		<el-col :span="24" class="serach_case">
			<el-input size="small" style="width:617px;" clearable v-model="keyword"></el-input>
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
				>{{item.recipeName}}</span>
			</el-col>
			<div class="block" style="margin-top:10px;float:right;margin-bottom:12px;">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-sizes="[30,60]"
					:page-size="pageSize"
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
			currentPage:1,
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
			pageSize: 30,
			total: null,
			keyword: ""
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
		},
		getValue(val) {
			// console.log(val);
			let params = { value: val, isHide: false };
			this.$emit("dialogCoobookHide", params);
		},
		searchItem() {
			this.recentSearch = 2;
			this.getCookbookList();
		},
		getCookbookList() {
			let data = {
				page: this.pageIndex,
				size: this.pageSize,
				keyword: this.keyword
			};
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/recipe/list",
					loadingConfig: {
						target: document.querySelector(".cookbook_list")
					}
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						this.scriptData = result.data.data.content;
						this.total = result.data.data.totalElement;
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// this.scriptData = this.recentSearch;
		this.getCookbookList();
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
.add_cookbook {
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
