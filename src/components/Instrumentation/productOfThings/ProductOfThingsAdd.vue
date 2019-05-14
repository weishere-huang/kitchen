<template>
	<div class="product_things_add">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>物联产品添加</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="产品名称：" prop>
						<el-input type="text" maxlength="20" placeholder style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="产品类型：" prop>
						<el-select type="text" maxlength="20" placeholder style="width:130px">
							<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
						</el-select>
						<el-select type="text" maxlength="20" placeholder style="width:130px">
							<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
						</el-select>
						<el-select type="text" maxlength="20" placeholder style="width:132px">
							<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="连网类型：" prop>
						<el-select type="text" maxlength="20" placeholder style="width:400px;">
							<el-option v-for="item in 3" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品描述：" prop>
						<el-input
							type="textarea"
							resize="none"
							rows="4"
							maxlength="200"
							placeholder
							style="width:400px;"
						></el-input>
					</el-form-item>
					<el-form-item label="产品协议：" prop>
						<el-input type="text" maxlength="20" placeholder style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="产品连接示意图：" prop>
						<el-input type="text" maxlength="20" placeholder style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label prop>
						<el-checkbox value="1">我已经认真阅读并同意《服务条款》《物联产品接入协议》</el-checkbox>
					</el-form-item>
					<el-form-item label prop>
						<el-button type="primary" size="small">提交申请</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.product_things_add {
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
		}
	}
}
</style>