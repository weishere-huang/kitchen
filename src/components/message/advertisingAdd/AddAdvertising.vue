<template>
	<div class="add_advertising">
		<el-form label-width="110px" size="small" :model="addMsg" ref="addMsg" :rules="advertisingRules">
			<el-form-item label="广告名称：" props="title">
				<el-input v-model="addMsg.title" size="small" style="width:99%" maxlength="50"></el-input>
			</el-form-item>
			<el-form-item label="广告缩略图：">
				<el-upload
					action="http://192.168.1.104:8861/api-upload/upload"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-success="handleAvatarSuccess"
					v-model="addMsg.mainPic"
					:file-list="mainPic"
          :limit="1"
				>
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">宽高750 × 290像素，＜500KB的jpg图片</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" append-to-body>
					<img width="100%" :src="dialogImageUrl" alt class="showPic">
				</el-dialog>
			</el-form-item>

			<el-form-item label="广告内容图：">
				<el-upload
					action="http://192.168.1.104:8861/api-upload/upload"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview1"
					:on-remove="handleRemove1"
					:on-success="handleAvatarSuccess1"
					v-model="addMsg.content"
					:file-list="content"
          :limit="1"
				>
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">宽高1000 × 不限，＜2MB的jpg图片</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" append-to-body class="showPic">
					<img width="100%" :src="dialogImageUrl1" alt>
				</el-dialog>
			</el-form-item>
			<el-form-item label="广告链接地址：">
				<el-input
					size="small"
					placeholder="http或https开头(内容图与链接2选1)"
					style="width:99%"
					v-model="addMsg.linkUrl"
          maxlength="200"
				></el-input>
			</el-form-item>
			<el-form-item label="是否显示：">
				<el-radio-group v-model="addMsg.state">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="开始时间：">
				<el-date-picker
					v-model="startTime"
					type="datetime"
					placeholder="选择日期"
					size="small"
					style="width:250px"
					format="yyyy/MM/dd HH:mm:ss"
					value-format="yyyy/MM/dd HH:mm:ss"
					@change="edittime"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间：">
				<el-date-picker
					v-model="endTime"
					type="datetime"
					placeholder="选择日期"
					size="small"
					style="width:250px"
					format="yyyy/MM/dd HH:mm:ss"
					value-format="yyyy/MM/dd HH:mm:ss"
					@change="edittime1"
				></el-date-picker>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dialogImageUrl: this.addMsg.mainPic,
			dialogImageUrl1: this.addMsg.content,
			dialogVisible: false,
			startTime: this.addMsg.startTime,
			endTime: this.addMsg.endTime,
			mainPic: [],
			content: []
		};
	},
	props: {
		addMsg: {
			title: {},
			mainPic: {},
			content: {},
			state: {},
			startTime: {},
			endTime: {},
			linkUrl: {}
		}
	},
	methods: {
		edittime() {
			this.addMsg.startTime = this.startTime;
		},
		edittime1() {
			this.addMsg.endTime = this.endTime;
		},
		handleRemove(file, fileList) {
			this.addMsg.mainPic = null;
			console.log(file, fileList);
		},
		handleRemove1(file, fileList) {
			this.addMsg.content = null;
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			console.log(file);
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handlePictureCardPreview1(file) {
			console.log(file);
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				this.addMsg.mainPic =
					this.global.imgPath + res.data.replace("img:", "");
			} else {
				this.$message.error("上传图片失败,请再次尝试");
			}
			console.log(res);
			console.log(file);
		},
		handleAvatarSuccess1(res, file) {
			if (res.code === 200) {
				this.addMsg.content =
					this.global.imgPath + res.data.replace("img:", "");
			} else {
				this.$message.error("上传图片失败,请再次尝试");
			}
			console.log(res);
			console.log(file);
		}
	},
	created() {
		if (this.addMsg.id != null) {
			console.log("111");
        this.mainPic = [
          {
            name: "mainpic.jpg",
            url: this.addMsg.mainPic
          }
        ];
      if(this.addMsg.content!==null && this.addMsg.content!=="") {
        this.content = [
          {
            name: "content.jpg",
            url: this.addMsg.content
          }
        ];
      }
		}
	},
	watch: {
		addMsg() {

			if (this.addMsg.id != null) {
				console.log("111");
          this.mainPic = [
            {
              name: "mainpic.jpg",
              url: this.addMsg.mainPic
            }
          ];
        if(this.addMsg.content!==null && this.addMsg.content!=="") {
          this.content = [
            {
              name: "content.jpg",
              url: this.addMsg.content
            }
          ];
        }
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
.add_advertising {
	font-size: 14px;
	color: @font-normal;
	.el-form {
		padding-top: 16px;
	}

	.el-upload__tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
		display: inline-block;
		vertical-align: bottom;
		padding-left: 8px;
		line-height: 40px;
	}
}
</style>
