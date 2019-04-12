<template>
	<div class="advertising_list">
		<div class="top_list">
			<permission-button
				permCode="message_advertisement_lookup.message_advertising_add"
				banType="disable"
				size="small"
				type="primary"
				class="el-icon-circle-plus-outline"
				@click="toadd"
			>添加广告</permission-button>
			<el-dialog :close-on-click-modal="false" title="添加广告" :visible.sync="dialogAdd" width="600px">
				<add-advertising v-on:beforeadd="beforeadd"></add-advertising>
				<!-- <span slot="footer" class="dialog-footer">
					<el-button @click="dialogAdd = false" size="small" plain>取 消</el-button>
					<el-button type="primary" size="small" @click="beforeadd">确 定</el-button>
				</span>-->
			</el-dialog>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>广告列表</h4>
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
							<span>{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column label="缩略图" min-width="200" show-overflow-tooltip>
						<template slot-scope="scope">
							<span @click="getPic(replacePic(scope.row.mainPic))">
								<img :src="replacePic(scope.row.mainPic)" alt style="width:180px;height:60px;">
							</span>
						</template>
					</el-table-column>
					<el-table-column label="内容图" min-width="200">
						<template slot-scope="scope">
							<span @click="getPic(replacePic(scope.row.content))">
								<img :src="replacePic(scope.row.content)" alt style="width:180px;height:60px;">
							</span>
							<!-- <el-dialog :visible.sync="contentShow" append-to-body class="showPic">
								<img width="100%" :src="scope.row.content" alt>
							</el-dialog>-->
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
							<permission-button
								permCode="message_advertisement_lookup.message_advertising_update"
								banType="disable"
								type="text"
								size="mini"
								@click.stop.prevent="handleEdit(scope.$index, scope.row)"
							>修改</permission-button>
							<el-popover placement="top" width="180" v-model="scope.row.visible">
								<p style="line-height:32px;text-align:center;">
									<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
								</p>
								<div style="text-align: center; margin: 0">
									<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
									<el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
								</div>
								<permission-button
									permCode="message_advertisement_lookup.message_advertising_delete"
									banType="disable"
									slot="reference"
									type="text"
								>删除</permission-button>
							</el-popover>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="hint">提示：最多可添加6条广告。</div>
		</div>
		<el-dialog :close-on-click-modal="false" title="修改广告" :visible.sync="dialogEdit" width="600px">
			<add-advertising v-on:beforeadd="beforeupdate" :editMsg="editMsg"></add-advertising>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="dialogEdit = false" size="small" plain>取 消</el-button>
				<el-button type="primary" size="small" @click="beforeupdate">确 定</el-button>
			</span>-->
		</el-dialog>
		<el-dialog :visible.sync="mainPicShow" append-to-body class="showPic">
			<img width="100%" :src="dialogShowPic" alt>
		</el-dialog>
	</div>
</template>
<script>
import addAdvertising from "./advertisingAdd/AddAdvertising";

export default {
	inject: ["reload"],
	data() {
		return {
			contentShow: false,
			mainPicShow: false,
			editMsg: {},
			addMsg: {},
			dialogEdit: false,
			dialogAdd: false,
			currentPage: 1,
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			dialogShowPic: ""
		};
	},
	methods: {
    replacePic(img){
      return this.global.imgPath+img.replace('img:','')
    },
		getPic(value) {
			this.mainPicShow = true;
			this.dialogShowPic = value;
			console.log(value);
		},
		toadd() {
			this.addMsg = {};
			this.editMsg = {};
			this.dialogAdd = true;
		},
		handleEdit(index, rowData) {
			let params = { type: "edit", index: index, rowData: rowData };
			this.editMsg = {};
			this.addMsg = {};
			Object.assign(this.editMsg, rowData);
			console.log(this.editMsg);
			this.dialogEdit = true;
		},
		handleDelete(index, rowData) {
			rowData.visible = false;
			let params = { type: "delete", index: index, rowData: rowData };
			this.beforeDelete(rowData.id);
			console.log(params);
		},
		getAdvertisingList() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/Advertisement/list"
				},
				this
			).then(
				result => {
					console.log(result.data);
          this.tableData = result.data.data;
				},
				({ type, info }) => {}
			);
		},
		beforeDelete(id) {
			this.deleteAdvertising(id);
		},
		deleteAdvertising(id) {
			let qs = require("qs");
			let data = qs.stringify({
				id: id
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/Advertisement/delete",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.reload();
				}
			});
		},
		//添加广告
		beforeadd(params) {
			if (params.type == "cancel") {
				console.log(params);
				this.dialogAdd = params.isHide;
			}
			if (params.type == "affirm") {
				console.log(params);
				this.addMsg = params.value;
				console.log(this.addMsg);
				this.addAdvertising();
				this.dialogAdd = params.isHide;
			}
		},
		addAdvertising() {
			let qs = require("qs");
			let data = qs.stringify({
				title: this.addMsg.title,
				// mainPic:this.addMsg.mainPic,
				mainPic: this.addMsg.mainPic,
				content: this.addMsg.content,
				linkUrl: this.addMsg.linkUrl,
				advertType: 0,
				advertContentType: 0,
				startTime: this.addMsg.startTime,
				endTime: this.addMsg.endTime,
				state: this.addMsg.state
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/Advertisement/add",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.reload();
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
		},
		updateAdvertising() {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.editMsg.id,
				title: this.editMsg.title,
				mainPic: this.editMsg.mainPic,
				content: this.editMsg.content,
				linkUrl: this.editMsg.linkUrl,
				advertType: 0,
				advertContentType: 0,
				startTime: this.editMsg.startTime.replace(/-/g, "/"),
				endTime: this.editMsg.endTime.replace(/-/g, "/")
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/Advertisement/update",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.reload();
				}
			});
		}
	},
	created() {
		this.getAdvertisingList();
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
				width: 400px;
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
		}
	}
}
</style>
