<template>
	<div class="edit_advertising">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>修改广告</h4>
			</div>
			<div class="table_list">
				<el-form
					label-width="200px"
					size="small"
					:model="addMsg"
					ref="addAdvertising"
					:rules="advertisingRules"
				>
					<el-form-item label="广告名称：" prop="title">
						<el-input v-model="addMsg.title" size="small" style="width:400px" maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="广告位置：" prop="title">
						<el-select style="width:400px">
							<el-option label="APP主页-顶部图片 750*450" value="1"></el-option>
							<el-option label="APP主页-广告图 750*250" value="2"></el-option>
							<el-option label="APP商城-轮播图 750*250" value="3"></el-option>
							<el-option label="APP发现-轮播图 750*250" value="4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="广告链接地址：" prop="linkUrl">
						<el-input
							size="small"
							placeholder="http 或 https开头，URL填写后广告内容将失效"
							style="width:400px"
							v-model="addMsg.linkUrl"
							maxlength="200"
						></el-input>
					</el-form-item>
					<el-form-item label="开始时间：" prop="startTime">
						<el-date-picker
							v-model="addMsg.startTime"
							type="datetime"
							placeholder="选择日期"
							size="small"
							style="width:400px"
							format="yyyy/MM/dd HH:mm:ss"
							value-format="yyyy/MM/dd HH:mm:ss"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间：" prop="endTime">
						<el-date-picker
							v-model="addMsg.endTime"
							type="datetime"
							placeholder="选择日期"
							size="small"
							style="width:400px"
							format="yyyy/MM/dd HH:mm:ss"
							value-format="yyyy/MM/dd HH:mm:ss"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="是否显示：" prop="state">
						<el-radio-group v-model="addMsg.state">
							<el-radio :label="0" name="state">是</el-radio>
							<el-radio :label="1" name="state">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="广告缩略图：" prop="mainPic">
						<el-upload
							:action="imgApi()"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload1"
							:class="{disable:uploadShow1==2}"
							class="upload_style"
							v-model="addMsg.mainPic"
							:file-list="mainPic"
							:limit="1"
							accept="image/png, image/jpeg"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">宽高750 × 290像素，＜500KB的jpg图片</div>
						<el-dialog :visible.sync="dialogVisible" append-to-body>
							<img width="100%" :src="dialogImageUrl" alt class="showPic">
						</el-dialog>
					</el-form-item>
					<el-form-item label="广告内容：">
						<editor
							id="editorAdvertising"
							height="300px"
							width="700px"
							:uploadJson="uploadJson()"
							:content.sync="editorText"
							:afterChange="afterChange()"
							:fileManagerJson="look()"
							pluginsPath="../../../static/kindeditor/plugins"
							filePostName="file"
							:loadStyleMode="false"
							@on-content-change="onContentChange"
						></editor>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAffirm('addAdvertising')" size="small">确 定</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import editor from "../../public/kindeditor";
export default {
	data() {
		return {
			editorText: "直接初始化值", // 双向同步的变量
			editorTextCopy: "", // content-change 事件回掉改变的对象
			uploadShow1: 0,
			uploadShow2: 0,
			dialogImageUrl: null,
			dialogImageUrl1: null,
			dialogVisible: false,
			startTime: null,
			endTime: null,
			mainPic: [],
			content: [],
			advertisingRules: {
				title: [{ required: true, message: "请填写广告标题", trigger: "blur" }],
				mainPic: [{ required: true, message: "请添加图片", trigger: "change" }],
				content: [
					{
						validator: (rule, value, callback) => {
							if (
								(this.addMsg.content == "" || this.addMsg.content == null) &&
								(this.addMsg.linkUrl == "" || this.addMsg.linkUrl == null)
							) {
								callback(new Error("内容图和跳转链接必须填写一项!"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				startTime: [
					{
						type: "string",
						required: true,
						message: "请添加开始日期",
						trigger: "change"
					}
				],
				state: [
					{ required: true, message: "请选择是否显示", trigger: "change" }
				],
				endTime: [
					{
						type: "string",
						required: true,
						message: "请填写结束日期",
						trigger: "change"
					},
					{
						validator: (rule, value, callback) => {
							if (
								this.addMsg.startTime == null ||
								this.addMsg.startTime === "" ||
								(this.addMsg.endTime == null || this.addMsg.endTime === "")
							) {
								callback();
							} else {
								let beginTimes = this.addMsg.startTime;
								let endTimes = this.addMsg.endTime;
								let a =
									(Date.parse(endTimes) - Date.parse(beginTimes)) / 3600 / 1000;
								if (a <= 0) {
									callback(new Error("结束时间必须大于开始时间"));
								} else {
									callback();
								}
							}
						},
						trigger: "change"
					}
				]
			},
			addMsg: {
				title: "",
				mainPic: "",
				content: "",
				state: "",
				startTime: null,
				endTime: null,
				linkUrl: ""
			}
		};
	},
	methods: {
		look(a) {
			console.log(a);
			let url = this.global.imgPath;
			return url;
		},
		uploadJson() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		onContentChange(val) {
			this.editorTextCopy = val;
			console.log(this.editorTextCopy);
		},
		afterChange() {},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 / 1024 <= 2;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于2M");
				return false;
			} else {
				const isSize = new Promise(function(resolve, reject) {
					let width = 7500000;
					let height = 2900000;
					let _URL = window.URL || window.webkitURL;
					let img = new Image();
					img.onload = function() {
						let valid = img.width <= width && img.height <= height;
						valid ? resolve() : reject();
					};
					img.src = _URL.createObjectURL(file);
				}).then(
					() => {
						return file;
					},
					() => {
						this.$message.error("上传的图片必须是等于或小于750*290!");
						return Promise.reject();
					}
				);
				return isSize;
			}
		},

		handleAffirm(formName) {
			let params = { type: "affirm", value: this.addMsg, isHide: false };
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit("beforeadd", params);
				} else {
					return false;
				}
			});
		},

		handleRemove(file, fileList) {
			this.addMsg.mainPic = null;
			this.uploadShow1 = 0;
			console.log(file, fileList);
		},

		handlePictureCardPreview(file) {
			console.log(file);
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},

		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				this.addMsg.mainPic = res.data;
				this.uploadShow1 = 2;
			} else {
				this.$message.error("上传图片失败,请再次尝试");
			}
			console.log(res);
			console.log(file);
		}
	},
	mounted() {},
	created() {},
	components: {
		editor
	},
	watch: {}
};
</script>
<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.edit_advertising {
	font-size: 14px;
	color: @font-normal;
	.el-form {
		padding-top: 16px;
	}

	.el-upload__tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
		display: inline-block;
		vertical-align: bottom;
		padding-left: 8px;
		line-height: 40px;
	}
	.disable {
		.el-upload--picture-card {
			display: none;
		}
	}
	.upload_style {
		display: inline-block;
	}
}
</style>
