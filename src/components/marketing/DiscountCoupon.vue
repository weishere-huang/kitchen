<template>
	<div class="discount_coupon">
		<div>
			<div class="top_list">
				<el-button
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="dialogVisible=true"
				>添加优惠券</el-button>
			</div>
			<el-dialog
				:close-on-click-modal="false"
				title="添加优惠券"
				:visible.sync="dialogVisible"
				width="600px"
			>
				<el-form
					:model="addDiscountCoupon"
					size="small"
					label-width="120px"
					style="margin-top:20px;"
					ref="addDiscountCoupon"
					:rules="addDiscountCouponRules"
				>
					<el-form-item label="优惠券类型：" prop="type">
						<el-radio v-model="addDiscountCoupon.type" label="1">满减券</el-radio>
					</el-form-item>
					<el-form-item label="优惠券名称：" prop="name">
						<el-input
							style="width:440px;"
							type="text"
							size="small"
							maxlength="20"
							v-model="addDiscountCoupon.name"
							placeholder
						></el-input>
					</el-form-item>
					<el-form-item label="面额：" prop="denomination">
						<el-input
							type="number"
							size="small"
							style="width:440px;"
							maxlength="20"
							v-model.number="addDiscountCoupon.denomination"
							placeholder="范围1~200"
							step="0.01"
							oninput="if(value.length>3)value=value.slice(0,3)"
						>
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="发放总量：" prop="sendSum">
						<el-input
							type="number"
							size="small"
							style="width:440px;"
							maxlength="20"
							v-model.number="addDiscountCoupon.sendSum"
							placeholder="范围1~10000"
							step="0"
							oninput="if(value.length>5)value=value.slice(0,5)"
						>
							<template slot="append">张</template>
						</el-input>
					</el-form-item>
					<el-form-item label="每人限领：" prop="limitGet">
						<el-select v-model="addDiscountCoupon.limitGet" placeholder="请选择" style="width:440px;">
							<el-option label="1张" value="1"></el-option>
							<el-option label="2张" value="2"></el-option>
							<el-option label="3张" value="3"></el-option>
							<el-option label="4张" value="4"></el-option>
							<el-option label="5张" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="有效期：" prop="validity">
						<el-date-picker
							v-model="addDiscountCoupon.validity"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width:440px;"
							value-format="yyyy/M/d"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="使用条件：" prop="condition1">
						<el-col :span="24">
							<el-radio v-model="addDiscountCoupon.condition1" label="0">无限制</el-radio>
						</el-col>
						<el-radio v-model="addDiscountCoupon.condition1" label="1">单笔金额满</el-radio>
						<el-input
							style="width:200px;"
							type="number"
							size="small"
							maxlength="20"
							:disabled="addDiscountCoupon.condition1==0"
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
							每个订单只能使用1张优惠券；
							<br>优惠券与红包可以同时使用。
						</span>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="handleCancel('addDiscountCoupon')" size="small" plain>取 消</el-button>
					<el-button type="primary" size="small" @click="addDiscountCouponMsg('addDiscountCoupon')">确 定</el-button>
				</span>
			</el-dialog>
			<div class="bottom_list">
				<div class="top_title">
					<h4>优惠券</h4>
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
						<el-table-column label="优惠券名称" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>
									<div class="pic_style">￥{{scope.row.money/100}}</div>
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
						<el-table-column label="操作" width="140">
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
		let dateTime = new Date().toLocaleDateString();
		return {
			addDiscountCoupon: {
				type: "1",
				name: "",
				denomination: null,
				sendSum: null,
				limitGet: null,
				validity: [],
				condition1: "0",
				allMoney: null,
				condition: ""
			},
			addDiscountCouponRules: {
				type: [
					{ required: true, message: "请选择类型", trigger: ["blur", "change"] }
				],
				name: [
					{ required: true, message: "请输入优惠券名称", trigger: "blur" }
				],
				denomination: [
					{ required: true, message: "请输入面额", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/(^[1-9]{1}[0-9]*$)/g.test(value) == false) {
								callback(new Error("请输入正整数,且不能为0"));
							} else if (value > 200) {
								callback(new Error("面额最大金额为200"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				sendSum: [
					{ required: true, message: "请输入发放总量", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/(^[1-9]{1}[0-9]*$)/g.test(value) == false) {
								callback(new Error("请输入正整数,且不能为0"));
							} else if (value > 10000) {
								callback(new Error("发放总量最大为10000张"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				limitGet: [
					{
						required: true,
						message: "请选择每人限领",
						trigger: ["blur", "change"]
					}
				],
				validity: [
					{
						required: true,
						message: "请选择有效期",
						trigger: ["blur", "change"]
					},
					{
						validator: (rule, value, callback) => {
							if (
								dateTime.replace(/\//g, "") - value[0].replace(/\//g, "") >=
								0
							) {
								callback(new Error("开始时间不能小于或等于今天！"));
							} else {
								callback();
							}
						},
						trigger: ["blur", "change"]
					}
				],
				condition1: [
					{ required: true, message: "请选择使用条件", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (value == 0) {
								callback();
							} else if (value == 1) {
								if (
									/(^[1-9]{1}[0-9]*$)/g.test(
										this.addDiscountCoupon.condition
									) == false
								) {
									callback(new Error("请输入正整数,且不能为0"));
								} else {
									callback();
								}
							} else {
								callback();
							}
						},
						trigger: ["blur", "change"]
					}
				]
			},
			dialogVisible: false,
			currentPage: 1,
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			total: null
		};
	},
	methods: {
		sendAffirm(row) {
			self = this;
			this.$confirm("是否确认发放优惠券？", "确认", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
				cancelButtonClass: "is-plain"
			}).then(() => {
				this.sendDiscountCoupon(row);
			});
			// },({type,info})=>{})
		},
		handleCancel(formName) {
			this.$refs[formName].resetFields();
			this.dialogVisible = false;
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
		addDiscountCouponMsg(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let qs = require("qs");
					let data = qs.stringify({
						name: this.addDiscountCoupon.name,
						startTime: this.addDiscountCoupon.validity[0],
						endTime: this.addDiscountCoupon.validity[1],
						money: this.addDiscountCoupon.denomination,
						type: this.addDiscountCoupon.type,
						enableReceiveNum: this.addDiscountCoupon.limitGet,
						number: this.addDiscountCoupon.sendSum,
						condition: this.addDiscountCoupon.condition
					});
					this.Axios(
						{
							params: data,
							option: {
								successMsg: "添加成功！"
							},
							type: "post",
							url: "/api-platform/coupon/addCoupon"
						},
						this
					).then(
						result => {
							console.log(result);
							if (result.data.code === 200) {
								this.dialogVisible = false;
								this.getDiscountCouponList();
								this.$refs[formName].resetFields();
								this.addDiscountCoupon.allMoney = "";
							}
							// this.tableData = result.data.data.content;
							// this.total = result.data.data.totalElement;
						},
						({ type, info }) => {}
					);
				} else {
					return false;
				}
			});
		},
		deleteDiscountCoupon(row, index) {
			let qs = require("qs");
			let data = qs.stringify({
				couponId: row.id
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "删除成功！"
					},
					type: "post",
					url: "/api-platform/coupon/delCoupon"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.tableData[index].visible = false;
						this.getDiscountCouponList();
					} else {
						this.$message.error("未删除成功！");
					}
				},
				({ type, info }) => {}
			);
		},
		sendDiscountCoupon(row) {
			let qs = require("qs");
			let data = qs.stringify({
				couponId: row.id
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "发送成功！"
					},
					type: "post",
					url: "/api-platform/coupon/sendCoupon"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.getDiscountCouponList();
					}
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
					url: "/api-platform/coupon/listCoupon"
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
		this.getDiscountCouponList();
	},
	watch: {
		addDiscountCoupon: {
			handler(newValue, oldValue) {
				if (this.addDiscountCoupon.condition1 == 0) {
					this.addDiscountCoupon.condition = 0;
					this.addDiscountCoupon.allMoney = "";
				}
				if (this.addDiscountCoupon.condition1 == 1) {
					this.addDiscountCoupon.condition = this.addDiscountCoupon.allMoney;
				}
			},
			deep: true
		}
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
.discount_coupon {
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
			width: 60px;
			font-weight: 700;
			padding: 0 4px;
			text-align: center;
		}
	}
}
</style>



