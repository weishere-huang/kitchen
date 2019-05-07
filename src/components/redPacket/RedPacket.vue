<template>
	<div class="red_packet">
		<div>
			<div class="top_list">
				<el-button
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="dialogVisible=true"
				>添加红包</el-button>
			</div>
			<el-dialog
				:close-on-click-modal="false"
				title="添加红包"
				:visible.sync="dialogVisible"
				width="600px"
			>
				<el-form size="small" label-width="100px" style="margin-top:20px;">
					<!-- <el-form-item label="优惠券类型：" prop>
						<el-radio v-model="addDiscountCoupon.type" label="0">满减券</el-radio>
					</el-form-item>-->
					<el-form-item label="红包名称：" prop>
						<el-input
							style="width:460px;"
							type="text"
							size="small"
							maxlength="20"
							v-model="addDiscountCoupon.name"
							placeholder
						></el-input>
					</el-form-item>
					<el-form-item label="面额：" prop>
						<el-input
							type="number"
							size="small"
							style="width:460px;"
							maxlength="20"
							v-model.number="addDiscountCoupon.denomination"
							placeholder="范围1~200"
							step="0.01"
							oninput="if(value.length>5)value=value.slice(0,5)"
						>
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="发放个数：" prop>
						<el-input
							type="number"
							size="small"
							style="width:460px;"
							maxlength="20"
							v-model.number="addDiscountCoupon.sendSum"
							placeholder="范围1~10000"
							step="0"
							oninput="if(value.length>5)value=value.slice(0,5)"
						>
							<template slot="append">个</template>
						</el-input>
					</el-form-item>
					<el-form-item label="每人限领：" prop>
						<span>1个</span>
					</el-form-item>
					<el-form-item label="有效期：" prop>
						<el-date-picker
							v-model="addDiscountCoupon.validity"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width:460px;"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="使用条件：" prop>
						<el-col :span="24">
							<el-radio v-model="addDiscountCoupon.condition" label="0">无限制</el-radio>
						</el-col>
						<el-radio v-model="addDiscountCoupon.condition" label="1">单笔金额满</el-radio>
						<el-input
							style="width:200px;"
							type="number"
							size="small"
							maxlength="20"
							v-model.number="addDiscountCoupon.allMoney"
							placeholder
							step="0"
							oninput="if(value.length>5)value=value.slice(0,5)"
						>
							<template slot="append">元</template>
						</el-input>（不含运费）
					</el-form-item>
					<el-form-item label="使用说明：" prop>
						<span>
							同一红包用户只能领取一次；
							<br>每个订单只能使用1个红包；
							<br>红包与优惠券可以同时使用。
						</span>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false" size="small" plain>取 消</el-button>
					<el-button type="primary" size="small" @click>确 定</el-button>
				</span>
			</el-dialog>
			<div class="bottom_list">
				<div class="top_title">
					<h4>红包</h4>
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
									<div class="pic_style">￥{{scope.row.denomination}}</div>
									{{ scope.row.name }}
								</span>
							</template>
						</el-table-column>
						<el-table-column label="面额" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.denomination }}元</span>
							</template>
						</el-table-column>
						<el-table-column label="有效期" min-width="190">
							<template slot-scope="scope">
								<span>{{ scope.row.validity }}</span>
							</template>
						</el-table-column>
						<el-table-column label="发放总量" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.sendSum }}</span>
							</template>
						</el-table-column>
						<el-table-column label="已领" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.get }}</span>
							</template>
						</el-table-column>
						<el-table-column label="剩余" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.surplus }}</span>
							</template>
						</el-table-column>
						<el-table-column label="使用条件" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.condition }}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="140">
							<template slot-scope="scope">
								<el-button
									type="text"
									style="width:50px;text-align:left;"
									v-if="scope.row.state==0"
									size="mini"
									@click="toSend(scope.row)"
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
										<el-button
											type="primary"
											size="mini"
											@click="deleteDiscountCoupon(scope.row,scope.$index)"
										>确定</el-button>
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
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			addDiscountCoupon: {
				type: "0",
				name: "",
				denomination: null,
				sendSum: null,
				limitGet: null,
				validity: [],
				condition: "1",
				allMoney: null
			},
			dialogVisible: false,
			currentPage: 1,
			tableData: [
				{
					name: "无限制10元",
					denomination: "10",
					validity: "2019-05-01 至 2019-05-10",
					sendSum: "1000",
					get: "2",
					surplus: "998",
					condition: "无限制",
					state: 1
				},
				{
					name: "满100减10元",
					denomination: "10",
					validity: "2019-05-01 至 2019-05-10",
					sendSum: "1000",
					get: "0",
					surplus: "1000",
					condition: "满100",
					state: 0
				},
				{
					name: "满2000减200元",
					denomination: "200",
					validity: "2019-05-01 至 2019-05-10",
					sendSum: "1000",
					get: "2",
					surplus: "998",
					condition: "满2000",
					state: 1
				}
			],
			pageIndex: 1,
			pageSize: 10,
			total: null
		};
	},
	methods: {
		toSend(row) {
			console.log(row);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getDiscountCouponList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getDiscountCouponList();
		},
		deleteDiscountCoupon(row, index) {
			let qs = require("qs");
			let data = qs.stringify({
				supplierId: row.id
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "删除成功！"
					},
					type: "post",
					url: ""
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.tableData[index].visible = false;
					} else {
						this.$message.error("未删除成功！");
					}
					// this.tableData = result.data.data.content;
					// this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		},
		getDiscountCouponList() {
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
					url: ""
				},
				this
			).then(
				result => {
					console.log(result.data.data);
					if (result.data.code === 200) {
					}
					// this.tableData = result.data.data.content;
					// this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {},
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
				width: 300px;
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
			display: inline-block;
			background-color: red;
			color: white;
			width: 50px;
			font-weight: 700;
			padding: 0 4px;
			text-align: center;
		}
	}
}
</style>



