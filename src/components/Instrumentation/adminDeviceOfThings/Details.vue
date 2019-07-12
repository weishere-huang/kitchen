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
							<span>{{deviceDetails.name}}</span>
						</el-form-item>
						<el-form-item label="所属产品：" prop>
							<span>{{deviceDetails.deviceName}}</span>
						</el-form-item>
						<el-form-item label="设备型号：" prop>
							<span>{{deviceDetails.deviceModel}}</span>
						</el-form-item>
						<el-form-item label="设备序号：" prop>
							<span>{{deviceDetails.deviceNumber}}</span>
						</el-form-item>
						<el-form-item label="软件版本：" prop>
							<span>{{deviceDetails.softwareVersion}}</span>
						</el-form-item>
						<el-form-item label="固件版本：" prop>
							<span>{{deviceDetails.hardwareVersion}}</span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="140px" size="small">
						<el-form-item label="用户昵称：">
							<span>{{deviceDetails.userName}}</span>
						</el-form-item>
						<el-form-item label="账号（手机号）：">
							<span>{{deviceDetails.phone}}</span>
						</el-form-item>
						<el-form-item label="接入时间：">
							<span>{{deviceDetails.gmtCreate}}</span>
						</el-form-item>
						<el-form-item label="接入IP:">
							<span>{{deviceDetails.interIp}}</span>
						</el-form-item>
						<el-form-item label="最近在线时间:">
							<span>{{deviceDetails.name}}</span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8" class="on_off">
					<div class="icon_case">
						<i
							class="iconfont"
							v-if="deviceDetails.isOnline==0"
							style="font-size:48px;color:#2BABE3"
						>&#xe6b5;</i>
						<i class="iconfont" v-if="deviceDetails.isOnline==1" style="font-size:48px;">&#xe78e;</i>
						<i
							class="iconfont"
							v-if="deviceDetails.state==0"
							style="font-size:48px;color:#70B603"
						>&#xe655;</i>
						<i class="iconfont" v-if="deviceDetails.state==1" style="font-size:48px;">&#xe655;</i>
						<span>
							<i class="iconfont" v-if="deviceDetails.isHitch==1" style="font-size:48px;color:red">&#xe814;</i>
							<i class="iconfont" v-else style="font-size:48px;color:#999999">&#xe814;</i>
						</span>
					</div>

					<div style="text-align: center;margin-top:20px;font-size:0">
						<span
							style="display:inline-block;width:118px;text-align: center;font-size:14px"
						>{{deviceDetails.isOnline==0?"在线":"离线"}}</span>
						<span
							style="display:inline-block;width:108px;text-align: center;font-size:14px"
						>{{deviceDetails.state==0?"开机":"关机"}}</span>
						<span
							style="display:inline-block;width:118px;text-align: center;font-size:14px"
						>{{deviceDetails.isHitch==1?"发生故障":"无故障"}}</span>
					</div>
				</el-col>
			</div>
		</div>
		<div class="bottom_list" style="margin-top:10px;">
			<!-- <div class="top_title">
				<h4>开关机日志</h4>
			</div>-->
			<el-tabs v-model="activeName" style="padding: 0 12px;">
				<el-tab-pane label="开关机日志" name="first">
					<!-- <div class="table_list"> -->
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
								<span>{{ scope.row.gmtCreate }}</span>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.deviceAction }}</span>
							</template>
						</el-table-column>
						<el-table-column label="运行时长" min-width="100">
							<template slot-scope="scope">
								<span>{{ scope.row.time }}</span>
							</template>
						</el-table-column>
					</el-table>
					<!-- </div> -->
					<div class="block" style="margin-top:10px;float:right">
						<el-pagination
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page.sync="pageIndex"
							:page-sizes="[10, 20,40, 100]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
						></el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="使用日志" name="second">
					<el-table
						:data="tableData1"
						style="width: 100%"
						size="mini"
						stripe
						tooltip-effect="light"
						:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
					>
						<el-table-column label="记录时间" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.gmtCreate }}</span>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.deviceAction }}</span>
							</template>
						</el-table-column>
						<el-table-column label="运行时长" min-width="100">
							<template slot-scope="scope">
								<span>{{ scope.row.time }}</span>
							</template>
						</el-table-column>
					</el-table>
					<!-- </div> -->
					<div class="block" style="margin-top:10px;float:right">
						<el-pagination
							background
							@size-change="handleSizeChange1"
							@current-change="handleCurrentChange1"
							:current-page.sync="pageIndex1"
							:page-sizes="[10, 20,40, 100]"
							:page-size="pageSize1"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total1"
						></el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="故障日志" name="third">
					<el-table
						:data="tableData2"
						style="width: 100%"
						size="mini"
						stripe
						tooltip-effect="light"
						:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
					>
						<el-table-column label="记录时间" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.gmtCreate }}</span>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.deviceAction }}</span>
							</template>
						</el-table-column>
						<el-table-column label="运行时长" min-width="100">
							<template slot-scope="scope">
								<span>{{ scope.row.time }}</span>
							</template>
						</el-table-column>
					</el-table>
					<!-- </div> -->
					<div class="block" style="margin-top:10px;float:right">
						<el-pagination
							background
							@size-change="handleSizeChange2"
							@current-change="handleCurrentChange2"
							:current-page.sync="pageIndex"
							:page-sizes="[10, 20,40, 100]"
							:page-size="pageSize2"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total2"
						></el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
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
			tableData: [],
			total1: 0,
			pageIndex1: 1,
			pageSize1: 10,
			tableData1: [],
			total2: 0,
			pageIndex2: 1,
			pageSize2: 10,
			tableData2: [],
			deviceDetails: {},
			activeName: "first"
		};
	},
	methods: {
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
			this.deviceRecord(this.$route.params.id);
		},
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.deviceRecord(this.$route.params.id);
		},
		handleSizeChange1(val) {
			this.pageIndex1 = 1;
			this.pageSize1 = val;
			this.deviceRecord(this.$route.params.id);
		},
		handleCurrentChange1(val) {
			this.pageIndex1 = val;
			this.deviceRecord(this.$route.params.id);
		},
		handleSizeChange2(val) {
			this.pageIndex2 = 1;
			this.pageSize2 = val;
			this.deviceRecord(this.$route.params.id);
		},
		handleCurrentChange2(val) {
			this.pageIndex2 = val;
			this.deviceRecord(this.$route.params.id);
		},
		findOne(id) {
			this.Axios(
				{
					params: { id: id },
					url: "/api-enterprise/deviceuser/findone",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.deviceDetails = result.data.data;
				}
			});
		},
		deviceRecord(id) {
			this.Axios(
				{
					params: {
						id: id,
						page: this.pageIndex,
						size: this.pageSize
					},
					url: "/api-enterprise/deviceRecord/list",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.tableData = result.data.data.content;
					this.total = result.data.data.totalElement;
				}
			});
		}
	},
	created() {
		this.findOne(this.$route.params.id);
		this.deviceRecord(this.$route.params.id);
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
	.icon_case {
		text-align: center;
		i {
			margin: 0 30px;
		}
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