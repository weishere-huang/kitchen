<template>
	<div class="navbar clearfix">
		<el-breadcrumb
			class="breadcrumb-container"
			separator-class="el-icon-arrow-right"
			style="color:white;line-height:25px;"
		>
			<el-breadcrumb-item
				v-for="item in levelList"
				:key="item.path"
				:to="item.path"
			>{{item.meta.pageName}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: "Navbar",
	data() {
		return {
			levelList: []
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		}
	},
	created() {
		this.getBreadcrumb();
	},
	methods: {
		getBreadcrumb() {
			// let matched = this.$route.matched.filter(item => item.name)
			// const first = matched[0];

			// if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
			//     matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
			// }
			// this.levelList = matched
			let rList;
			if (JSON.parse(sessionStorage.getItem("user")).employeeType == 1) {
				rList = [{ path: "", meta: { pageName: "平台主页" } }];
			} else if (JSON.parse(sessionStorage.getItem("user")).employeeType == 2) {
				rList = [{ path: "", meta: { pageName: "平台主页" } }];
			}
			let matched = this.$route.matched.filter(item => item && item.name);
			matched.forEach(item => {
				if (item.path !== "/Home" && item.path !== "/AdminHome")
					rList.push({
						path: item.path,
						meta: { pageName: item.props.default.pageName }
					});
			});
			this.levelList = rList;
		}
	}
};
</script>