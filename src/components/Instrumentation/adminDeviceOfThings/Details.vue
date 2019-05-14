<template>
	<div class="admin_devide_things_details">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>设备详情</h4>
			</div>
			<div class="table_list">
				<el-col :span="8">
					<el-form label-width="200px" size="small">
						<el-form-item label="设备名称/自定义：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="所属产品：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="设备型号：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="设备序号：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="软件版本：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="固件版本：" prop>
							<span></span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="140px" size="small">
						<el-form-item label="用户昵称：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="账号（手机号）：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="接入时间：" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="接入IP" prop>
							<span></span>
						</el-form-item>
						<el-form-item label="最近在线时间" prop>
							<span></span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8" class="on_off">
					<div class="big_circle">
						<div class="small_circle"></div>
					</div>
					<div style="text-align: center;margin-top:20px;">当前状态：开机</div>
				</el-col>
			</div>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<div class="top_title">
				<h4>设备运行记录</h4>
			</div>
			<div class="table_list">
				<el-table
					:data="tableData"
					style="width: 100%"
					size="mini"
					stripe
					tooltip-effect="light"
					:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
				>
					<el-table-column label="记录时间" min-width="200" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.nickName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" min-width="200" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.phone }}</span>
						</template>
					</el-table-column>
					<el-table-column label="运行时长" min-width="100">
						<template slot-scope="scope">
							<span>{{ scope.row.order }}</span>
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
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			total: 0,
			pageIndex: 1,
			pageSize: 10,
			tableData: [
				{
					nickName: "2018-09-12 12:00:00",
					phone: "开机",
					order: "3`45"
				},
				{
					nickName: "2018-09-12 12:00:00",
					phone: "开机",
					order: "3`45"
				},
				{
					nickName: "2018-09-12 12:00:00",
					phone: "开机",
					order: "3`45"
				},
				{
					nickName: "2018-09-12 12:00:00",
					phone: "开机",
					order: "3`45"
				}
			]
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
.admin_devide_things_details {
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
	.on_off {
		padding: 40px 0;
		margin-top: 40px;
		border-left: @border;
	}
	.big_circle {
		width: 60px;
		height: 60px;
		background-color: #cde8c4;
		border-radius: 50%;
		margin: auto;
		padding-top: 10px;

		.small_circle {
			width: 40px;
			height: 40px;
			background-color: #58b43b;
			border-radius: 50%;
			margin: auto;
		}
	}
}
</style>