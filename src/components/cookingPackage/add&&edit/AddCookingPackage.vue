<template>
	<div class="add_cooking_package">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>添加菜谱包</h4>
			</div>
			<div class="form_list">
				<el-form
					label-width="200px"
					size="small"
					ref="cookbook"
					:inline-message="true"
					style="margin-top: 20px;"
				>
					<el-form-item label="菜谱包名称：">
						<el-input type="text" size="small" maxlength="20" style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="售价：">
						<el-input type="text" size="small" maxlength="20" style="width:400px;">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="上架/下架：">
						<el-radio label="0">是</el-radio>
						<el-radio label="1">否</el-radio>
					</el-form-item>
					<el-form-item label="介绍：">
						<el-input type="textarea" rows="4" style="width:600px;" resize="none"></el-input>
					</el-form-item>
					<el-form-item label="封面图：">
						<el-upload
							:action="imgApi()"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview1"
							:on-remove="handleRemove1"
							:on-success="handleAvatarSuccess1"
							:before-upload="beforeAvatarUpload1"
							:limit="1"
							class="upload_show"
							accept="image/png, image/jpeg"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">建议图片比例16:9，小于1MB的jpg或png图片</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="包含菜谱：">
						<el-transfer
							:titles="['所有菜谱', '选中菜谱']"
							filterable
							:filter-method="filterMethod"
							filter-placeholder="请输入菜谱名称"
							v-model="cookbookValue"
							:data="cookbookData"
						></el-transfer>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" @click="addpackage">添加</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		const generateData = _ => {
			const data = [];
			const cities = [
				"上海",
				"北京",
				"广州",
				"深圳",
				"南京",
				"西安",
				"成都",
				"遂宁",
				"武汉",
				"长沙",
				"宁波",
				"苏州",
				"杭州"
			];
			const pinyin = [
				"shanghai",
				"beijing",
				"guangzhou",
				"shenzhen",
				"nanjing",
				"xian",
				"chengdu",
				"suining",
				"wuhan",
				"changsha",
				"ningbo",
				"suzhou",
				"hangzhou"
			];
			cities.forEach((city, index) => {
				data.push({
					label: city,
					key: index,
					pinyin: pinyin[index]
				});
			});
			return data;
		};
		return {
			dialogImageUrl: "",
			dialogVisible: false,
			cookbookData: generateData(),
			cookbookValue: [],
			filterMethod(query, item) {
				return item.pinyin.indexOf(query) > -1;
			}
		};
	},
	methods: {
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList) {},
		handlePictureCardPreview1(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 / 1024 <= 1;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于1M");
				return false;
			} else {
				const isSize = new Promise(function(resolve, reject) {
					let width = 600000;
					let height = 600000;
					let _URL = window.URL || window.webkitURL;
					let img = new Image();
					img.onload = function() {
						let valid = img.width <= width && img.height <= height;
						valid ? resolve() : reject();
					};
					img.src = _URL.createObjectURL(file);
				}).then(
					() => {
						return file;
					},
					() => {
						this.$message.error("上传的图片必须是等于或小于600*600!");
						return Promise.reject();
					}
				);
				return isSize;
			}
		},
		handleAvatarSuccess1(res, file) {
			if (res.code === 200) {
				this.$message({
					message: "图片上传成功！",
					type: "success"
				});
			} else {
				this.$message({
					message: "图片上传不成功！",
					type: "error"
				});
			}
		},
    addpackage(){
      let qs = require("qs");
      let data = qs.stringify({
        //包名
        packageName:"",
        //介绍
        introduce:"",
        //图片
        img:"",
        //价格 , 获取要/100
        price:"",
        //0正常 , 1下架
        state:"",
        //菜谱ID集合,用,隔开
        recipeIds:"",
      });
      this.Axios({
        params:data,
        url:"/api-recipe/recipePackage/add",
        type:"post",
        option:{
        }
      },this).then(result=>{
        console.log(result.data);
      })
    },
    recipeList(){
      //获取未下架的所有菜谱, 支持搜索  page 传-1
      this.Axios(
        {
          params: {
            page:-1,
            keyword:"",
          },
          option: {
            enableMsg:false
          },
          type: "get",
          url: "/api-recipe/recipe/list"

        },
        this
      ).then(
        result => {
          console.log("未下架所有菜谱")
          console.log(result.data)
        },
        ({type, info}) => {
        }
      );
    }
	},
	created(){
	  this.recipeList()
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
.add_cooking_package {
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
		}
		.el-transfer-panel {
			width: 200px;
			height: 400px;
		}
		.el-transfer-panel__list.is-filterable {
			height: 300px;
		}
	}
}
</style>
