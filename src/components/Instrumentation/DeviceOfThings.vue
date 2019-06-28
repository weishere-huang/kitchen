<template>
	<div class="table">
		<editor
			:id="editor_id"
			height="500px"
			width="700px"
			:uploadJson="uploadJson()"
			:content.sync="editorText"
			:afterChange="afterChange()"
			:fileManagerJson="look()"
			pluginsPath="../../../static/kindeditor/plugins"
			filePostName="file"
			:loadStyleMode="false"
			@on-content-change="onContentChange"
		></editor>
		<div>editorTextCopy: {{ editorTextCopy }}</div>
	</div>
</template>

<script>
import editor from "../public/kindeditor";
export default {
	name: "table11",
	data() {
		return {
			editorText: "直接初始化值", // 双向同步的变量
			editorTextCopy: "" // content-change 事件回掉改变的对象
		};
	},
	mounted() {},
	methods: {
		look(a) {
			let url = this.global.imgPath;
			return url;
		},
		uploadJson() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		onContentChange(val) {
			this.editorTextCopy = val;
		},
		afterChange() {}
	},
	components: {
		editor
	}
};
</script>

<style>
</style>