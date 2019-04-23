<template>
	<div class="add_supplier">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>添加代理商</h4>
			</div>
			<div class="supplier_form">
				<el-form
					size="small"
					label-width="180px"
					:model="supplierMsg"
					:rules="supplierMsgRules"
					ref="supplierMsg"
				>
					<el-form-item label="代理商名称：" prop="supplierName">
						<el-input
							type="text"
							size="small"
							maxlength="20"
							style="width:350px;"
							v-model="supplierMsg.supplierName"
						></el-input>
					</el-form-item>
					<el-form-item label="联系人：" prop="contacts">
						<el-input
							type="text"
							size="small"
							maxlength="20"
							style="width:350px;"
							v-model="supplierMsg.contacts"
						></el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop="phone">
						<el-input
							type="text"
							size="small"
							maxlength="11"
							style="width:350px;"
							v-model="supplierMsg.phone"
						></el-input>
					</el-form-item>
					<el-form-item label="详细地址：" prop="address">
						<el-input
							type="text"
							size="small"
							maxlength="30"
							style="width:350px;"
							v-model="supplierMsg.address"
						></el-input>
					</el-form-item>
					<el-form-item label="移动端购买地址：" prop="supplierAccount">
						<el-input
							type="text"
							maxlength="20"
							size="small"
							style="width:350px;"
							placeholder="以http://或https://开头，一般为H5地址"
						></el-input>
						<!-- <el-tooltip class="item" effect="light" content="账号格式：agent加3~5数字组成" placement="top">
							<i class="el-icon-warning" style="color:#1cc09f"></i>
						</el-tooltip>-->
					</el-form-item>
					<el-form-item label="LOGO：" prop="supplierPassword">
						<el-upload
							:action="imgApi()"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview1"
							:on-remove="handleRemove1"
							:on-success="handleAvatarSuccess1"
							:before-upload="beforeAvatarUpload1"
							:limit="1"
							class="upload_show"
							accept="image/png, image/jpeg"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">尺寸：80x80像素的jpg或png图片</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="简介：" prop="password">
						<el-input
							type="textarea"
							maxlength="200"
							size="small"
							style="width:500px;"
							rows="4"
							resize="none"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="supplier_area">
				<h4>供应区域</h4>
			</div>
			<div class="table_list" style="padding:10px 20px 10px 180px">
				<el-col :span="8">
					<el-tree
						:data="data1"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree1"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data2"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree2"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data3"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree3"
					></el-tree>
				</el-col>
			</div>
			<div class="top_list" style="padding:10px 200px">
				<permission-button
					permCode="supplier_add_lookup.supplier_add_save"
					banType="disable"
					size="small"
					type="primary"
					@click="submitForm('supplierMsg')"
				>
					<i class="iconfont">&#xe62d;</i> 保存
				</permission-button>
			</div>
		</div>
	</div>
</template>
<script>
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
export default {
	inject: ["reload"],
	data() {
		return {
			province: [],
			city: [],
			block: [],
			country: [],
			ruleOptions: [],
			data: [],
			data1: [],
			data2: [],
			data3: [],
			defaultProps: {
				children: "children",
				label: "areaName",
				value: "adCode"
			},
			// selectarea:["110000","120000","350000","530000","820000"],
			selectarea: [],
			supplierMsg: {
				supplierName: "",
				contacts: "",
				phone: "",
				address: "",
				areaCode: [],
				supplierPassword: "",
				password: "",
				supplierRoleId: "",
				supplierAccount: "agent"
			},
			supplierMsgRules: {
				supplierName: [
					{ required: true, message: "请填写代理商名称", trigger: "blur" }
				],
				contacts: [
					{ required: true, message: "请填写联系人", trigger: "blur" }
				],
				phone: [
					{ required: true, message: "请填写电话", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^1[3456789]\d{9}$/.test(value) == false) {
								callback(new Error("请输入正确的电话号码"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				address: [
					{ required: true, message: "请填写详细地址", trigger: "blur" }
				]
			}
		};
	},
	methods: {
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList) {},
		handlePictureCardPreview1(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 / 1024 <= 1;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于1M");
				return false;
			} else {
				const isSize = new Promise(function(resolve, reject) {
					let width = 600000;
					let height = 600000;
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
						this.$message.error("上传的图片必须是等于或小于600*600!");
						return Promise.reject();
					}
				);
				return isSize;
			}
		},
		handleAvatarSuccess1(res, file) {
			if (res.code === 200) {
				this.$message({
					message: "图片上传成功！",
					type: "success"
				});
			} else {
				this.$message({
					message: "图片上传不成功！",
					type: "error"
				});
			}
		},
		getRoleList() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/role/listAllRole"
				},
				this
			).then(
				result => {
					console.log(result.data);
					this.ruleOptions = result.data.data;
				},
				({ type, info }) => {}
			);
		},
		handleNodeClick(data) {
			console.log(data);
		},
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.addSupplier();
				} else {
					this.$message.warning("请填写完整信息！");
					return false;
				}
			});
		},
		addSupplier() {
			let arr = [];
			arr = arr.concat(
				this.$refs.tree1.getCheckedKeys(),
				this.$refs.tree2.getCheckedKeys(),
				this.$refs.tree3.getCheckedKeys()
			);
			if (arr.length === 0) {
				this.$message.error("请选择销售区域");
				return;
			}
			this.supplierMsg.areaCode = arr;

			let pass = this.supplierMsg.supplierPassword;
			pass = md5(pass);
			let key = "*chang_hong_device_cloud";
			let a = pass;
			pass = this.encryptByDES(a, key);
			let qs = require("qs");
			let data = qs.stringify({
				supplierName: this.supplierMsg.supplierName,
				contacts: this.supplierMsg.contacts,
				phone: this.supplierMsg.phone,
				address: this.supplierMsg.address,
				areaCode: this.supplierMsg.areaCode.join(","),
				supplierPassword: pass,
				// supplierRoleId: this.supplierMsg.supplierRoleId,
				supplierRoleId: 2,
				supplierAccount: this.supplierMsg.supplierAccount
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "保存成功"
					},
					type: "post",
					url: "/api-platform/supplier/saveSupplier"
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.$router.back(-1);
						this.reload();
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// console.log(this.$store.state.getArea);

		// this.getarea();
		this.getRoleList();
		this.data = JSON.parse(sessionStorage.getItem("area"))[0].children[0];
		this.data1 = this.data.slice(0, 12);
		this.data2 = this.data.slice(12, 24);
		this.data3 = this.data.slice(24, 34);
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
.add_supplier {
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
		}
		.table_list {
			overflow: hidden;
			padding: 10px 200px;
			.el-col {
				max-height: 600px;
				overflow: scroll;
			}
		}
		.supplier_form {
			padding: 20px 20px 0;
			.el-form {
				border-bottom: @border;
				padding-bottom: 20px;
			}
		}
		.supplier_area {
			padding: 0 44px;
			h4 {
				line-height: 40px;
			}
		}
	}
}
</style>

