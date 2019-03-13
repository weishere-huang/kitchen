<template>
	<div class="tree_case">
		<el-tree
			:data="data"
			:props="defaultProps"
			@node-click="handleNodeClick"
			:expand-on-click-node="false"
		></el-tree>
		<!-- default-expand-all -->
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [],
			defaultProps: {
				children: "children",
				label: "cateName"
			}
		};
	},
	methods: {
		handleNodeClick(data) {
			this.$emit("handlechange", data);
		},
		getClassifyList() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/recipeCate/listCate"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						let arr = Math.min.apply(
							null,
							result.data.data.map(item => {
								return item.parentNo;
							})
						);
						this.data = this.filterArray(result.data.data, arr);
						// if (this.data == "" || null ) {
						this.data.unshift({
							cateName: "顶级分类",
							cateNo: 0
						});
						// }
					}
				},
				({ type, info }) => {}
			);
		},
		filterArray(data, parent) {
			let vm = this;
			var tree = [];
			var temp;
			for (var i = 0; i < data.length; i++) {
				if (data[i].parentNo == parent) {
					var obj = data[i];
					// temp = this.filterArray(data, data[i].cateNo);
					// if (temp.length > 0) {
					// 	obj.children = temp;
					// }
					tree.push(obj);
				}
			}
			return tree;
		}
	},
	created() {
		this.getClassifyList();
	}
};
</script>
<style lang="less">
.tree_case {
	.el-tree-node__content:hover {
		background-color: #1cc09f;
		color: white;
	}
}
</style>
