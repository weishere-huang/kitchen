<template>
	<div class="advertising_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_list">
				<el-button
					permCode="message_advertisement_lookup.message_advertising_add"
					banType="disable"
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="toadd"
				>添加广告</el-button>
			</div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>广告列表</h4>
					<div class="top_search">
						<el-col :span="8" style="padding:0 5px;">
							<el-select v-model="position" placeholder="请选择" size="small">
								<el-option label="全部" :value="-1"></el-option>
								<el-option v-if="employeeType==3" label="APP主页-顶部图片" :value="0"></el-option>
								<el-option v-if="employeeType==3" label="APP主页-广告图" :value="1"></el-option>
								<el-option v-if="employeeType==3" label="APP商城-轮播图" :value="2"></el-option>
								<el-option v-if="employeeType==3" label="APP发现-轮播图" :value="3"></el-option>
								<el-option v-if="employeeType!=3" label="店面主页-轮播图" :value="4"></el-option>
							</el-select>
						</el-col>
						<el-col :span="13" style="padding:0 5px;">
							<el-input size="small" placeholder="请输入广告名称" v-model="keyword" clearable></el-input>
						</el-col>
						<el-col :span="3" style="padding:0 5px;">
							<el-button size="small" @click="getAdvertisingList" plain>搜索</el-button>
						</el-col>
					</div>
				</div>
				<div class="table_list">
					<el-table
						:data="tableData"
						style="width: 100%"
						size="small"
						stripe
						tooltip-effect="light"
						:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
					>
						<el-table-column label="广告名称" min-width="150" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column label="广告位置" min-width="200">
							<template slot-scope="scope">
								<span>{{scope.row.position==0?"APP主页-顶部图片":scope.row.position==1?"APP主页-广告图":scope.row.position==2?"APP商城-轮播图":scope.row.position==3?"APP发现-轮播图":scope.row.position==4?"店面主页-轮播图":""}}</span>
							</template>
						</el-table-column>
						<el-table-column label="缩略图" min-width="200" show-overflow-tooltip>
							<template slot-scope="scope">
								<span @click="getPic(replacePic(scope.row.img))">
									<img :src="replacePic(scope.row.img)" alt style="width:180px;height:60px;">
								</span>
							</template>
						</el-table-column>
						<el-table-column label="开始时间" min-width="160" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.startTime }}</span>
							</template>
						</el-table-column>
						<el-table-column label="结束时间" min-width="160" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.endTime }}</span>
							</template>
						</el-table-column>
						<el-table-column label="点击次数" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.linkCount}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="100">
							<template slot-scope="scope">
								<el-button
									permCode="message_advertisement_lookup.message_advertising_update"
									banType="disable"
									type="text"
									size="mini"
									@click.stop.prevent="handleEdit(scope.$index, scope.row)"
								>修改</el-button>
								<el-popover placement="top" width="180" v-model="scope.row.visible">
									<p style="line-height:32px;text-align:center;">
										<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
									</p>
									<div style="text-align: center; margin: 0">
										<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
										<el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
									</div>
									<el-button
										permCode="message_advertisement_lookup.message_advertising_delete"
										banType="disable"
										slot="reference"
										type="text"
									>删除</el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- <div class="hint">提示：最多可添加6条广告。</div> -->
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
			<el-dialog :visible.sync="mainPicShow" append-to-body class="showPic">
				<img width="100%" :src="dialogShowPic" alt>
			</el-dialog>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import addAdvertising from "./advertisingAdd/AddAdvertising";

export default {
	inject: ["reload"],
	data() {
		return {
			employeeType: JSON.parse(sessionStorage.getItem("user")).employeeType,
			isHideList: this.$route.params.id !== undefined ? true : false,
			contentShow: false,
			mainPicShow: false,
			dialogEdit: false,
			dialogAdd: false,
			currentPage: 1,
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			dialogShowPic: "",
			total: 0,
			position: -1,
			keyword: null
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getAdvertisingList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getAdvertisingList();
		},
		replacePic(img) {
			return this.global.imgPath + img.replace("img:", "");
		},
		getPic(value) {
			this.mainPicShow = true;
			this.dialogShowPic = value;
			console.log(value);
		},
		toadd() {
			this.$router.push({ path: "/Advertising/AdvertisingAdd" });
		},
		handleEdit(index, rowData) {
			this.$router.push({ path: "/Advertising/AdvertisingEdit/" + rowData.id });
		},
		handleDelete(index, rowData) {
			rowData.visible = false;
			this.deleteAdvertising(rowData.id);
		},
		getAdvertisingList() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize,
						position: this.position,
						keyWord: this.keyword
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/ad/adList"
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						this.tableData = result.data.data.content;
						this.total = result.data.data.totalElement;
						console.log(this.tableData);
					}
				},
				({ type, info }) => {}
			);
		},

		deleteAdvertising(id) {
			let qs = require("qs");
			let data = qs.stringify({
				adId: id
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/ad/del",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.getAdvertisingList();
				}
			});
		},
		//修改广告
		beforeupdate(params) {
			if (params.type == "cancel") {
				console.log(params);
				this.dialogEdit = params.isHide;
			}
			if (params.type == "affirm") {
				console.log(params);
				this.editMsg = params.value;
				console.log(this.addMsg);
				this.updateAdvertising();
				this.dialogEdit = params.isHide;
			}
		}
		// updateAdvertising() {
		// 	let qs = require("qs");
		// 	let data = qs.stringify({
		// 		id: this.editMsg.id,
		// 		title: this.editMsg.title,
		// 		mainPic: this.editMsg.mainPic,
		// 		content: this.editMsg.content,
		// 		linkUrl: this.editMsg.linkUrl,
		// 		advertType: 0,
		// 		advertContentType: 0,
		// 		startTime: this.editMsg.startTime.replace(/-/g, "/"),
		// 		endTime: this.editMsg.endTime.replace(/-/g, "/"),
		// 		state: this.editMsg.state
		// 	});
		// 	this.Axios(
		// 		{
		// 			params: data,
		// 			url: "/api-platform/Advertisement/update",
		// 			type: "post",
		// 			option: {
		// 				enableMsg: false
		// 			}
		// 		},
		// 		this
		// 	).then(result => {
		// 		console.log(result.data);
		// 		if (result.data.code === 200) {
		// 			this.reload();
		// 		}
		// 	});
		// }
	},
	created() {
		this.getAdvertisingList();
		let a = this.$route.matched.find(item => item.name === "AdvertisingAdd")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	components: {
		addAdvertising
	},
	watch: {
		dialogEdit() {
			if (this.dialogEdit == false) {
				// this.getAdvertisingList();
				// console.log("OK");
				// this.reload();
			}
		},
		$route() {
			this.getAdvertisingList();
			let a = this.$route.matched.find(item => item.name === "AdvertisingAdd")
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
.advertising_list {
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
		}
		.hint {
			line-height: 50px;
			padding-left: 20px;
			color: @font-subsidiary;
			display: inline;
		}
	}
}
</style>
