<template>
	<div class="add_service">
		<el-form label-width="100px" :model="addMsg" ref="addMsg" size="mini" :rules="serviceRules">
			<el-form-item label="地区：" prop="areaCode">
				<el-select
					v-model="provinceCode"
					placeholder="请选择"
					style="width:49%"
					size="small"
					@change="beforeCity"
				>
					<el-option
						v-for="item in province"
						:key="item.adcode"
						:label="item.areaName"
						:value="item.adcode"
					></el-option>
				</el-select>
				<el-select
					v-model="citycode"
					placeholder="请选择"
					style="width:49%"
					size="small"
					@change="getcitycode"
				>
					<el-option
						v-for="item in cities"
						:key="item.adcode"
						:label="item.areaName"
						:value="item.adcode"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="网点名称：" prop="title">
				<el-input v-model="addMsg.title" size="small" style="width:99%" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="详细地址：" prop="address">
				<el-input v-model="addMsg.address" size="small" style="width:99%" maxlength="50"></el-input>
			</el-form-item>
			<el-form-item label="服务热线：" prop="phone">
				<el-input
					v-model="addMsg.phone"
					size="small"
					style="width:200px"
					placeholder="如：028-12345678"
					type="number"
					maxlength="20"
				></el-input>
			</el-form-item>
			<el-form-item label="工作时间：" prop="workingHours">
				<el-input
					v-model="addMsg.workingHours"
					size="small"
					style="width:200px"
					placeholder="如：09:00-18:00"
					maxlength="20"
				></el-input>
			</el-form-item>
			<el-form-item label="服务范围：" style="margin-bottom: 0px;" prop="serviceMode">
				<el-checkbox-group v-model="addMsg.serviceMode" @change="changeMode">
					<el-checkbox label="送修" name="serviceMode"></el-checkbox>
					<el-checkbox label="检修" name="serviceMode"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>
		<div style="text-align: right;width:99%;padding:10px 0 20px 0;">
			<el-button @click="handleCancel" size="small" plain>取 消</el-button>
			<el-button type="primary" @click="handleAffirm('addMsg')" size="small">确 定</el-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			serviceRules: {
				areaCode: [{ required: true, message: "请选择网点地区", trigger: "blur" }],
				title: [{ required: true, message: "请输入网点名称", trigger: "blur" }],
				address: [],
				phone: [
					{ required: true, message: "请输入电话", trigger: "blur" },
					{ min: 8, max: 15, message: "长度在 8 到 15 个数字", trigger: "blur" }
				],
				workingHours: [
					{ required: true, message: "请输入服务时间", trigger: "blur" }
				],
				serviceMode: [
					{
						type: "array",
						required: true,
						message: "请选择服务范围",
						trigger: "change"
					}
				]
			},
			province: [],
			cities: [],
			serviceMode: [],
			areaName: null,
			provinceCode: null,
			citycode: null,
			cname: null,
			pname: null,
			addMsg: {
				province: "",
				city: "",
				title: "",
				address: "",
				phone: "",
				workingHours: "",
				serviceMode: [],
				areaCode: ""
			}
		};
	},
	props: {
		editMsg: {
			title: {},
			address: {},
			phone: {},
			workingHours: {},
			serviceMode: {},
			areaCode: {}
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
		changeMode() {
			// this.addMsg1 = this.addMsg;
		},

		//获取市
		beforeCity() {
			//省改变时 重置市区所有字段
			this.cname = null;
			this.citycode = null;
			this.cities = [];

			let p = this.province.find(item => {
				return this.provinceCode === item.adcode;
			});
			if (p != null) {
				this.pname = p.areaName;
				this.cities = p.children;
			} else {
				this.pname = null;
			}
			// todo 默认为第一个市
			this.addMsg.areaCode = this.pname;
		},

		getcitycode() {
			if (this.pname == null) {
				let p1 = this.province.find(item => {
					return this.provinceCode === item.adcode;
				});
				if (p1 != null) this.pname = p1.areaName;
			}
			let c = this.cities.find(item => {
				return this.citycode === item.adcode;
			});
			if (c != null) {
				this.cname = c.areaName;
				this.addMsg.areaCode = this.pname + " " + this.cname;
			} else {
				this.cname = null;
				this.addMsg.areaCode = this.pname;
			}
		},
		//编辑赋值方法 , 服务范围可以
		startedit() {
			//截取地区
			let arr = this.editMsg.areaCode.split(" ");
			//赋值省
			let p = this.province.find(item => {
				return arr[0] === item.areaName;
			});
			if (p != null) {
				this.provinceCode = p.adcode;
			}
			//获取市
			this.cities = p.children;
			//赋值市区
			if (arr.length > 1) {
				let c = this.cities.find(item => {
					return arr[1] === item.areaName;
				});
				if (c != null) {
					this.citycode = c.adcode;
				}
			}
			// 服务范围
			this.addMsg.serviceMode = this.addMsg.serviceMode.split(",");
			this.serviceMode = this.addMsg.serviceMode;
		}
	},
	created() {
		this.province = JSON.parse(sessionStorage.getItem("area"))[0].children[0];
		//编辑用
		if (this.editMsg != null) {
			this.addMsg = this.editMsg;
			this.startedit();
		}
	},
	watch: {
		editMsg() {
			if (this.editMsg != null) {
				this.addMsg = this.editMsg;
				this.startedit();
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
.add_service {
	font-size: 14px;
	color: @font-normal;
	.el-form {
		padding-top: 16px;
	}
	.el-form-item {
		// margin-bottom: 12px;
	}
}
</style>
