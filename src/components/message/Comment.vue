<template>
	<div class="comment_list">
		<div class="bottom_list">
			<div class="top_title">
				<h4>评价管理</h4>
				<div class="top_search">
					<el-col :span="21" style="padding:0 5px;">
						<el-input
							clearable
							size="small"
							style="width:100%;"
							placeholder="用户名/昵称/IP地址/评论内容关键字"
							v-model="keyword"
						></el-input>
					</el-col>
					<el-col :span="3" style="padding:0 5px;">
						<el-button size="small" plain @click>搜索</el-button>
					</el-col>
				</div>
			</div>
			<div class="table_list">
				<el-table
					:data="tableData"
					style="width: 100%"
					size="mini"
					tooltip-effect="light"
					@selection-change="handleSelectionChange"
					:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
				>
					<el-table-column type="selection" width="30"></el-table-column>
					<el-table-column label="昵称" min-width="120" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column label="类型" min-width="100" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.type }}</span>
						</template>
					</el-table-column>
					<el-table-column label="评论对象" min-width="100">
						<template slot-scope="scope">
							<span>{{ scope.row.cateName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="评论时间" min-width="110" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.cateName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="当前状态" min-width="60">
						<template slot-scope="scope">
							<span>{{ scope.row.cateName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180">
						<template slot-scope="scope">
							<el-button type="text" size="mini" @click.stop.prevent>设为显示</el-button>
							<!-- <el-button type="text" size="mini" @click.stop.prevent>设为隐藏</el-button> -->
							<el-button type="text" size="mini" @click.stop.prevent>详情</el-button>
							<el-popover placement="top" width="180" v-model="scope.row.visible">
								<p style="line-height:32px;text-align:center;">
									<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
								</p>
								<div style="text-align: center; margin: 0">
									<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
									<el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
								</div>
								<el-button slot="reference" type="text">删除</el-button>
							</el-popover>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top:10px;float:right">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="pageIndex"
					:page-sizes="[10, 20,40, 100]"
					:page-size="pageSize"
					layout="sizes, prev, pager, next"
					:total="total"
				></el-pagination>
			</div>
			<div style="margin-top:10px;line-height:32px;padding-left:10px;color:#999999">
				<el-dropdown size="small" trigger="click" @command="handle">
					<el-button type="primary">
						批量操作
						<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="1">批量显示</el-dropdown-item>
						<el-dropdown-item command="2">批量隐藏</el-dropdown-item>
						<el-dropdown-item command="3">批量删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-dialog :close-on-click-modal="false" title="评论详情" :visible.sync="dialogVisible" width="600px">
			<el-form label-width="120px" size="small" style="margin-top:20px;">
				<el-form-item label="用户名：">
					<span></span>
				</el-form-item>
				<el-form-item label="昵称：">
					<span></span>
				</el-form-item>
				<el-form-item label="评论类型：">
					<span></span>
				</el-form-item>
				<el-form-item label="评论对象：">
					<span></span>
				</el-form-item>
				<el-form-item label="评论内容：">
					<span></span>
				</el-form-item>
				<el-form-item label="IP地址：">
					<span></span>
				</el-form-item>
				<el-form-item label="评论时间：">
					<span></span>
				</el-form-item>
				<el-form-item label="当前状态：">
					<span></span>
				</el-form-item>
				<el-form-item label="操作：">
					<el-button plain>设为显示</el-button>
					<el-button plain>设为隐藏</el-button>
					<el-button plain>删除该条</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" size="small">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dialogVisible: false,
			tableData: [
				{
					name: "111"
				}
			],
			pageIndex: 1,
			pageSize: 10,
			keyword: "",
			total: 0
		};
	},
	methods: {
		handle(a) {
			console.log(a);
		},
		handleSelectionChange(selection) {
			console.log(selection);
			// this.orderIds = selection.map(item => {
			// 	return item.id;
			// });
			// console.log(this.orderIds.join(","));
		},
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.pageIndex = val;
		},
		handleDelete(index, rowData) {
			// rowData.visible = false;
			// let qs = require("qs");
			// let datas = qs.stringify({
			// 	id: rowData.id
			// });
			// this.Axios(
			// 	{
			// 		params: datas,
			// 		option: {
			// 			enableMsg: false
			// 		},
			// 		type: "post",
			// 		url: "/api-mall/product/del",
			// 		loadingConfig: {
			// 			target: document.querySelector(".store_list")
			// 		}
			// 	},
			// 	this
			// ).then(
			// 	result => {
			// 		if (result.data.code === 200) {
			// 			this.$message({
			// 				message: "删除成功！",
			// 				type: "success"
			// 			});
			// 			this.foodlist();
			// 		} else {
			// 			this.$message({
			// 				message: result.data.msg,
			// 				type: "error"
			// 			});
			// 		}
			// 	},
			// 	({ type, info }) => {}
			// );
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
.comment_list {
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
			.top_search {
				width: 500px;
				float: right;
			}
		}
		.table_list {
			overflow: hidden;
			padding: 10px;
			.el-input__inner {
				padding: 0;
				border: none;
				&:focus {
					border: 1px solid #1cc09f;
				}
			}
		}
	}
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
	color: #1cc09f;
}
</style>