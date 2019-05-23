<template>
	<div class="user_details">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>用户详情</h4>
			</div>
			<div class="table_list">
				<el-col :span="8">
					<el-form label-width="200px" size="mini">
						<el-form-item label="昵称：" prop>
							<span>{{userMsg.userInfo.niceName}}</span>
						</el-form-item>
						<el-form-item label="手机号：" prop>
							<span>{{userMsg.userInfo.phone}}</span>
						</el-form-item>
						<el-form-item label="用户状态：" prop>
							<span>{{userMsg.userInfo.state==0?"正常":"禁用"}}</span>
						</el-form-item>
						<el-form-item label="生日：" prop>
							<span>{{userMsg.userInfo.birthday}}</span>
						</el-form-item>
						<el-form-item label="性别：" prop>
							<span>{{userMsg.userInfo.gender==0?"女":"男"}}</span>
						</el-form-item>
						<el-form-item label="设备数量：" prop>
							<span>{{userMsg.deviceCount}}</span>
						</el-form-item>
						<el-form-item label="订单数：" prop>
							<span>{{userMsg.userInfo.niceName}}</span>
						</el-form-item>
						<el-form-item label="注册时间：" prop>
							<span>{{userMsg.userInfo.gmtCreate}}</span>
						</el-form-item>
						<el-form-item label="最近登录时间：" prop>
							<span>{{userMsg.userInfo.newlyLoginTime}}</span>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16" class="user_portrait_case">
					<span
						class="tag"
						v-for="(item, index) in tagValue"
						:key="index"
						:style="{'background-color':BgColor[index],'top':topValue[index],'left':leftValue[index]}"
					>{{item}}</span>

					<div class="user_photo_case">
						<img
							src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2629648377,3202501847&fm=26&gp=0.jpg"
							alt
						>
					</div>
				</el-col>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userMsg: {
				deviceCount: "",
				userInfo: {}
			},
			tagValue: [
				"活跃",
				"女",
				"90后",
				"购物达人",
				"天然萌",
				"家电控",
				"评论达人",
				"扫货达人",
				"签到达人",
				"爱吃辣"
			],
			BgColor: [
				"#F59A23",
				"#EC808D",
				"#AC96F1",
				"#00BFBF",
				"#8080FF",
				"#D9001B",
				"#8FBD60",
				"#02A7F0",
				"#B18A5E",
				"#769EA1",
				"#BA6A6A"
			],
			position: ["top:20%;left:20%"],
			topValue: [
				"10%",
				"30%",
				"50%",
				"70%",
				"90%",
				"90%",
				"70%",
				"50%",
				"30%",
				"10%"
			],
			leftValue: [
				"35%",
				"30%",
				"27%",
				"30%",
				"35%",
				"60%",
				"65%",
				"68%",
				"65%",
				"60%"
			]
		};
	},
	methods: {
		getDetails(id) {
			this.Axios(
				{
					params: {
						userId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-user/userInfo/userDetailInfo",
					loadingConfig: {
						target: document.querySelector(".user_details")
					}
				},
				this
			).then(
				result => {
					// console.log(result.data);
					if (result.data.code === 200) {
						this.userMsg = result.data.data;
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getDetails(this.$route.params.id);
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
.user_details {
	font-size: 14px;
	color: @font-normal;
	.top_list {
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
			height: 600px;
			.user_portrait_case {
				height: 400px;
				position: relative;
				.user_photo_case {
					width: 200px;
					height: 200px;
					border-radius: 50%;
					overflow: hidden;
					font-size: 0;
					background-color: #1cc09f;
					position: absolute;
					top: 50%;
					left: 50%;
					margin-top: -100px;
					margin-left: -100px;
					img {
						// width: 200px;
						height: 200px;
					}
				}
				.tag {
					display: inline-block;
					width: 80px;
					height: 30px;
					color: white;
					background-color: #1cc09f;
					border-radius: 15px;
					text-align: center;
					line-height: 30px;
					position: absolute;
					cursor: pointer;
				}
			}
		}
	}
}
</style>