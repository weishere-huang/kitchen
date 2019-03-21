<template>
	<div class="add_advertising">
		<el-form
			label-width="110px"
			size="small"
			:model="addMsg"
			ref="addAdvertising"
			:rules="advertisingRules"
		>
			<el-form-item label="广告名称：" prop="title">
				<el-input v-model="addMsg.title" size="small" style="width:99%" maxlength="50"></el-input>
			</el-form-item>
			<el-form-item label="广告缩略图：" prop="mainPic">
				<el-upload
					action="http://192.168.1.104:8861/api-upload/upload"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-success="handleAvatarSuccess"
					v-model="addMsg.mainPic"
					:file-list="mainPic"
					:limit="1"
				>
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">宽高750 × 290像素，＜500KB的jpg图片</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" append-to-body>
					<img width="100%" :src="dialogImageUrl" alt class="showPic">
				</el-dialog>
			</el-form-item>

			<el-form-item label="广告内容图：" prop="content">
				<el-upload
					action="http://192.168.1.104:8861/api-upload/upload"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview1"
					:on-remove="handleRemove1"
					:on-success="handleAvatarSuccess1"
					v-model="addMsg.content"
					:file-list="content"
					:limit="1"
				>
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">宽高1000 × 不限，＜2MB的jpg图片</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" append-to-body class="showPic">
					<img width="100%" :src="dialogImageUrl1" alt>
				</el-dialog>
			</el-form-item>
			<el-form-item label="广告链接地址：" prop="linkUrl">
				<el-input
					size="small"
					placeholder="http或https开头(内容图与链接2选1)"
					style="width:99%"
					v-model="addMsg.linkUrl"
					maxlength="200"
				></el-input>
			</el-form-item>
			<el-form-item label="是否显示：" prop="state">
				<el-radio-group v-model="addMsg.state">
					<el-radio :label="0" name="state">是</el-radio>
					<el-radio :label="1" name="state">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="开始时间：" prop="startTime">
				<el-date-picker
					v-model="addMsg.startTime"
					type="datetime"
					placeholder="选择日期"
					size="small"
					style="width:250px"
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
					style="width:250px"
					format="yyyy/MM/dd HH:mm:ss"
					value-format="yyyy/MM/dd HH:mm:ss"
				></el-date-picker>
			</el-form-item>
		</el-form>
		<div style="text-align: right;width:99%;padding:10px 0 20px 0;">
			<el-button @click="handleCancel" size="small" plain>取 消</el-button>
			<el-button type="primary" @click="handleAffirm('addAdvertising')" size="small">确 定</el-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
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
	props: {
		editMsg: {
			title: {},
			mainPic: {},
			content: {},
			state: {},
			startTime: {},
			endTime: {},
			linkUrl: {}
		}
	},
	methods: {
		handleCancel(value) {
			let params = { type: "cancel", isHide: false };
			this.$emit("beforeadd", params);
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
		edittime() {
			this.addMsg.startTime = this.startTime;
		},
		edittime1() {
			this.addMsg.endTime = this.endTime;
		},
		handleRemove(file, fileList) {
			this.addMsg.mainPic = null;
			console.log(file, fileList);
		},
		handleRemove1(file, fileList) {
			this.addMsg.content = null;
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			console.log(file);
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handlePictureCardPreview1(file) {
			console.log(file);
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				this.addMsg.mainPic =
					this.global.imgPath + res.data.replace("img:", "");
			} else {
				this.$message.error("上传图片失败,请再次尝试");
			}
			console.log(res);
			console.log(file);
		},
		handleAvatarSuccess1(res, file) {
			if (res.code === 200) {
				this.addMsg.content =
					this.global.imgPath + res.data.replace("img:", "");
			} else {
				this.$message.error("上传图片失败,请再次尝试");
			}
			console.log(res);
			console.log(file);
		}
	},
	created() {
		if (this.editMsg.id != null && undefined) {
			console.log("111");
			this.addMsg = this.editMsg;
			this.mainPic = [
				{
					name: "mainpic.jpg",
					url: this.editMsg.mainPic
				}
			];
			if (this.editMsg.content !== null && this.editMsg.content !== "") {
				this.content = [
					{
						name: "content.jpg",
						url: this.editMsg.content
					}
				];
			}
		}
	},
	watch: {
		editMsg() {
			if (this.editMsg.id != null && undefined) {
				this.addMsg = this.editMsg;
				console.log("111");
				this.mainPic = [
					{
						name: "mainpic.jpg",
						url: this.editMsg.mainPic
					}
				];
				if (this.editMsg.content !== null && this.editMsg.content !== "") {
					this.content = [
						{
							name: "content.jpg",
							url: this.editMsg.content
						}
					];
				}
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
.add_advertising {
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
}
</style>
