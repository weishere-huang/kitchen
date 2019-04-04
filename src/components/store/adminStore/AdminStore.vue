<template>
	<div class="store_list">
		<div :class="[{hide:isHideList}]">
			<!-- <div class="top_list">
				<el-button
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="$router.push({path:'/Store/AddMenu'})"
				>添加商品</el-button>
			</div>-->
			<div class="bottom_list">
				<div class="top_title">
					<h4>商品列表</h4>
					<div class="top_search">
						<el-col :span="6" style="padding:0 5px;">
							<el-select v-model="classifyValue" placeholder="请选择" size="small">
								<el-option
									v-for="item in classifyOptions"
									:key="item.value"
									:label="item.cateName"
									:value="item.no"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="6" style="padding:0 5px;">
							<el-select v-model="stateValue" placeholder="请选择" size="small">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="9" style="padding:0 5px;">
							<el-input
								clearable
								size="small"
								style="width:100%;"
								placeholder="商品名称/供应商"
								v-model="keyword"
							></el-input>
						</el-col>
						<el-col :span="3" style="padding:0 5px;">
							<el-button size="small" plain @click="search">搜索</el-button>
						</el-col>
					</div>
				</div>
				<div class="table_list">
					<el-table
						:data="tableData"
						style="width: 100%"
						size="mini"
						tooltip-effect="light"
						:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
					>
						<el-table-column label="名称" min-width="140" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.itemName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="分类" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.cateName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="单价（元）" min-width="100">
							<template slot-scope="scope">
								<!-- <el-popover
									popper-class="color_text"
									ref="popover1"
									placement="right"
									trigger="focus"
									content="只保留小数点后两位"
								></el-popover>￥
								<el-input
									:readonly="true"
									v-popover:popover1
									size="small"
									type="number"
									step="0.01"
									v-model="scope.row.itemPrice"
									style="width:60px;padding:0;"
									@change="handleInput(scope.row,scope.$index)"
								></el-input>-->
								<span>￥{{scope.row.itemPrice}}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column label="库存" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.inventory }}</span>
							</template>
						</el-table-column>-->
						<el-table-column label="库存" min-width="70" show-overflow-tooltip>
							<template slot-scope="scope">
								<!-- <el-input
									size="small"
									type="number"
									v-model="scope.row.stockNow"
									style="width:60px;padding:0;"
									v-popover:popover
									@change="handleCookkingTime(scope.row,scope.$index)"
								></el-input>
								<el-popover
									popper-class="color_text"
									ref="popover"
									placement="right"
									trigger="focus"
									content="只能是整数"
								></el-popover>-->
								<span>{{scope.row.stockNow}}</span>
							</template>
						</el-table-column>
						<el-table-column label="净含量（克）" min-width="90" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.itemWeight}}</span>
							</template>
						</el-table-column>
						<el-table-column label="上/下架" min-width="60">
							<template slot-scope="scope">
								<!-- <div @click.stop.prevent="changeUp(scope.$index, scope.row)"> -->
								<i class="iconfont" v-if="scope.row.state=='1'" style="color:green;">&#xe659;</i>
								<i class="iconfont" v-if="scope.row.state=='2'" style="color:red;">&#xe658;</i>
								<!-- </div> -->
							</template>
						</el-table-column>
						<el-table-column label="新品" min-width="60">
							<template slot-scope="scope">
								<!-- <div @click.stop.prevent="changeNew(scope.$index, scope.row)"> -->
								<i
									class="iconfont"
									v-if="scope.row.recommendType.newMenu===true"
									style="color:green;"
								>&#xe659;</i>
								<i
									class="iconfont"
									v-if="scope.row.recommendType.newMenu===false"
									style="color:red;"
								>&#xe658;</i>
								<!-- </div> -->
							</template>
						</el-table-column>
						<el-table-column label="热销" min-width="60">
							<template slot-scope="scope">
								<!-- <div @click.stop.prevent="changeHot(scope.$index, scope.row)"> -->
								<i
									class="iconfont"
									v-if="scope.row.recommendType.hotMenu===true"
									style="color:green;"
								>&#xe659;</i>
								<i
									class="iconfont"
									v-if="scope.row.recommendType.hotMenu===false"
									style="color:red;"
								>&#xe658;</i>
								<!-- </div> -->
							</template>
						</el-table-column>
						<el-table-column label="供应商" min-width="150" show-overflow-tooltip>
							<template slot-scope="scope">
								<!-- <el-popover
									popper-class="color_text"
									ref="popover2"
									placement="right"
									trigger="focus"
									content="数值越大排序越靠前"
								></el-popover>
								<el-input
									@change="handleSortLevel(scope.row,scope.$index)"
									v-popover:popover2
									size="small"
									type="number"
									step="0"
									v-model="scope.row.sortLevel"
									style="width:60px;padding:0;"
								></el-input>-->
								<span>{{scope.row.salesTerritoryName}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="50">
							<template slot-scope="scope">
								<permission-button
									permCode="mall_list_lookup.mall_list_update"
									banType="disable"
									type="text"
									size="mini"
									@click.stop.prevent="handleEdit(scope.$index, scope.row)"
								>查看</permission-button>
								<!-- <el-popover placement="top" width="180" v-model="scope.row.visible">
									<p style="line-height:32px;text-align:center;">
										<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
									</p>
									<div style="text-align: center; margin: 0">
										<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
										<el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
									</div>
									<el-button slot="reference" type="text">删除</el-button>
								</el-popover>-->
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
				<!-- <div style="margin-top:10px;line-height:32px;padding-left:10px;color:#999999">提示：带“*”字段可以实时编辑</div> -->
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
			currentPage: 1,
			classifyValue: -2,
			stateValue: -2,
			classifyOptions: [
				{
					cateName: "全部分类",
					no: -2
				}
			],
			stateOptions: [
				{
					label: "全部状态",
					value: -2
				},
				{
					label: "下架",
					value: 2
				},
				{
					label: "上架",
					value: 1
				}
			],
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			keyword: "",
			total: 0,
			isHideList: this.$route.params.id !== undefined ? true : false
		};
	},
	methods: {
	  search(){
	    this.pageIndex=1;
	    this.foodlist();
    },
		editfood(data) {
			let qs = require("qs");
			let datas = qs.stringify({
				id: data.id,
				itemPrice: data.itemPrice,
				stockNow: data.stockNow,
				state: data.state,
				sortLevel: data.sortLevel,
				menuId: data.menuId,
				recommendType: JSON.stringify(data.recommendType)
			});

			this.Axios(
				{
					params: datas,
					url: "/api-mall/mallManage/updateItem",
					type: "post",
					option: {
						successMsg: "编辑成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.foodlist();
				} else {
					this.$message.error("编辑失败,请重新尝试");
				}
			});
		},
		handleInput(row, index) {
			console.log(row);
			if (/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/.test(row.itemPrice)) {
				this.editfood(row);
			} else {
				this.$message.error("价格只能保留两位小数，且不能为负数，请重新输入");
				// this.foodlist();
			}
			// this.tableData[index].itemPrice =
			// 	row.itemPrice.match(/^\d*(\.?\d{0,2})/g)[0] || null;
			// this.editfood(row);
		},
		handleCookkingTime(row, index) {
			// this.tableData[index].cookingTime =
			// 	row.cookingTime.match(/^\d*(\d{0,0})/g)[0] || null;
			// this.editfood(row);
			if (/^[0-9]*[1-9][0-9]*$/.test(row.stockNow)) {
				this.editfood(row);
			} else {
				this.$message.error("烹饪时长只能为正整数，请重新输入");
				// this.foodlist();
			}
		},
		handleSortLevel(row, index) {
			if (/^[0-9]*[1-9][0-9]*$/.test(row.sortLevel)) {
				this.editfood(row);
			} else {
				this.$message.error("排序只能为正整数，请重新输入");
				// this.foodlist();
			}
			// this.tableData[index].sortLevel =
			// 	row.sortLevel.match(/^\d*(\d{0,0})/g)[0] || null;
			// this.editfood(row);
		},
		handleEdit(index, rowData) {
			let params = { type: "edit", index: index, rowData: rowData };
			this.$router.push("/AdminStore/AdminStoreDetails/" + params.rowData.id);
		},
		handleDelete(index, rowData) {
			rowData.visible = false;
			let qs = require("qs");
			let datas = qs.stringify({
				itemId: rowData.id
			});
			this.Axios(
				{
					params: datas,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-mall/mallManage/delItem",
					loadingConfig: {
						target: document.querySelector(".store_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$message({
							message: "删除成功！",
							type: "success"
						});
						this.foodlist();
					} else {
						this.$message({
							message: result.data.msg,
							type: "error"
						});
					}
				},
				({ type, info }) => {}
			);
		},
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
			this.foodlist();
		},
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.foodlist();
		},
		changeNew(index, val) {
			// if (val.state == 1) {
			// 	this.changeState(val);
			// } else {
			// 	this.$confirm("菜谱下架，绑定的商品也同样会下架, 是否继续?", "提示", {
			// 		confirmButtonText: "确定",
			// 		cancelButtonText: "取消",
			// 		type: "warning",
			// 		cancelButtonClass: "is-plain"
			// 	})
			// 		.then(() => {
			// 			this.changeState(val);
			// 		})
			// 		.catch(() => {});
			// }
			if (val.recommendType.newMenu === false) {
				this.tableData[index].recommendType.newMenu = true;
				this.editfood(val);
			} else {
				this.tableData[index].recommendType.newMenu = false;
				this.editfood(val);
			}
		},
		changeUp(index, val) {
			if (val.state == "1") {
				this.tableData[index].state = "2";
				this.editfood(val);
			} else {
				this.tableData[index].state = "1";
				this.editfood(val);
			}
		},
		changeHot(index, val) {
			if (val.recommendType.hotMenu === false) {
				this.tableData[index].recommendType.hotMenu = true;
				this.editfood(val);
			} else {
				this.tableData[index].recommendType.hotMenu = false;
				this.editfood(val);
			}
		},
		foodlist() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize,
						state: this.stateValue,
						cate: this.classifyValue,
						name: this.keyword
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/mallManage/itemListOnAdmin",
					loadingConfig: {
						target: document.querySelector(".store_list")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					for (let i = 0; i < result.data.data.content.length; i++) {
						result.data.data.content[i].itemPrice =
							result.data.data.content[i].itemPrice / 100;
						result.data.data.content[i].itemWeight =
							result.data.data.content[i].itemWeight / 100;
						result.data.data.content[i].recommendType = JSON.parse(
							result.data.data.content[i].recommendType
						);
					}
					this.tableData = result.data.data.content;
					for (let j = 0; j < this.tableData.length; j++) {
						this.tableData[j].recommendType.newMenu =
							result.data.data.content[j].recommendType.newMenu;
						this.tableData[j].recommendType.hotMenu =
							result.data.data.content[j].recommendType.hotMenu;
					}
					this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		},
		getClassfy() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/itemCat/allCate"
				},
				this
			).then(
				result => {
					result.data.data.splice(0, 0, { cateName: "全部类别", no: -2 });
					this.classifyOptions = result.data.data;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getClassfy();
		this.foodlist();
		let a = this.$route.matched.find(item => item.name === "AddMenu")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddMenu")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
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
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
	.el-popover--plain {
		padding: 4px 8px;
	}
}
</style>

