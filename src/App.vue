<template>
	<div id="app">
		<el-container class="mainWrapper">
			<el-aside class="siderWrapper">
				<div class="logoWrap">
					<!-- <img src="./assets/image/logo.png"> -->
					<h3>长虹智慧厨房</h3>
					<div style="width:50px;float:left;padding-left:10px">
						<i class="iconfont" v-show="isCollapse === true" v-on:click="TroggleHandle">&#xe62b;</i>
						<i class="iconfont" v-show="isCollapse === false" v-on:click="TroggleHandle">&#xe62c;</i>
					</div>
				</div>
				<el-menu
					:router="true"
					:default-active="$route.path"
					class="el-menu-vertical-demo"
					text-color="#fff"
					active-text-color="#ffd04b"
					:collapse="isCollapse"
					:unique-opened="true"
				>
					<el-submenu
						:index="item.permissionCode"
						v-if="item.subMenu.length!==1"
						:key="item.route"
						v-for="item in menuSource"
					>
						<template slot="title">
							<i class="iconfont" v-html="item.icon"></i>
							<span slot="title">{{item.menu}}</span>
						</template>
						<el-menu-item
							:index="subItem.route"
							:key="subItem.route"
							v-for="subItem in item.subMenu"
						>{{subItem.menu}}</el-menu-item>
					</el-submenu>
					<el-menu-item class="singleMenuItem" v-else :index="item.subMenu[0].route">
						<i class="iconfont" v-html="item.icon"></i>
						<span slot="title">{{item.menu}}</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header style="background-color:#1CC09F;">
					<div class="breadcrumbWrap">
						<breadCrumb></breadCrumb>
						<a href="login.html"></a>
					</div>
					<div class="stateList">
						<ul>
							<li>&nbsp;欢迎您：{{editPassword.account}}</li>
							<!-- <li>
								<el-tooltip class="item" effect="light" content="订单" placement="bottom-end">
									<el-badge is-dot class="item">
										<i class="iconfont" @click="pathto(0)">&#xe63b;</i>
									</el-badge>
								</el-tooltip>
							</li>-->
							<!-- <li>
								<el-tooltip class="item" effect="light" content="商品" placement="bottom-end">
									<el-badge :value="msgcount===0?'':msgcount" :max="99" class="item">
										<i class="iconfont" @click="pathto(1)">&#xe637;</i>
									</el-badge>
								</el-tooltip>
							</li>-->
							<li v-if="employeeType==0">
								<el-tooltip class="item" effect="light" content="留言反馈" placement="bottom-end">
									<el-badge is-dot class="item">
										<i class="iconfont" @click="pathto(2)">&#xe69e;</i>
									</el-badge>
								</el-tooltip>
							</li>
							<li>
								<el-tooltip class="item" effect="light" content="修改密码" placement="bottom-end">
									<i class="iconfont" @click="pathto(3)">&#xe62a;</i>
								</el-tooltip>
							</li>
							<li>
								<el-tooltip class="item" effect="light" content="服务热线" placement="bottom-end">
									<i class="iconfont" @click="pathto(4)">&#xe608;</i>
								</el-tooltip>
							</li>
							<li>
								<el-tooltip class="item" effect="light" content="退出登录" placement="bottom-end">
									<i class="iconfont" @click="out">&#xe639;</i>
								</el-tooltip>
							</li>
						</ul>
					</div>
				</el-header>
				<el-main class="mainContentWrapper" style="padding:8px;font-size:14px;">
					<transition>
						<router-view v-if="isRouterAlive"/>
					</transition>
				</el-main>
				<el-footer>长虹智慧厨房({{version?(new Date(version).format("yyyy/MM/dd hh:mm:ss")):'no version'}})&nbsp;&nbsp;版本号：{{versionNumber}}</el-footer>
			</el-container>
		</el-container>
		<el-dialog
			:close-on-click-modal="false"
			title="修改密码"
			:visible.sync="dialogFormVisible"
			width="500px"
		>
			<el-form
				label-width="100px"
				size="small"
				style="margin-top:20px;"
				:model="editPassword"
				ref="editPassword"
				:rules="editPasswordRules"
			>
				<el-form-item label="账号：">
					<span>{{editPassword.account}}</span>
				</el-form-item>
				<el-form-item label="原密码：" prop="oldPassword">
					<el-input type="password" maxlength="25" style="width:99%;" v-model="editPassword.oldPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码：" prop="newPassword">
					<el-input type="password" maxlength="20" style="width:99%;" v-model="editPassword.newPassword"></el-input>
				</el-form-item>
				<el-form-item label="再次输入：" prop="repetitionPassword">
					<el-input
						type="password"
						maxlength="20"
						style="width:99%;"
						v-model="editPassword.repetitionPassword"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="small" plain>取 消</el-button>
				<el-button type="primary" @click="setEditPassword('editPassword')" size="small">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			:close-on-click-modal="false"
			title="修改服务热线"
			:visible.sync="dialogPhoneVisible"
			width="500px"
		>
			<el-form label-width="100px" size="small" style="margin-top:20px;">
				<el-form-item label="服务热线：" prop="oldPassword">
					<el-input type="text" maxlength="25" style="width:99%;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogPhoneVisible = false" size="small" plain>取 消</el-button>
				<el-button type="primary" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import breadCrumb from "./BreadCrumb.vue";
import menuSourceMap from "./router/routeMap";
import clone from "clone";
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
export default {
	provide() {
		return {
			reload: this.reload
		};
	},
	name: "App",
	data() {
		return {
			dialogPhoneVisible: false,
			employeeType: JSON.parse(sessionStorage.getItem("user")).employeeType,
			editPassword: {
				oldPassword: "",
				newPassword: "",
				account: "",
				repetitionPassword: ""
			},
			editPasswordRules: {
				oldPassword: [
					{ required: true, message: "请输入旧密码", trigger: "blur" }
				],
				newPassword: [
					{ required: true, message: "请输入新密码", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (
								/^((?=.*[a-z])|(?=.*\d)|(?=.*[#@!~%^&*]))[a-z\d#@!$~%^&*]{6,20}$/i.test(
									value
								) === false
							) {
								callback(new Error("请输入6到20位的密码"));
							} else if (/(\w)*(\w)\2{5}(\w)*/g.test(value) === true) {
								callback(new Error("你的密码过于简单，请重新输入"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				repetitionPassword: [
					{ required: true, message: "请再次输入新密码", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (value !== this.editPassword.newPassword) {
								callback(new Error("两次输入密码不一致"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				]
			},
			dialogFormVisible: false,
			token: undefined,
			user: "",
			show: true,
			isCollapse: false,
			pictLoading: true,
			isRouterAlive: true,
			msgcount: 0,
			version: versionInfo,
			menuSource: [],
			permissionUrl: "",
			province: [],
			city: [],
			block: [],
			country: [],
			versionNumber: this.global.versionNumber
		};
	},
	computed: {},
	methods: {
		setEditPassword(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.setPasswordApi();
				} else {
					return false;
				}
			});
		},
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		setPasswordApi() {
			let newPassword = this.editPassword.newPassword;
			let oldPassword = this.editPassword.oldPassword;
			newPassword = md5(newPassword);
			oldPassword = md5(oldPassword);
			let key = "*chang_hong_device_cloud";
			oldPassword = this.encryptByDES(oldPassword, key);
			newPassword = this.encryptByDES(newPassword, key);
			let qs = require("qs");
			let data = qs.stringify({
				oldPassword: oldPassword,
				newPassword: newPassword,
				account: this.editPassword.account
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "修改成功，请重新登录！"
					},
					type: "post",
					url: "/api-platform/employee/resetpsw",
					loadingConfig: {
						target: document.querySelector(".login")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.dialogFormVisible = false;
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("user");
						sessionStorage.removeItem("permissionUrl");
						window.location.href = "/login.html";
					}
				},
				({ type, info }) => {}
			);
		},
		//获取地区JSON文件
		getArea() {
			this.axios.get("./static/area.json").then(res => {
				let that = this;
				let data = res.data.area;
				for (var item in data) {
					if (data[item].adcode.match(/100000$/)) {
						that.country.push({
							adcode: data[item].adcode,
							areaName: data[item].areaName,
							children: []
						});
					} else if (data[item].adcode.match(/0000$/)) {
						//省
						that.province.push({
							adcode: data[item].adcode,
							areaName: data[item].areaName,
							children: []
						});
					} else if (data[item].adcode.match(/00$/)) {
						//市
						that.city.push({
							adcode: data[item].adcode,
							areaName: data[item].areaName,
							children: []
						});
					} else {
						//区
						that.block.push({
							adcode: data[item].adcode,
							areaName: data[item].areaName
						});
					}
				}
				// 分类市级
				for (var index in that.province) {
					for (var index1 in that.city) {
						if (
							that.province[index].adcode.slice(0, 2) ===
							that.city[index1].adcode.slice(0, 2)
						) {
							that.province[index].children.push(that.city[index1]);
						}
					}
				}
				//  分类区级
				for (var item1 in that.city) {
					for (var item2 in that.block) {
						if (
							that.block[item2].adcode.slice(0, 4) ===
							that.city[item1].adcode.slice(0, 4)
						) {
							that.city[item1].children.push(that.block[item2]);
						}
					}
				}
				that.country[0].children.push(that.province);

				sessionStorage.setItem("area", JSON.stringify(that.country));
				// this.$store.commit("getArea", Object.assign({},that.country));
				// console.log(this.$store.state.getArea.area);
			});
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		reload() {
			this.isRouterAlive = false;
			this.$nextTick(function() {
				this.isRouterAlive = true;
			});
		},
		TroggleHandle(key, keyPath) {
			// console.log(key, keyPath);
			this.isCollapse = !this.isCollapse;
			EventBus.$emit("sideBarTroggleHandle", this.isCollapse);
		},

		out() {
			self = this;
			this.$confirm("您确定要退出登录吗？", "确认", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
				cancelButtonClass: "is-plain"
			}).then(() => {
				this.$message({
					message: "您已退出登录",
					type: "success"
				});
				self.token = null;
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("user");
				sessionStorage.removeItem("permissionUrl");
				sessionStorage.removeItem("imgPath");
				sessionStorage.removeItem("area");
				window.location.href = "/login.html";
			});
			// },({type,info})=>{})
		},

		pathto(a) {
			if (a === 0) {
				if (JSON.parse(sessionStorage.getItem("user")).employeeType == 0) {
					this.$router.push({ path: "/AdminOrder" });
				} else if (
					JSON.parse(sessionStorage.getItem("user")).employeeType == 1
				) {
					this.$router.push({ path: "/Order" });
				}
			} else if (a === 1) {
				if (JSON.parse(sessionStorage.getItem("user")).employeeType == 0) {
					this.$router.push({ path: "/AdminStore" });
				} else if (
					JSON.parse(sessionStorage.getItem("user")).employeeType == 1
				) {
					this.$router.push({ path: "/Store" });
				}
			} else if (a === 2) {
				this.$router.push({ path: "/GuestBook" });
			} else if (a === 3) {
				this.dialogFormVisible = true;
			} else if (a === 4) {
				this.dialogPhoneVisible = true;
			}
		},
		initPermission() {
			this.user =
				JSON.parse(sessionStorage.getItem("user")) &&
				JSON.parse(sessionStorage.getItem("user")).name;
			this.token = sessionStorage.getItem("token");
			this.permissionUrl = JSON.parse(
				sessionStorage.getItem("permissionUrl") || "[]"
			);
			const permissionUrl = this.permissionUrl;
			// this.user=this.$store.state.token.userMsg.name
			// this.token=this.$store.state.token.tokenNub
			// this.MsgCount();
			let _menuSource = [];
			clone(menuSourceMap).forEach(per => {
				if (per.defaultDock) {
					_menuSource.push(per);
				} else {
					const willShowMenu = per.subMenu.filter(m => {
						if (m.visible) {
							return false;
						}
						return permissionUrl.find(p => p.module === m.permissionCode)
							? true
							: false;
					});
					if (willShowMenu.length !== 0) {
						per.subMenu = willShowMenu;
						_menuSource.push(per);
					}
				}
			});
			this.menuSource = _menuSource;
		}
		// getImgPath() {
		// 	this.Axios(
		// 		{
		// 			params: {
		// 				config: "imgPath"
		// 			},
		// 			option: {
		// 				enableMsg: false
		// 			},
		// 			type: "get",
		// 			url: "/api-platform/systemconfig/list"
		// 		},
		// 		this
		// 	).then(
		// 		result => {
		// 			console.log(result.data);
		// 			if (result.data.code === 200) {
		// 				sessionStorage.imgPath = result.data.data.imgPath;
		// 			}
		// 		},
		// 		({ type, info }) => {}
		// 	);
		// }
	},
	computed: {},
	created() {
		this.initPermission();
		this.getArea();
		this.editPassword.account = JSON.parse(
			sessionStorage.getItem("user")
		).account;
	},
	components: {
		breadCrumb
	},
	mounted() {},
	watch: {
		dialogFormVisible() {
			if (this.dialogFormVisible == false) {
				this.editPassword.newPassword = "";
				this.editPassword.oldPassword = "";
				this.editPassword.repetitionPassword = "";
			}
		}
	}
};
</script>

 <style lang="less" >
@import url("./assets/less/layout.less");
.el-menu-vertical-demo {
	margin-top: 60px !important;
	&:not(.el-menu--collapse) {
		width: 200px;
		// min-height: 400px;
		// max-width: 90vh;
		overflow: scroll !important;
	}
}

@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
* {
	margin: 0;
	padding: 0;
	font-family: "微软雅黑";
}
.el-header {
	overflow: hidden;
	position: relative;
	font-size: 14px;
	padding: 0;
}
.breadcrumbWrap {
	position: absolute;
	left: 20px;
	bottom: 0;
	top: 0;
	margin: auto;
	height: 25px;
}
.menuItem {
	i {
		vertical-align: top;
	}
}
.stateList {
	position: absolute;
	right: 20px;
	bottom: 0;
	top: 0;
	margin: auto;
	height: 25px;
	color: white;
	i {
		font-size: 16px;
		margin: 0 2px;
		&:hover {
			color: #e7d31f;
			font-weight: bold;
			opacity: 0.75;
		}
	}
	// border: 1px solid @Info;
	ul {
		li {
			list-style-type: none;
			float: left;
			height: 24px;
			line-height: 24px;
			padding: 0 7px;
			//border-right: 1px solid rgb(182, 179, 179);
			cursor: pointer;
			.el-button--mini {
				padding: 5px 5px;
			}
		}
		li:last-child {
			border-right: none;
		}
	}
}
.logoWrap {
	line-height: 60px;
	h3 {
		color: @main-color;
		width: 130px;
		float: left;
	}
	i {
		cursor: pointer;
	}
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	width: 100%;
	margin: auto;
	min-width: 1200px;
	overflow: hidden;
}

.box {
	float: left;
	// width: 90%;
	height: 100%;
	.el-menu-item {
		height: 40px;
		line-height: 40px;
		min-width: 170px;
	}
}
.el-menu--popup {
	background: #333 !important;
}
.el-menu-item li:hover,
.el-menu-item:hover {
	background: #666 !important;
}
/*chrome滚动条颜色设置*/
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
	//background-color: #eeeeee;
} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar-track {
	background-color: transparent;
	// border-radius: 5px;
	//-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} /*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	background-color: #999999;
	border-radius: 3px;
	//-webkit-box-shadow: inset 0 0 6px rgba(7, 7, 7, 0.3);
} /*定义滑块 内阴影+圆角*/
</style>
