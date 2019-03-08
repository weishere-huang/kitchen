<template>
	<div class="preview">
		<div class="content_case">
			<el-col :span="24" class="img_case">
				<el-button type="text" size="small" style="position: absolute;margin-left:12px;">
					<i class="el-icon-arrow-left" style="font-size:18px;"></i>
				</el-button>
				<div>
					<img :src="MenuMsg.itemImg" alt>
				</div>
			</el-col>
			<el-col :span="24" style="padding:4px 12px;">
				<h3>{{MenuMsg.itemName}}</h3>
			</el-col>
			<el-col :span="24" style="padding:0 12px;">
				<span style="color:#999999;">食材搭配：{{MenuMsg.itemSpec}}</span>
			</el-col>
			<el-col :span="24" style="padding:12px 12px;border-bottom: 1px dashed  #dde2eb;">
				<span style="line-height:30px;color:orange;">
					￥
					<span style="font-size:14px;font-weight: 600;">{{MenuMsg.itemPrice}}</span>
				</span>
				<span>
					<el-button type="text" size="mini" style="float:right;" class="btn_style" round>
						<i class="el-icon-plus" style="font-size:14px;"></i>加入购物车
					</el-button>
				</span>
			</el-col>
			<el-col :span="24" style="padding:4px 12px;">
				<h3>详情</h3>
				<el-col :span="8">
					<span style="color:#999999;">烹饪时长：</span>
					<span>{{MenuMsg.cookingTime}}分钟</span>
				</el-col>
				<el-col :span="8" class="spicy">
					<span style="color:#999999;">参考辣度：</span>
					<i class="iconfont icon_1" :style="MenuMsg.spicy>=1?'color:red':''">&#xe612;</i>
					<i class="iconfont icon_2" :style="MenuMsg.spicy>=2?'color:red':''">&#xe612;</i>
					<i class="iconfont icon_3" :style="MenuMsg.spicy>=3?'color:red':''">&#xe612;</i>
				</el-col>
				<el-col :span="8">
					<span style="color:#999999;">净含量：</span>
					<span>{{MenuMsg.itemWeight}}克</span>
				</el-col>
				<el-col :span="24" style="padding:12px 0px;line-height:20px;">{{MenuMsg.des}}</el-col>
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
		background: #fff;
		width: 375px;
		height: 669px;
		overflow: hidden;
		position: relative;
		top: 101px;
		left: 19px;
		h2 {
			text-align: center;
			font-weight: 500;
		}
		h3 {
			padding: 8px 0px;
		}
		.img_case {
			// margin-top: 8px;

			font-size: 0;
			div {
				box-shadow: 2px 3px 10px -3px #dde2eb;
				border-radius: 4px;
				width: 100%;
				margin: auto;
			}

			img {
				width: 100%;
			}
		}
		.btn_style {
			background-color: orange;
			color: white;
			&:hover {
				text-decoration: none;
			}
		}
		.spicy {
			i {
				font-size: 12px;
				color: #dde2eb;
				position: relative;
			}
			.icon_1 {
				left: -2px;
			}
			.icon_2 {
				left: -10px;
			}
			.icon_3 {
				left: -18px;
			}
		}
	}
}
</style>
