<template>
	<div class="agreement_list">
		<el-col :span="24" class="content_case">
			<el-col :span="24" class="top_title">
				<h4>用户注册及使用协议</h4>
			</el-col>
			<el-col :span="24">
				<el-form label-width="200px" size="small" style="margin-top:20px;">
					<el-form-item label="内容：">
						<editor
							id="editorArticle"
							height="500px"
							width="800px"
							:uploadJson="uploadJson()"
							:afterUpload="afterUpload"
							:content.sync="content"
							:fileManagerJson="()=>look()"
							pluginsPath="../../../static/kindeditor/plugins"
							filePostName="file"
							:loadStyleMode="false"
						></editor>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :disabled="content==''" @click="save">保 存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-col>
	</div>
</template>
<script>
import editor from "../public/kindeditor";
export default {
	inject: ["reload"],
	data() {
		return {
			content: ""
		};
	},
	methods: {
		look() {
			let url = this.global.imgPath;
			return url;
		},
		uploadJson() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		afterUpload(data) {
			return this.global.imgPath + data.replace("img:", "");
		},
		getAgreement() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/protocol/find"
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						this.content = result.data.data[0].content;
					}
				},
				({ type, info }) => {}
			);
		},
		save() {
			let qs = require("qs");
			let data = qs.stringify({
				content: this.content
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/protocol/add",
					type: "post",
					option: {
						successMsg: "用户协议保存成功"
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.getAgreement();
				}
			});
		}
	},
	created() {
		this.getAgreement();
	},
	components: {
		editor
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
.agreement_list {
	font-size: 14px;
	color: @font-normal;
	.content_case {
		background-color: white;
		// padding: 10px  0;
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
		}
	}
}
</style>
