<template>
	<div class="store_list">
		<div class="bottom_list">
			<div class="top_title">
				<h4>销售区域</h4>
			</div>
			<div class="table_list">
				<el-col :span="8">
					<el-tree
						:data="data1"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adcode"
						ref="tree1"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data2"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adcode"
						ref="tree2"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data3"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adcode"
						ref="tree3"
					></el-tree>
				</el-col>
			</div>
			<div class="top_list">
				<el-button size="small" type="primary" @click="reload()">
					<i class="el-icon-refresh"></i> 刷新
				</el-button>
				<el-button size="small" type="primary" @click="beforesave">
					<i class="iconfont">&#xe62d;</i> 保存修改
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			data: [],
			data1: [],
			data2: [],
			data3: [],
			defaultProps: {
				children: "children",
				label: "areaName",
				value: "adcode"
			},
			// selectarea:["110000","120000","350000","530000","820000"],
			selectarea: []
		};
	},
	methods: {
		handleNodeClick(data) {
			console.log(data);
		},
		getarea() {
			this.Axios(
				{
					params: {},
					option: {
						successMsg: "销售区域加载完成~"
					},
					type: "get",
					url: "/api-mall/area/list"
				},
				this
			).then(
				result => {
					result.data.data.map(item => {
						this.selectarea.push(item.adCode);
					});
					this.selectarea = JSON.parse(JSON.stringify(this.selectarea));
				},
				({ type, info }) => {}
			);
		},
		beforesave() {
			this.$confirm("确认保存销售区域吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
				center: true
			})
				.then(() => {
					this.savearea();
				})
				.catch(() => {});
		},
		savearea() {
			let arr = [];
			arr = arr
				.concat(this.$refs.tree1.getCheckedKeys())
				.concat(this.$refs.tree2.getCheckedKeys())
				.concat(this.$refs.tree3.getCheckedKeys());
			let qs = require("qs");
			let data = qs.stringify({
				codes: arr.toString()
			});
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-mall/area/save"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$message.success("保存成功");
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// console.log(this.$store.state.getArea);
		this.data = JSON.parse(sessionStorage.getItem("area"))[0].children[0];
		this.data1 = this.data.slice(0, 12);
		this.data2 = this.data.slice(12, 24);
		this.data3 = this.data.slice(24, 34);
		this.getarea();
	},
	components: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.store_list {
	font-size: 14px;
	color: @font-normal;

	.top_list {
		// line-height: 60px;
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
		}
		.table_list {
			overflow: hidden;
			padding: 10px;
			.el-col {
				max-height: 600px;
				overflow: scroll;
			}
		}
	}
}
</style>

