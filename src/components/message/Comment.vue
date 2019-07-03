<template>
	<div class="comment_list">
		<div class="bottom_list">
			<!-- <div class="top_title">
			<h4>评论管理</h4>-->
			<div class="top_search">
				<el-col :span="20" style="padding:0 5px;">
					<el-input
						clearable
						size="small"
						style="width:100%;"
						placeholder="用户名/昵称/IP地址/内容关键字"
						v-model="keyword"
					></el-input>
				</el-col>
				<el-col :span="4" style="padding:0 5px;">
					<el-button size="small" plain @click="search">搜索</el-button>
				</el-col>
			</div>
			<!-- </div> -->
			<el-tabs v-model="activeName">
				<el-tab-pane label="评论管理" name="first">
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
							<el-table-column label="评论人昵称" min-width="80" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.fromNickName }}</span>
								</template>
							</el-table-column>
							<el-table-column label="类型" min-width="60" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>文章</span>
								</template>
							</el-table-column>
							<el-table-column label="评论对象" min-width="160" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.articleTitle }}</span>
								</template>
							</el-table-column>
							<el-table-column label="评论内容" min-width="160" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.content }}</span>
								</template>
							</el-table-column>
							<el-table-column label="评论时间" min-width="150" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.createTime }}</span>
								</template>
							</el-table-column>
							<el-table-column label="当前状态" min-width="80">
								<template slot-scope="scope">
									<span :style="{color:scope.row.state==0?'':'#999999'}">{{ scope.row.state==0?'显示':"隐藏" }}</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="180">
								<template slot-scope="scope">
									<el-button
										type="text"
										size="mini"
										v-if="scope.row.state==1"
										@click.stop.prevent="changeCommentState(scope.row.id, 0)"
									>设为显示</el-button>
									<el-button
										type="text"
										size="mini"
										v-if="scope.row.state==0"
										@click.stop.prevent="changeCommentState(scope.row.id, 1)"
									>设为隐藏</el-button>
									<el-button type="text" size="mini" @click.stop.prevent="findOne(scope.row.id,0)">详情</el-button>&nbsp;&nbsp;
									<el-popover placement="top" width="180" v-model="scope.row.visible">
										<p style="line-height:32px;text-align:center;">
											<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
										</p>
										<div style="text-align: center; margin: 0">
											<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
											<el-button type="primary" size="small" @click="deleteComment(scope.row.id)">确定</el-button>
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
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
						></el-pagination>
					</div>
					<div style="margin-top:10px;line-height:32px;padding-left:10px;color:#999999">
						<el-dropdown size="small" trigger="click" @command="handleComment">
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
				</el-tab-pane>
				<el-tab-pane label="回复管理" name="second">
					<div class="table_list">
						<el-table
							:data="tableData1"
							style="width: 100%"
							size="mini"
							tooltip-effect="light"
							@selection-change="handleSelectionChange1"
							:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
						>
							<el-table-column type="selection" width="30"></el-table-column>
							<el-table-column label="回复人昵称" min-width="80" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.fromNickName }}</span>
								</template>
							</el-table-column>

							<el-table-column label="回复内容" min-width="160" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.replyContent }}</span>
								</template>
							</el-table-column>
							<el-table-column label="回复时间" min-width="150" show-overflow-tooltip>
								<template slot-scope="scope">
									<span>{{ scope.row.createTime }}</span>
								</template>
							</el-table-column>
							<el-table-column label="当前状态" min-width="80">
								<template slot-scope="scope">
									<span :style="{color:scope.row.state==0?'':'#999999'}">{{ scope.row.state==0?'显示':"隐藏" }}</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="180">
								<template slot-scope="scope">
									<el-button
										type="text"
										size="mini"
										v-if="scope.row.state==1"
										@click.stop.prevent="changeReplaytState(scope.row.id,0)"
									>设为显示</el-button>
									<el-button
										type="text"
										size="mini"
										v-if="scope.row.state==0"
										@click.stop.prevent="changeReplaytState(scope.row.id,1)"
									>设为隐藏</el-button>
									<el-button type="text" size="mini" @click.stop.prevent="findOne(scope.row.id,1)">详情</el-button>&nbsp;&nbsp;
									<el-popover placement="top" width="180" v-model="scope.row.visible">
										<p style="line-height:32px;text-align:center;">
											<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
										</p>
										<div style="text-align: center; margin: 0">
											<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
											<el-button type="primary" size="small" @click="deleteReplay(scope.row.id)">确定</el-button>
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
							@size-change="handleSizeChange1"
							@current-change="handleCurrentChange1"
							:current-page.sync="pageIndex1"
							:page-sizes="[10, 20,40, 100]"
							:page-size="pageSize1"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total1"
						></el-pagination>
					</div>
					<div style="margin-top:10px;line-height:32px;padding-left:10px;color:#999999">
						<el-dropdown size="small" trigger="click" @command="handleReplay">
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
				</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog
			:close-on-click-modal="false"
			title="评论详情"
			:visible.sync="dialogVisibleComment"
			width="600px"
		>
			<el-form label-width="120px" size="small" style="margin-top:20px;">
				<el-form-item label="用户名：">
					<span>{{commentMsg.fromName}}</span>
				</el-form-item>
				<el-form-item label="昵称：">
					<span>{{commentMsg.fromNickName}}</span>
				</el-form-item>
				<el-form-item label="评论类型：">
					<span>文章</span>
				</el-form-item>
				<el-form-item label="评论对象：">
					<span>{{commentMsg.articleTitle}}</span>
				</el-form-item>
				<el-form-item label="评论内容：">
					<span style="color:#1cc09f">{{commentMsg.content}}</span>
				</el-form-item>
				<el-form-item label="IP地址：">
					<span>{{commentMsg.ip}}</span>
				</el-form-item>
				<el-form-item label="评论时间：">
					<span>{{commentMsg.createTime}}</span>
				</el-form-item>
				<el-form-item label="当前状态：">
					<span :style="{color:commentMsg.state==0?'':'#999999'}">{{ commentMsg.state==0?'显示':"隐藏" }}</span>
				</el-form-item>
				<el-form-item label="操作：">
					<el-button plain v-if="commentMsg.state==1" @click="changeCommentState(commentMsg.id, 0)">设为显示</el-button>
					<el-button plain v-if="commentMsg.state==0" @click="changeCommentState(commentMsg.id, 1)">设为隐藏</el-button>
					<el-button plain @click="deleteComment(commentMsg.id)">删除该条</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" size="small" @click="dialogVisibleComment=false">关 闭</el-button>
			</span>
		</el-dialog>
		<el-dialog
			:close-on-click-modal="false"
			title="回复详情"
			:visible.sync="dialogVisibleReplay"
			width="600px"
		>
			<el-form label-width="120px" size="small" style="margin-top:20px;">
				<el-form-item label="用户名：">
					<span>{{replayMsg.fromName}}</span>
				</el-form-item>
				<el-form-item label="昵称：">
					<span>{{replayMsg.fromNickName}}</span>
				</el-form-item>
				<el-form-item label="回复对象：">
					<span>【{{replayMsg.toNickName}}】{{replayMsg.commentContent}}</span>
				</el-form-item>
				<el-form-item label="回复内容：">
					<span style="color:#1cc09f">{{replayMsg.replyContent}}</span>
				</el-form-item>
				<el-form-item label="IP地址：">
					<span>{{replayMsg.ip}}</span>
				</el-form-item>
				<el-form-item label="回复时间：">
					<span>{{replayMsg.createTime}}</span>
				</el-form-item>
				<el-form-item label="当前状态：">
					<span :style="{color:replayMsg.state==0?'':'#999999'}">{{ replayMsg.state==0?'显示':"隐藏" }}</span>
				</el-form-item>
				<el-form-item label="操作：">
					<el-button plain v-if="replayMsg.state==1" @click="changeReplaytState(replayMsg.id,0)">设为显示</el-button>
					<el-button plain v-if="replayMsg.state==0" @click="changeReplaytState(replayMsg.id,1)">设为隐藏</el-button>
					<el-button plain @click="deleteReplay(replayMsg.id)">删除该条</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" size="small" @click="dialogVisibleReplay=false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			commentMsg: {},
			replayMsg: {},
			activeName: "first",
			dialogVisibleComment: false,
			dialogVisibleReplay: false,
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			selectCommentId: [],
			selectReplayId: [],
			tableData1: [],
			pageIndex1: 1,
			pageSize1: 10,
			total1: 0,
			selectId1: [],
			keyword: "",
			total: 0
		};
	},
	methods: {
		search() {
			if (this.activeName == "first") {
				this.getCommentList();
			}
			if (this.activeName == "second") {
				this.getReplyList();
			}
		},
		handleComment(a) {
			if (this.selectCommentId.length < 1) {
				this.$message.error("请选择需要批量操作的评论！");
			} else {
				if (a == 1) {
					this.changeCommentState(this.selectCommentId.join(","), 0);
				}
				if (a == 2) {
					this.changeCommentState(this.selectCommentId.join(","), 1);
				}
				if (a == 3) {
					this.deleteComment(this.selectCommentId.join(","));
				}
			}
		},
		handleReplay(a) {
			if (this.selectReplayId.length < 1) {
				this.$message.error("请选择需要批量操作的回复！");
			} else {
				if (a == 1) {
					this.changeReplaytState(this.selectReplayId.join(","), 0);
				}
				if (a == 2) {
					this.changeReplaytState(this.selectReplayId.join(","), 1);
				}
				if (a == 3) {
					this.deleteReplay(this.selectReplayId.join(","));
				}
			}
		},
		handleSelectionChange(selection) {
			this.selectCommentId = selection.map(item => {
				return item.id;
			});
		},
		handleSelectionChange1(selection) {
			this.selectReplayId = selection.map(item => {
				return item.id;
			});
		},
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
			this.getCommentList();
		},
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.getCommentList();
		},
		handleSizeChange1(val) {
			this.pageIndex1 = 1;
			this.pageSize1 = val;
			this.getReplyList();
		},
		handleCurrentChange1(val) {
			this.pageIndex1 = val;
			this.getReplyList();
		},
		getCommentList() {
			this.Axios(
				{
					params: {
						keyword: this.keyword,
						page: this.pageIndex,
						size: this.pageSize
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/comment/commentlist",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.tableData = result.data.data.content;
						this.total = result.data.data.totalElement;
					}
				},
				({ type, info }) => {}
			);
		},
		getReplyList() {
			this.Axios(
				{
					params: {
						keyword: this.keyword,
						page: this.pageIndex1,
						size: this.pageSize1
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/comment/replylist",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.tableData1 = result.data.data.content;
						this.total1 = result.data.data.totalElement;
					}
				},
				({ type, info }) => {}
			);
		},
		deleteComment(ids) {
			let qs = require("qs");
			let datas = qs.stringify({
				ids: ids
			});
			this.Axios(
				{
					params: datas,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/comment/commentdelete",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.getCommentList();
						this.dialogVisibleComment = false;
					}
				},
				({ type, info }) => {}
			);
		},
		deleteReplay(ids) {
			let qs = require("qs");
			let datas = qs.stringify({
				ids: ids
			});
			this.Axios(
				{
					params: datas,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/comment/replydelete",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.getReplyList();
						this.dialogVisibleReplay = false;
					}
				},
				({ type, info }) => {}
			);
		},
		changeCommentState(ids, state) {
			let qs = require("qs");
			let datas = qs.stringify({
				ids: ids,
				state: state
			});
			this.Axios(
				{
					params: datas,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/comment/commentstate",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.getCommentList();
						this.dialogVisibleComment = false;
					}
				},
				({ type, info }) => {}
			);
		},
		changeReplaytState(ids, state) {
			let qs = require("qs");
			let datas = qs.stringify({
				ids: ids,
				state: state
			});
			this.Axios(
				{
					params: datas,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/comment/replystate",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.getReplyList();
						this.dialogVisibleReplay = false;
					}
				},
				({ type, info }) => {}
			);
		},
		findOne(id, type) {
			this.Axios(
				{
					params: {
						id: id,
						type: type
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/comment/findone",
					loadingConfig: {
						target: document.querySelector(".comment_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						if (type == 0) {
							this.commentMsg = result.data.data;
							this.dialogVisibleComment = true;
						}
						if (type == 1) {
							this.replayMsg = result.data.data;
							this.dialogVisibleReplay = true;
						}
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getCommentList();
		this.getReplyList();
	},
	watch: {
		activeName() {
			if (this.activeName == "first") {
				this.keyword = "";
			}
			if (this.activeName == "second") {
				this.keyword = "";
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
.comment_list {
	font-size: 14px;
	color: @font-normal;
	.bottom_list {
		position: relative;
		.top_search {
			width: 500px;
			// float: right;
			position: absolute;
			top: 14px;
			right: 0px;
			z-index: 10;
			overflow: hidden;
		}
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
			.el-input__inner {
				padding: 0;
				border: none;
				&:focus {
					border: 1px solid #1cc09f;
				}
			}
		}
	}
	.el-tabs__nav-wrap {
		padding: 0 12px;
	}
	.el-tabs__item {
		height: 60px;
		line-height: 60px;
	}
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
	color: #1cc09f;
}
</style>