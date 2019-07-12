<template>
	<div class="prefabricated_recipes">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>出厂预置菜谱</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small" :inline-message="true" style="margin-top: 20px;">
					<el-form-item label="选择菜谱：">
						<el-transfer
							:titles="['所有菜谱', '选中菜谱']"
							filterable
							:filter-method="filterMethod"
							filter-placeholder="请输入菜谱名称"
							:data="cookbookData"
							v-model="value"
						></el-transfer>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :disabled="value.length==0" @click="save">保存并生成</el-button>
						<el-button
							type="primary"
							@click="download"
							:disabled="downloadUrl==''||downloadUrl==null"
						>一键下载</el-button>
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
			value: [],
			cookbookData: [],
			filterMethod(query, item) {
				return item.label.indexOf(query) > -1;
			},
			downloadUrl: ""
		};
	},
	methods: {
		recipeList() {
			//获取未下架的所有菜谱, 支持搜索  page 传-1
			this.Axios(
				{
					params: {
						page: -1,
						keyword: ""
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/recipe/list"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						result.data.data.forEach((item, index) => {
							this.cookbookData.push({
								key: item.id,
								label:
									item.state == 1
										? item.recipeName + "(已下架)"
										: item.recipeName,
								disabled: item.state == 1 ? true : false
							});
						});
					}
				},
				({ type, info }) => {}
			);
		},
		save() {
			let qs = require("qs");
			let data = qs.stringify({
				recipeIds: this.value.join(",")
			});
			this.Axios(
				{
					params: data,
					url: "/api-recipe/preset/save",
					type: "post",
					option: {
						successMsg: "保存成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					console.log(result);
					this.downloadUrl =
						sessionStorage.getItem("presetRecipe") + result.data.data;
				}
			});
		},
		getMsg() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/preset/get"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						console.log(result);
						this.value = result.data.data.recipe.map(item => item.id);
						this.downloadUrl =
							sessionStorage.getItem("presetRecipe") + result.data.data.link;
					}
				},
				({ type, info }) => {}
			);
		},
		download() {
			window.open(this.downloadUrl);
		}
	},
	created() {
		this.recipeList();
		this.getMsg();
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
.prefabricated_recipes {
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
	}
}
</style>
