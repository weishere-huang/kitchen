<template>
	<div class="simple_home">
		<div class="msg_case">
			<h2>欢迎使用长虹智慧厨房管理系统</h2>
			<p>{{global.versionNumber}}</p>
			<span>技术支持：长虹智能制造 工业云项目部</span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.simple_home {
	width: 100%;
	height: calc(100vh - 118px);
	background: url("../../assets/image/gztbg.jpg") no-repeat center center;
	position: relative;
	.msg_case {
		position: absolute;
		right: 5%;
		bottom: 15%;
		text-align: right;
		p {
			padding: 20px 0;
		}
	}
}
</style>
