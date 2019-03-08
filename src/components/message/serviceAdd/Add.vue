<template>
	<div class="add_service">
		<el-form label-width="90px" :model="addMsg" ref="addMsg" :rules="serviceRules">
			<el-form-item label="地区：">
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
			<el-form-item label="网点名称：">
				<el-input v-model="addMsg.title" size="small" style="width:99%"></el-input>
			</el-form-item>
			<el-form-item label="详细地址：">
				<el-input v-model="addMsg.address" size="small" style="width:99%"></el-input>
			</el-form-item>
			<el-form-item label="服务热线：">
				<el-input v-model="addMsg.phone" size="small" style="width:200px" placeholder="如：028-12345678"></el-input>
			</el-form-item>
			<el-form-item label="工作时间：">
				<el-input
					v-model="addMsg.workingHours"
					size="small"
					style="width:200px"
					placeholder="如：09:00-18:00"
				></el-input>
			</el-form-item>
			<el-form-item label="服务范围：" style="margin-bottom: 0px;">
				<el-checkbox-group v-model="serviceMode" @change="changeMode">
					<el-checkbox label="送修"></el-checkbox>
					<el-checkbox label="检修"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			serviceRules: {},
			province: [],
			cities: [],
			serviceMode: [],
			areaName: null,
			provinceCode: null,
			citycode: null,
			cname: null,
			pname: null
		};
	},
	props: {
		addMsg: {
			title: {},
			address: {},
			phone: {},
			workingHours: {},
			serviceMode: {},
			areaCode: {}
		}
	},
	methods: {
		changeMode() {
			this.addMsg.serviceMode = this.serviceMode;
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
			console.log(p);
			if (p != null) {
				this.pname = p.areaName;
				this.cities = p.children;
			} else {
				this.pname = null;
			}
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
			let arr = this.addMsg.areaCode.split(" ");
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
			console.log("执行");
			this.addMsg.serviceMode = this.addMsg.serviceMode.split(",");
			this.serviceMode = this.addMsg.serviceMode;
		}
	},
	created() {
		this.province = JSON.parse(sessionStorage.getItem("area"))[0].children[0];
		//编辑用
		if (this.addMsg.id != null) {
			this.startedit();
		}
	},
	watch: {
		addMsg() {
			if (this.addMsg.id != null) {
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
		margin-bottom: 12px;
	}
}
</style>
