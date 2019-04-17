<template>
	<div class="add_problem">
		<el-form label-width="90px">
			<el-form-item label="标题：">
				<el-input v-model="addMsg.title" size="small" style="width:99%" maxlength="80"></el-input>
			</el-form-item>
			<el-form-item label="分类：">
				<el-select
					v-model="sstype"
					placeholder="请选择"
					style="width:49%"
					size="small"
					@change="editchange()"
				>
					<el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="内容：">
				<el-input
					v-model="addMsg.content"
					type="textarea"
					rows="6"
					size="small"
					style="width:99%"
					maxlength="200"
				></el-input>
			</el-form-item>
			<div style="text-align: right;width:99%;padding:10px 0 20px 0;">
				<el-button @click="handleCancel" size="small" plain>取 消</el-button>
				<el-button type="primary" @click="handleAffirm('addAdvertising')" size="small">确 定</el-button>
			</div>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			classify: [
				{ label: "订单问题", value: 1 },
				{ label: "支付问题", value: 2 },
				{ label: "其他问题", value: 3 }
			],
			sstype: "",
			addMsg: {
				title: "",
				faqType: "",
				content: ""
			}
		};
	},
	props: {
		editMsg: {
			title: {},
			faqType: {},
			content: {}
		}
	},
	methods: {
		editchange() {
			this.addMsg.faqType = this.sstype;
		},
		handleCancel(value) {
			let params = { type: "cancel", isHide: false };
			this.$emit("beforeadd", params);
		},
		handleAffirm(formName) {
			let params = { type: "affirm", value: this.addMsg, isHide: false };
			// this.$refs[formName].validate(valid => {
			// 	if (valid) {
			this.$emit("beforeadd", params);
			// } else {
			// 	return false;
			// }
			// });
		}
	},
	created() {
		if (this.editMsg != null) {
			Object.assign(this.addMsg, this.editMsg);
			this.sstype = this.addMsg.faqType;
		}
	},
	watch: {
		editMsg() {
			if (this.editMsg != null) {
				Object.assign(this.addMsg, this.editMsg);
				this.sstype = this.addMsg.faqType;
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
.add_problem {
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
