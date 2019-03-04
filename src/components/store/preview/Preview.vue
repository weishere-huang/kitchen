<template>
	<div class="preview">
		<div class="content_case">
			<el-col :span="24">
				<el-button type="text" size="small" style="position: absolute;margin-left:4px;">
					<i class="el-icon-close"></i>
				</el-button>
				<h2>{{MenuMsg.itemName}}</h2>
			</el-col>
			<el-col :span="24" class="img_case">
				<div>
					<img :src="MenuMsg.itemImg" alt>
				</div>
			</el-col>
			<el-col :span="24">
                <h3>{{MenuMsg.itemName}}</h3>
            </el-col>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	props: {
		MenuMsg: {}
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
.preview {
	font-size: 12px;
	width: 414px;
	height: 874px;
	background-image: url("../../../assets/image/preview.png");
	background-size: cover;
	background-repeat: no-repeat;
	.content_case {
		width: 375px;
		height: 669px;
		// background-color: red;
		position: relative;
		top: 101px;
		left: 19px;
		padding: 4px;
		line-height: 34px;
		h2 {
			text-align: center;
			font-weight: 500;
        }
        h3{
            padding: 8px 12px;
        }
		.img_case {
			div {
				box-shadow: 2px 3px 10px 1px @main-color;
				border-radius: 4px;
				width: 95%;
				margin: auto;
			}

			img {
				width: 100%;
			}
		}
	}
}
</style>
