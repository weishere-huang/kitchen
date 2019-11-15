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
					<el-form-item label="广告名称：" prop="name">
						<el-input v-model="addMsg.name" size="small" style="width:400px" maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="广告位置：" prop="position">
						<el-select v-model="addMsg.position" style="width:400px">
							<el-option v-if="employeeType==3" label="APP主页-顶部图片(仅展示) 750*450" :value="0"></el-option>
							<el-option v-if="employeeType==3" label="APP主页-广告图 750*250" :value="1"></el-option>
							<el-option v-if="employeeType==3" label="APP商城-轮播图 750*250" :value="2"></el-option>
							<el-option v-if="employeeType==3" label="APP发现-轮播图 750*250" :value="3"></el-option>
							<el-option v-if="employeeType!=3" label="店面主页-轮播图 750*250" :value="4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="广告链接地址：" prop="url">
						<el-input
							size="small"
							placeholder="http 或 https开头，URL填写后广告内容将失效"
							style="width:400px"
							v-model="addMsg.url"
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
					<el-form-item label="是否显示：" prop="isDisplay">
						<el-radio-group v-model="addMsg.isDisplay">
							<el-radio :label="0" name="state">是</el-radio>
							<el-radio :label="1" name="state">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="广告缩略图：" prop="img">
						<el-upload
							:action="imgApi()"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload1"
							:class="{disable:uploadShow1==2}"
							class="upload_style"
							:file-list="fileList"
							:limit="1"
							accept="image/jpeg"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">＜200KB的jpg图片</div>
						<el-dialog :visible.sync="dialogVisible" append-to-body>
							<img width="100%" :src="dialogImageUrl" alt class="showPic" />
						</el-dialog>
					</el-form-item>
					<el-form-item label="广告内容：">
						<editor
							id="editorAdvertising"
							height="300px"
							width="700px"
							:uploadJson="uploadJson()"
							:afterUpload="afterUpload"
							:content.sync="addMsg.content"
							:afterChange="afterChange()"
							:fileManagerJson="()=>look()"
							pluginsPath="../../../static/kindeditor/plugins"
							filePostName="file"
							:loadStyleMode="false"
							@on-content-change="onContentChange"
						></editor>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="beforeUpdata('addAdvertising')" size="small">确 定</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import editor from "../../public/kindeditor";
export default {
	inject: ["reload"],
	data() {
		return {
			employeeType: JSON.parse(sessionStorage.getItem("user")).employeeType,
			fileList: [],
			uploadShow1: 0,
			dialogImageUrl: null,
			dialogVisible: false,
			advertisingRules: {
				name: [{ required: true, message: "请填写广告名称", trigger: "blur" }],
				img: [{ required: true, message: "请添加图片", trigger: "change" }],
				position: [
					{ required: true, message: "请选择广告位置", trigger: "change" }
				],
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
				isDisplay: [
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
				name: "",
				position: "",
				startTime: "",
				endTime: "",
				isDisplay: 0,
				img: null,
				content: "",
				url: ""
			}
		};
	},
	methods: {
		beforeUpdata(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (this.addMsg.url == "" && this.addMsg.content == "") {
						this.$message.error("广告链接地址和广告内容二者必填其一");
					} else {
						this.updateAdvertising();
					}
				} else {
					return false;
				}
			});
		},
		afterUpload(data) {
			return this.global.imgPath + data.replace("img:", "");
		},
		look(a) {
			let url = this.global.imgPath;
			return url;
		},
		uploadJson() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		onContentChange(val) {},
		afterChange() {},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 <= 200;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于200KB");
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
			this.addMsg.img = null;
			this.uploadShow1 = 0;
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				this.addMsg.img = res.data;
				this.uploadShow1 = 2;
			} else {
				this.$message.error("上传图片失败,请再次尝试");
			}
		},
		updateAdvertising() {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.addMsg.id,
				name: this.addMsg.name,
				position: this.addMsg.position,
				startTime: this.addMsg.startTime.replace(/-/g, "/"),
				endTime: this.addMsg.endTime.replace(/-/g, "/"),
				isDisplay: this.addMsg.isDisplay,
				img: this.addMsg.img,
				content: this.addMsg.content,
				url: this.addMsg.url
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/ad/updateAd",
					type: "post",
					option: {
						successMsg: "修改成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.$router.back(-1);
					this.reload();
				}
			});
		},
		findOne(id) {
			this.Axios(
				{
					params: {
						adId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/ad/findOne"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.addMsg = result.data.data;
						this.uploadShow1 = 2;
						this.addMsg.startTime = this.addMsg.startTime.replace(/-/g, "/");
						this.addMsg.endTime = this.addMsg.endTime.replace(/-/g, "/");
						this.fileList = [
							{
								name: this.addMsg.img.substring(
									this.addMsg.img.lastIndexOf("/") + 1
								),
								url: this.global.imgPath + this.addMsg.img.replace("img:", "")
							}
						];
					}
				},
				({ type, info }) => {}
			);
		}
	},
	mounted() {},
	created() {
		this.findOne(this.$route.params.id);
	},
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
