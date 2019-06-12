<template>
	<div class="pdf" v-show="fileType === 'pdf'">
		<p class="arrow">
			<span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
			{{currentPage}} / {{pageCount}}
			<span
				@click="changePdfPage(1)"
				class="turn"
				:class="{grey: currentPage==pageCount}"
			>下一页</span>
			&nbsp;
			<a :href="src" target="_back">下载</a>
		</p>
		<pdf
			:src="src"
			:page="currentPage"
			@num-pages="pageCount=$event"
			@page-loaded="currentPage=$event"
			@loaded="loadPdfHandler"
		></pdf>
	</div>
</template>
<script>
import pdf from "vue-pdf";
import { stringify } from "querystring";
export default {
	components: { pdf },
	data() {
		return {
			currentPage: 0, // pdf文件页码
			pageCount: 0, // pdf文件总页数
			fileType: "pdf" // 文件类型
			// src:
			// 	"http://192.168.1.104:8080/kitchenimg/2019/06/12/605f48bf3874474d9c5b87ed8b22010d.pdf",
		};
	},
	props: {
		src: {}
	},
	created() {
		// 有时PDF文件地址会出现跨域的情况,这里最好处理一下
		// this.src = pdf.createLoadingTask(this.src);
	},
	methods: {
		// 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
		changePdfPage(val) {
			// console.log(val)
			if (val === 0 && this.currentPage > 1) {
				this.currentPage--;
				// console.log(this.currentPage)
			}
			if (val === 1 && this.currentPage < this.pageCount) {
				this.currentPage++;
				// console.log(this.currentPage)
			}
		},

		// pdf加载时
		loadPdfHandler(e) {
			this.currentPage = 1; // 加载的时候先加载第一页
		}
	}
};
</script>
<style lang="less">
.arrow {
	padding: 16px 8px;
	.turn {
		cursor: pointer;
		&:hover {
			color: #1cc09f;
		}
	}
	a {
		text-decoration: none;
		color: #333333;
		&:hover {
			color: #1cc09f;
		}
	}
}
</style>
