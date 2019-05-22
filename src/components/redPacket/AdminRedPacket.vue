<template>
	<div class="red_packet">
		<div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>红包</h4>
					<div class="top_search">
						<el-col :span="6" style="padding:0 5px;">
							<el-select style="width:100%;" v-model="merchant" size="small">
								<el-option v-for="(item, index) in 3" :key="index" :value="item" :label="item"></el-option>
							</el-select>
						</el-col>
						<el-col :span="12" style="padding:0 5px;">
							<el-input size="small" clearable placeholder="红包名称" v-model="keyword"></el-input>
						</el-col>
						<el-col :span="6" style="padding:0 5px;">
							<el-button size="small" plain @click>搜索</el-button>
							<el-button size="small" plain @click>重置</el-button>
						</el-col>
					</div>
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
						<el-table-column label="红包名称" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>
									<div class="pic_style">￥{{ scope.row.money/100 }}{{scope.row.denomination}}</div>
									{{ scope.row.name }}
								</span>
							</template>
						</el-table-column>
						<el-table-column label="面额" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.money/100 }}元</span>
							</template>
						</el-table-column>
						<el-table-column label="有效期" min-width="190">
							<template slot-scope="scope">
								<span>{{ scope.row.validity }}</span>
							</template>
						</el-table-column>
						<el-table-column label="发放总量" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.number }}</span>
							</template>
						</el-table-column>
						<el-table-column label="已领" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.receivedNum }}</span>
							</template>
						</el-table-column>
						<el-table-column label="剩余" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.notReceiveNum }}</span>
							</template>
						</el-table-column>
						<el-table-column label="使用条件" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.useConditionStr }}</span>
							</template>
						</el-table-column>
						<el-table-column label="发放商家" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.useConditionStr }}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column label="操作" width="140">
							<template slot-scope="scope">
								<el-button
									type="text"
									style="width:50px;text-align:left;"
									v-if="scope.row.state==0"
									size="mini"
									@click="sendAffirm(scope.row)"
								>发放</el-button>
								<el-button
									type="text"
									style="width:50px;text-align:left;"
									v-if="scope.row.state==1"
									size="mini"
									:disabled="true"
								>已发放</el-button>
								<el-popover placement="top" width="180" v-model="scope.row.visible">
									<p style="line-height:32px;text-align:center;">
										<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
									</p>
									<div style="text-align: center; margin: 0">
										<el-button size="mini" plain @click="scope.row.visible = false">取消</el-button>
										<el-button type="primary" size="mini" @click="deleteRedPacket(scope.row,scope.$index)">确定</el-button>
									</div>
									<el-button slot="reference" type="text">删除</el-button>
								</el-popover>
							</template>
						</el-table-column>-->
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
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		let dateTime = new Date().toLocaleDateString();
		return {
			merchant: "",
			keyword: "",
			currentPage: 1,
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			total: null
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getRedPacketList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getRedPacketList();
		},

		getRedPacketList() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/redPackage/listRedPackage"
				},
				this
			).then(
				result => {
					console.log(result.data.data);
					if (result.data.code === 200) {
						this.tableData = result.data.data.content;
						this.total = result.data.data.totalElement;
						for (let i = 0; i < this.tableData.length; i++) {
							this.tableData[i].validity =
								this.tableData[i].startTime.split(" ")[0] +
								" 至 " +
								this.tableData[i].endTime.split(" ")[0];
						}
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getRedPacketList();
	},
	watch: {},
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
.red_packet {
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
			.top_search {
				width: 600px;
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
		.pic_style {
			height: 23px;
			width: 60px;
			display: inline-block;
			background-color: red;
			color: white;
			font-weight: 700;
			padding: 0 4px;
			text-align: center;
		}
	}
}
</style>



