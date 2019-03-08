<template>
	<div class="tree_case">
		<el-tree
			:data="data"
			:props="defaultProps"
			@node-click="handleNodeClick"
			default-expand-all
			:expand-on-click-node="false"
		></el-tree>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: [
				{
					label: "一级 1",
					children: [
						{
							label: "二级 1-1",
							children: [
								{
									label: "三级 1-1-1"
								}
							]
						}
					]
				},
				{
					label: "一级 2",
					children: [
						{
							label: "二级 2-1",
							children: [
								{
									label: "三级 2-1-1"
								}
							]
						},
						{
							label: "二级 2-2",
							children: [
								{
									label: "三级 2-2-1"
								}
							]
						}
					]
				},
				{
					label: "一级 3",
					children: [
						{
							label: "二级 3-1",
							children: [
								{
									label: "三级 3-1-1"
								}
							]
						},
						{
							label: "二级 3-2",
							children: [
								{
									label: "三级 3-2-1"
								}
							]
						}
					]
				}
			],
			defaultProps: {
				children: "children",
				label: "label"
			}
		};
	},
	methods: {
		handleNodeClick(data) {
			this.$emit("handlechange", data);
		}
	}
};
</script>
<style lang="less">
.tree_case {
	.el-tree-node__content:hover {
		background-color: #1cc09f;
	}
}
</style>
